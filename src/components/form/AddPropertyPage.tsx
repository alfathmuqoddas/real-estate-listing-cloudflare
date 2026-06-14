import { AddPropertyForm } from "@/components/form/AddPropertyForm";

export const AddPropertyPage = ({ apiUrl }: { apiUrl: string }) => {
  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return (
    <AddPropertyForm onSubmit={handleSubmit} mode="create" apiUrl={apiUrl} />
  );
};
