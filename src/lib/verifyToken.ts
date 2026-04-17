// src/lib/auth-utils.ts
import { jwtVerify, createLocalJWKSet } from "jose";

let cachedJWKS: any = null;

async function getJWKS() {
  if (cachedJWKS) return cachedJWKS;

  const response = await fetch(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
  );
  cachedJWKS = await response.json();
  return cachedJWKS;
}

export async function verifyToken(token: string) {
  const projectId = import.meta.env.FIREBASE_PROJECT_ID;

  if (!projectId) {
    console.error("❌ Auth Error: FIREBASE_PROJECT_ID is not defined.");
    return null;
  }

  const jwks = await getJWKS();
  const JWKS = createLocalJWKSet(jwks);

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
