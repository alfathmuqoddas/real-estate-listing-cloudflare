import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";

const url = import.meta.env.PROD
  ? import.meta.env.TURSO_CONNECTION_URL
  : "file:.data/local.db";

const authToken = import.meta.env.PROD
  ? import.meta.env.TURSO_AUTH_TOKEN
  : undefined;

const client = createClient({
  url: url!,
  authToken: authToken,
});

export const db = drizzle(client);
