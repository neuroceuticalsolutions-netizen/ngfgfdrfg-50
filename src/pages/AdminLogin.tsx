import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/sections/navigation";
import { Footer } from "@/components/sections/footer";
import { SEOHead } from "@/components/SEOHead";
import { Loader2 } from "lucide-react";
import {
  useCooldown,
  describeRateLimitError,
  COOLDOWNS,
} from "@/lib/auth-rate-limit";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Per-email cooldowns so spamming the same address is blocked even after
  // refresh, and across duplicate tabs.
  const signupCd = useCooldown("signup", email);
  const signinCd = useCooldown("signin", email);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/applications", { replace: true });
    });
  }, [navigate]);

  const handle = async (mode: "signin" | "signup") => {
    // Belt-and-braces: client guard before doing anything network-y.
    const cd = mode === "signup" ? signupCd : signinCd;
    if (cd.blocked) {
      toast({
        title: "Please wait a moment",
        description: `You can try again in ${cd.remaining}s.`,
        variant: "destructive",
      });
      return;
    }
    setLoading(true);
    // Arm the cooldown BEFORE the request — survives reloads / tab spam.
    cd.arm();
    try {
      if (mode === "signup") {
        const redirectUrl = `${window.location.origin}/admin/applications`;
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: redirectUrl },
        });
        if (error) throw error;
        toast({
          title: "Account created",
          description: "Check your email to confirm. An existing admin must grant you the admin role.",
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        // Successful sign-in → no point keeping a cooldown
        cd.reset();
        navigate("/admin/applications", { replace: true });
      }
    } catch (err: any) {
      const rl = describeRateLimitError(err);
      if (rl.isRateLimit && rl.retryAfterSec) {
        // Honor the server's cooldown rather than our default
        cd.arm(Math.max(rl.retryAfterSec, COOLDOWNS[mode]));
      } else if (mode === "signin") {
        // Wrong-password etc. → don't punish the user with a 5s wait
        cd.reset();
      }
      toast({
        title: rl.isRateLimit ? "Too many attempts" : "Auth error",
        description: rl.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <SEOHead title="Admin sign in" description="Internal admin sign-in for partner application management." path="/admin" />
      <Navigation />
      <main className="container mx-auto px-6 pt-32 pb-20 max-w-md">
        <Card>
          <CardHeader>
            <CardTitle className="text-royal-purple">Admin access</CardTitle>
            <CardDescription>Sign in to manage partner applications.</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin">
              <TabsList className="grid grid-cols-2 mb-4">
                <TabsTrigger value="signin">Sign in</TabsTrigger>
                <TabsTrigger value="signup">Sign up</TabsTrigger>
              </TabsList>
              {(["signin", "signup"] as const).map((mode) => (
                <TabsContent key={mode} value={mode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor={`${mode}-email`}>Email</Label>
                    <Input id={`${mode}-email`} type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`${mode}-pw`}>Password</Label>
                    <Input id={`${mode}-pw`} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <CooldownButton
                    mode={mode}
                    loading={loading}
                    canSubmit={!!email && !!password}
                    onClick={() => handle(mode)}
                    remaining={
                      (mode === "signin" ? signinCd : signupCd).remaining
                    }
                  />
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default AdminLogin;

function CooldownButton({
  mode,
  loading,
  canSubmit,
  remaining,
  onClick,
}: {
  mode: "signin" | "signup";
  loading: boolean;
  canSubmit: boolean;
  remaining: number;
  onClick: () => void;
}) {
  const blocked = remaining > 0;
  const label = mode === "signin" ? "Sign in" : "Create account";
  return (
    <div className="space-y-1">
      <Button
        onClick={onClick}
        disabled={loading || !canSubmit || blocked}
        className="w-full"
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : blocked ? (
          `Try again in ${remaining}s`
        ) : (
          label
        )}
      </Button>
      {blocked && mode === "signup" && (
        <p className="text-xs text-muted-foreground text-center">
          To protect inboxes we limit confirmation emails to one per minute.
        </p>
      )}
    </div>
  );
}