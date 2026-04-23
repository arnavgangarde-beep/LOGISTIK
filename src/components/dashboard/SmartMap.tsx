import { useEffect, useRef, useState } from "react";
import maplibregl, { Map as MLMap, Marker } from "maplibre-gl";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  CloudLightning,
  Locate,
  Maximize2,
  Minus,
  Navigation,
  Plus,
  RefreshCw,
  Truck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  formatDistance,
  formatDuration,
  getRoute,
  hazardPolygon,
  LngLat,
  RouteResult,
} from "@/lib/ors";
import { toast } from "sonner";

// Demo route: warehouse (Berlin Spandau) -> customer (Berlin Friedrichshain)
const START: LngLat = [13.2, 52.535];
const END: LngLat = [13.46, 52.515];
const HAZARD: LngLat = [13.34, 52.525]; // storm in the middle

const MAP_STYLE = {
  version: 8 as const,
  sources: {
    "carto-dark": {
      type: "raster" as const,
      tiles: [
        "https://a.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://b.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
        "https://c.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",
      ],
      tileSize: 256,
      attribution: "© OpenStreetMap, © CARTO",
    },
  },
  layers: [
    { id: "bg", type: "background" as const, paint: { "background-color": "#0a0e1a" } },
    { id: "carto", type: "raster" as const, source: "carto-dark" },
  ],
};

export const SmartMap = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<MLMap | null>(null);
  const truckMarkerRef = useRef<Marker | null>(null);
  const animRef = useRef<number | null>(null);

  const [route, setRoute] = useState<RouteResult | null>(null);
  const [altRoute, setAltRoute] = useState<RouteResult | null>(null);
  const [hazardActive, setHazardActive] = useState(false);
  const [showHazardPopup, setShowHazardPopup] = useState(false);
  const [keyOpen, setKeyOpen] = useState(false);
  const [keyInput, setKeyInput] = useState(localStorage.getItem("ors_api_key") || "");
  const [loading, setLoading] = useState(false);

  // Init map
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: MAP_STYLE as maplibregl.StyleSpecification,
      center: [(START[0] + END[0]) / 2, (START[1] + END[1]) / 2],
      zoom: 11,
      attributionControl: false,
    });
    mapRef.current = map;

    const makeMarkerEl = (color: string, label: string) => {
      const el = document.createElement("div");
      el.className = "flex flex-col items-center";
      el.innerHTML = `
        <div style="background:${color};box-shadow:0 0 18px ${color};border:2px solid hsl(230 35% 6%);"
             class="h-3.5 w-3.5 rounded-full"></div>
        <div style="background:rgba(15,18,32,0.85);color:#fff;border:1px solid rgba(255,255,255,0.08)"
             class="mt-1 rounded-md px-2 py-0.5 text-[10px] font-medium backdrop-blur">${label}</div>`;
      return el;
    };

    new maplibregl.Marker({ element: makeMarkerEl("hsl(220 90% 60%)", "Warehouse") })
      .setLngLat(START).addTo(map);
    new maplibregl.Marker({ element: makeMarkerEl("hsl(264 90% 66%)", "Customer") })
      .setLngLat(END).addTo(map);

    // Truck
    const truckEl = document.createElement("div");
    truckEl.innerHTML = `
      <div style="box-shadow:0 0 24px hsl(24 95% 58% / 0.9);"
           class="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-[hsl(24,95%,58%)] to-[hsl(335,85%,60%)]">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>
      </div>`;
    truckMarkerRef.current = new maplibregl.Marker({ element: truckEl }).setLngLat(START).addTo(map);

    // Hazard
    const hazardEl = document.createElement("div");
    hazardEl.innerHTML = `
      <div class="relative">
        <div class="absolute inset-0 animate-ping rounded-full" style="background:hsl(0 84% 60% / 0.5)"></div>
        <div style="background:hsl(0 84% 60%);box-shadow:0 0 24px hsl(0 84% 60% / 0.8)" class="relative grid h-7 w-7 place-items-center rounded-full text-white">⚡</div>
      </div>`;
    new maplibregl.Marker({ element: hazardEl }).setLngLat(HAZARD).addTo(map);

    map.on("load", () => {
      map.addSource("route", { type: "geojson", data: emptyLine() });
      map.addSource("alt-route", { type: "geojson", data: emptyLine() });

      map.addLayer({
        id: "alt-route-line",
        type: "line",
        source: "alt-route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "hsl(220, 90%, 60%)",
          "line-width": 4,
          "line-opacity": 0.45,
          "line-dasharray": [2, 2],
        },
      });
      map.addLayer({
        id: "route-glow",
        type: "line",
        source: "route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "hsl(264, 90%, 66%)",
          "line-width": 14,
          "line-blur": 10,
          "line-opacity": 0.6,
        },
      });
      map.addLayer({
        id: "route-line",
        type: "line",
        source: "route",
        layout: { "line-cap": "round", "line-join": "round" },
        paint: {
          "line-color": "hsl(264, 90%, 78%)",
          "line-width": 5,
        },
      });

      loadInitialRoute();
    });

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const emptyLine = () =>
    ({
      type: "Feature" as const,
      properties: {},
      geometry: { type: "LineString" as const, coordinates: [] as number[][] },
    });

  const setRouteOnMap = (sourceId: "route" | "alt-route", coords: number[][]) => {
    const map = mapRef.current;
    if (!map) return;
    const src = map.getSource(sourceId) as maplibregl.GeoJSONSource | undefined;
    src?.setData({
      type: "Feature",
      properties: {},
      geometry: { type: "LineString", coordinates: coords },
    });
  };

  const animateTruck = (coords: number[][]) => {
    if (animRef.current) cancelAnimationFrame(animRef.current);
    let i = 0;
    const step = () => {
      if (!truckMarkerRef.current || i >= coords.length) return;
      truckMarkerRef.current.setLngLat(coords[i] as [number, number]);
      i += Math.max(1, Math.floor(coords.length / 600));
      animRef.current = requestAnimationFrame(step);
    };
    step();
  };

  const loadInitialRoute = async () => {
    setLoading(true);
    try {
      const r = await getRoute(START, END);
      setRoute(r);
      setRouteOnMap("route", r.coordinates);
      animateTruck(r.coordinates);
    } catch (e) {
      toast.error("Could not load route. Add an ORS API key for best results.");
    } finally {
      setLoading(false);
    }
  };

  const triggerHazard = async () => {
    setHazardActive(true);
    setShowHazardPopup(true);
    if (route) setAltRoute(route);
    if (route) setRouteOnMap("alt-route", route.coordinates);

    setLoading(true);
    try {
      const newRoute = await getRoute(START, END, [hazardPolygon(HAZARD, 4)]);
      setRoute(newRoute);
      setRouteOnMap("route", newRoute.coordinates);
      animateTruck(newRoute.coordinates);
      toast.success("Route updated — hazard avoided");
    } catch {
      toast.error("Re-routing requires an ORS API key (OSRM demo doesn't support avoid zones).");
    } finally {
      setLoading(false);
    }
  };

  const saveKey = () => {
    localStorage.setItem("ors_api_key", keyInput.trim());
    setKeyOpen(false);
    toast.success("API key saved — reloading routes");
    loadInitialRoute();
  };

  const minutesSaved = route && altRoute
    ? Math.max(1, Math.round((altRoute.duration - route.duration) / 60))
    : 24;

  return (
    <div className="relative h-[calc(100vh-3.5rem)] w-full overflow-hidden">
      <div ref={containerRef} className="absolute inset-0" />

      {/* Top-left ETA card */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute left-4 top-4 z-10 w-[260px] rounded-2xl border border-border glass-strong p-4 shadow-elegant"
      >
        <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-muted-foreground">
          <Navigation className="h-3.5 w-3.5 text-primary" /> Active route
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-2xl font-bold">
            {route ? formatDuration(route.duration) : "—"}
          </div>
          <div className="text-sm text-muted-foreground">
            {route ? formatDistance(route.distance) : ""}
          </div>
        </div>
        <div className="mt-1 text-xs text-muted-foreground">
          {hazardActive ? `Saved ~${minutesSaved} mins` : "Live ETA · driving-hgv"}
        </div>
        <div className="mt-3 flex gap-2">
          <Button size="sm" onClick={triggerHazard} disabled={loading} className="flex-1 bg-gradient-to-r from-accent to-[hsl(335,85%,60%)] text-accent-foreground hover:opacity-95">
            <RefreshCw className={`mr-1 h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} /> Re-route
          </Button>
          <Button size="sm" variant="outline" onClick={() => setKeyOpen(true)}>Key</Button>
        </div>
      </motion.div>

      {/* Right-side legend */}
      <div className="absolute right-4 top-4 z-10 hidden w-[220px] rounded-2xl border border-border glass-strong p-4 md:block">
        <div className="text-xs uppercase tracking-wide text-muted-foreground">Live Markers</div>
        <ul className="mt-3 space-y-2 text-sm">
          <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[hsl(220,90%,60%)]" /> Warehouse</li>
          <li className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[hsl(264,90%,66%)]" /> Customer</li>
          <li className="flex items-center gap-2"><Truck className="h-3.5 w-3.5 text-accent" /> Your truck</li>
          <li className="flex items-center gap-2"><CloudLightning className="h-3.5 w-3.5 text-destructive" /> Storm zone</li>
        </ul>
      </div>

      {/* Map controls */}
      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <Button size="icon" variant="outline" className="glass" onClick={() => mapRef.current?.zoomIn()}>
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline" className="glass" onClick={() => mapRef.current?.zoomOut()}>
          <Minus className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="glass"
          onClick={() => mapRef.current?.flyTo({ center: START, zoom: 13 })}
        >
          <Locate className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="outline"
          className="glass"
          onClick={() => containerRef.current?.requestFullscreen?.()}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Hazard popup */}
      <AnimatePresence>
        {showHazardPopup && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="absolute bottom-6 left-1/2 z-20 w-[min(520px,calc(100%-2rem))] -translate-x-1/2 rounded-2xl border border-destructive/40 glass-strong p-4 shadow-[0_0_40px_hsl(0_84%_60%/0.45)]"
          >
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-destructive/20 text-destructive">
                <AlertTriangle className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm font-semibold">⚠ Storm detected ahead</div>
                <div className="mt-1 text-xs text-muted-foreground">
                  ⚡ Route changed automatically · ⏱ Saved {minutesSaved} mins
                </div>
              </div>
              <Button size="sm" variant="ghost" onClick={() => setShowHazardPopup(false)}>
                Dismiss
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* API key modal */}
      <AnimatePresence>
        {keyOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-30 grid place-items-center bg-background/70 backdrop-blur"
            onClick={() => setKeyOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }} animate={{ scale: 1, y: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-[min(420px,calc(100%-2rem))] rounded-2xl border border-border bg-card p-6"
            >
              <div className="text-lg font-semibold">OpenRouteService API key</div>
              <p className="mt-1 text-sm text-muted-foreground">
                Get a free key at <a className="text-primary underline" target="_blank" href="https://openrouteservice.org/dev/#/signup" rel="noreferrer">openrouteservice.org</a>. Stored only in your browser.
              </p>
              <input
                value={keyInput}
                onChange={(e) => setKeyInput(e.target.value)}
                placeholder="Paste key…"
                className="mt-4 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="mt-4 flex justify-end gap-2">
                <Button variant="ghost" onClick={() => setKeyOpen(false)}>Cancel</Button>
                <Button onClick={saveKey} className="bg-gradient-to-r from-primary to-secondary text-primary-foreground">Save</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};