import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { usersTable } from "@/modules/users/users.model";

export const users = usersTable;

export const propertiesTable = sqliteTable("properties", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(), // e.g., "Rumah Minimalis di BSD"
  description: text("description"),

  // Pricing & Transaction
  price: integer("price").notNull(),
  listingType: text("listing_type", { enum: ["sale", "rent"] }).notNull(),

  // Core Specs (Common in Indonesia)
  bedrooms: integer("bedrooms"),
  bathrooms: integer("bathrooms"),
  landSize: real("land_size"), // Luas Tanah (m2)
  buildingSize: real("building_size"), // Luas Bangunan (m2)
  floors: integer("floors").default(1),

  // Location
  address: text("address").notNull(),
  province: text("province").notNull(),
  city: text("city").notNull(),
  district: text("district").notNull(), // Kecamatan
  postalCode: text("postal_code"),
  latitude: real("latitude"),
  longitude: real("longitude"),

  // Legal & Utilities
  certificate: text("certificate", { enum: ["SHM", "HGB", "Lainnya"] }), // Vital for Indo market
  electricity: integer("electricity"), // Daya Listrik (e.g., 2200)
  waterSource: text("water_source"), // PDAM / Sumur

  // Metadata
  ownerId: text("owner_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  status: text("status", { enum: ["active", "sold", "hidden"] }).default(
    "active",
  ),
  createdAt: integer("created_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
  updatedAt: integer("updated_at", { mode: "timestamp" }).$defaultFn(
    () => new Date(),
  ),
});

export type InsertPost = typeof propertiesTable.$inferInsert;
export type SelectPost = typeof propertiesTable.$inferSelect;
