import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ALLOWED_STATUSES = ["submitted", "reviewing", "approved", "declined"] as const;
type Status = typeof ALLOWED_STATUSES[number];

const TEMPLATE_BY_STATUS: Record<Status, string | null> = {
  submitted: null, // sent on insert
  reviewing: "partner-application-reviewing",
  approved: "partner-application-approved",
  declined: "partner-application-declined",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    // Verify caller is signed in
    const authHeader = req.headers.get("Authorization") ?? "";
    if (!authHeader.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: userData, error: userErr } = await userClient.auth.getUser();
    if (userErr || !userData.user) {
      return json({ error: "Unauthorized" }, 401);
    }

    // Parse body
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") return json({ error: "Invalid body" }, 400);
    const { applicationId, status, notes } = body as {
      applicationId?: string;
      status?: Status;
      notes?: string;
    };
    if (!applicationId || typeof applicationId !== "string") {
      return json({ error: "applicationId is required" }, 400);
    }
    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return json({ error: "Invalid status" }, 400);
    }
    if (notes && (typeof notes !== "string" || notes.length > 2000)) {
      return json({ error: "Invalid notes" }, 400);
    }

    const admin = createClient(supabaseUrl, serviceKey);

    // Verify caller has admin role
    const { data: roleRow, error: roleErr } = await admin
      .from("user_roles")
      .select("role")
      .eq("user_id", userData.user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (roleErr) return json({ error: roleErr.message }, 500);
    if (!roleRow) return json({ error: "Forbidden" }, 403);

    // Load current application
    const { data: existing, error: existErr } = await admin
      .from("partner_applications")
      .select("id, email, contact_name, company_name, status")
      .eq("id", applicationId)
      .maybeSingle();
    if (existErr) return json({ error: existErr.message }, 500);
    if (!existing) return json({ error: "Application not found" }, 404);

    if (existing.status === status) {
      return json({ ok: true, unchanged: true });
    }

    // Update + log event
    const { error: updErr } = await admin
      .from("partner_applications")
      .update({ status, admin_notes: notes ?? null })
      .eq("id", applicationId);
    if (updErr) return json({ error: updErr.message }, 500);

    await admin.from("application_status_events").insert({
      application_id: applicationId,
      from_status: existing.status,
      to_status: status,
      notes: notes ?? null,
      changed_by: userData.user.id,
    });

    // Trigger status email (best-effort)
    const templateName = TEMPLATE_BY_STATUS[status];
    let emailSent = false;
    if (templateName) {
      try {
        const { error: emailErr } = await admin.functions.invoke(
          "send-transactional-email",
          {
            body: {
              templateName,
              recipientEmail: existing.email,
              idempotencyKey: `partner-${status}-${applicationId}`,
              templateData: {
                name: existing.contact_name,
                companyName: existing.company_name,
                applicationId,
                notes: notes ?? "",
              },
            },
          },
        );
        emailSent = !emailErr;
      } catch (_) {
        emailSent = false;
      }
    }

    return json({ ok: true, emailSent });
  } catch (err) {
    console.error("update-application-status error:", err);
    const msg = err instanceof Error ? err.message : "Unknown error";
    return json({ error: msg }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}