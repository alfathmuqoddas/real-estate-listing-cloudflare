import { defineMiddleware } from "astro:middleware";
import { verifyToken } from "@/lib/utils";

const protectedRoutes = ["/listings/create", "/listings/edit"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { cookies, locals, url, redirect } = context;
  const { pathname } = url;

  const token = cookies.get("session")?.value;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && !token) {
    return redirect("/auth/login?reason=unauthorized");
  }

  if (token) {
    try {
      const user = await verifyToken(token);

      if (user) {
        locals.user = user;
      } else {
        cookies.delete("session", { path: "/" });
        if (isProtected) {
          return redirect("/auth/login?reason=invalid-token");
        }
      }
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
