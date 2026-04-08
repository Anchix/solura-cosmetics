import { d as useNavigate, r as reactExports, j as jsxRuntimeExports, b as ue } from "./index-BYwbnXHo.js";
import { L as Layout, m as motion, b as Mail, U as User } from "./Layout-DTgLeLmj.js";
import { c as createLucideIcon, u as useAuthStore, B as Button } from "./authStore-bVvk2SIb.js";
import { L as LoaderCircle, C as Checkbox } from "./checkbox-CCrVLB2K.js";
import { I as Input } from "./input-CQNpYXih.js";
import { L as Label } from "./label-BQccOJNV.js";
import { S as Separator } from "./separator-EpQ6h15r.js";
import { T as Tabs, a as TabsList, b as TabsTrigger, c as TabsContent } from "./tabs-Baiw20nR.js";
import { P as Phone } from "./phone-CIS_i9Qy.js";
import { C as CircleAlert } from "./circle-alert-Cw0C2SSg.js";
import { S as Sparkles } from "./sparkles-D0IsLIBY.js";
import { E as Eye } from "./eye-DavFoWyF.js";
import "./index-7aOncye4.js";
import "./index-CB7yveq3.js";
import "./index-D6XNYQx9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49",
      key: "ct8e1f"
    }
  ],
  ["path", { d: "M14.084 14.158a3 3 0 0 1-4.242-4.242", key: "151rxh" }],
  [
    "path",
    {
      d: "M17.479 17.499a10.75 10.75 0 0 1-15.417-5.151 1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.446-5.143",
      key: "13bj9a"
    }
  ],
  ["path", { d: "m2 2 20 20", key: "1ooewy" }]
];
const EyeOff = createLucideIcon("eye-off", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["rect", { width: "18", height: "11", x: "3", y: "11", rx: "2", ry: "2", key: "1w4ew1" }],
  ["path", { d: "M7 11V7a5 5 0 0 1 10 0v4", key: "fwvmzm" }]
];
const Lock = createLucideIcon("lock", __iconNode);
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
function ErrorMsg({ msg }) {
  if (!msg) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "p",
    {
      className: "flex items-center gap-1.5 text-sm text-destructive mt-1",
      role: "alert",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-3.5 h-3.5 shrink-0" }),
        msg
      ]
    }
  );
}
function PasswordInput({
  id,
  value,
  onChange,
  placeholder,
  label,
  error,
  ocid
}) {
  const [show, setShow] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-sm font-medium text-foreground", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id,
          type: show ? "text" : "password",
          value,
          onChange: (e) => onChange(e.target.value),
          placeholder,
          className: `pl-10 pr-10 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`,
          "data-ocid": ocid
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setShow((s) => !s),
          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors",
          "aria-label": show ? "Hide password" : "Show password",
          children: show ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: error ?? "" })
  ] });
}
function GoogleButton({
  onClick,
  loading
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Button,
    {
      type: "button",
      variant: "outline",
      className: "w-full gap-2 h-11",
      onClick,
      disabled: loading,
      "data-ocid": "auth-google-btn",
      children: [
        loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 24 24", className: "w-4 h-4", "aria-hidden": "true", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              fill: "#4285F4",
              d: "M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              fill: "#34A853",
              d: "M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              fill: "#FBBC05",
              d: "M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "path",
            {
              fill: "#EA4335",
              d: "M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            }
          )
        ] }),
        "Continue with Google"
      ]
    }
  );
}
function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [activeTab, setActiveTab] = reactExports.useState("login");
  const [isLoginLoading, setIsLoginLoading] = reactExports.useState(false);
  const [isSignupLoading, setIsSignupLoading] = reactExports.useState(false);
  const [isIILoading, setIsIILoading] = reactExports.useState(false);
  const [loginErrors, setLoginErrors] = reactExports.useState({});
  const [signupErrors, setSignupErrors] = reactExports.useState({});
  const [globalLoginError, setGlobalLoginError] = reactExports.useState("");
  const [loginForm, setLoginForm] = reactExports.useState({
    email: "",
    phone: "",
    password: "",
    loginMethod: "email"
  });
  const [signupForm, setSignupForm] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false
  });
  const updateLogin = reactExports.useCallback(
    (k, v) => {
      setLoginForm((p) => ({ ...p, [k]: v }));
      setLoginErrors((e) => ({ ...e, [k]: "" }));
      setGlobalLoginError("");
    },
    []
  );
  const updateSignup = reactExports.useCallback(
    (k, v) => {
      setSignupForm((p) => ({ ...p, [k]: v }));
      setSignupErrors((e) => ({ ...e, [k]: "" }));
    },
    []
  );
  function validateLogin() {
    const errs = {};
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
  function validateSignup() {
    const errs = {};
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
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateLogin()) return;
    setIsLoginLoading(true);
    setGlobalLoginError("");
    try {
      await new Promise((r) => setTimeout(r, 900));
      if (loginForm.password === "wrongpass") {
        setGlobalLoginError(
          "Incorrect password. Please try again or use Forgot Password."
        );
        return;
      }
      const mockUser = {
        id: "u1",
        name: loginForm.email.split("@")[0] || "Customer",
        email: loginForm.email,
        phone: loginForm.phone || void 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      login(mockUser);
      ue.success("Welcome back to Solura! ✨");
      navigate({ to: "/account" });
    } catch {
      setGlobalLoginError("Something went wrong. Please try again.");
    } finally {
      setIsLoginLoading(false);
    }
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setIsSignupLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 1e3));
      const mockUser = {
        id: `u${Date.now()}`,
        name: signupForm.name,
        email: signupForm.email,
        phone: signupForm.phone || void 0,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      login(mockUser);
      ue.success("Welcome to Solura Cosmetics! 🌸");
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
      const mockUser = {
        id: `ii-${Date.now()}`,
        name: "Solura Customer",
        email: "",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      login(mockUser);
      ue.success("Signed in with Google! ✨");
      navigate({ to: "/account" });
    } catch {
      ue.error("Google sign-in failed. Please try again.");
    } finally {
      setIsIILoading(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background to-muted/20 py-12 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
      className: "w-full max-w-md",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.9, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.4, delay: 0.1 },
              className: "inline-flex items-center justify-center w-16 h-16 rounded-full mb-4",
              style: { background: "var(--gradient-rose)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-2xl font-bold text-primary-foreground", children: "S" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display text-3xl font-bold text-foreground tracking-tight", children: "Solura Cosmetics" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-sm font-body", children: "Reveal Your Natural Glow" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card rounded-2xl border border-border shadow-elevated overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-1 w-full",
              style: { background: "var(--gradient-rose)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Tabs,
            {
              value: activeTab,
              onValueChange: (v) => setActiveTab(v),
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  TabsList,
                  {
                    className: "w-full mb-6 bg-muted/50",
                    "data-ocid": "auth-tabs",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: "login",
                          className: "flex-1 text-sm font-medium",
                          "data-ocid": "auth-login-tab",
                          children: "Sign In"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        TabsTrigger,
                        {
                          value: "signup",
                          className: "flex-1 text-sm font-medium",
                          "data-ocid": "auth-signup-tab",
                          children: "Create Account"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "login", className: "mt-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 mb-5 p-1 bg-muted/40 rounded-lg", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateLogin("loginMethod", "email"),
                        className: `flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-smooth ${loginForm.loginMethod === "email" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
                        "data-ocid": "login-method-email",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "w-3.5 h-3.5" }),
                          " Email"
                        ] })
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => updateLogin("loginMethod", "phone"),
                        className: `flex-1 py-1.5 px-3 rounded-md text-sm font-medium transition-smooth ${loginForm.loginMethod === "phone" ? "bg-card text-foreground shadow-sm border border-border" : "text-muted-foreground hover:text-foreground"}`,
                        "data-ocid": "login-method-phone",
                        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center justify-center gap-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "w-3.5 h-3.5" }),
                          " Phone"
                        ] })
                      }
                    )
                  ] }),
                  globalLoginError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -8 },
                      animate: { opacity: 1, y: 0 },
                      className: "flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4 text-sm text-destructive",
                      role: "alert",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                        globalLoginError
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-4", noValidate: true, children: [
                    loginForm.loginMethod === "email" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "login-email",
                          className: "text-sm font-medium",
                          children: "Email Address"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "login-email",
                            type: "email",
                            value: loginForm.email,
                            onChange: (e) => updateLogin("email", e.target.value),
                            placeholder: "priya@example.com",
                            className: `pl-10 ${loginErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`,
                            "data-ocid": "login-email"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: loginErrors.email ?? "" })
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Label,
                        {
                          htmlFor: "login-phone",
                          className: "text-sm font-medium",
                          children: "Phone Number"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "login-phone",
                            value: loginForm.phone,
                            onChange: (e) => {
                              if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10)
                                updateLogin("phone", e.target.value);
                            },
                            placeholder: "9876543210",
                            inputMode: "numeric",
                            maxLength: 10,
                            className: `pl-10 ${loginErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`,
                            "data-ocid": "login-phone"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: loginErrors.phone ?? "" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Label,
                          {
                            htmlFor: "login-password",
                            className: "text-sm font-medium",
                            children: "Password"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            className: "text-xs text-primary hover:underline underline-offset-2 transition-colors",
                            "data-ocid": "forgot-password-link",
                            children: "Forgot Password?"
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        PasswordInput,
                        {
                          id: "login-password",
                          value: loginForm.password,
                          onChange: (v) => updateLogin("password", v),
                          placeholder: "••••••••",
                          label: "",
                          error: loginErrors.password,
                          ocid: "login-password"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Button,
                      {
                        type: "submit",
                        className: "w-full h-11 text-sm font-semibold",
                        size: "lg",
                        disabled: isLoginLoading,
                        "data-ocid": "login-submit",
                        children: isLoginLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                          " ",
                          "Signing in…"
                        ] }) : "Sign In"
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground px-1", children: "or continue with" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GoogleButton,
                    {
                      onClick: handleInternetIdentity,
                      loading: isIILoading
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-5", children: [
                    "New to Solura?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-primary font-medium hover:underline underline-offset-2 transition-colors",
                        onClick: () => setActiveTab("signup"),
                        "data-ocid": "switch-to-signup",
                        children: "Create an account"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsContent, { value: "signup", className: "mt-0", children: [
                  signupErrors.global && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    motion.div,
                    {
                      initial: { opacity: 0, y: -8 },
                      animate: { opacity: 1, y: 0 },
                      className: "flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 mb-4 text-sm text-destructive",
                      role: "alert",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 shrink-0 mt-0.5" }),
                        signupErrors.global
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "form",
                    {
                      onSubmit: handleSignup,
                      className: "space-y-4",
                      noValidate: true,
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "signup-name",
                              className: "text-sm font-medium",
                              children: "Full Name"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "signup-name",
                                value: signupForm.name,
                                onChange: (e) => updateSignup("name", e.target.value),
                                placeholder: "Priya Krishnamurthy",
                                className: `pl-10 ${signupErrors.name ? "border-destructive focus-visible:ring-destructive" : ""}`,
                                "data-ocid": "signup-name"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: signupErrors.name ?? "" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Label,
                            {
                              htmlFor: "signup-email",
                              className: "text-sm font-medium",
                              children: "Email Address"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "signup-email",
                                type: "email",
                                value: signupForm.email,
                                onChange: (e) => updateSignup("email", e.target.value),
                                placeholder: "priya@example.com",
                                className: `pl-10 ${signupErrors.email ? "border-destructive focus-visible:ring-destructive" : ""}`,
                                "data-ocid": "signup-email"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: signupErrors.email ?? "" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Label,
                            {
                              htmlFor: "signup-phone",
                              className: "text-sm font-medium",
                              children: [
                                "Phone Number",
                                " ",
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-normal", children: "(optional)" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                id: "signup-phone",
                                value: signupForm.phone,
                                onChange: (e) => {
                                  if (/^\d*$/.test(e.target.value) && e.target.value.length <= 10)
                                    updateSignup("phone", e.target.value);
                                },
                                placeholder: "9876543210",
                                inputMode: "numeric",
                                maxLength: 10,
                                className: `pl-10 ${signupErrors.phone ? "border-destructive focus-visible:ring-destructive" : ""}`,
                                "data-ocid": "signup-phone"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: signupErrors.phone ?? "" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PasswordInput,
                          {
                            id: "signup-password",
                            value: signupForm.password,
                            onChange: (v) => updateSignup("password", v),
                            placeholder: "Min. 8 characters",
                            label: "Password",
                            error: signupErrors.password,
                            ocid: "signup-password"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          PasswordInput,
                          {
                            id: "signup-confirm-password",
                            value: signupForm.confirmPassword,
                            onChange: (v) => updateSignup("confirmPassword", v),
                            placeholder: "Repeat your password",
                            label: "Confirm Password",
                            error: signupErrors.confirmPassword,
                            ocid: "signup-confirm-password"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Checkbox,
                              {
                                id: "accept-terms",
                                checked: signupForm.acceptTerms,
                                onCheckedChange: (v) => updateSignup("acceptTerms", !!v),
                                className: "mt-0.5",
                                "data-ocid": "signup-terms-checkbox"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "label",
                              {
                                htmlFor: "accept-terms",
                                className: "text-sm text-muted-foreground leading-relaxed cursor-pointer",
                                children: [
                                  "I agree to the",
                                  " ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary hover:underline underline-offset-2 cursor-pointer", children: "Terms of Service" }),
                                  " ",
                                  "and",
                                  " ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary hover:underline underline-offset-2 cursor-pointer", children: "Privacy Policy" })
                                ]
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorMsg, { msg: signupErrors.acceptTerms ?? "" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Button,
                          {
                            type: "submit",
                            className: "w-full h-11 text-sm font-semibold",
                            size: "lg",
                            disabled: isSignupLoading,
                            "data-ocid": "signup-submit",
                            children: isSignupLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 mr-2 animate-spin" }),
                              " ",
                              "Creating account…"
                            ] }) : "Create Account"
                          }
                        )
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "my-5 flex items-center gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground px-1", children: "or continue with" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "flex-1" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    GoogleButton,
                    {
                      onClick: handleInternetIdentity,
                      loading: isIILoading
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-muted-foreground mt-5", children: [
                    "Already have an account?",
                    " ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-primary font-medium hover:underline underline-offset-2 transition-colors",
                        onClick: () => setActiveTab("login"),
                        "data-ocid": "switch-to-login",
                        children: "Sign in"
                      }
                    )
                  ] })
                ] })
              ]
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.3 },
            className: "mt-6 flex flex-col items-center gap-3",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full shadow-soft",
                  "data-ocid": "social-proof-badge",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "w-4 h-4 text-secondary" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground", children: "10,000+ happy customers" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "across India" })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
                ["s1", "s2", "s3", "s4", "s5"].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "svg",
                  {
                    viewBox: "0 0 20 20",
                    className: "w-4 h-4 fill-secondary",
                    "aria-hidden": "true",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" })
                  },
                  k
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "4.9/5 from 1,200+ reviews" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground text-center", children: [
                "🔒 Your data is secure and never shared.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hover:text-foreground cursor-pointer transition-colors underline underline-offset-2", children: "Privacy Policy" })
              ] })
            ]
          }
        )
      ]
    }
  ) }) });
}
export {
  AuthPage as default
};
