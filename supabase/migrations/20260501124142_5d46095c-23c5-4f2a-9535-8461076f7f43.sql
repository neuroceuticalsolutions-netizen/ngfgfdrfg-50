ALTER TABLE public.partner_applications
  ADD COLUMN sms_opt_in boolean NOT NULL DEFAULT false,
  ADD COLUMN sms_consent_at timestamp with time zone,
  ADD COLUMN sms_consent_source text;

ALTER TABLE public.partner_applications
  ADD CONSTRAINT partner_applications_sms_optin_requires_phone
  CHECK (sms_opt_in = false OR (phone IS NOT NULL AND length(btrim(phone)) > 0));

ALTER TABLE public.partner_applications
  ADD CONSTRAINT partner_applications_sms_optin_requires_consent_at
  CHECK (sms_opt_in = false OR sms_consent_at IS NOT NULL);