import type { TListings, TProperty } from "@/types";
import { apiClient } from "./client";

export async function fetchListings({
  apiUrl,
  searchParams,
  token,
}: {
  apiUrl: string;
  searchParams: URLSearchParams;
  token?: string;
}) {
  return apiClient<TListings>(
    `${apiUrl}/listings?${searchParams.toString()}`,
    token,
  );
}

export async function fetchListingById({
  apiUrl,
  propertyId,
}: {
  apiUrl: string;
  propertyId: string | undefined;
}) {
  return apiClient<TProperty>(`${apiUrl}/listings/${propertyId}`, undefined);
}

export async function fetchMyListings({
  apiUrl,
  params,
  token,
}: {
  apiUrl: string;
  params: URLSearchParams;
  token?: string;
}) {
  return apiClient<TListings>(
    `${apiUrl}/listings/my-properties?${params.toString()}`,
    token,
  );
}
