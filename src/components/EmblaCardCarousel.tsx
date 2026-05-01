import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";

export default function CardCarousel({ images }: { images: Array<any> }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  return (
    <figure className="relative">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div className="min-w-full" key={index}>
              <img
                src={img.imageUrl}
                alt={`propertyImage-${img.id}`}
                loading={index < 0 ? "lazy" : "eager"}
                className="w-full h-full object-cover"
                width="960"
                height="540"
              />
            </div>
          ))}
        </div>
      </div>

      {/* arrow left */}
      <button
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          emblaApi?.scrollPrev();
        }}
        aria-label="Scroll to previous image"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute top-1/2 left-2 -translate-y-1/2 z-10 flex items-center justify-center size-8 bg-background rounded-full"
      >
        <ChevronLeft className="size-4" />
      </button>

      {/* arrow right */}
      <button
        onClick={(e: any) => {
          e.preventDefault();
          e.stopPropagation();
          emblaApi?.scrollNext();
        }}
        aria-label="Scroll to next image"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 absolute top-1/2 right-2 -translate-y-1/2 z-10 flex items-center justify-center size-8 bg-background rounded-full"
      >
        <ChevronRight className="size-4" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={(e: any) => {
              e.preventDefault();
              e.stopPropagation();
              emblaApi?.scrollTo(index);
            }}
            aria-label={`Scroll to image ${index + 1}`}
            className={`w-2 h-2 rounded-full transition ${
              index === selectedIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
      <div
        className={
          "absolute bottom-2 right-2 text-xs gap-1 flex items-center justify-center px-2 py-1 bg-background rounded-full"
        }
      >
        <Camera className="size-4" />
        {images.length}
      </div>
    </figure>
  );
}
