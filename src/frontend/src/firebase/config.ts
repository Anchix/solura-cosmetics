import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAwVNH3MFGxjj9FX_NHJzlfyTcysEQKyVo",
  authDomain: "solura-9c18a.firebaseapp.com",
  projectId: "solura-9c18a",
  storageBucket: "solura-9c18a.firebasestorage.app",
  messagingSenderId: "663904856844",
  appId: "1:663904856844:web:d75ec3d1fd7daabd7cb729",
};

const app = initializeApp(firebaseConfig);

// ✅ ONLY DATABASE (NO AUTH)
export const db = getFirestore(app);

