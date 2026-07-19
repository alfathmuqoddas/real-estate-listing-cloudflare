import type { APIRoute } from "astro";

export const prerender = false; // Forces this endpoint to render on demand (SSR)

export const POST: APIRoute = async ({ request }) => {
  const apiKey = import.meta.env.IMGBB_API_KEY;
  const expiration = import.meta.env.IMGBB_EXPIRATION;
  const imgbbApiUrl = import.meta.env.IMGBB_API_URL;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: "Server configuration error: no API key" }),
      { status: 500 },
    );
  }

  if (!imgbbApiUrl) {
    return new Response(
      JSON.stringify({ error: "Server configuration error: no ImgBB API URL" }),
      { status: 500 },
    );
  }

  try {
    const clientFormData = await request.formData();
    const file = clientFormData.get("image");

    if (!file) {
      return new Response(JSON.stringify({ error: "No image file provided" }), {
        status: 400,
      });
    }

    const imgbbFormData = new FormData();
    imgbbFormData.append("image", file);

    const url = new URL(imgbbApiUrl);
    url.searchParams.append("key", apiKey);

    if (expiration) {
      url.searchParams.append("expiration", "3600");
    }

    const response = await fetch(url.toString(), {
      method: "POST",
      body: imgbbFormData,
    });

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "ImgBB upload failed" }), {
        status: 502,
      });
    }

    const data = await response.json();

    return new Response(JSON.stringify({ url: data.data.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
};
