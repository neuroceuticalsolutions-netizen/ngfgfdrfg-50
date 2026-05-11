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

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/admin/applications", { replace: true });
    });
  }, [navigate]);

  const handle = async (mode: "signin" | "signup") => {
    setLoading(true);
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
        navigate("/admin/applications", { replace: true });
      }
    } catch (err: any) {
      toast({ title: "Auth error", description: err.message, variant: "destructive" });
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
                  <Button onClick={() => handle(mode)} disabled={loading || !email || !password} className="w-full">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signin" ? "Sign in" : "Create account"}
                  </Button>
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