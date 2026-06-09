import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Pencil } from "lucide-react";

// Utility to format ISO date
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const MyPropertiesTable = ({ data }: { data: any[] }) => {
  const onEdit = (id: string) => {
    window.location.href = `/manage-properties/edit/${id}`;
  };

  const onDelete = (id: string) => {
    window.location.href = `/manage-properties/delete/${id}`;
  };

  return (
    <Table className="rounded-xl bg-white mt-6">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>No</TableHead>
          <TableHead>Property ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Listing Type</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={item.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="truncate max-w-32" title={item.id}>
              {item.id}
            </TableCell>
            <TableCell className="truncate max-w-64" title={item.propertyTitle}>
              <a
                href={`/listings/${item.id}`}
                className="hover:underline text-blue-600"
              >
                {item.propertyTitle}
              </a>
            </TableCell>
            <TableCell>{item.propertyType}</TableCell>
            <TableCell>{item.propertyListingType}</TableCell>
            <TableCell>{formatDate(item.createdAt)}</TableCell>
            <TableCell>{formatDate(item.updatedAt)}</TableCell>
            <TableCell className="flex gap-2 justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(item.id)}
                title="Edit Property"
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(item.id)}
                title="Delete Property"
              >
                <Trash className="w-4 h-4 text-red-500" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
