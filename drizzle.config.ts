import { defineConfig } from "drizzle-kit";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: isProduction
      ? process.env.TURSO_CONNECTION_URL!
      : "file:.data/local.db",
    authToken: isProduction ? process.env.TURSO_AUTH_TOKEN : undefined,
  },
});
