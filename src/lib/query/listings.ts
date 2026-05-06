// src/lib/query/propertyQuery.ts
import { propertyQuerySchema } from "@/lib/schemas/listings";

export function parsePropertyQuery(request: Request) {
  try {
    const url = new URL(request.url);
    const rawQuery = Object.fromEntries(url.searchParams);
    return propertyQuerySchema.parse(rawQuery);
  } catch {
    return null;
  }
}
