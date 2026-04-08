import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuthStore } from "@/store/authStore";
import type { UserProfile } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";

// ── helpers ──────────────────────────────────────────────────────────────────
const isValidEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// ── types ─────────────────────────────────────────────────────────────────────
interface LoginForm {
  email: string;
  phone: string;
  password: string;
  loginMethod: "email" | "phone";
}
interface SignupForm {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}
interface FieldErrors {
  [k: string]: string;
}

// ── sub-components ────────────────────────────────────────────────────────────
function ErrorMsg({ msg }: { msg: string }) {
  if (!msg) return null;
  return (
    <p
      className="flex items-center gap-1.5 text-sm text-destructive mt-1"
      role="alert"
    >
      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
      {msg}
    </p>
  );
}

function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  label,
  error,
  ocid,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  label: string;
  error?: string;
  ocid?: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          id={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`pl-10 pr-10 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
          data-ocid={ocid}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      </div>
      <ErrorMsg msg={error ?? ""} />
    </div>
  );
}

function GoogleButton({
  onClick,
  loading,
}: { onClick: () => void; loading: boolean }) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-full gap-2 h-11"
      onClick={onClick}
      disabled={loading}
      data-ocid="auth-google-btn"
    >
      {loading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <svg viewBox="0 0 24 24" className="w-4 h-4" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      )}
      Continue with Google
    </Button>
  );
}

// ── main component ─────────────────────────────────────────────────────────────
export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false);
  const [isIILoading, setIsIILoading] = useState(false);
  const [loginErrors, setLoginErrors] = useState<FieldErrors>({});
  const [signupErrors, setSignupErrors] = useState<FieldErrors>({});
  const [globalLoginError, setGlobalLoginError] = useState("");

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    phone: "",
    password: "",
    loginMethod: "email",
  });
  const [signupForm, setSignupForm] = useState<SignupForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const updateLogin = useCallback(
    <K extends keyof LoginForm>(k: K, v: LoginForm[K]) => {
      setLoginForm((p) => ({ ...p, [k]: v }));
      setLoginErrors((e) => ({ ...e, [k]: "" }));
      setGlobalLoginError("");
    },
    [],
  );

  const updateSignup = useCallback(
    <K extends keyof SignupForm>(k: K, v: SignupForm[K]) => {
      setSignupForm((p) => ({ ...p, [k]: v }));
      setSignupErrors((e) => ({ ...e, [k]: "" }));
    },
    [],
  );

  // ── login validation ──────────────────────────────────────────────────────
  function validateLogin(): boolean {
    const errs: FieldErrors = {};
    if (loginForm.loginMethod === "email") {
      if (!loginForm.email) errs.email = "Email is required";
      else if (!isValidEmail(loginForm.email))
        errs.email = "Enter a valid email address";
    } else {
      if (!loginForm.phone) errs.phone = "Phone number is required";
      else if (loginForm.phone.length !== 10)
        errs.phone = "Enter a valid 10-digit phone number";
    }
    if (!loginForm.password) errs.password = "Password is required";
    setLoginErrors(errs);
    return Object.keys(errs).length === 0;
  }

  // ── signup validation ─────────────────────────────────────────────────────
  function validateSignup(): boolean {
    const errs: FieldErrors = {};
    if (!signupForm.name.trim()) errs.name = "Full name is required";
    if (!signupForm.email) errs.email = "Email is required";
    else if (!isValidEmail(signupForm.email))
      errs.email = "Enter a valid email address";
    if (signupForm.phone && signupForm.phone.length !== 10)
      errs.phone = "Enter a valid 10-digit number";
    if (!signupForm.password) errs.password = "Password is required";
    else if (signupForm.password.length < 8)
      errs.password = "Password must be at least 8 characters";
    if (!signupForm.confirmPassword)
      errs.confirmPassword = "Please confirm your password";
    else if (signupForm.password !== signupForm.confirmPassword)
      errs.confirmPassword = "Passwords do not match";
    if (!signupForm.acceptTerms)
      errs.acceptTerms = "You must accept the terms to continue";
    setSignupErrors(errs);
    return Object.keys(errs).length === 0;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsLoginLoading(true);
    setGlobalLoginError("");
    try {
      await new Promise((r) => setTimeout(r, 900));
      // Simulate wrong password for demo
      if (loginForm.password === "wrongpass") {
        setGlobalLoginError(
          "Incorrect password. Please try again or use Forgot Password.",
        );
        return;
      }
      const mockUser: UserProfile = {
        id: "u1",
        name: loginForm.email.split("@")[0] || "Customer",
        email: loginForm.email,
        phone: loginForm.phone || undefined,
        createdAt: new Date().toISOString(),
      };
      login(mockUser);
      toast.success("Welcome back to Solura! ✨");
      navigate({ to: "/account" });
    } catch {
      setGlobalLoginError("Something went wrong. Please try again.");
    } finally {
      setIsLoginLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setIsSignupLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1000));
      const mockUser: UserProfile = {
        id: `u${Date.now()}`,
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone || undefined,
        createdAt: new Date().toISOString(),
      };
      login(mockUser);
      toast.success("Welcome to Solura Cosmetics! 🌸");
      navigate({ to: "/account" });
    } catch {
      setSignupErrors({ global: "Account creation failed. Please try again." });
    } finally {
      setIsSignupLoading(false);
    }
  };

  const handleInternetIdentity = async () => {
    setIsIILoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1200));
      const mockUser: UserProfile = {
        id: `ii-${Date.now()}`,
        name: "Solura Customer",
        email: "",
        createdAt: new Date().toISOString(),
      };
      login(mockUser);
      toast.success("Signed in with Google! ✨");
      navigate({ to: "/account" });
    } catch {
      toast.error("Google sign-in failed. Please try again.");
    } finally {
      setIsIILoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/20 py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="w-full max-w-md"
        >
          {/* Brand header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
              style={{ background: "var(--gradient-rose)" }}
            >
              <span className="font-display text-2xl font-bold text-primary-foreground">
                S
              </span>
            </motion.div>
            <h1 className="font-display text-3xl font-bold text-foreground tracking-tight">
              Solura Cosmetics
            </h1>
            <p className="text-muted-foreground mt-1 text-sm font-body">
              Reveal Your Natural Glow
            </p>
          </div>

          {/* Card */}
          <div className="bg-card rounded-2xl border border-border shadow-elevated overflow-hidden">
            {/* Top accent bar */}
            <div
              className="h-1 w-full"
              style={{ background: "var(--gradient-rose)" }}
            />

            <div className="p-7">
              <Tabs
                value={activeTab}
                onValueChange={(v) => setActiveTab(v as "login" | "signup")}
              >
                <TabsList
                  className="w-full mb-6 bg-muted/50"
                  data-ocid="auth-tabs"
                >
                  <TabsTrigger
                    value="login"
                    className="flex-1 text-sm font-medium"
                    data-ocid="auth-login-tab"
                  >
                    Sign In
                  </TabsTrigger>
                  <TabsTrigger
                    value="signup"
                    className="flex-1 text-sm font-medium"
                    data-ocid="auth-signup-tab"
                  >
                    Create Account
                  </TabsTrigger>
                </TabsList>

                {/* ── LOGIN TAB ─────────────────────────────────────────── */}
                <TabsContent value="login" className="mt-0">
                  {/* Method toggle */}
                  <div className="flex gap-2 mb-5 p-1 bg-muted/40 rounded-lg">
                    <button
                      type="button"
                      onClick={() => updateLogin("loginMethod", "email")}
                      className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-smooth ${
                        loginForm.loginMethod === "email"
                          ? "bg-card text-foreground shadow-sm border border-border"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid="login-method-email"
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateLogin("loginMethod", "phone")}
                      className={`flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-smooth ${
                        loginForm.loginMethod === "phone"
                          ? "bg-card text-foreground shadow-sm border border-border"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                      data-ocid="login-method-phone"
                    >
                      <span className="flex items-center justify-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> Phone
                      </span>
                    </button>
                  </div>

                  {/* Global error */}
                  {globalLoginError && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4 text-sm text-destructive"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {globalLoginError}
                    </motion.div>
                  )}

                  <form onSubmit={handleLogin} className="space-y-4" noValidate>
                    {loginForm.loginMethod === "email" ? (
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="login-email"
                          className="text-sm font-medium"
                        >
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="login-email"
                            type="email"
                            value={loginForm.email}
                            onChange={(e) =>
                              updateLogin("email", e.target.value)
                            }
                            placeholder="priya@example.com"
                            className={`pl-10 ${loginErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            data-ocid="login-email"
                          />
                        </div>
                        <ErrorMsg msg={loginErrors.email ?? ""} />
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        <Label
                          htmlFor="login-phone"
                          className="text-sm font-medium"
                        >
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="login-phone"
                            value={loginForm.phone}
                            onChange={(e) => {
                              if (
                                /^\d*$/.test(e.target.value) &&
                                e.target.value.length <= 10
                              )
                                updateLogin("phone", e.target.value);
                            }}
                            placeholder="9876543210"
                            inputMode="numeric"
                            maxLength={10}
                            className={`pl-10 ${loginErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                            data-ocid="login-phone"
                          />
                        </div>
                        <ErrorMsg msg={loginErrors.phone ?? ""} />
                      </div>
                    )}

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <Label
                          htmlFor="login-password"
                          className="text-sm font-medium"
                        >
                          Password
                        </Label>
                        <button
                          type="button"
                          className="text-xs text-primary hover:underline underline-offset-2 transition-colors"
                          data-ocid="forgot-password-link"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <PasswordInput
                        id="login-password"
                        value={loginForm.password}
                        onChange={(v) => updateLogin("password", v)}
                        placeholder="••••••••"
                        label=""
                        error={loginErrors.password}
                        ocid="login-password"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 text-sm font-semibold"
                      size="lg"
                      disabled={isLoginLoading}
                      data-ocid="login-submit"
                    >
                      {isLoginLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Signing in…
                        </>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </form>

                  <div className="my-5 flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs text-muted-foreground px-1">
                      or continue with
                    </span>
                    <Separator className="flex-1" />
                  </div>

                  <GoogleButton
                    onClick={handleInternetIdentity}
                    loading={isIILoading}
                  />

                  <p className="text-center text-sm text-muted-foreground mt-5">
                    New to Solura?{" "}
                    <button
                      type="button"
                      className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
                      onClick={() => setActiveTab("signup")}
                      data-ocid="switch-to-signup"
                    >
                      Create an account
                    </button>
                  </p>
                </TabsContent>

                {/* ── SIGNUP TAB ────────────────────────────────────────── */}
                <TabsContent value="signup" className="mt-0">
                  {signupErrors.global && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4 text-sm text-destructive"
                      role="alert"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                      {signupErrors.global}
                    </motion.div>
                  )}

                  <form
                    onSubmit={handleSignup}
                    className="space-y-4"
                    noValidate
                  >
                    {/* Name */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="signup-name"
                        className="text-sm font-medium"
                      >
                        Full Name
                      </Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-name"
                          value={signupForm.name}
                          onChange={(e) => updateSignup("name", e.target.value)}
                          placeholder="Priya Krishnamurthy"
                          className={`pl-10 ${signupErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          data-ocid="signup-name"
                        />
                      </div>
                      <ErrorMsg msg={signupErrors.name ?? ""} />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="signup-email"
                        className="text-sm font-medium"
                      >
                        Email Address
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-email"
                          type="email"
                          value={signupForm.email}
                          onChange={(e) =>
                            updateSignup("email", e.target.value)
                          }
                          placeholder="priya@example.com"
                          className={`pl-10 ${signupErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          data-ocid="signup-email"
                        />
                      </div>
                      <ErrorMsg msg={signupErrors.email ?? ""} />
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <Label
                        htmlFor="signup-phone"
                        className="text-sm font-medium"
                      >
                        Phone Number{" "}
                        <span className="text-muted-foreground font-normal">
                          (optional)
                        </span>
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="signup-phone"
                          value={signupForm.phone}
                          onChange={(e) => {
                            if (
                              /^\d*$/.test(e.target.value) &&
                              e.target.value.length <= 10
                            )
                              updateSignup("phone", e.target.value);
                          }}
                          placeholder="9876543210"
                          inputMode="numeric"
                          maxLength={10}
                          className={`pl-10 ${signupErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`}
                          data-ocid="signup-phone"
                        />
                      </div>
                      <ErrorMsg msg={signupErrors.phone ?? ""} />
                    </div>

                    {/* Password */}
                    <PasswordInput
                      id="signup-password"
                      value={signupForm.password}
                      onChange={(v) => updateSignup("password", v)}
                      placeholder="Min. 8 characters"
                      label="Password"
                      error={signupErrors.password}
                      ocid="signup-password"
                    />

                    {/* Confirm password */}
                    <PasswordInput
                      id="signup-confirm-password"
                      value={signupForm.confirmPassword}
                      onChange={(v) => updateSignup("confirmPassword", v)}
                      placeholder="Repeat your password"
                      label="Confirm Password"
                      error={signupErrors.confirmPassword}
                      ocid="signup-confirm-password"
                    />

                    {/* Terms */}
                    <div className="space-y-1">
                      <div className="flex items-start gap-2.5">
                        <Checkbox
                          id="accept-terms"
                          checked={signupForm.acceptTerms}
                          onCheckedChange={(v) =>
                            updateSignup("acceptTerms", !!v)
                          }
                          className="mt-0.5"
                          data-ocid="signup-terms-checkbox"
                        />
                        <label
                          htmlFor="accept-terms"
                          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
                        >
                          I agree to the{" "}
                          <span className="text-primary hover:underline underline-offset-2 cursor-pointer">
                            Terms of Service
                          </span>{" "}
                          and{" "}
                          <span className="text-primary hover:underline underline-offset-2 cursor-pointer">
                            Privacy Policy
                          </span>
                        </label>
                      </div>
                      <ErrorMsg msg={signupErrors.acceptTerms ?? ""} />
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-11 text-sm font-semibold"
                      size="lg"
                      disabled={isSignupLoading}
                      data-ocid="signup-submit"
                    >
                      {isSignupLoading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />{" "}
                          Creating account…
                        </>
                      ) : (
                        "Create Account"
                      )}
                    </Button>
                  </form>

                  <div className="my-5 flex items-center gap-3">
                    <Separator className="flex-1" />
                    <span className="text-xs text-muted-foreground px-1">
                      or continue with
                    </span>
                    <Separator className="flex-1" />
                  </div>

                  <GoogleButton
                    onClick={handleInternetIdentity}
                    loading={isIILoading}
                  />

                  <p className="text-center text-sm text-muted-foreground mt-5">
                    Already have an account?{" "}
                    <button
                      type="button"
                      className="text-primary font-medium hover:underline underline-offset-2 transition-colors"
                      onClick={() => setActiveTab("login")}
                      data-ocid="switch-to-login"
                    >
                      Sign in
                    </button>
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="mt-6 flex flex-col items-center gap-3"
          >
            <div
              className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-soft"
              data-ocid="social-proof-badge"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-foreground">
                10,000+ happy customers
              </span>
              <span className="text-xs text-muted-foreground">
                across India
              </span>
            </div>

            {/* Star row */}
            <div className="flex items-center gap-1">
              {["s1", "s2", "s3", "s4", "s5"].map((k) => (
                <svg
                  key={k}
                  viewBox="0 0 20 20"
                  className="w-4 h-4 fill-secondary"
                  aria-hidden="true"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-xs text-muted-foreground ml-1">
                4.9/5 from 1,200+ reviews
              </span>
            </div>

            {/* Privacy note */}
            <p className="text-xs text-muted-foreground text-center">
              🔒 Your data is secure and never shared.{" "}
              <span className="hover:text-foreground cursor-pointer transition-colors underline underline-offset-2">
                Privacy Policy
              </span>
            </p>
          </motion.div>
        </motion.div>
      </div>
    </Layout>
  );
}
