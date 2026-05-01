// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import react from "@astrojs/react";

export default defineConfig({
  env: {
    schema: {
      PUBLIC_API_URL: envField.string({ context: "client", access: "public" }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ["leaflet"],
    },
    ssr: {
      noExternal: ["react-leaflet", "leaflet"],
    },
  },

  output: "server",
  adapter: cloudflare(),
  integrations: [react()],
});
