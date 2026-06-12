import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { type LatLngBoundsExpression } from "leaflet";

export const PropertyLeafletMap = ({
  type = "static",
  initialCoordinates,
  zoom = 15,
  onChange,
}: {
  type: "dragable" | "static";
  initialCoordinates?: { lat: number; lon: number };
  zoom?: number;
  onChange?: (lat: number, lon: number) => void;
}) => {
  const [position, setPosition] = useState<[number, number]>([
    initialCoordinates?.lat ?? 0,
    initialCoordinates?.lon ?? 0,
  ]);
  const [icon, setIcon] = useState<any>(null);
  const indonesiaBounds: LatLngBoundsExpression = [
    [-11.0, 95.0],
    [6.0, 141.0],
  ];

  useEffect(() => {
    import("leaflet").then((L) => {
      const emojiIcon = L.divIcon({
        html: `<div class="text-3xl">📍</div>`,
        className: "",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
      });
      setIcon(emojiIcon);
    });
  }, []);

  if (!icon) {
    return <div style={{ height: "400px" }}>Loading map...</div>;
  }

  return (
    <div className="w-full h-100 rounded-xl overflow-hidden ">
      <MapContainer
        bounds={indonesiaBounds}
        maxBounds={indonesiaBounds}
        maxBoundsViscosity={1}
        center={position}
        zoom={zoom}
        minZoom={4}
        style={{ height: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker
          position={position}
          icon={icon}
          draggable={type === "dragable"}
          eventHandlers={{
            dragend: (e) => {
              const marker = e.target;
              const newPosition = marker.getLatLng();
              setPosition([newPosition.lat, newPosition.lng]);
              onChange?.(newPosition.lat, newPosition.lng);
            },
          }}
        >
          <Popup>
            {initialCoordinates?.lat}, {initialCoordinates?.lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
