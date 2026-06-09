import { Button } from "../ui/button";

export const FilterGroup = ({
  label,
  name,
  current,
  values,
  handleChange,
}: {
  label: string;
  name: string;
  current: string | undefined;
  values: string[];
  handleChange: (key: string, value: string) => void;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">{label}</p>
      <div className="flex gap-1 flex-wrap">
        {values.map((val) => {
          const normalized = String(current ?? "any");
          const isSelected = normalized === val;

          return (
            <Button
              key={val}
              onClick={() => handleChange(name, val)}
              variant={isSelected ? "default" : "outline"}
            >
              {val === "any" ? "Any" : val}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
