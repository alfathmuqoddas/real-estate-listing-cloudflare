import { auth, provider } from "@/lib/firebase-client";
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

export const useAuth = () => {
  const handleLogin = async () => {
    try {
      if (!auth) throw new Error("Firebase Auth not initialized");

      // PHASE 1: FIREBASE
      const result = await signInWithPopup(auth, provider);
      const token = await result.user.getIdToken(true);

      console.log("Firebase success, syncing session...");

      // PHASE 2: YOUR API
      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`API Error: ${errorData.error}`);
      }

      window.location.replace("/");
    } catch (error: any) {
      console.error("Login Step Failed:", error);
      alert(error?.message);
    }
  };

  const handleLogout = async () => {
    try {
      if (!auth) return;
      await firebaseSignOut(auth);
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        alert("Logout successful, redirecting...");
        window.location.reload();
      }
    } catch (error) {
      console.error("Logout failed: ", error);
      alert("Logout failed, please try again.");
    }
  };

  return { handleLogin, handleLogout };
};
