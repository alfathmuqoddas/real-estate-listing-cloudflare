import { useState } from "react";
import { Button } from "../ui/button";
import PriceRange from "./PriceRange";
import FloorRange from "./FloorRange";

export const ListingSidebar = ({ initialQuery }: { initialQuery: any }) => {
  const [filters, setFilters] = useState(initialQuery);

  const updateURL = (newFilters: any) => {
    const params = new URLSearchParams();

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== "") {
        params.set(key, String(value));
      }
    });

    window.location.search = params.toString();
  };

  const handleChange = (key: any, value: any) => {
    const updated = { ...filters, [key]: value, page: 1 }; // reset page
    setFilters(updated);
  };

  const handleClear = () => {
    window.location.href = "/listings";
  };

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

      <PriceRange
        minPriceValue={filters.minPrice || ""}
        maxPriceValue={filters.maxPrice || ""}
        minPriceOnInput={(e: any) =>
          handleChange("minPrice", e.currentTarget.value)
        }
        maxPriceOnInput={(e: any) =>
          handleChange("maxPrice", e.currentTarget.value)
        }
      />

      <FloorRange
        minFloorSizeValue={filters.minFloorSize || ""}
        maxFloorSizeValue={filters.maxFloorSize || ""}
        minFloorSizeOnInput={(e: any) =>
          handleChange("minFloorSize", e.currentTarget.value)
        }
        maxFloorSizeOnInput={(e: any) =>
          handleChange("maxFloorSize", e.currentTarget.value)
        }
      />

      <Button onClick={() => updateURL(filters)}>Apply Filters</Button>
    </div>
  );
};
