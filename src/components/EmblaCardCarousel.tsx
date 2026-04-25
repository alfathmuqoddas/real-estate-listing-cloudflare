import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

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
    <div className="relative">
      {/* Carousel */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {images.map((img, index) => (
            <div className="min-w-full" key={index}>
              <img
                src={img.imageUrl}
                loading={index < 0 ? "lazy" : "eager"}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`w-2 h-2 rounded-full transition ${
              index === selectedIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
