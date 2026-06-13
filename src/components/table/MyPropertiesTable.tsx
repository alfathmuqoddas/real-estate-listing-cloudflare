import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash, Pencil, House, Building2 } from "lucide-react";
import type { TListings } from "@/types";
import { Skeleton } from "@/components/ui/skeleton";

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

export const PropertyTypeIconMapping = {
  apartement: <Building2 className="w-4 h-4" />,
  rumah: <House className="w-4 h-4" />,
};

export const DeleteConfirmationModal = ({
  apiUrl,
  propertyId,
  token,
}: {
  apiUrl: string;
  propertyId: string;
  token?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteProperty = async () => {
    const res = await fetch(`${apiUrl}/listings/${propertyId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      console.error("Failed to delete property");
      return;
    }

    setIsOpen(false);

    window.location.reload();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" size="sm" title="Delete Property">
            <Trash className="w-4 h-4 text-red-500" />
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Property</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete this property?
        </p>
        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={handleDeleteProperty} variant="outline">
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const MyPropertiesTable = ({
  data,
  apiUrl,
  token,
  isLoading,
  limit,
}: {
  data: TListings["data"];
  apiUrl: string;
  token?: string;
  isLoading: boolean;
  limit: number;
}) => {
  const onEdit = (id: string) => {
    window.location.href = `/manage-properties/edit/${id}`;
  };

  return (
    <Table className="rounded-xl bg-white">
      <TableHeader>
        <TableRow className="bg-gray-100">
          <TableHead>No</TableHead>
          <TableHead>Property ID</TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Listing Type</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Updated At</TableHead>
          <TableHead className="text-center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading
          ? Array.from({ length: limit }).map((_, index) => (
              <TableRow key={index}>
                {Array.from({ length: 9 }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          : data?.map((item, index) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="truncate max-w-32" title={item.id}>
                  {item.id}
                </TableCell>
                <TableCell
                  className="truncate max-w-64"
                  title={item.propertyTitle}
                >
                  <a
                    href={`/listings/${item.id}`}
                    className="hover:underline text-blue-600"
                  >
                    {item.propertyTitle}
                  </a>
                </TableCell>
                <TableCell>{item.propertyType}</TableCell>
                <TableCell>{item.propertyListingType}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      item.status === "active"
                        ? "default"
                        : item.status === "inactive"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(item.createdAt ?? "")}</TableCell>
                <TableCell>{formatDate(item.updatedAt ?? "")}</TableCell>
                <TableCell className="flex gap-2 justify-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEdit(item.id ?? "")}
                    title="Edit Property"
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <DeleteConfirmationModal
                    propertyId={item.id ?? ""}
                    token={token}
                    apiUrl={apiUrl}
                  />
                </TableCell>
              </TableRow>
            ))}
      </TableBody>
    </Table>
  );
};
