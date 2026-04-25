// src/constant.ts
export const getApiUrl = (runtime?: any) => {
  // 1. Try Cloudflare Runtime (Production SSR)
  if (runtime?.env?.PUBLIC_API_URL_PROD) return runtime.env.PUBLIC_API_URL_PROD;

  // 2. Try Standard Astro Env (Local Dev / Build Time)
  return (
    import.meta.env.PUBLIC_API_URL_PROD || import.meta.env.PUBLIC_API_URL_DEV
  );
};
