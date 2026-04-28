import { useState, useRef, useEffect, useCallback } from "react";
import { Search, MapPin, X } from "lucide-react";
import { geocodeSearch, GeocodingResult, LngLat } from "@/lib/ors";

interface Props {
  label: string;
  color: string;
  value: string;
  onSelect: (result: GeocodingResult) => void;
  onClear: () => void;
}

export const LocationSearch = ({ label, color, value, onSelect, onClear }: Props) => {
  const [query, setQuery] = useState(value);
  const [results, setResults] = useState<GeocodingResult[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setQuery(value); }, [value]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const doSearch = useCallback((q: string) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (q.length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    timerRef.current = setTimeout(async () => {
      const r = await geocodeSearch(q);
      setResults(r);
      setOpen(r.length > 0);
      setLoading(false);
    }, 350);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center border-2 border-primary bg-background">
        <div className="w-8 h-8 flex items-center justify-center shrink-0" style={{ background: color }}>
          <MapPin className="h-3.5 w-3.5 text-white" />
        </div>
        <div className="flex-1 relative">
          <input
            value={query}
            onChange={(e) => { setQuery(e.target.value); doSearch(e.target.value); }}
            onFocus={() => results.length > 0 && setOpen(true)}
            placeholder={`Search ${label}...`}
            className="w-full bg-transparent px-3 py-2 text-xs font-heading font-bold uppercase tracking-wider outline-none placeholder:text-muted-foreground/60 placeholder:normal-case placeholder:tracking-normal placeholder:font-normal"
          />
        </div>
        {query && (
          <button onClick={() => { setQuery(""); setResults([]); onClear(); }} className="px-2 text-muted-foreground hover:text-primary">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        {loading && <div className="px-2"><div className="h-3 w-3 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-50 left-0 right-0 top-full mt-1 border-2 border-primary bg-background shadow-[4px_4px_0px_0px_hsl(0_0%_10%)] max-h-[240px] overflow-y-auto">
          {results.map((r, i) => (
            <button
              key={i}
              onClick={() => { onSelect(r); setQuery(r.short_name); setOpen(false); }}
              className="w-full text-left px-3 py-2.5 hover:bg-primary hover:text-primary-foreground transition-colors border-b border-primary/10 last:border-b-0"
            >
              <div className="text-xs font-heading font-bold uppercase tracking-wider truncate">{r.short_name}</div>
              <div className="text-[10px] text-muted-foreground truncate mt-0.5">{r.display_name}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
