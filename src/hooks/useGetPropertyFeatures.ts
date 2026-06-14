import { useState, useEffect } from "react";
import { fetchPropertyFeatures } from "@/lib/api/propertyFeatures";
import type { TPropertyFeatures } from "@/types";

export const useGetPropertyFeatures = ({ apiUrl }: { apiUrl: string }) => {
  const [propertyFeatures, setPropertyFeatures] = useState<
    TPropertyFeatures[] | null
  >(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchFeatures = async () => {
      setIsLoading(true);
      setError(false);

      const { data, error, status } = await fetchPropertyFeatures({ apiUrl });

      if (error) {
        setError(true);
        console.error(`Failed to fetch property features: ${status}`);
      } else {
        setPropertyFeatures(data);
      }

      setIsLoading(false);
    };

    fetchFeatures();
  }, []);

  return { propertyFeatures, isLoading, error };
};
