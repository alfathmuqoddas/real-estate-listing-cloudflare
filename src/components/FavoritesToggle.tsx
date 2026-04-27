import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";

export const FavoritesToggle = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (isFavorite) {
      toast.success("Property added to favorites", {
        position: "top-center",
      });
    } else {
      toast.success("Property removed from favorites", {
        position: "top-center",
      });
    }
  }, [isFavorite]);

  return (
    <button
      className="cursor-pointer size-8 flex items-center justify-center bg-background rounded-full"
      onClick={handleFavorite}
    >
      {isFavorite ? (
        <Heart className="size-4 fill-red-500 text-red-500" />
      ) : (
        <Heart className="size-4" />
      )}
    </button>
  );
};
