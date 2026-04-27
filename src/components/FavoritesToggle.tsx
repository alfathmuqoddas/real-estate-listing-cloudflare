import { useState, useRef } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { PUBLIC_API_URL } from "astro:env/client";

export const FavoritesToggle = ({
  initialFavorite,
  token,
  propertyId,
}: {
  initialFavorite: boolean;
  token: string;
  propertyId: string;
}) => {
  const [isFavorite, setIsFavorite] = useState<boolean>(initialFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavorite = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    // 1. Guard: Check if authenticated
    if (!token) {
      toast.error("Please login to save favorites", { position: "top-center" });
      return;
    }

    if (isLoading) return; // Prevent spamming requests

    // 2. PREPARE ROLLBACK: Save current state
    const previousState = isFavorite;

    // 3. OPTIMISTIC UPDATE: Flip UI immediately
    setIsFavorite(!previousState);
    setIsLoading(true);

    try {
      const response = await fetch(
        `${PUBLIC_API_URL}/favorites/${propertyId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) throw new Error("Failed to update");

      const data = (await response.json()) as { status: "added" | "removes" };

      // Success feedback
      toast.success(
        data.status === "added"
          ? "Added to favorites"
          : "Removed from favorites",
        { position: "top-center" },
      );
    } catch (error) {
      // 4. ROLLBACK: Revert to previous state on failure
      setIsFavorite(previousState);
      toast.error("Failed to update favorite. Please try again.", {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`cursor-pointer size-8 flex items-center justify-center bg-white rounded-full ${isLoading ? "opacity-70" : ""}`}
      onClick={handleFavorite}
      disabled={isLoading}
      aria-label="Toggle Favorite"
    >
      <Heart
        className={`size-4 transition-colors ${
          isFavorite ? "fill-red-500 text-red-500" : "text-black"
        }`}
      />
    </button>
  );
};
