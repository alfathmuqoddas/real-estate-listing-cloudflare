import { useState, useMemo } from "preact/hooks";
import { addressOptions } from "@/lib/addressOptions";

export const useAddressCascade = () => {
  const [selectedProvince, setSelectedProvince] = useState<string | null>("");
  const [selectedCity, setSelectedCity] = useState<string | null>("");

  // Get unique list of provinces
  const provinces = useMemo(() => {
    return [...new Set(addressOptions.map((item) => item.province))].sort();
  }, []);

  // Filter cities based on selected province
  const cities = useMemo(() => {
    if (!selectedProvince) return [];
    return addressOptions
      .filter((item) => item.province === selectedProvince)
      .map((item) => item.city)
      .sort();
  }, [selectedProvince]);

  // Handle province change: reset city selection
  const handleProvinceChange = (province: string | null) => {
    setSelectedProvince(province);
    setSelectedCity(""); // Reset city when province changes
  };

  // Get the full object (including lat/lon) for the selected city
  const selectedDetails = useMemo(() => {
    return addressOptions.find(
      (item) =>
        item.province === selectedProvince && item.city === selectedCity,
    );
  }, [selectedProvince, selectedCity]);

  return {
    provinces,
    cities,
    selectedProvince,
    selectedCity,
    selectedDetails,
    handleProvinceChange,
    setSelectedCity,
  };
};
