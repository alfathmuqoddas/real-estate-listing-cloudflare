import { useState } from "react";
import { AddPropertyForm } from "@/components/form/AddPropertyForm";
import { toast } from "sonner";
import { addListing } from "@/lib/api/listings";
import { uploadMultipleImages } from "@/lib/api/uploadImg";
import { type PropertyFormOutput } from "@/lib/schemas/listings";

export const AddPropertyPage = ({
  apiUrl,
  token,
}: {
  apiUrl: string;
  token?: string;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: PropertyFormOutput) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    let imageUrls: string[] = [];

    try {
      if (files.length > 0) {
        imageUrls = await uploadMultipleImages(files);
      }

      const { error, status } = await addListing({
        apiUrl,
        data: { ...values, propertyImages: imageUrls },
        token,
      });

      if (error) {
        if (status === 401) {
          toast.error("Session expired. Redirecting to login...");
          setTimeout(() => {
            window.location.href = "/login";
          }, 1500);
          return;
        }

        toast.error(
          `Error adding property: ${error.message || `Status ${status}`}`,
        );
        return;
      }

      toast.success("Property successfully added");

      setTimeout(() => {
        window.location.href = "/manage-properties";
      }, 1500);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AddPropertyForm
      onSubmit={handleSubmit}
      mode="create"
      apiUrl={apiUrl}
      files={files}
      setFiles={setFiles}
      isSubmitting={isSubmitting}
    />
  );
};
