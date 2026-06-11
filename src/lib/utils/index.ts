import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export * from "./firebase-client";
export * from "./addressOptions";
export * from "./verifyToken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const propertyTypeOptions = [
  { label: "Rumah", value: "rumah" },
  { label: "Apartemen", value: "apartemen" },
];

export const propertyListingTypeOptions = [
  { label: "Dijual", value: "sell" },
  { label: "Disewa", value: "rent" },
];

export const STATUS_TYPES = ["active", "inactive", "draft"] as const;
export const SERTIFIKAT_TYPES = [
  "SHM",
  "HGB",
  "SHP",
  "HGU",
  "SHMSRS",
  "Lainnya",
] as const;
export const PERABOTAN_TYPES = [
  "Fully Furnished",
  "Semi-furnished",
  "Unfurnished",
] as const;

export const DAYA_LISTRIK_OPTIONS = [
  450, 900, 1300, 2200, 3500, 5500, 6600, 7700, 11000,
] as const;
