import { motion } from "framer-motion";
import {
  CloudLightning,
  Route,
  Radar,
  Bell,
  Fuel,
  ShieldCheck,
} from "lucide-react";

const features = [
  { icon: Route, title: "AI Route Optimization", desc: "Shortest, safest path recalculated every minute as conditions change." },
  { icon: CloudLightning, title: "Weather Aware", desc: "Avoid storms, floods, and high-risk zones automatically." },
  { icon: Radar, title: "Live Traffic & Incidents", desc: "Real-time alerts for accidents, closures, and congestion." },
  { icon: Bell, title: "Customer Notifications", desc: "Auto-update ETAs and delivery status to every customer." },
  { icon: Fuel, title: "Fuel & Cost Savings", desc: "Track fuel saved and km optimized per driver and per fleet." },
  { icon: ShieldCheck, title: "Driver Safety", desc: "SOS button, hazard popups, and safer-path bias keep drivers protected." },
];

export const Features = () => (
  <section id="features" className="relative py-24">
    <div className="mx-auto max-w-6xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Why <span className="text-gradient">FastConnect</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          A logistics OS that thinks ahead. Built for fleets that cannot afford delays.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <motion.div
            key={f.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.06, duration: 0.5 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl"
          >
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:bg-primary/20" />
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 ring-1 ring-border">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);