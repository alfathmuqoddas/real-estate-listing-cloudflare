import { db } from "@/db";
import { propertiesTable } from "@/db/schema";

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
};
