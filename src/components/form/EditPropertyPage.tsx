import { useState, useEffect } from "react";
import { AddPropertyForm } from "@/components/form/AddPropertyForm";

export const EditPropertyPage = ({
  propertyId,
  token,
  PUBLIC_API_URL,
}: {
  propertyId?: string;
  token?: string;
  PUBLIC_API_URL: string;
}) => {
  const [property, setProperty] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      const res = await fetch(`${PUBLIC_API_URL}/listings/${propertyId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("Failed to fetch property");
        setError(res.statusText);
        return;
      }

      const data = await res.json();
      setProperty(data);
      setIsLoading(false);
    };

    fetchProperty();
  }, [propertyId, token]);

  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AddPropertyForm
      onSubmit={handleSubmit}
      mode="edit"
      initialData={property}
    />
  );
};
