CREATE TABLE public.sms_preferences (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL UNIQUE,
  phone_e164 text,
  sms_opt_in boolean NOT NULL DEFAULT false,
  consent_at timestamp with time zone,
  opted_out_at timestamp with time zone,
  consent_source text NOT NULL DEFAULT 'account_settings',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT sms_preferences_phone_format CHECK (
    phone_e164 IS NULL OR phone_e164 ~ '^\+[1-9][0-9]{6,14}$'
  ),
  CONSTRAINT sms_preferences_optin_requires_phone CHECK (
    sms_opt_in = false OR phone_e164 IS NOT NULL
  ),
  CONSTRAINT sms_preferences_optin_requires_consent_at CHECK (
    sms_opt_in = false OR consent_at IS NOT NULL
  )
);

ALTER TABLE public.sms_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own sms preferences"
  ON public.sms_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own sms preferences"
  ON public.sms_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own sms preferences"
  ON public.sms_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own sms preferences"
  ON public.sms_preferences FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all sms preferences"
  ON public.sms_preferences FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER sms_preferences_set_updated_at
  BEFORE UPDATE ON public.sms_preferences
  FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

CREATE INDEX idx_sms_preferences_user ON public.sms_preferences(user_id);
CREATE INDEX idx_sms_preferences_optin ON public.sms_preferences(sms_opt_in) WHERE sms_opt_in = true;