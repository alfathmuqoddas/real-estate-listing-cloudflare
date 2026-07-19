export const uploadSingleToProxy = async (file: File) => {
  const formData = new FormData();
  formData.append("image", file);

  const response = await fetch("/api/uploadImg", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload ${file.name} via server proxy`);
  }

  const data = await response.json();
  return data.url;
};

export const uploadMultipleImages = async (files: File[]) => {
  if (files.length === 0) return [];

  const uploadPromises = files.map((file) => uploadSingleToProxy(file));

  return Promise.all(uploadPromises);
};
