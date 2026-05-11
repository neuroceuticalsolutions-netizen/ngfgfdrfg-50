import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers':
    'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    let token: string | null = null
    if (req.method === 'GET') {
      token = new URL(req.url).searchParams.get('token')
    } else if (req.method === 'POST') {
      const body = await req.json().catch(() => ({}))
      token = typeof body?.token === 'string' ? body.token : null
    } else {
      return json({ error: 'Method not allowed' }, 405)
    }

    if (!token || token.length < 16 || token.length > 128) {
      return json({ status: 'invalid', error: 'Missing or invalid token' }, 400)
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
      { auth: { persistSession: false } }
    )

    const { data: app, error: fetchErr } = await supabase
      .from('partner_applications')
      .select(
        'id, sms_opt_in, phone, sms_verified_at, sms_verification_sent_at'
      )
      .eq('sms_verification_token', token)
      .maybeSingle()

    if (fetchErr) {
      console.error('verify-partner-sms fetch error', fetchErr)
      return json({ status: 'error', error: 'Lookup failed' }, 500)
    }
    if (!app) {
      return json({ status: 'invalid' }, 404)
    }
    if (app.sms_verified_at) {
      return json({ status: 'already_verified', verifiedAt: app.sms_verified_at })
    }
    if (!app.sms_opt_in || !app.phone) {
      return json({ status: 'invalid', error: 'Opt-in or phone missing' }, 400)
    }

    // Optional 14-day expiry from when the email was queued
    if (app.sms_verification_sent_at) {
      const sentAt = new Date(app.sms_verification_sent_at).getTime()
      const ageMs = Date.now() - sentAt
      const fourteenDays = 14 * 24 * 60 * 60 * 1000
      if (ageMs > fourteenDays) {
        return json({ status: 'expired' }, 410)
      }
    }

    const { error: updErr } = await supabase
      .from('partner_applications')
      .update({
        sms_verified_at: new Date().toISOString(),
        sms_verification_token: null,
      })
      .eq('id', app.id)

    if (updErr) {
      console.error('verify-partner-sms update error', updErr)
      return json({ status: 'error', error: 'Update failed' }, 500)
    }

    return json({ status: 'verified' })
  } catch (e) {
    console.error('verify-partner-sms unexpected error', e)
    return json({ status: 'error', error: 'Unexpected error' }, 500)
  }
})