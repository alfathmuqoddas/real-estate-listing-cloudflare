import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type RangeFilterProps = {
  label: string;
  minKey: string;
  maxKey: string;
  minValue?: string;
  maxValue?: string;
  onChange: (key: string, value: string) => void;
};

export const RangeFilter = ({
  label,
  minKey,
  maxKey,
  minValue = "",
  maxValue = "",
  onChange,
}: RangeFilterProps) => {
  return (
    <div className="flex flex-col gap-2">
      <FieldGroup className="grid max-w-sm grid-cols-2 gap-1">
        <Field>
          <FieldLabel htmlFor={`filter-${minKey}`}>Min {label}</FieldLabel>
          <Input
            type="number"
            id={`filter-${minKey}`}
            placeholder={`Min ${label}`}
            value={minValue}
            onInput={(e: any) => onChange(minKey, e.currentTarget.value)}
          />
        </Field>

        <Field>
          <FieldLabel htmlFor={`filter-${maxKey}`}>Max {label}</FieldLabel>
          <Input
            type="number"
            id={`filter-${maxKey}`}
            placeholder={`Max ${label}`}
            value={maxValue}
            onInput={(e: any) => onChange(maxKey, e.currentTarget.value)}
          />
        </Field>
      </FieldGroup>
    </div>
  );
};
