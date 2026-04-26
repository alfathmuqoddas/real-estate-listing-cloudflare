// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

import preact from "@astrojs/preact";

export default defineConfig({
  env: {
    schema: {
      PUBLIC_API_URL: envField.string({ context: "client", access: "public" }),
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },

  output: "server",
  adapter: cloudflare(),
  integrations: [preact({ compat: true })],
});
