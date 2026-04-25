import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export default function FloorRange({
  minFloorSizeValue,
  maxFloorSizeValue,
  minFloorSizeOnInput,
  maxFloorSizeOnInput,
}: {
  minFloorSizeValue: number;
  maxFloorSizeValue: number;
  minFloorSizeOnInput: any;
  maxFloorSizeOnInput: any;
}) {
  return (
    <FieldGroup className="grid max-w-sm grid-cols-2">
      <Field>
        <FieldLabel htmlFor="filterMinFloorSize">Min Floor Size</FieldLabel>
        <Input
          type="number"
          id="filterMinFloorSize"
          name="filterMinFloorSize"
          placeholder="Min Floor Size"
          value={minFloorSizeValue}
          onInput={minFloorSizeOnInput}
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="filterMaxFloorSize">Max Floor Size</FieldLabel>
        <Input
          type="number"
          id="filterMaxFloorSize"
          name="filterMaxFloorSize"
          placeholder="Max Floor Size"
          value={maxFloorSizeValue}
          onInput={maxFloorSizeOnInput}
        />
      </Field>
    </FieldGroup>
  );
}
