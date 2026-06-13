import { useEffect, useState } from "react";
import { fetchMyListings } from "@/lib/api/listings";
import { MyPropertiesTable } from "@/components/table/MyPropertiesTable";
import type { TListings } from "@/types";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";

export const ManagePropertyPages = ({
  token,
  PUBLIC_API_URL,
}: {
  token?: string;
  PUBLIC_API_URL: string;
}) => {
  const [myListings, setMyListings] = useState<TListings | null>(null);
  const [fetchError, setFetchError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const itemsPerPage = [
    { label: "10", value: 10 },
    { label: "20", value: 20 },
    { label: "30", value: 30 },
    { label: "40", value: 40 },
    { label: "50", value: 50 },
  ];

  useEffect(() => {
    const res = async () => {
      setIsLoading(true);
      const { data, error, status } = await fetchMyListings({
        apiUrl: PUBLIC_API_URL,
        params: new URLSearchParams({
          page: page.toString(),
          limit: limit.toString(),
        }),
        token,
      });

      if (error) {
        if (status === 401) {
          window.location.href = "/login";
        }
        setFetchError(`Error fetching listings (status ${status})`);
        setMyListings(null);
      } else {
        setMyListings(data);
        setFetchError(null);
      }
      setIsLoading(false);
    };

    res();
  }, [page, limit]);

  return (
    <div>
      {fetchError ? (
        <p>Sorry something went wrong</p>
      ) : (
        <div>
          <p className="text-sm text-muted-foreground">
            You have{" "}
            {isLoading ? "..." : fetchError ? "" : myListings?.pagination.total}{" "}
            properties to manage
          </p>

          <div className="mt-6 mb-4">
            <MyPropertiesTable
              data={myListings?.data ?? []}
              isLoading={isLoading}
              limit={limit}
              page={page}
              token={token}
              apiUrl={PUBLIC_API_URL}
            />
          </div>
        </div>
      )}

      {/* the pagination and per page component */}
      <div className="flex justify-between items-center gap-4">
        {/* pagination */}
        <div className="flex gap-2 items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <p className="text-sm text-muted-foreground">
            Page {page} of {myListings?.pagination.totalPages}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === myListings?.pagination.totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* items per page */}
        <div>
          <Select
            items={itemsPerPage}
            value={limit.toString()}
            onValueChange={(val) => setLimit(Number(val))}
          >
            <SelectTrigger className="w-full max-w-16 bg-white">
              <SelectValue placeholder="Select items per page" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Items per page</SelectLabel>
                {itemsPerPage.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};
