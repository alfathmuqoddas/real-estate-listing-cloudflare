import type { APIRoute } from "astro";
import { propertiesService } from "@/modules/properties/properties.service";

export const GET: APIRoute = async () => {
  try {
    const results = await propertiesService.getAllProperties();

    return new Response(JSON.stringify({ data: results }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
