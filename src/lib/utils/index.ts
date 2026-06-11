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
