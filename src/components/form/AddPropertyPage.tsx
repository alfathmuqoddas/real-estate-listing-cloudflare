import { AddPropertyForm } from "@/components/form/AddPropertyForm";
import { toast } from "sonner";
import { addListing } from "@/lib/api/listings";

export const AddPropertyPage = ({
  apiUrl,
  token,
}: {
  apiUrl: string;
  token?: string;
}) => {
  const handleSubmit = async (values: any) => {
    const { error, status } = await addListing({
      apiUrl,
      data: values,
      token,
    });

    if (error) {
      if (status === 401) {
        window.location.href = "/login";
      }
      toast.error(`Error adding property (status ${status})`);
    } else {
      toast.success("Property successfully added");
    }
  };

  return (
    <AddPropertyForm onSubmit={handleSubmit} mode="create" apiUrl={apiUrl} />
  );
};
