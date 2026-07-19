import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type Props = {
  files: File[];
  setFiles: (files: File[] | ((prev: File[]) => File[])) => void;
};

export const ImageDropzone = ({ files, setFiles }: Props) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setFiles((prev) => [...prev, ...acceptedFiles]);
    },
    [setFiles],
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      },
      maxSize: 5 * 1024 * 1024,
    });

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div
      style={{ border: "1px solid black", padding: "1rem", margin: "1rem 0" }}
    >
      <div
        {...getRootProps()}
        style={{
          cursor: "pointer",
          padding: "2rem",
          border: "2px dashed gray",
        }}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>
            Drag & drop listing images here, or click to select files (Max 5MB,
            Images only)
          </p>
        )}
      </div>

      {/* Validation Error Messages */}
      {fileRejections.length > 0 && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          <h4>Rejected Files:</h4>
          <ul>
            {fileRejections.map(({ file, errors }) => (
              <li key={file.name}>
                {file.name} - {errors.map((e) => e.message).join(", ")}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Accepted Files Preview List */}
      {files.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Selected Images ({files.length}):</h4>
          <ul>
            {files.map((file, index) => (
              <li key={index}>
                {file.name} ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  style={{ marginLeft: "10px" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
