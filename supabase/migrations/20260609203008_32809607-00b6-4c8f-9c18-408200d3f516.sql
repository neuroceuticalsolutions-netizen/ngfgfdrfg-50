DROP POLICY IF EXISTS "Service role full access" ON public.orders;

CREATE POLICY "Block all client access" ON public.orders
  FOR ALL
  TO authenticated, anon
  USING (false)
  WITH CHECK (false);