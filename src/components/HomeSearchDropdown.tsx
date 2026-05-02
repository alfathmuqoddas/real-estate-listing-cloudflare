import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddressCascade } from "@/hooks/useAddressCascade"; // Using the hook from earlier
import { Button } from "./ui/button";
import { useState } from "react";
import { Label } from "./ui/label";

export function AddressPicker() {
  const propertyTypeOptions = [
    { label: "Rumah", value: "rumah" },
    { label: "Apartemen", value: "apartemen" },
  ];
  const propertyListingTypeOptions = [
    { label: "Dijual", value: "sell" },
    { label: "Disewa", value: "rent" },
  ];
  const {
    provinces,
    cities,
    selectedProvince,
    selectedCity,
    handleProvinceChange,
    setSelectedCity,
  } = useAddressCascade();

  const getLabel = (options: any[], value: string | null) => {
    return options.find((opt) => opt.value === value)?.label;
  };

  const [propertyType, setPropertyType] = useState<string | null>("rumah");
  const [sellOrRent, setSellOrRent] = useState<string | null>("sell");

  const onSearch = () => {
    // We only require Province to proceed

    const params = new URLSearchParams();
    params.set("type", propertyType ?? "");
    params.set("listingType", sellOrRent ?? "");

    if (selectedCity) {
      params.set("city", selectedCity);
    }

    if (selectedProvince) {
      params.set("province", selectedProvince);
    }

    window.location.href = `/listings?${params.toString()}`;
  };

  return (
    <div className="bg-background p-4 rounded-xl shadow mt-4 grid grid-cols-1 md:grid-cols-5 gap-3 items-end">
      {/* Province Select */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Provinsi</Label>
        <Select value={selectedProvince} onValueChange={handleProvinceChange}>
          <SelectTrigger id="province" className="w-full">
            <SelectValue placeholder="Pilih Provinsi" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={""}>Pilih Provinsi</SelectItem>
            {provinces.map((province) => (
              <SelectItem key={province} value={province}>
                {province}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* City Select */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Kota</Label>
        <Select
          value={selectedCity}
          onValueChange={setSelectedCity}
          disabled={!selectedProvince}
        >
          <SelectTrigger id="city" className="w-full">
            <SelectValue
              placeholder={
                selectedProvince ? "Pilih Kota" : "Pilih Provinsi dulu"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={""}>Pilih Kota</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city} value={city}>
                {city}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Property Type Select */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">Tipe Rumah</Label>
        <Select value={propertyType ?? ""} onValueChange={setPropertyType}>
          <SelectTrigger id="propertyType" className={"w-full"}>
            <SelectValue
              placeholder={
                propertyType ? "Select Property Type" : "Choose a property type"
              }
            >
              {getLabel(propertyTypeOptions, propertyType)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {propertyTypeOptions.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sell or Rent Select */}
      <div className="flex flex-col gap-1.5">
        <Label className="text-xs text-muted-foreground">
          Dijual atau disewa
        </Label>
        <Select value={sellOrRent ?? ""} onValueChange={setSellOrRent}>
          <SelectTrigger id="sellOrRent" className={"w-full"}>
            <SelectValue placeholder={"Dijual atau disewa"}>
              {getLabel(propertyListingTypeOptions, sellOrRent)}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {propertyListingTypeOptions.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Button onClick={onSearch}>Search</Button>
      </div>
    </div>
  );
}
