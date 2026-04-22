import type { APIRoute } from "astro";
import { propertiesService } from "@/modules/properties/properties.service";

export const DELETE: APIRoute = async ({ params }) => {
  const { id } = params;
  if (!id) {
    return new Response(JSON.stringify({ error: "Error id not provided" }), {
      status: 400,
    });
  }
  try {
    const results = propertiesService.deleteProperty(id);
    return new Response(JSON.stringify(results), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error getting properties" }), {
      status: 500,
    });
  }
};
