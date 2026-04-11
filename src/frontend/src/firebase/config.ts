import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// 🔥 Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAwVNH3MFGxjj9FX_NHJzlfyTcysEQKyVo",
  authDomain: "solura-9c18a.firebaseapp.com",
  projectId: "solura-9c18a",
  storageBucket: "solura-9c18a.firebasestorage.app",
  messagingSenderId: "663904856844",
  appId: "1:663904856844:web:d75ec3d1fd7daabd7cb729",
};

// 🔥 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Export auth (this is what your app uses)
export const auth = getAuth(app);
