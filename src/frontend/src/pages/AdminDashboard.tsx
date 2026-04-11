import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from "react";

import { auth, db } from "@/firebase/config";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists() && snap.data().isAdmin) {
          setIsAdmin(true);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Checking access...</div>;
  }

  if (!isAdmin) {
    return <div style={{ textAlign: "center", marginTop: "100px" }}>Access Denied ❌</div>;
  }

  return (
    <AdminLayout title="Dashboard">
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <h1>Welcome Admin 🚀</h1>
        <p>You now have full control.</p>
      </div>
    </AdminLayout>
  );
}
