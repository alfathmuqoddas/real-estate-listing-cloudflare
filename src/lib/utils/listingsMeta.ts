import type { TListings, TProperty } from "@/types";
import type { PropertyQuery } from "@/lib/schemas/listings";

export function buildListingMeta({
  listings,
  query,
  fetchError,
}: {
  listings: TListings | null;
  query: PropertyQuery;
  fetchError: boolean;
}) {
  const isApartemen = query.type === "apartemen";
  const isRent = query.listingType === "rent";

  const hasValidData = !fetchError && listings !== null;

  const pageTitle = hasValidData
    ? `${listings.pagination.total} ${isApartemen ? "Apartemen" : "Rumah"} ${
        isRent ? "Disewa" : "Dijual"
      } ${query.province ? `di ${query.province}` : ""}${
        query.city ? `, ${query.city}` : ""
      } | RealEstate by Alfath Muqoddas`
    : "Error Loading Listings";

  const startIndex = hasValidData
    ? (listings.pagination.page - 1) * listings.pagination.limit + 1
    : 0;

  const endIndex = hasValidData
    ? Math.min(
        listings.pagination.page * listings.pagination.limit,
        listings.pagination.total,
      )
    : 0;

  return {
    isApartemen,
    isRent,
    pageTitle,
    startIndex,
    endIndex,
  };
}

export function listingDetailMeta({
  property,
  fetchError,
}: {
  property: TProperty | null;
  fetchError: boolean;
}) {
  if (fetchError || !property) {
    return {
      metaTitle: "Error Loading Property",
      metaDescription: "Error Loading Property",
      metaImage: "https://picsum.photos/seed/wkejrer/1280/720",
    };
  } else {
    return {
      metaTitle: `Property ${property.propertyTitle} | RealEstate by Alfath Muqoddas`,
      metaDescription: `Property ${property.propertyDeskripsi} | RealEstate by Alfath Muqoddas`,
      metaImage: property.images[0].imageUrl,
    };
  }
}
