import type { TListings, TProperty } from "@/types";

export async function fetchListings({
  apiUrl,
  searchParams,
  token,
}: {
  apiUrl: string;
  searchParams: URLSearchParams;
  token?: string;
}): Promise<{ data: TListings | null; error: boolean }> {
  try {
    const res = await fetch(`${apiUrl}/listings?${searchParams}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) throw new Error("Failed to fetch listings");

    return {
      data: await res.json(),
      error: false,
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    return {
      data: null,
      error: true,
    };
  }
}

export async function fetchListingById({
  apiUrl,
  propertyId,
}: {
  apiUrl: string;
  propertyId: string | undefined;
}): Promise<{ data: TProperty | null; error: boolean }> {
  try {
    const res = await fetch(`${apiUrl}/listings/${propertyId ?? ""}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) throw new Error("Failed to fetch listings");
    return {
      data: await res.json(),
      error: false,
    };
  } catch (e) {
    console.error("Fetch failed:", e);
    return {
      data: null,
      error: true,
    };
  }
}
