// src/lib/auth-utils.ts
import { jwtVerify, createRemoteJWKSet } from "jose";

const JWKS_URL = new URL(
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
);

const JWKS = createRemoteJWKSet(JWKS_URL);

export async function verifyToken(token: string) {
  const projectId = import.meta.env.FIREBASE_PROJECT_ID;

  if (!projectId) {
    console.error("❌ Auth Error: FIREBASE_PROJECT_ID is not defined.");
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: `https://securetoken.google.com/${projectId}`,
      audience: projectId,
    });

    return {
      uid: payload.sub as string,
      email: payload.email as string,
      name: (payload.name as string) || "Anonymous",
      photoUrl: (payload.picture as string) || "",
    };
  } catch (err: any) {
    console.error("❌ JWT Verification Failed:", err.message);
    return null;
  }
}
