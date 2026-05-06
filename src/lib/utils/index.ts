import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export * from "./firebase-client";
export * from "./addressOptions";
export * from "./verifyToken";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
