import { useState } from "react";
import { Button } from "../ui/button";
import { RangeFilter } from "./RangeFilter";
import { FilterGroup } from "./FilterGroup";

export const ListingSidebar = ({ initialQuery }: { initialQuery: any }) => {
  const normalizeQuery = (query: any) => {
    const normalized: Record<string, string> = {};

    Object.entries(query).forEach(([key, value]) => {
      if (value != null) {
        normalized[key] = String(value);
      }
    });

    return normalized;
  };

  const [filters, setFilters] = useState(() => normalizeQuery(initialQuery));

  const updateURL = (newFilters: any) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "" && value !== "any") {
        params.set(key, String(value));
      }
    });

    window.location.search = params.toString();
  };

  const handleChange = (key: string, value: string) => {
    const updated = { ...filters };

    if (value === "any") {
      updated[key] = "any";
    } else {
      updated[key] = value;
    }

    updated.page = "1";
    setFilters(updated);
  };

  const handleClear = () => {
    window.location.href = "/listings";
  };

  console.log({
    current: filters.bedrooms,
    type: typeof filters.bedrooms,
  });

  return (
    <div className="w-full rounded-xl shadow-lg p-4 min-h-170 flex flex-col gap-4 bg-background">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Filter</h1>
        <p
          className="text-primary hover:underline text-sm hover:cursor-pointer"
          onClick={handleClear}
        >
          Clear All
        </p>
      </div>

      <RangeFilter
        label="Price"
        minKey="minPrice"
        maxKey="maxPrice"
        minValue={filters.minPrice}
        maxValue={filters.maxPrice}
        onChange={handleChange}
      />

      <RangeFilter
        label="Floor Area"
        minKey="minFloorSize"
        maxKey="maxFloorSize"
        minValue={filters.minFloorSize}
        maxValue={filters.maxFloorSize}
        onChange={handleChange}
      />

      <RangeFilter
        label="Land Area"
        minKey="minLotSize"
        maxKey="maxLotSize"
        minValue={filters.minLotSize}
        maxValue={filters.maxLotSize}
        onChange={handleChange}
      />

      <FilterGroup
        label="Bedrooms"
        name="bedrooms"
        current={filters.bedrooms}
        handleChange={handleChange}
      />

      {/* Bathroom Filter */}
      <FilterGroup
        label="Bathrooms"
        name="bathrooms"
        current={filters.bathrooms}
        handleChange={handleChange}
      />

      <Button onClick={() => updateURL(filters)}>Apply Filters</Button>
    </div>
  );
};
