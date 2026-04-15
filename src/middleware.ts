// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import { verifyToken } from "./lib/verifyToken";

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, locals } = context;
  // --- 1. Extract Token ---
  const token = cookies.get("session")?.value;

  // --- 2. Verify JWT (General Auth) ---
  if (token) {
    try {
      const decodedUser = await verifyToken(token);

      if (decodedUser) {
        locals.user = decodedUser;
      } else {
        cookies.delete("session", { path: "/" });
      }
    } catch (error) {
      console.error("JWT Verification failed:", error);
      context.cookies.delete("session", { path: "/" });
    }
  } else {
    console.error("No session token found");
  }

  return next();
});
