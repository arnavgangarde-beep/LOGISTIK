// OpenRouteService client. Key is read from localStorage so users can paste it
// without redeploying. Falls back to OSRM public demo when not set.

const ORS_KEY = () => localStorage.getItem("ors_api_key") || "";

export type LngLat = [number, number];

export interface RouteResult {
  coordinates: LngLat[];
  distance: number; // meters
  duration: number; // seconds
  source: "ors" | "osrm";
}

export async function getRoute(
  start: LngLat,
  end: LngLat,
  avoidPolygons?: GeoJSON.Polygon[],
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
      },
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

  // OSRM public demo fallback (no avoid support)
  const url = `https://router.project-osrm.org/route/v1/driving/${start[0]},${start[1]};${end[0]},${end[1]}?overview=full&geometries=geojson&alternatives=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`OSRM ${res.status}`);
  const data = await res.json();
  const r = data.routes[0];
  return {
    coordinates: r.geometry.coordinates as LngLat[],
    distance: r.distance,
    duration: r.duration,
    source: "osrm",
  };
}

// Build a small circular polygon (in degrees) to simulate a hazard avoid zone
export function hazardPolygon(center: LngLat, radiusKm = 3): GeoJSON.Polygon {
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
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

export function formatDistance(m: number): string {
  return `${(m / 1000).toFixed(1)} km`;
}