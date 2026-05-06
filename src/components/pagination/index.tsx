import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  currentPage: number;
  totalPages: number;
}

export const getPaginationRange = (currentPage: number, totalPages: number) => {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];
  let l;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - delta && i <= currentPage + delta)
    ) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

export default function Pagination({ currentPage, totalPages }: Props) {
  const range = getPaginationRange(currentPage, totalPages);

  const updatePage = (page: number | string) => {
    const url = new URL(window.location.href);

    if (page === 1) {
      url.searchParams.delete("page");
    } else {
      url.searchParams.set("page", page.toString());
    }

    window.location.search = url.searchParams.toString();
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center gap-1 my-8">
      <button
        disabled={currentPage <= 1}
        onClick={() => updatePage(currentPage - 1)}
        className="size-10 border bg-background rounded-full flex items-center justify-center disabled:opacity-50 cursor-pointer"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <div className="flex items-center">
        {range.map((item, index) => (
          <button
            key={index}
            onClick={() => updatePage(item)}
            disabled={item === "..."}
            className={`size-10 flex items-center justify-center cursor-pointer  ${
              item === currentPage
                ? "bg-primary border rounded-full text-white"
                : item === "..."
                  ? "border-none cursor-default"
                  : "text-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <button
        disabled={currentPage >= totalPages}
        onClick={() => updatePage(currentPage + 1)}
        className="size-10 border bg-background rounded-full flex items-center justify-center disabled:opacity-50 cursor-pointer"
      >
        <ChevronRight className="w-4 h-4 cursor-pointer" />
      </button>
    </nav>
  );
}
