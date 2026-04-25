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
        <h2 className="font-heading font-black text-5xl tracking-tighter uppercase md:text-6xl text-primary">
          System <span className="text-tertiary">Architecture</span>
        </h2>
        <p className="mt-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
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
            className="group relative overflow-hidden border-2 border-primary bg-background p-6 bauhaus-shadow z-10 transition-transform hover:-translate-y-2 hover:bg-muted"
          >
            <div className="absolute top-0 right-0 h-10 w-10 border-l-2 border-b-2 border-primary bg-accent/20 group-hover:bg-accent" />
            <div className="flex h-12 w-12 items-center justify-center border-2 border-primary bg-primary text-primary-foreground mb-6">
              <f.icon className="h-5 w-5 text-primary" />
            </div>
            <h3 className="text-lg font-heading font-bold uppercase tracking-wider">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);