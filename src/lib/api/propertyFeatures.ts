import { apiClient } from "./client";
import type { TPropertyFeatures } from "@/types";

export const fetchPropertyFeatures = async ({ apiUrl }: { apiUrl: string }) => {
  return apiClient<TPropertyFeatures[]>({
    url: `${apiUrl}/property-features`,
  });
};
