import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ArrowLeft, ArrowRight, Send, CheckCircle2, ShieldCheck, FlaskConical, Truck } from "lucide-react";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { supabase } from "@/integrations/supabase/client";
import { trackEvent, trackPartnerSubmit } from "@/lib/analytics";

function generateSmsToken(): string {
  // 32 bytes -> 64-char hex token; cryptographically secure in browsers.
  const arr = new Uint8Array(32);
  crypto.getRandomValues(arr);
  return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}

function maskPhone(phone: string): string {
  const trimmed = phone.trim();
  if (trimmed.length <= 4) return trimmed;
  const last4 = trimmed.slice(-4);
  const prefix = trimmed.startsWith("+") ? trimmed.slice(0, 4) : trimmed.slice(0, 3);
  return `${prefix} ••• ••• ${last4}`;
}

const stepSchemas = [
  // Step 1 — Brand & contact
  z.object({
    companyName: z.string().trim().min(2, "Company name is required").max(120),
    brandName: z.string().trim().max(120).optional().or(z.literal("")),
    websiteUrl: z.string().trim().url("Enter a valid URL (https://…)").max(255).optional().or(z.literal("")),
    country: z.string().trim().min(2).max(80),
    contactName: z.string().trim().min(2, "Contact name is required").max(120),
    contactRole: z.string().trim().max(120).optional().or(z.literal("")),
    email: z.string().trim().email("Enter a valid email").max(255),
    phone: z.string().trim().max(30).optional().or(z.literal("")),
  }),
  // Step 2 — Product & compliance
  z.object({
    productCategory: z.string().min(1, "Select a category"),
    productDescription: z.string().trim().min(20, "Add a short description (min 20 chars)").max(1500),
    ingredientsSummary: z.string().trim().max(1000).optional().or(z.literal("")),
    manufacturingCertifications: z.string().trim().max(500).optional().or(z.literal("")),
    thirdPartyTested: z.boolean(),
    sahpraAware: z.boolean().refine((v) => v === true, {
      message: "You must confirm SAHPRA-aligned labelling",
    }),
  }),
  // Step 3 — Distribution goals & consent
  z.object({
    sampleUnitsAvailable: z
      .union([z.coerce.number().int().min(0).max(1_000_000), z.literal("")])
      .optional(),
    targetAudience: z.string().trim().max(500).optional().or(z.literal("")),
    distributionGoals: z.string().trim().min(20, "Tell us your goals (min 20 chars)").max(1500),
    preferredStartDate: z.string().optional().or(z.literal("")),
    popiaConsent: z.boolean().refine((v) => v === true, {
      message: "POPIA consent is required to submit",
    }),
    smsOptIn: z.boolean().optional().default(false),
  }),
] as const;

const fullSchema = stepSchemas[0]
  .merge(stepSchemas[1])
  .merge(stepSchemas[2])
  .superRefine((val, ctx) => {
    if (val.smsOptIn && (!val.phone || val.phone.trim().length < 6)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["smsOptIn"],
        message:
          "Add a phone number in step 1 to opt in to SMS, or uncheck this option.",
      });
    }
  });
type FormData = z.infer<typeof fullSchema>;

const STEP_FIELDS: Array<Array<keyof FormData>> = [
  ["companyName", "brandName", "websiteUrl", "country", "contactName", "contactRole", "email", "phone"],
  ["productCategory", "productDescription", "ingredientsSummary", "manufacturingCertifications", "thirdPartyTested", "sahpraAware"],
  ["sampleUnitsAvailable", "targetAudience", "distributionGoals", "preferredStartDate", "popiaConsent", "smsOptIn"],
];

const STEPS = [
  { title: "Your brand", description: "Tell us who you are and how to reach you.", icon: ShieldCheck },
  { title: "Product & compliance", description: "Share what you'd like distributed and confirm quality standards.", icon: FlaskConical },
  { title: "Distribution goals", description: "Define sample volumes, audience, and timeline.", icon: Truck },
] as const;

const PartnerApply = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedId, setSubmittedId] = useState<string | null>(null);
  const [smsVerificationQueued, setSmsVerificationQueued] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(fullSchema),
    mode: "onTouched",
    defaultValues: {
      companyName: "",
      brandName: "",
      websiteUrl: "",
      country: "South Africa",
      contactName: "",
      contactRole: "",
      email: "",
      phone: "",
      productCategory: "",
      productDescription: "",
      ingredientsSummary: "",
      manufacturingCertifications: "",
      thirdPartyTested: false,
      sahpraAware: false,
      sampleUnitsAvailable: "" as unknown as number,
      targetAudience: "",
      distributionGoals: "",
      preferredStartDate: "",
      popiaConsent: false,
      smsOptIn: false,
    },
  });

  const { register, handleSubmit, setValue, watch, trigger, formState: { errors } } = form;

  const handleNext = async () => {
    const valid = await trigger(STEP_FIELDS[step] as any);
    if (!valid) return;
    trackEvent("partner_apply_step_complete", { step: step + 1 });
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    trackEvent("partner_apply_submit_attempt", { productCategory: data.productCategory });

    try {
      const payload = {
        company_name: data.companyName,
        brand_name: data.brandName || null,
        website_url: data.websiteUrl || null,
        country: data.country,
        contact_name: data.contactName,
        contact_role: data.contactRole || null,
        email: data.email,
        phone: data.phone || null,
        product_category: data.productCategory,
        product_description: data.productDescription,
        ingredients_summary: data.ingredientsSummary || null,
        manufacturing_certifications: data.manufacturingCertifications || null,
        third_party_tested: data.thirdPartyTested,
        sahpra_aware: data.sahpraAware,
        popia_consent: data.popiaConsent,
        sample_units_available: data.sampleUnitsAvailable === "" || data.sampleUnitsAvailable == null ? null : Number(data.sampleUnitsAvailable),
        target_audience: data.targetAudience || null,
        distribution_goals: data.distributionGoals,
        preferred_start_date: data.preferredStartDate || null,
        sms_opt_in: data.smsOptIn === true,
        sms_consent_at: data.smsOptIn === true ? new Date().toISOString() : null,
        sms_consent_source: data.smsOptIn === true ? "partner_application" : null,
      };

      const { data: inserted, error } = await supabase
        .from("partner_applications")
        .insert(payload)
        .select("id")
        .single();
      if (error) throw error;

      // Fire-and-forget status email (will no-op gracefully if email infra is not yet set up)
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "partner-application-submitted",
            recipientEmail: data.email,
            idempotencyKey: `partner-submit-${inserted.id}`,
            templateData: {
              name: data.contactName,
              companyName: data.companyName,
              applicationId: inserted.id,
            },
          },
        })
        .catch(() => { /* ignore — email infra may not be set up yet */ });

      // If SMS opt-in, generate a verification token, persist it, then queue
      // the email-confirmed SMS verification email. Failure is non-fatal —
      // we still treat the application as submitted.
      let queuedSmsVerify = false;
      if (data.smsOptIn && data.phone) {
        const token = generateSmsToken();
        const { error: tokenErr } = await supabase
          .from("partner_applications")
          .update({
            sms_verification_token: token,
            sms_verification_sent_at: new Date().toISOString(),
          })
          .eq("id", inserted.id);
        if (!tokenErr) {
          const verifyUrl = `${window.location.origin}/partners/sms-verify?token=${encodeURIComponent(token)}`;
          const phoneMasked = maskPhone(data.phone);
          supabase.functions
            .invoke("send-transactional-email", {
              body: {
                templateName: "partner-sms-verify",
                recipientEmail: data.email,
                idempotencyKey: `partner-sms-verify-${inserted.id}`,
                templateData: {
                  name: data.contactName,
                  phoneMasked,
                  verifyUrl,
                },
              },
            })
            .catch(() => { /* email infra may not be set up */ });
          queuedSmsVerify = true;
        } else {
          console.warn("Could not store SMS verification token", tokenErr);
        }
      }

      trackPartnerSubmit({ productCategory: data.productCategory });
      setSubmittedId(inserted.id);
      setSmsVerificationQueued(queuedSmsVerify);
      toast({
        title: "Application submitted",
        description: "Check your inbox for a confirmation email.",
      });
    } catch (err: any) {
      console.error("Partner application error:", err);
      trackEvent("partner_apply_submit_error", { message: err?.message ?? "unknown" });
      toast({
        title: "Submission failed",
        description: err?.message ?? "Please try again, or email partners@neuroceutical.co.za.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  if (submittedId) {
    return (
      <div className="min-h-screen bg-white">
        <Navigation />
        <SEOHead
          title="Application submitted — Free sample distribution partner"
          description="Your free sample distribution application has been received. We'll be in touch within 3 business days."
          path="/partners/apply"
        />
        <main className="container mx-auto px-6 pt-32 pb-20 max-w-2xl">
          <Card className="border-grey-200 shadow-lg">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-fresh-teal/10">
                <CheckCircle2 className="h-8 w-8 text-fresh-teal" />
              </div>
              <CardTitle className="text-royal-purple text-3xl">Application received</CardTitle>
              <CardDescription className="text-base">
                Reference: <span className="font-mono">{submittedId.slice(0, 8)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 text-grey-700">
              <p>
                Thanks for applying to our free sample distribution programme. Here's what happens next:
              </p>
              <ol className="space-y-3 list-decimal list-inside">
                <li><strong>Confirmation email</strong> — sent to your inbox now.</li>
                <li><strong>Internal review</strong> — our team verifies product, compliance, and fit (typically 2–3 business days). You'll receive a status update when review begins.</li>
                <li><strong>Decision</strong> — we email you with next steps for sample distribution onboarding.</li>
              </ol>
              {smsVerificationQueued && (
                <div className="rounded-lg border border-fresh-teal/30 bg-fresh-teal/5 p-4 text-sm">
                  <p className="font-semibold text-royal-purple mb-1">Confirm your SMS number</p>
                  <p className="text-grey-700">
                    You opted in to SMS updates. We've sent a separate email
                    with a one-click confirmation link — please click it to
                    activate SMS notifications. Until you confirm, no SMS
                    will be sent (POPIA-compliant double opt-in).
                  </p>
                </div>
              )}
              <p className="text-sm text-grey-500">
                Distribution standards apply: GMP/ISO manufacturing, SAHPRA-aware labelling, and third-party testing where applicable.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button asChild variant="outline" className="flex-1">
                  <Link to="/get-started">Back to partners</Link>
                </Button>
                <Button asChild className="flex-1">
                  <Link to="/">Return home</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  const StepIcon = STEPS[step].icon;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <SEOHead
        title="Apply to distribute free samples in South Africa"
        description="3-step partner onboarding for nootropic and wellness brands seeking free sample distribution across South Africa. POPIA & SAHPRA aligned."
        path="/partners/apply"
        keywords="partner application, free sample distribution, South Africa, nootropics distribution, B2B onboarding, SAHPRA, POPIA"
      />

      <main className="container mx-auto px-6 pt-28 pb-20 max-w-3xl">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-fresh-teal mb-2">Free sample distribution</p>
          <h1 className="heading-xl text-royal-purple mb-3">Partner onboarding</h1>
          <p className="body-lg text-grey-600 max-w-2xl mx-auto">
            A short 3-step application so we can review your brand, products, and distribution goals.
          </p>
        </div>

        {/* Progress + step header */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm mb-3">
            <span className="font-medium text-royal-purple">Step {step + 1} of {STEPS.length}</span>
            <span className="text-grey-500">{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />

          <div className="grid grid-cols-3 gap-2 mt-6">
            {STEPS.map((s, i) => {
              const Icon = s.icon;
              const isDone = i < step;
              const isCurrent = i === step;
              return (
                <div
                  key={s.title}
                  className={`flex flex-col items-center text-center p-3 rounded-lg border transition-colors ${
                    isCurrent
                      ? "border-royal-purple bg-royal-purple/5"
                      : isDone
                      ? "border-fresh-teal/40 bg-fresh-teal/5"
                      : "border-grey-200"
                  }`}
                >
                  <Icon className={`h-5 w-5 mb-1 ${isCurrent ? "text-royal-purple" : isDone ? "text-fresh-teal" : "text-grey-400"}`} />
                  <span className={`text-xs font-semibold ${isCurrent ? "text-royal-purple" : isDone ? "text-fresh-teal" : "text-grey-500"}`}>
                    {s.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Card className="border-grey-200 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-royal-purple/10">
                <StepIcon className="h-5 w-5 text-royal-purple" />
              </div>
              <div>
                <CardTitle className="text-royal-purple">{STEPS[step].title}</CardTitle>
                <CardDescription>{STEPS[step].description}</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
              {step === 0 && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Company name *" error={errors.companyName?.message}>
                      <Input placeholder="Your Company (Pty) Ltd" {...register("companyName")} />
                    </Field>
                    <Field label="Brand name (if different)" error={errors.brandName?.message}>
                      <Input placeholder="Brand name" {...register("brandName")} />
                    </Field>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Website" error={errors.websiteUrl?.message}>
                      <Input placeholder="https://yourbrand.co.za" {...register("websiteUrl")} />
                    </Field>
                    <Field label="Country *" error={errors.country?.message}>
                      <Input {...register("country")} />
                    </Field>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Contact person *" error={errors.contactName?.message}>
                      <Input placeholder="Full name" {...register("contactName")} />
                    </Field>
                    <Field label="Role / position" error={errors.contactRole?.message}>
                      <Input placeholder="e.g. Founder, Brand Manager" {...register("contactRole")} />
                    </Field>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Email *" error={errors.email?.message}>
                      <Input type="email" placeholder="you@brand.co.za" {...register("email")} />
                    </Field>
                    <Field label="Phone" error={errors.phone?.message}>
                      <Input type="tel" placeholder="+27 ..." {...register("phone")} />
                    </Field>
                  </div>
                </>
              )}

              {step === 1 && (
                <>
                  <Field label="Product category *" error={errors.productCategory?.message}>
                    <Select
                      value={watch("productCategory")}
                      onValueChange={(v) => setValue("productCategory", v, { shouldValidate: true })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cognitive-enhancement">Cognitive Enhancement</SelectItem>
                        <SelectItem value="stress-relief">Stress Relief & Adaptogens</SelectItem>
                        <SelectItem value="energy-optimization">Energy Optimization</SelectItem>
                        <SelectItem value="sleep-recovery">Sleep & Recovery</SelectItem>
                        <SelectItem value="mood-wellbeing">Mood & Wellbeing</SelectItem>
                        <SelectItem value="other">Other Neuroceuticals</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field label="Product description *" error={errors.productDescription?.message} hint="What does the product do, who is it for, and what makes it differentiated?">
                    <Textarea rows={5} {...register("productDescription")} />
                  </Field>
                  <Field label="Key ingredients" error={errors.ingredientsSummary?.message} hint="Optional — list active ingredients and dosages.">
                    <Textarea rows={3} {...register("ingredientsSummary")} />
                  </Field>
                  <Field label="Manufacturing certifications" error={errors.manufacturingCertifications?.message} hint="e.g. GMP, ISO 22000, HACCP, FSSC 22000">
                    <Input placeholder="GMP, ISO ..." {...register("manufacturingCertifications")} />
                  </Field>
                  <CheckboxField
                    name="thirdPartyTested"
                    label="Products are third-party tested for purity and label accuracy"
                    checked={watch("thirdPartyTested")}
                    onChange={(v) => setValue("thirdPartyTested", v, { shouldValidate: true })}
                  />
                  <CheckboxField
                    name="sahpraAware"
                    label="I confirm labelling and claims are aligned with South African SAHPRA guidelines (no unverified medical claims). *"
                    checked={watch("sahpraAware")}
                    onChange={(v) => setValue("sahpraAware", v, { shouldValidate: true })}
                    error={errors.sahpraAware?.message}
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <div className="grid md:grid-cols-2 gap-6">
                    <Field label="Sample units available" error={errors.sampleUnitsAvailable?.message as string | undefined} hint="Approximate number of units you can supply for distribution.">
                      <Input type="number" min={0} placeholder="e.g. 500" {...register("sampleUnitsAvailable")} />
                    </Field>
                    <Field label="Preferred start date" error={errors.preferredStartDate?.message}>
                      <Input type="date" {...register("preferredStartDate")} />
                    </Field>
                  </div>
                  <Field label="Target audience" error={errors.targetAudience?.message} hint="Who should receive samples? e.g. students, knowledge workers, athletes.">
                    <Textarea rows={3} {...register("targetAudience")} />
                  </Field>
                  <Field label="Distribution goals *" error={errors.distributionGoals?.message} hint="What outcomes are you hoping for? (awareness, feedback, retail interest, etc.)">
                    <Textarea rows={5} {...register("distributionGoals")} />
                  </Field>

                  <div className="rounded-lg border border-grey-200 bg-grey-50 p-4 space-y-3">
                    <p className="text-sm font-semibold text-royal-purple">Compliance & consent</p>
                    <CheckboxField
                      name="popiaConsent"
                      label="I consent to Neuroceutical Solutions processing the information in this form for the purpose of evaluating this partnership, in line with POPIA. *"
                      checked={watch("popiaConsent")}
                      onChange={(v) => setValue("popiaConsent", v, { shouldValidate: true })}
                      error={errors.popiaConsent?.message}
                    />
                    <p className="text-xs text-grey-500">
                      We do not sell or share your data. You can request access or deletion at any time.
                    </p>

                    <div className="pt-3 border-t border-grey-200 space-y-2">
                      <p className="text-sm font-semibold text-royal-purple">
                        Optional: SMS notifications
                      </p>
                      <CheckboxField
                        name="smsOptIn"
                        label="I consent to receive transactional SMS (e.g. application status updates, verification codes) from Neuroceutical Solutions at the phone number provided in step 1."
                        checked={watch("smsOptIn") === true}
                        onChange={(v) =>
                          setValue("smsOptIn", v, { shouldValidate: true })
                        }
                        error={(errors as any).smsOptIn?.message}
                      />
                      <p className="text-xs text-grey-500">
                        Optional and off by default. Transactional only — no
                        marketing. Standard carrier rates may apply. You can
                        withdraw consent at any time by replying STOP or
                        emailing{" "}
                        <a
                          href="mailto:support@neuroceutical.co.za"
                          className="underline"
                        >
                          support@neuroceutical.co.za
                        </a>
                        .
                      </p>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between gap-3 pt-4 border-t border-grey-100">
                <Button
                  type="button"
                  variant="outline"
                  onClick={step === 0 ? () => navigate("/get-started") : handleBack}
                  disabled={isSubmitting}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {step === 0 ? "Cancel" : "Back"}
                </Button>

                {step < STEPS.length - 1 ? (
                  <Button type="button" onClick={handleNext}>
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting} className="min-w-[200px]">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit application
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-xs text-grey-500 text-center mt-6 max-w-xl mx-auto">
          This page collects information only for B2B partner evaluation. It is not a sales channel and does not constitute a medical recommendation.
        </p>
      </main>

      <Footer />
    </div>
  );
};

const Field = ({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) => (
  <div className="space-y-2">
    <Label className="text-grey-700">{label}</Label>
    {children}
    {hint && !error && <p className="text-xs text-grey-500">{hint}</p>}
    {error && <p className="text-sm text-red-500">{error}</p>}
  </div>
);

const CheckboxField = ({
  name,
  label,
  checked,
  onChange,
  error,
}: {
  name: string;
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  error?: string;
}) => (
  <div className="space-y-1">
    <label htmlFor={name} className="flex items-start gap-3 cursor-pointer">
      <Checkbox
        id={name}
        checked={checked}
        onCheckedChange={(v) => onChange(v === true)}
        className="mt-0.5"
      />
      <span className="text-sm text-grey-700 leading-relaxed">{label}</span>
    </label>
    {error && <p className="text-sm text-red-500 ml-7">{error}</p>}
  </div>
);

export default PartnerApply;