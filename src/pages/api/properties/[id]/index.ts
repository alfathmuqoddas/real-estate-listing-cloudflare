import type { APIRoute } from "astro";
import { propertiesService } from "@/modules/properties/properties.service";

export const GET: APIRoute = async ({ params }) => {
  const { id } = params;
  try {
    const results = propertiesService.getPropertyById(id || "");
    return new Response(JSON.stringify({ results }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error getting properties" }), {
      status: 500,
    });
  }
};
