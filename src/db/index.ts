import { drizzle } from "drizzle-orm/libsql/web";
import { createClient } from "@libsql/client/web";

const url = import.meta.env.PROD
  ? import.meta.env.TURSO_CONNECTION_URL
  : "file:.data/local.db";

const authToken = import.meta.env.PROD
  ? import.meta.env.TURSO_AUTH_TOKEN
  : undefined;

const client = createClient({
  url: import.meta.env.TURSO_CONNECTION_URL!,
  authToken: import.meta.env.TURSO_AUTH_TOKEN,
});

export const db = drizzle(client);
