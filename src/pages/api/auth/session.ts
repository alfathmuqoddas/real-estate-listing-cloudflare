import { verifyToken } from "@/lib/verifyToken";
import type { APIRoute } from "astro";
import { PUBLIC_API_URL } from "astro:env/client";

export const POST: APIRoute = async ({ request, cookies }) => {
  try {
    const { token } = await request.json();

    if (!token) {
      return new Response(JSON.stringify({ error: "No token provided" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const decodedUser = await verifyToken(token);

    if (!decodedUser)
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });

    cookies.set("session", token, {
      path: "/",
      httpOnly: true,
      secure: import.meta.env.PROD,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 5,
    });

    await fetch(`${PUBLIC_API_URL}/users/sync`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error: any) {
    console.error("🔥 API ROUTE CRASHED:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
