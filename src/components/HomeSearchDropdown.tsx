import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAddressCascade } from "@/hooks/useAddressCascade"; // Using the hook from earlier
import { Button } from "./ui/button";
import { useState } from "preact/hooks";

export function AddressPicker() {
  const propertyTypeOptions = [
    { label: "Rumah", value: "rumah" },
    { label: "Apartemen", value: "apartemen" },
  ];
  const propertyListingTypeOptions = [
    { label: "Dijual", value: "dijual" },
    { label: "Disewa", value: "disewa" },
  ];
  const {
    provinces,
    cities,
    selectedProvince,
    selectedCity,
    handleProvinceChange,
    setSelectedCity,
  } = useAddressCascade();

  const [propertyType, setPropertyType] = useState<string>("rumah");
  const [sellOrRent, setSellOrRent] = useState<string>("dijual");

  const onSearch = () => {
    // We only require Province to proceed
    if (!selectedProvince) return;

    const params = new URLSearchParams();
    params.set("province", selectedProvince);
    params.set("type", propertyType);
    params.set("listingType", sellOrRent);

    if (selectedCity) {
      params.set("city", selectedCity);
    }

    window.location.href = `/listings?${params.toString()}`;
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 items-center flex-wrap">
      {/* Province Select */}
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

      {/* City Select */}
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
      <Select value={propertyType} onValueChange={setPropertyType}>
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
      <Select value={sellOrRent} onValueChange={setSellOrRent}>
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
      <Button onClick={onSearch} disabled={!selectedProvince}>
        Search
      </Button>
    </div>
  );
}
