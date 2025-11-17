import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Send } from "lucide-react";

const partnerFormSchema = z.object({
  companyName: z.string()
    .trim()
    .min(2, { message: "Company name must be at least 2 characters" })
    .max(100, { message: "Company name must be less than 100 characters" }),
  contactName: z.string()
    .trim()
    .min(2, { message: "Contact name must be at least 2 characters" })
    .max(100, { message: "Contact name must be less than 100 characters" }),
  email: z.string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email must be less than 255 characters" }),
  phone: z.string()
    .trim()
    .max(20, { message: "Phone number must be less than 20 characters" })
    .optional(),
  productCategory: z.string()
    .min(1, { message: "Please select a product category" }),
  message: z.string()
    .trim()
    .min(10, { message: "Message must be at least 10 characters" })
    .max(1000, { message: "Message must be less than 1000 characters" }),
});

type PartnerFormData = z.infer<typeof partnerFormSchema>;

export const PartnerContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<PartnerFormData>({
    resolver: zodResolver(partnerFormSchema),
    defaultValues: {
      productCategory: "",
    },
  });

  const productCategory = watch("productCategory");

  const onSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true);
    console.log("Partner form submission:", { ...data, email: "[REDACTED]" });

    try {
      // TODO: Implement backend submission (Resend email or database storage)
      // For now, simulate submission
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      toast({
        title: "Application Submitted!",
        description: "We've received your partnership inquiry and will get back to you within 2-3 business days.",
      });
      
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-royal-purple/5 to-fresh-teal/5">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-lg text-royal-purple mb-4">
              Apply for Partnership
            </h2>
            <p className="body-lg text-grey-600">
              Fill out the form below and our distribution team will review your application and get back to you shortly.
            </p>
          </div>

          <Card className="border-grey-200 shadow-lg">
            <CardHeader>
              <CardTitle className="text-royal-purple">Partnership Application</CardTitle>
              <CardDescription>
                Tell us about your company and products. All fields marked with * are required.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="companyName" className="text-grey-700">
                      Company Name *
                    </Label>
                    <Input
                      id="companyName"
                      placeholder="Your Company Ltd."
                      {...register("companyName")}
                      className={errors.companyName ? "border-red-500" : ""}
                    />
                    {errors.companyName && (
                      <p className="text-sm text-red-500">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contactName" className="text-grey-700">
                      Contact Person *
                    </Label>
                    <Input
                      id="contactName"
                      placeholder="John Smith"
                      {...register("contactName")}
                      className={errors.contactName ? "border-red-500" : ""}
                    />
                    {errors.contactName && (
                      <p className="text-sm text-red-500">{errors.contactName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-grey-700">
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="contact@company.com"
                      {...register("email")}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && (
                      <p className="text-sm text-red-500">{errors.email.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-grey-700">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+27 XX XXX XXXX"
                      {...register("phone")}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && (
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="productCategory" className="text-grey-700">
                    Product Category *
                  </Label>
                  <Select
                    value={productCategory}
                    onValueChange={(value) => setValue("productCategory", value, { shouldValidate: true })}
                  >
                    <SelectTrigger className={errors.productCategory ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cognitive-enhancement">Cognitive Enhancement</SelectItem>
                      <SelectItem value="stress-relief">Stress Relief & Adaptogens</SelectItem>
                      <SelectItem value="energy-focus">Energy & Focus</SelectItem>
                      <SelectItem value="sleep-recovery">Sleep & Recovery</SelectItem>
                      <SelectItem value="mood-wellbeing">Mood & Wellbeing</SelectItem>
                      <SelectItem value="other">Other Neuroceuticals</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.productCategory && (
                    <p className="text-sm text-red-500">{errors.productCategory.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-grey-700">
                    Product Details & Message *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your products, certifications, minimum order quantities, and why you'd like to partner with us..."
                    rows={6}
                    {...register("message")}
                    className={errors.message ? "border-red-500" : ""}
                  />
                  {errors.message && (
                    <p className="text-sm text-red-500">{errors.message.message}</p>
                  )}
                  <p className="text-sm text-grey-500">
                    {watch("message")?.length || 0} / 1000 characters
                  </p>
                </div>

                <div className="flex justify-end pt-4">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="min-w-[200px]"
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Submit Application
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-sm text-grey-500 text-center">
                  By submitting this form, you agree to be contacted regarding partnership opportunities.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
