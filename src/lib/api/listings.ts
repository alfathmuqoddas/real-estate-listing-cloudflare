import type { TListings, TProperty, TInputProperty } from "@/types";
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
  data: TInputProperty;
  token?: string;
}) {
  return apiClient<TProperty, TInputProperty>({
    url: `${apiUrl}/listings`,
    method: "POST",
    body: data,
    token,
  });
}

export async function editListing({
  apiUrl,
  propertyId,
  data,
  token,
}: {
  apiUrl: string;
  propertyId: string | undefined;
  data: TProperty;
  token?: string;
}) {
  return apiClient<TProperty, TProperty>({
    url: `${apiUrl}/listings/${propertyId}`,
    method: "PUT",
    body: data,
    token,
  });
}
