
-- Settings table for email log retention (single row).
CREATE TABLE IF NOT EXISTS public.email_log_retention_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  retention_days INTEGER NOT NULL DEFAULT 90,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_by UUID,
  CONSTRAINT email_log_retention_singleton CHECK (id = 1),
  CONSTRAINT email_log_retention_positive CHECK (retention_days >= 1 AND retention_days <= 3650)
);

-- Seed the single row.
INSERT INTO public.email_log_retention_settings (id, retention_days)
VALUES (1, 90)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS.
ALTER TABLE public.email_log_retention_settings ENABLE ROW LEVEL SECURITY;

-- Admins can view and update; service role can read for the cron job.
CREATE POLICY "Admins can view retention settings"
  ON public.email_log_retention_settings
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can update retention settings"
  ON public.email_log_retention_settings
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role) AND id = 1);

CREATE POLICY "Service role can read retention settings"
  ON public.email_log_retention_settings
  FOR SELECT
  TO public
  USING (auth.role() = 'service_role');

-- Trigger to keep updated_at fresh.
CREATE TRIGGER email_log_retention_touch_updated_at
  BEFORE UPDATE ON public.email_log_retention_settings
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- New purge wrapper that reads days_to_keep from the settings table.
CREATE OR REPLACE FUNCTION public.purge_old_email_logs_using_settings()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  configured_days INTEGER;
BEGIN
  SELECT retention_days INTO configured_days
  FROM public.email_log_retention_settings
  WHERE id = 1;

  IF configured_days IS NULL THEN
    configured_days := 90;
  END IF;

  RETURN public.purge_old_email_logs(configured_days);
END;
$$;

REVOKE ALL ON FUNCTION public.purge_old_email_logs_using_settings() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.purge_old_email_logs_using_settings() FROM anon;
REVOKE ALL ON FUNCTION public.purge_old_email_logs_using_settings() FROM authenticated;

-- Re-schedule the cron job to use the settings-aware wrapper.
DO $$
BEGIN
  PERFORM cron.unschedule('purge-old-email-logs');
EXCEPTION WHEN OTHERS THEN
  NULL;
END;
$$;

SELECT cron.schedule(
  'purge-old-email-logs',
  '15 3 * * *',
  $$ SELECT public.purge_old_email_logs_using_settings(); $$
);
