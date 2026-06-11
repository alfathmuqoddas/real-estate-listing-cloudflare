import { z } from "zod";

export const propertyQuerySchema = z
  .object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(50).default(10),

    minPrice: z.coerce.number().optional(),
    maxPrice: z.coerce.number().optional(),

    bathrooms: z.coerce.number().optional(),
    bedrooms: z.coerce.number().optional(),

    minLotSize: z.coerce.number().optional(),
    maxLotSize: z.coerce.number().optional(),

    minFloorSize: z.coerce.number().optional(),
    maxFloorSize: z.coerce.number().optional(),

    type: z.enum(["rumah", "apartemen"]).default("rumah"),
    listingType: z.enum(["sell", "rent"]).default("sell"),

    province: z.string().optional(),
    city: z.string().optional(),

    sortBy: z.enum(["price", "lotSize", "floorSize", "createdAt"]).optional(),

    order: z.enum(["asc", "desc"]).optional(),
  })
  .refine(
    (data) => {
      if (data.city && !data.province) return false;
      return true;
    },
    {
      message: "City requires province",
      path: ["city"],
    },
  )
  .refine(
    (data) =>
      !data.minPrice || !data.maxPrice || data.minPrice <= data.maxPrice,
    {
      message: "minPrice must be <= maxPrice",
      path: ["minPrice"],
    },
  );

export type PropertyQuery = z.infer<typeof propertyQuerySchema>;

export const propertySchema = z.object({
  id: z.string().optional(),
  propertyType: z.enum(["rumah", "apartemen"]),
  propertyTitle: z.string().min(5, "Title is required"),
  propertyDeskripsi: z.string().min(10, "Description is required"),
  propertyPrice: z.number().min(0),
  propertyListingType: z.enum(["sell", "rent"]),
  propertyLuasTanah: z.number().int().min(0),
  propertyLuasBangunan: z.number().int().min(0),
  propertyKamarMandi: z.number().int().min(0),
  propertyKamarTidur: z.number().int().min(0),
  propertyCarport: z.number().int().min(0).optional().nullable(),
  propertyTipeSertifikat: z
    .enum(["SHM", "HGB", "SHP", "HGU", "SHMSRS"])
    .optional(),
  propertyJumlahLantai: z.number().int().min(0).optional().nullable(),
  propertyGarasi: z.number().int().min(0).optional().nullable(),
  propertyDayaListrik: z.number().int().min(0).optional().nullable(),
  propertyPerabotan: z
    .enum(["Fully Furnished", "Unfurnished", "Semi-furnished"])
    .optional(),
  propertyAddressProvince: z.string().min(1, "Province is required"),
  propertyAddressCity: z.string().min(1, "City is required"),
  propertyAddressLat: z.number().optional().nullable(),
  propertyAddressLon: z.number().optional().nullable(),
  propertyAgentId: z.string().min(1, "Agent is required"),
  status: z.enum(["active", "inactive"]).optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;
