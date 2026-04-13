import { drizzle } from "drizzle-orm/libsql";
import { config } from "dotenv";
import { createClient } from "@libsql/client/web";

config({ path: ".env" });

const url = import.meta.env.PROD
  ? process.env.TURSO_CONNECTION_URL
  : "file:.data/local.db";

const authToken = import.meta.env.PROD
  ? process.env.TURSO_AUTH_TOKEN
  : undefined;

const client = createClient({
  url: url!,
  authToken: authToken,
});

export const db = drizzle(client);
