ALTER TABLE public.email_send_log
ADD COLUMN IF NOT EXISTS recipient_ip_hash TEXT;

CREATE INDEX IF NOT EXISTS idx_email_send_log_recipient_ip_hash
  ON public.email_send_log (recipient_ip_hash)
  WHERE recipient_ip_hash IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_email_send_log_template_name
  ON public.email_send_log (template_name);

CREATE INDEX IF NOT EXISTS idx_email_send_log_recipient_email
  ON public.email_send_log (recipient_email);