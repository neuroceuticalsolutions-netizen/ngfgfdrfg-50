-- Add SMS verification columns to partner_applications
ALTER TABLE public.partner_applications
  ADD COLUMN IF NOT EXISTS sms_verification_token text,
  ADD COLUMN IF NOT EXISTS sms_verification_sent_at timestamptz,
  ADD COLUMN IF NOT EXISTS sms_verified_at timestamptz;

CREATE UNIQUE INDEX IF NOT EXISTS partner_applications_sms_verification_token_uidx
  ON public.partner_applications (sms_verification_token)
  WHERE sms_verification_token IS NOT NULL;

-- Validation trigger: only allow sms_verified_at to be set if the applicant
-- opted in AND provided a phone number. Prevents stray verification states.
CREATE OR REPLACE FUNCTION public.validate_partner_sms_verification()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.sms_verified_at IS NOT NULL THEN
    IF NEW.sms_opt_in IS NOT TRUE THEN
      RAISE EXCEPTION 'Cannot mark SMS as verified when sms_opt_in is false';
    END IF;
    IF NEW.phone IS NULL OR length(btrim(NEW.phone)) < 6 THEN
      RAISE EXCEPTION 'Cannot mark SMS as verified without a phone number';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS partner_applications_validate_sms_verification ON public.partner_applications;
CREATE TRIGGER partner_applications_validate_sms_verification
  BEFORE INSERT OR UPDATE ON public.partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_partner_sms_verification();