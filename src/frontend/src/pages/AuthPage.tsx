import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

// 🔥 FIREBASE
import { auth } from "../firebase/config";
import {
  GoogleAuthProvider,
  signInWithPopup,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export default function AuthPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      toast.success(`Welcome ${user.displayName || "User"} ✨`);

      navigate({ to: "/account" });
    } catch (error) {
      console.error(error);
      toast.error("Google sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center bg-muted/20 px-4">
        <div className="w-full max-w-md bg-white border rounded-xl p-8 shadow">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold">Solura Cosmetics</h1>
            <p className="text-sm text-muted-foreground">
              Login to continue
            </p>
          </div>

          <Button
            onClick={handleGoogleLogin}
            className="w-full h-11"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Continue with Google"}
          </Button>
        </div>
      </div>
    </Layout>
  );
}
