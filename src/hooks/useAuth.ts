import { auth, provider } from "@/lib/firebase-client";
import { signInWithPopup, signOut as firebaseSignOut } from "firebase/auth";

export const useAuth = () => {
  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const token = await result.user.getIdToken(true);

      const response = await fetch("/api/auth/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong during sync");
      }

      window.location.replace("/");
    } catch {
      alert("Login failed, please try again.");
    }
  };

  const handleLogout = async () => {
    try {
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
