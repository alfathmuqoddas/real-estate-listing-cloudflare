import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

export const PropertyLeafletMap = ({
  lat,
  lon,
  zoom = 15,
}: {
  lat: number;
  lon: number;
  zoom?: number;
}) => {
  const [icon, setIcon] = useState<any>(null);

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

  const position: [number, number] = [lat, lon];

  return (
    <div className="w-full h-100 rounded-xl overflow-hidden ">
      <MapContainer center={position} zoom={zoom} style={{ height: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} icon={icon}>
          <Popup>
            {lat}, {lon}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};
