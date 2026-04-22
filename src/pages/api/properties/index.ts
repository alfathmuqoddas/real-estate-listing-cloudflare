import type { APIRoute } from "astro";
import { propertiesService } from "@/modules/properties/properties.service";

export const GET: APIRoute = async () => {
  try {
    const results = propertiesService.getAllProperties;
    return new Response(JSON.stringify({ results }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error getting properties" }), {
      status: 500,
    });
  }
};
