import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

serve(async (req) => {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  try {
    const body = await req.text();
    const params = new URLSearchParams(body);
    const data: Record<string, string> = {};
    params.forEach((v, k) => { data[k] = v; });

    const passphrase = Deno.env.get("PAYFAST_PASSPHRASE") ?? "";
    const receivedSignature = data.signature;

    const { signature: _sig, ...rest } = data;
    const signatureString =
      Object.entries(rest)
        .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, "+")}`)
        .join("&") + (passphrase ? `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}` : "");

    const encoder = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest("MD5", encoder.encode(signatureString));
    const computedSignature = Array.from(new Uint8Array(hashBuffer)).map((b) => b.toString(16).padStart(2, "0")).join("");

    if (computedSignature !== receivedSignature) {
      console.error("ITN signature mismatch");
      return new Response("Invalid signature", { status: 400 });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const orderId = data.m_payment_id;
    const paymentStatus = data.payment_status;

    await supabase
      .from("orders")
      .update({
        status: paymentStatus === "COMPLETE" ? "paid" : "failed",
        payfast_payment_id: data.pf_payment_id,
        payfast_status: paymentStatus,
        updated_at: new Date().toISOString(),
      })
      .eq("id", orderId);

    return new Response("OK", { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
});