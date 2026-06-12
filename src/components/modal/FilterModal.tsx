import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FilterGroup } from "@/components/listingSidebar/FilterGroup";
import { RangeFilter } from "@/components/listingSidebar/RangeFilter";
import { Funnel } from "lucide-react";

export const FilterModal = ({ initialQuery }: { initialQuery: any }) => {
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
  const [isOpen, setIsOpen] = useState(false);

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

  const handleSubmit = () => {
    updateURL(filters);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="outline">
            <Funnel />
          </Button>
        }
      ></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Filter</DialogTitle>
        </DialogHeader>

        <FilterGroup
          label="Property Type"
          name="type"
          current={filters.type}
          values={["rumah", "apartemen"]}
          handleChange={handleChange}
        />

        <FilterGroup
          label="Sell or Rent"
          name="listingType"
          current={filters.listingType}
          values={["sell", "rent"]}
          handleChange={handleChange}
        />

        <FilterGroup
          label="Bedrooms"
          name="bedrooms"
          current={filters.bedrooms}
          values={["any", "1", "2", "3", "+4"]}
          handleChange={handleChange}
        />

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
          values={["any", "1", "2", "3", "+4"]}
          handleChange={handleChange}
        />

        {/* Bathroom Filter */}
        <FilterGroup
          label="Bathrooms"
          name="bathrooms"
          current={filters.bathrooms}
          values={["any", "1", "2", "3", "+4"]}
          handleChange={handleChange}
        />

        <div>
          <Button onClick={handleClear} variant="outline">
            Reset
          </Button>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={handleSubmit}>Apply Filters</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
