import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";

// ✅ FIREBASE IMPORTS
import { auth, db } from "@/firebase/config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

export default function AccountPage() {
  const navigate = useNavigate();

  const [user, setUser] = useState<any>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 🔥 Listen + SAVE USER
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          name: firebaseUser.displayName || "User",
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        };

        // ✅ SAVE USER IN FIRESTORE
        await setDoc(doc(db, "users", firebaseUser.uid), userData);

        setUser(userData);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // 🔥 Logout
  const handleLogout = async () => {
    await signOut(auth);
    navigate({ to: "/" });
  };

  return (
    <Layout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white border rounded-xl p-8 shadow">
          <h1 className="text-2xl font-bold mb-4">My Account</h1>

          {isLoggedIn && user ? (
            <>
              <p className="mb-2">
                <strong>Name:</strong> {user.name}
              </p>
              <p className="mb-6">
                <strong>Email:</strong> {user.email}
              </p>

              <Button onClick={handleLogout} className="w-full">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </>
          ) : (
            <p>You are not logged in.</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
