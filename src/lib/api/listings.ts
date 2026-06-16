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
  return apiClient<TListings>({
    url: `${apiUrl}/listings?${searchParams.toString()}`,
    token,
  });
}

export async function fetchListingById({
  apiUrl,
  propertyId,
}: {
  apiUrl: string;
  propertyId: string | undefined;
}) {
  if (!propertyId) {
    return { data: null, error: true, status: 400 };
  }

  return apiClient<TProperty>({
    url: `${apiUrl}/listings/${propertyId}`,
  });
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
  return apiClient<TListings>({
    url: `${apiUrl}/listings/my-properties?${params.toString()}`,
    token,
  });
}

export async function addListing({
  apiUrl,
  data,
  token,
}: {
  apiUrl: string;
  data: TProperty;
  token?: string;
}) {
  return apiClient<TProperty, TProperty>({
    url: `${apiUrl}/listings/`,
    method: "POST",
    body: data,
    token,
  });
}
