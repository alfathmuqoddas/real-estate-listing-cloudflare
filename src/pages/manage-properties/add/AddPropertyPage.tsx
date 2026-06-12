import { useState, useEffect } from "react";
import { AddPropertyForm } from "@/components/form/AddPropertyForm";

export const AddPropertyPage = () => {
  const handleSubmit = async (values: any) => {
    console.log(values);
  };

  return <AddPropertyForm onSubmit={handleSubmit} mode="create" />;
};
