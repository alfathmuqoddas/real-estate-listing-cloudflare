import { db } from "@/db";
import { propertiesTable } from "@/db/schema";
import { eq } from "drizzle-orm";

type CreatePropertyInput = {
  title: string;
  description?: string;

  price: number;
  listingType: "sale" | "rent";

  bedrooms?: number;
  bathrooms?: number;
  landSize?: number;
  buildingSize?: number;
  floors?: number;

  address: string;
  province: string;
  city: string;
  district: string;
  postalCode?: string;
  latitude?: number;
  longitude?: number;

  certificate?: "SHM" | "HGB" | "Lainnya";
  electricity?: number;
  waterSource?: string;

  ownerId: string;
};

export const propertiesService = {
  createProperty: async (input: CreatePropertyInput) => {
    try {
      const now = new Date();

      const result = await db
        .insert(propertiesTable)
        .values({
          title: input.title,
          description: input.description ?? null,

          price: input.price,
          listingType: input.listingType,

          bedrooms: input.bedrooms ?? null,
          bathrooms: input.bathrooms ?? null,
          landSize: input.landSize ?? null,
          buildingSize: input.buildingSize ?? null,
          floors: input.floors ?? 1,

          address: input.address,
          province: input.province,
          city: input.city,
          district: input.district,
          postalCode: input.postalCode ?? null,
          latitude: input.latitude ?? null,
          longitude: input.longitude ?? null,

          certificate: input.certificate ?? null,
          electricity: input.electricity ?? null,
          waterSource: input.waterSource ?? null,

          ownerId: input.ownerId,

          status: "active",
          createdAt: now,
          updatedAt: now,
        })
        .returning();

      return result[0];
    } catch (error) {
      console.error("CREATE PROPERTY SERVICE ERROR:", error);
      throw new Error("Failed to create property");
    }
  },
  getAllProperties: async () => {
    try {
      const result = await db.select().from(propertiesTable);
      return result;
    } catch (error) {
      console.error("GET ALL PROPERTIES SERVICE ERROR:", error);
      throw new Error("Failed to get all properties");
    }
  },
  getPropertyById: async (id: string) => {
    if (!id) {
      throw new Error("Property id is required");
    }
    try {
      const result = await db
        .select()
        .from(propertiesTable)
        .where(eq(propertiesTable.id, parseInt(id)));
      return result[0];
    } catch (error) {
      console.error("GET PROPERTY BY ID SERVICE ERROR:", error);
      throw new Error("Failed to get property by id");
    }
  },
  updateProperty: async (id: string, input: CreatePropertyInput) => {
    if (!id) {
      throw new Error("Property id is required");
    }
    try {
      const result = await db
        .update(propertiesTable)
        .set({
          title: input.title,
          description: input.description ?? null,

          price: input.price,
          listingType: input.listingType,

          bedrooms: input.bedrooms ?? null,
          bathrooms: input.bathrooms ?? null,
          landSize: input.landSize ?? null,
          buildingSize: input.buildingSize ?? null,
          floors: input.floors ?? 1,

          address: input.address,
          province: input.province,
          city: input.city,
          district: input.district,
          postalCode: input.postalCode ?? null,
          latitude: input.latitude ?? null,
          longitude: input.longitude ?? null,

          certificate: input.certificate ?? null,
          electricity: input.electricity ?? null,
          waterSource: input.waterSource ?? null,

          status: "active",
          updatedAt: new Date(),
        })
        .where(eq(propertiesTable.id, parseInt(id)));

      return result;
    } catch (error) {
      console.error("UPDATE PROPERTY SERVICE ERROR:", error);
      throw new Error("Failed to update property");
    }
  },
  deleteProperty: async (id: string) => {
    if (!id) {
      throw new Error("Property id is required");
    }
    try {
      const result = await db
        .delete(propertiesTable)
        .where(eq(propertiesTable.id, parseInt(id)));
      return result;
    } catch (error) {
      console.error("DELETE PROPERTY SERVICE ERROR:", error);
      throw new Error("Failed to delete property");
    }
  },
};
