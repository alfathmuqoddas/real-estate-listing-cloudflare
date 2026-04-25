import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function PriceRange({
  minPriceValue,
  maxPriceValue,
  minPriceOnInput,
  maxPriceOnInput,
}: {
  minPriceValue: number;
  maxPriceValue: number;
  minPriceOnInput: any;
  maxPriceOnInput: any;
}) {
  return (
    <FieldGroup className="grid max-w-sm grid-cols-2">
      <Field>
        <FieldLabel htmlFor="filterMinPrice">Min Price</FieldLabel>
        <Input
          type="number"
          id="filterMinPrice"
          name="filterMinPrice"
          placeholder="Min Price"
          value={minPriceValue}
          onInput={minPriceOnInput}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="filterMaxPrice">Max Price</FieldLabel>
        <Input
          type="number"
          id="filterMaxPrice"
          name="filterMaxPrice"
          placeholder="Max Price"
          value={maxPriceValue}
          onInput={maxPriceOnInput}
        />
      </Field>
    </FieldGroup>
  );
}
