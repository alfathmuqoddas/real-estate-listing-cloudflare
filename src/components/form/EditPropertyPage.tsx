import { useState, useEffect } from "react";
import { AddPropertyForm } from "@/components/form/AddPropertyForm";
import { fetchListingById, editListing } from "@/lib/api/listings";
import { toast } from "sonner";

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

  useEffect(() => {
    const res = async () => {
      setIsLoading(true);
      const { data, error, status } = await fetchListingById({
        apiUrl: PUBLIC_API_URL,
        propertyId,
      });

      if (error) {
        if (status === 401) {
          window.location.href = "/login";
        }
        toast.error(`Error fetching property (status ${status})`);
        setProperty(null);
      } else {
        setProperty(data);
      }

      setIsLoading(false);
    };

    res();
  }, [propertyId]);

  const handleSubmit = async (values: any) => {
    const { error, status } = await editListing({
      apiUrl: PUBLIC_API_URL,
      propertyId,
      data: values,
      token,
    });

    if (error) {
      if (status === 401) {
        window.location.href = "/login";
      }
      toast.error(`Error editing property (status ${status})`);
    } else {
      toast.success("Property successfully edited");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AddPropertyForm
      onSubmit={handleSubmit}
      mode="edit"
      initialData={property}
      apiUrl={PUBLIC_API_URL}
    />
  );
};
