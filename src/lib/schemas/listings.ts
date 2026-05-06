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
