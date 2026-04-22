export type CreatePropertyInput = {
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
