import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { motion } from "framer-motion";
import { Package, Clock, MapPin, Fuel, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const stats = [
  { label: "Today's Deliveries", value: "14", delta: "+3 vs yesterday", icon: Package, color: "from-primary/30 to-secondary/20" },
  { label: "Delays Avoided", value: "6", delta: "≈ 78 mins saved", icon: Clock, color: "from-accent/30 to-[hsl(335,85%,60%)]/20" },
  { label: "Distance Covered", value: "412 km", delta: "+12% this week", icon: MapPin, color: "from-secondary/30 to-primary/20" },
  { label: "Fuel Saved", value: "38 L", delta: "≈ €72", icon: Fuel, color: "from-[hsl(150,80%,50%)]/30 to-secondary/20" },
];

const upcoming = [
  { id: "ORD-1029", customer: "Hannah Müller", address: "Warschauer Str. 12, Berlin", eta: "12:40", status: "In Transit" },
  { id: "ORD-1030", customer: "Lukas Weber", address: "Kastanienallee 8, Berlin", eta: "13:15", status: "Preparing" },
  { id: "ORD-1031", customer: "Aisha Khan", address: "Sonnenallee 220, Berlin", eta: "14:02", status: "Near You" },
  { id: "ORD-1032", customer: "Tom Becker", address: "Frankfurter Allee 99, Berlin", eta: "15:20", status: "Preparing" },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mx-auto max-w-7xl space-y-8 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Good day, Driver 👋</h1>
            <p className="text-sm text-muted-foreground">Here's your run for today.</p>
          </div>
          <Button asChild className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-95">
            <Link to="/dashboard/map">Open Smart Map <ArrowUpRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -4 }}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-xl"
            >
              <div className={`absolute -right-8 -top-8 h-28 w-28 rounded-full bg-gradient-to-br ${s.color} blur-2xl`} />
              <div className="relative flex items-center justify-between">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">{s.label}</span>
                <s.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="relative mt-3 text-3xl font-bold">{s.value}</div>
              <div className="relative mt-1 text-xs text-muted-foreground">{s.delta}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          <div className="rounded-2xl border border-border bg-card/40 p-5 backdrop-blur-xl lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Upcoming deliveries</h2>
              <span className="text-xs text-muted-foreground">{upcoming.length} stops</span>
            </div>
            <div className="mt-4 divide-y divide-border">
              {upcoming.map((o) => (
                <div key={o.id} className="flex items-center justify-between gap-4 py-3">
                  <div className="min-w-0">
                    <div className="truncate text-sm font-medium">{o.customer}</div>
                    <div className="truncate text-xs text-muted-foreground">{o.address}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-border bg-background/50 px-2 py-0.5 text-[10px] uppercase tracking-wide text-muted-foreground">{o.status}</span>
                    <span className="text-sm font-semibold">{o.eta}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-gradient-to-br from-primary/15 via-card/40 to-accent/10 p-5 backdrop-blur-xl">
            <h2 className="text-lg font-semibold">Driver score</h2>
            <p className="mt-1 text-sm text-muted-foreground">Based on safety, on-time rate, and fuel efficiency.</p>
            <div className="mt-6 flex items-end gap-2">
              <div className="text-5xl font-bold text-gradient">94</div>
              <div className="pb-2 text-xs text-muted-foreground">/ 100</div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-full w-[94%] rounded-full bg-gradient-to-r from-primary to-accent" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg border border-border p-2"><div className="font-semibold text-foreground">98%</div><div className="text-muted-foreground">On-time</div></div>
              <div className="rounded-lg border border-border p-2"><div className="font-semibold text-foreground">A+</div><div className="text-muted-foreground">Safety</div></div>
              <div className="rounded-lg border border-border p-2"><div className="font-semibold text-foreground">9.2</div><div className="text-muted-foreground">L/100km</div></div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}