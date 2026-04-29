import { defineMiddleware } from "astro:middleware";

const protectedRoutes = ["/listings/create", "/listings/edit"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, locals, url, redirect } = context;
  const { pathname } = url;

  const token = cookies.get("session")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !token) {
    return context.redirect("/auth/login?reason=unauthorized");
  }

  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      locals.user = {
        uid: payload.sub,
        email: payload.email,
        name: payload.name,
        photoUrl: payload.picture,
        role: payload.role,
      };
    } catch (error) {
      console.error("JWT Verification failed:", error);
      cookies.delete("session", { path: "/" });

      if (isProtected) {
        return redirect("/auth/login?reason=invalid-token");
      }
    }
  }

  return next();
});
