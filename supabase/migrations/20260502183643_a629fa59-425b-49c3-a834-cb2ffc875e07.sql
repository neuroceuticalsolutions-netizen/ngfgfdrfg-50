-- Ensure pg_cron is available (pg_cron lives in the cron schema)
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Function to delete email_send_log entries older than N days.
-- SECURITY DEFINER so the cron job can run it without needing extra grants.
CREATE OR REPLACE FUNCTION public.purge_old_email_logs(days_to_keep INTEGER DEFAULT 90)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  IF days_to_keep IS NULL OR days_to_keep < 1 THEN
    RAISE EXCEPTION 'days_to_keep must be a positive integer (got %)', days_to_keep;
  END IF;

  DELETE FROM public.email_send_log
  WHERE created_at < (now() - make_interval(days => days_to_keep));

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;

-- Lock down execute: only the database owner / service role should call this.
REVOKE ALL ON FUNCTION public.purge_old_email_logs(INTEGER) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.purge_old_email_logs(INTEGER) FROM anon;
REVOKE ALL ON FUNCTION public.purge_old_email_logs(INTEGER) FROM authenticated;

-- Remove any pre-existing schedule with the same name so this is idempotent.
DO $$
BEGIN
  PERFORM cron.unschedule('purge-old-email-logs');
EXCEPTION WHEN OTHERS THEN
  NULL;
END;
$$;

-- Schedule daily at 03:15 UTC: keep last 90 days of email_send_log.
SELECT cron.schedule(
  'purge-old-email-logs',
  '15 3 * * *',
  $$ SELECT public.purge_old_email_logs(90); $$
);