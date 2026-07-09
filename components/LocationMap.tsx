"use client";

import { MapPin } from "lucide-react";
import { useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export default function LocationMap() {
  const [location, setLocation] = useState<Coordinates | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleShowLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported in this browser.");
      return;
    }

    setLoading(true);
    setStatus(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setStatus(null);
        setLoading(false);
      },
      () => {
        setStatus("Location access was denied or unavailable.");
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
      },
    );
  };

  const center: [number, number] = location
    ? [location.latitude, location.longitude]
    : [20.5937, 78.9629];

  return (
    <div className="space-y-4">
      <div className="h-[320px] overflow-hidden rounded-3xl border border-border bg-card">
        <MapContainer
          key={center.join("-")}
          center={center}
          zoom={location ? 11 : 4}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {location ? (
            <CircleMarker
              center={[location.latitude, location.longitude]}
              radius={10}
              pathOptions={{ color: "#8b7cff", fillColor: "#8b7cff", fillOpacity: 0.8 }}
            >
              <Popup>You are here</Popup>
            </CircleMarker>
          ) : null}
        </MapContainer>
      </div>

      <button
        type="button"
        onClick={handleShowLocation}
        disabled={loading}
        aria-live="polite"
        className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-text-secondary transition hover:border-accent-border hover:text-white"
      >
        <MapPin size={16} />
        {loading ? "Finding location..." : "Show my location on map"}
      </button>

      {status ? (
        <p className="text-sm text-text-muted" role="status" aria-live="polite">
          {status}
        </p>
      ) : null}
      {!status && !location ? (
        <p className="text-sm text-text-muted">
          Location is requested only after you click the button.
        </p>
      ) : null}
    </div>
  );
}
