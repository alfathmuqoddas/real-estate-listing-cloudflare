import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const sortOptions = [
  {
    label: "Newest",
    value: "createdAt-desc",
  },
  {
    label: "Lowest Price",
    value: "price-asc",
  },
  {
    label: "Highest Price",
    value: "price-desc",
  },
  {
    label: "Floor Area (Largest to Smallest)",
    value: "floorSize-desc",
  },
  {
    label: "Floor Area (Smallest to Largest)",
    value: "floorSize-asc",
  },
  {
    label: "Land Area (Largest to Smallest)",
    value: "lotSize-desc",
  },
  {
    label: "Land Area (Smallest to Largest)",
    value: "lotSize-asc",
  },
];

export const SortingDialog = () => {
  if (typeof window === "undefined") return null;
  const params = new URLSearchParams(window.location.search);

  const currentSortBy = params.get("sortBy") || "createdAt";
  const currentOrder = params.get("order") || "desc";
  const currentValue = `${currentSortBy}-${currentOrder}`;

  const handleChange = (value: string) => {
    const [sortBy, order] = value.split("-");
    const newParams = new URLSearchParams(window.location.search);

    newParams.set("sortBy", sortBy);
    newParams.set("order", order);
    newParams.set("page", "1");

    window.location.search = newParams.toString();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button variant="outline">
          <ArrowUpDown />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sort By</DialogTitle>
        </DialogHeader>
        <RadioGroup value={currentValue} onValueChange={handleChange}>
          {sortOptions.map((option) => (
            <div
              key={option.value}
              className="flex items-center space-x-2 text-black"
            >
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </DialogContent>
    </Dialog>
  );
};
