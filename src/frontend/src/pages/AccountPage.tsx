import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { LogOut, Package } from "lucide-react";
import { useEffect, useState } from "react";

// 🔥 FIREBASE IMPORTS
import { auth } from "@/firebase/config";
import {
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

export default function AccountPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 Listen for Firebase user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
        });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      navigate({ to: "/auth" });
    }
  }, [isLoggedIn, navigate]);

  // 🔥 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate({ to: "/" });
  };

  if (!isLoggedIn) return null;

  return (
    <Layout>
      <div className="bg-muted/30 min-h-screen">
        <div className="container mx-auto px-4 py-10 max-w-3xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">My Account</h1>
              <p className="text-sm text-muted-foreground">
                Welcome back, {user?.name}
              </p>
            </div>

            <Button onClick={handleLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>

          {/* User Card */}
          <div className="bg-white rounded-xl border p-6 shadow">
            <h2 className="text-xl font-semibold mb-2">{user?.name}</h2>
            <p className="text-muted-foreground">{user?.email}</p>

            <div className="mt-6">
              <Button onClick={() => navigate({ to: "/account/orders" })}>
                <Package className="h-4 w-4 mr-2" />
                View Orders
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
