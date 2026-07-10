"use client";

import { useState } from "react";
import { IconMapPin } from "@tabler/icons-react";

type LocationStatus =
  | "idle"
  | "loading"
  | "allowed"
  | "denied"
  | "unsupported"
  | "insecure";

type Position = {
  lat: number;
  lng: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function getMarkerPosition(position: Position) {
  const left = clamp(((position.lng + 180) / 360) * 100, 8, 92);
  const top = clamp(((90 - position.lat) / 180) * 100, 14, 86);

  return {
    left: `${left}%`,
    top: `${top}%`,
  };
}

export default function DottedLocationMap() {
  const [status, setStatus] = useState<LocationStatus>("idle");
  const [position, setPosition] = useState<Position | null>(null);

  const requestLocation = () => {
    if (typeof window !== "undefined" && !window.isSecureContext) {
      setStatus("insecure");
      return;
    }

    if (!navigator.geolocation) {
      setStatus("unsupported");
      return;
    }

    setStatus("loading");

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setStatus("allowed");
      },
      () => {
        setStatus("denied");
      },
      {
        enableHighAccuracy: false,
        timeout: 8000,
        maximumAge: 60000,
      },
    );
  };

  const markerStyle = position ? getMarkerPosition(position) : null;

  return (
    <div className="mt-8 max-w-md">
      <div className="relative overflow-hidden rounded-2xl bg-zinc-950/50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
            Location preview
          </p>

          <p className="text-xs text-zinc-600">Privacy-safe</p>
        </div>

        <div className="relative h-40 overflow-hidden rounded-xl bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.14),transparent_60%)]" />

          <svg
            viewBox="0 0 900 360"
            className="absolute inset-0 h-full w-full"
            aria-hidden="true"
          >
            <defs>
              <pattern
                id="mapDotPattern"
                width="12"
                height="12"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1.45" fill="rgb(139 92 246 / 0.65)" />
              </pattern>
            </defs>

            {/* North America */}
            <path
              d="M86 105 C118 62 200 55 270 82 C315 99 324 135 292 155 C245 184 170 168 112 155 C72 146 58 127 86 105Z"
              fill="url(#mapDotPattern)"
            />

            {/* South America */}
            <path
              d="M260 178 C304 197 313 270 275 330 C236 295 220 220 260 178Z"
              fill="url(#mapDotPattern)"
            />

            {/* Europe */}
            <path
              d="M425 88 C462 62 520 66 562 92 C535 112 475 118 430 108 C405 102 405 95 425 88Z"
              fill="url(#mapDotPattern)"
            />

            {/* Africa */}
            <path
              d="M470 127 C535 142 565 208 522 300 C465 265 438 173 470 127Z"
              fill="url(#mapDotPattern)"
            />

            {/* Asia */}
            <path
              d="M560 105 C632 58 780 76 840 135 C790 176 675 176 610 158 C555 144 532 125 560 105Z"
              fill="url(#mapDotPattern)"
            />

            {/* Australia */}
            <path
              d="M720 255 C760 235 824 252 850 290 C795 312 745 300 720 255Z"
              fill="url(#mapDotPattern)"
            />
          </svg>

          {markerStyle && (
            <div
              className="absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={markerStyle}
            >
              <div className="relative flex flex-col items-center">
                <div className="mb-1 rounded-full bg-black/90 px-3 py-1 text-[10px] font-medium text-white shadow-[0_0_18px_rgba(139,92,246,0.4)]">
                  You are here
                </div>

                <div className="h-7 w-px bg-violet-400/70" />

                <div className="relative h-3 w-3 rounded-full bg-violet-400">
                  <span className="absolute inset-0 animate-ping rounded-full bg-violet-400/60" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={requestLocation}
            className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2 text-sm text-zinc-300 transition hover:text-white"
          >
            <IconMapPin className="h-4 w-4 text-violet-400" />
            {status === "loading" ? "Detecting..." : "Show my location"}
          </button>

          {status === "allowed" && (
            <p className="text-xs text-zinc-500">Shown locally. Not stored.</p>
          )}

          {status === "denied" && (
            <p className="text-xs text-zinc-500">Permission denied.</p>
          )}

          {status === "insecure" && (
            <p className="text-xs text-zinc-500">
              Use localhost or HTTPS for live location.
            </p>
          )}

          {status === "unsupported" && (
            <p className="text-xs text-zinc-500">
              Location not supported.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}