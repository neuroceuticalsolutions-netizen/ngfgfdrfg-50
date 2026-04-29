-- Tighten executable surface of SECURITY DEFINER / trigger helpers
REVOKE EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.has_role(UUID, public.app_role) TO authenticated, service_role;

REVOKE EXECUTE ON FUNCTION public.log_initial_application_status() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.log_initial_application_status() TO service_role;

-- touch_updated_at is just a trigger helper; lock it down and pin search_path
ALTER FUNCTION public.touch_updated_at() SET search_path = public;
REVOKE EXECUTE ON FUNCTION public.touch_updated_at() FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.touch_updated_at() TO service_role;