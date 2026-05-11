
-- 1. Rename the plaintext SMS verification token column to make it explicit
-- that it now stores a hash. Existing rows have raw tokens; convert in place.
ALTER TABLE public.partner_applications
  RENAME COLUMN sms_verification_token TO sms_verification_token_hash;

-- Hash any existing plaintext tokens (sha256 hex). Safe even if column already
-- contained hex strings — they'll just be re-hashed; affected rows would need
-- to re-verify, which is acceptable for a security upgrade.
UPDATE public.partner_applications
SET sms_verification_token_hash = encode(digest(sms_verification_token_hash, 'sha256'), 'hex')
WHERE sms_verification_token_hash IS NOT NULL;

-- 2. Pin search_path and tighten EXECUTE on internal SECURITY DEFINER functions.
ALTER FUNCTION public.enqueue_email(text, jsonb) SET search_path = public, pg_temp;
ALTER FUNCTION public.read_email_batch(text, integer, integer) SET search_path = public, pg_temp;
ALTER FUNCTION public.delete_email(text, bigint) SET search_path = public, pg_temp;
ALTER FUNCTION public.move_to_dlq(text, text, bigint, jsonb) SET search_path = public, pg_temp;

REVOKE ALL ON FUNCTION public.enqueue_email(text, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.read_email_batch(text, integer, integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.delete_email(text, bigint) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.purge_old_email_logs(integer) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.purge_old_email_logs_using_settings() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.log_initial_application_status() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.validate_partner_sms_verification() FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.enqueue_email(text, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.read_email_batch(text, integer, integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_email(text, bigint) TO service_role;
GRANT EXECUTE ON FUNCTION public.move_to_dlq(text, text, bigint, jsonb) TO service_role;
GRANT EXECUTE ON FUNCTION public.purge_old_email_logs(integer) TO service_role;
GRANT EXECUTE ON FUNCTION public.purge_old_email_logs_using_settings() TO service_role;

-- has_role must remain executable to authenticated users so RLS policies that
-- reference it work transparently.

-- 3. Defense-in-depth: explicit restrictive policy preventing any non-admin
-- from inserting/updating/deleting rows in user_roles.
CREATE POLICY "Block non-admin role mutations"
  ON public.user_roles
  AS RESTRICTIVE
  FOR ALL
  TO authenticated, anon
  USING (public.has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));
