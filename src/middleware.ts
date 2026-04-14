// src/middleware.ts
import { defineMiddleware } from "astro:middleware";
import * as jose from "jose";

// Firebase's public JSON Web Key Set (JWKS) URL
const JWKS_URL = new URL(
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
);
const FIREBASE_PROJECT_ID = import.meta.env.FIREBASE_PROJECT_ID;

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, locals } = context;

  // --- 1. Extract Token ---
  const token = cookies.get("session")?.value;
  let decodedUser = null;

  // --- 2. Verify JWT (General Auth) ---
  if (token) {
    try {
      // Create a remote JWK Set to verify the token signature against Google's keys
      const JWKS = jose.createRemoteJWKSet(JWKS_URL);

      const { payload } = await jose.jwtVerify(token, JWKS, {
        issuer: `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`,
        audience: FIREBASE_PROJECT_ID,
      });

      // Pass user data to the rest of the Astro app via locals
      console.log({ payload });
      decodedUser = {
        uid: payload.user_id as string,
        email: payload.email as string,
        name: payload.name as string,
        photoUrl: payload.picture as string,
      };
      locals.user = decodedUser;
    } catch (error) {
      console.error("JWT Verification failed:", error);
      cookies.delete("session", { path: "/" });
    }
  } else {
    console.error("No session token found");
  }

  // --- 3. Route Protection Logic ---

  // A. Protected Routes (Must be logged in)
  if (
    url.pathname.startsWith("/dashboard") ||
    url.pathname.startsWith("/api/protected")
  ) {
    if (!decodedUser) {
      return context.redirect("/login"); // Or return 401 for API requests
    }
  }

  // If all checks pass, continue to the route
  return next();
});
