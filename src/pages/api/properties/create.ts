import type { APIRoute } from "astro";
import { propertiesService } from "@/modules/properties/properties.service";

export const POST: APIRoute = async ({ request, locals }) => {
  try {
    // if (!locals.user) {
    //   return new Response("Unauthorized", { status: 401 });
    // }

    const body = await request.json();

    // 🧪 Minimal validation (you can use Zod later)
    if (!body.title || !body.price || !body.listingType) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 },
      );
    }

    const result = await propertiesService.createProperty({
      ...body,
      ownerId: locals?.user?.uid || "",
    });

    return new Response(JSON.stringify({ data: result }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("CREATE PROPERTY ERROR:", error);

    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500 },
    );
  }
};
