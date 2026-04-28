// OpenRouteService + OSRM routing client + Nominatim geocoding.
// Key is read from localStorage so users can paste it without redeploying.
// Falls back to OSRM public demo when ORS key is not set.

const ORS_KEY = () => localStorage.getItem("ors_api_key") || "";

type Polygon = { type: "Polygon"; coordinates: number[][][] };

export type LngLat = [number, number];

export interface RouteResult {
  coordinates: LngLat[];
  distance: number; // meters
  duration: number; // seconds
  source: "ors" | "osrm";
}

export interface GeocodingResult {
  display_name: string;
  short_name: string;
  lngLat: LngLat;
  type: string;
  importance: number;
}

// ─── GEOCODING (Nominatim – worldwide, free) ───────────────────────────

export async function geocodeSearch(query: string): Promise<GeocodingResult[]> {
  if (!query || query.trim().length < 2) return [];
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query
  )}&format=json&addressdetails=1&limit=6`;
  const res = await fetch(url, {
    headers: { "User-Agent": "FastConnect-Logistics/1.0" },
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map(
    (r: {
      display_name: string;
      lon: string;
      lat: string;
      type: string;
      importance: number;
      address?: Record<string, string>;
    }) => {
      // Build a short name from address parts
      const a = r.address || {};
      const parts = [
        a.city || a.town || a.village || a.hamlet || a.county || "",
        a.state || "",
        a.country || "",
      ].filter(Boolean);
      const short = parts.length > 0 ? parts.join(", ") : r.display_name.split(",").slice(0, 2).join(",");
      return {
        display_name: r.display_name,
        short_name: short,
        lngLat: [parseFloat(r.lon), parseFloat(r.lat)] as LngLat,
        type: r.type,
        importance: r.importance,
      };
    }
  );
}

// ─── REVERSE GEOCODING ──────────────────────────────────────────────────

export async function reverseGeocode(lngLat: LngLat): Promise<string> {
  try {
    const url = `https://nominatim.openstreetmap.org/reverse?lon=${lngLat[0]}&lat=${lngLat[1]}&format=json&addressdetails=1`;
    const res = await fetch(url, {
      headers: { "User-Agent": "FastConnect-Logistics/1.0" },
    });
    if (!res.ok) return `${lngLat[1].toFixed(4)}, ${lngLat[0].toFixed(4)}`;
    const data = await res.json();
    const a = data.address || {};
    const parts = [
      a.city || a.town || a.village || a.hamlet || a.county || "",
      a.state || "",
      a.country || "",
    ].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : data.display_name || `${lngLat[1].toFixed(4)}, ${lngLat[0].toFixed(4)}`;
  } catch {
    return `${lngLat[1].toFixed(4)}, ${lngLat[0].toFixed(4)}`;
  }
}

// ─── ROUTING ────────────────────────────────────────────────────────────

export async function getRoute(
  start: LngLat,
  end: LngLat,
  avoidPolygons?: Polygon[]
): Promise<RouteResult> {
  const key = ORS_KEY();
  if (key) {
    const body: Record<string, unknown> = {
      coordinates: [start, end],
      instructions: false,
    };
    if (avoidPolygons && avoidPolygons.length) {
      body.options = {
        avoid_polygons: {
          type: "MultiPolygon",
          coordinates: avoidPolygons.map((p) => p.coordinates),
        },
      };
    }
    const res = await fetch(
      "https://api.openrouteservice.org/v2/directions/driving-hgv/geojson",
      {
        method: "POST",
        headers: {
          Authorization: key,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) throw new Error(`ORS ${res.status}`);
    const data = await res.json();
    const f = data.features[0];
    return {
      coordinates: f.geometry.coordinates as LngLat[],
      distance: f.properties.summary.distance,
      duration: f.properties.summary.duration,
      source: "ors",
    };
  }

  // OSRM public demo fallback (no avoid support, but works globally)
  const url = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson&alternatives=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OSRM ${res.status}`);
  const data = await res.json();
  if (!data.routes || data.routes.length === 0) throw new Error("No route found");
  const r = data.routes[0];
  return {
    coordinates: r.geometry.coordinates as LngLat[],
    distance: r.distance,
    duration: r.duration,
    source: "osrm",
  };
}

// Get alternative routes from OSRM
export async function getAlternativeRoutes(
  start: LngLat,
  end: LngLat
): Promise<RouteResult[]> {
  const url = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson&alternatives=3`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OSRM ${res.status}`);
  const data = await res.json();
  if (!data.routes || data.routes.length === 0) throw new Error("No route found");
  return data.routes.map(
    (r: { geometry: { coordinates: LngLat[] }; distance: number; duration: number }) => ({
      coordinates: r.geometry.coordinates as LngLat[],
      distance: r.distance,
      duration: r.duration,
      source: "osrm" as const,
    })
  );
}

// Build a small circular polygon (in degrees) to simulate a hazard avoid zone
export function hazardPolygon(center: LngLat, radiusKm = 3): Polygon {
  const steps = 24;
  const coords: LngLat[] = [];
  const dLat = radiusKm / 111;
  const dLng = radiusKm / (111 * Math.cos((center[1] * Math.PI) / 180));
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    coords.push([center[0] + Math.cos(t) * dLng, center[1] + Math.sin(t) * dLat]);
  }
  return { type: "Polygon", coordinates: [coords] };
}

export function formatDuration(sec: number): string {
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.round((sec % 3600) / 60);
  if (d > 0) return `${d}d ${h}h`;
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDistance(m: number): string {
  if (m >= 1_000_000) return `${(m / 1000).toFixed(0)} km`;
  return `${(m / 1000).toFixed(1)} km`;
}