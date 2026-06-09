import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { crypto } from "https://deno.land/std@0.168.0/crypto/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { items, subtotal, customer } = await req.json();

    const merchantId = Deno.env.get("PAYFAST_MERCHANT_ID")!;
    const merchantKey = Deno.env.get("PAYFAST_MERCHANT_KEY")!;
    const passphrase = Deno.env.get("PAYFAST_PASSPHRASE") ?? "";
    const siteUrl = Deno.env.get("SITE_URL") ?? "https://neuroceutical.lovable.app";
    const isSandbox = Deno.env.get("PAYFAST_SANDBOX") === "true";

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_name: customer.fullName,
        customer_email: customer.email,
        customer_phone: customer.phone,
        delivery_address: customer.address,
        items: items,
        amount_cents: Math.round(subtotal * 100),
        status: "pending",
      })
      .select()
      .single();

    if (orderError) throw orderError;

    const orderId = order.id;
    const amountFormatted = Number(subtotal).toFixed(2);
    const itemName = items.length === 1 ? items[0].name : `Neuroceutical Peptide Order (${items.length} items)`;

    const payload: Record<string, string> = {
      merchant_id: merchantId,
      merchant_key: merchantKey,
      return_url: `${siteUrl}/checkout/success?order_id=${orderId}`,
      cancel_url: `${siteUrl}/checkout/cancel`,
      notify_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/payfast-itn`,
      name_first: customer.fullName.split(" ")[0],
      name_last: customer.fullName.split(" ").slice(1).join(" ") || customer.fullName.split(" ")[0],
      email_address: customer.email,
      cell_number: customer.phone.replace(/\s/g, ""),
      m_payment_id: orderId,
      amount: amountFormatted,
      item_name: itemName,
    };

    const signatureString =
      Object.entries(payload)
        .map(([k, v]) => `${k}=${encodeURIComponent(v).replace(/%20/g, "+")}`)
        .join("&") + (passphrase ? `&passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}` : "");

    const encoder = new TextEncoder();
    const data = encoder.encode(signatureString);
    const hashBuffer = await crypto.subtle.digest("MD5", data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const signature = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");

    payload.signature = signature;

    const payfast_url = isSandbox
      ? "https://sandbox.payfast.co.za/eng/process"
      : "https://www.payfast.co.za/eng/process";

    return new Response(
      JSON.stringify({ payfast_url, payload, order_id: orderId }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});