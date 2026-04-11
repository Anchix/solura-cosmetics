import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ MUST

const firebaseConfig = {
  apiKey: "AIzaSyAwVNH3MFGxjj9FX_NHJzlfyTcysEQKyVo",
  authDomain: "solura-9c18a.firebaseapp.com",
  projectId: "solura-9c18a",
  storageBucket: "solura-9c18a.firebasestorage.app",
  messagingSenderId: "663904856844",
  appId: "1:663904856844:web:d75ec3d1fd7daabd7cb729",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app); // 🔥 REQUIRED
