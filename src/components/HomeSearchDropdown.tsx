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
    <div className="grid grid-cols-2 md:grid-cols-5 gap-2 items-center flex-wrap">
      {/* Province Select */}
      <div className="flex flex-col gap-2">
        <Label>Provinsi</Label>
        <Select value={selectedProvince} onValueChange={handleProvinceChange}>
          <SelectTrigger id="province" className="min-w-32">
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
      <div className="flex flex-col gap-2">
        <Label>Kota</Label>
        <Select
          value={selectedCity}
          onValueChange={setSelectedCity}
          disabled={!selectedProvince}
        >
          <SelectTrigger id="city" className="min-w-32">
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
      <div className="flex flex-col gap-2">
        <Label>Tipe Rumah</Label>
        <Select
          value={propertyType ?? ""}
          onValueChange={(value) => setPropertyType(value)}
        >
          <SelectTrigger id="propertyType" className={"min-w-32"}>
            <SelectValue
              placeholder={
                propertyType ? "Select Property Type" : "Choose a property type"
              }
            />
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
      <div className="flex flex-col gap-2">
        <Label>Dijual atau disewa</Label>
        <Select
          value={sellOrRent ?? ""}
          onValueChange={(value) => setSellOrRent(value)}
        >
          <SelectTrigger id="sellOrRent" className={"min-w-32"}>
            <SelectValue placeholder={"Dijual atau disewa"} />
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
