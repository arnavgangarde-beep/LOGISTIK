import { motion } from "framer-motion";
import { Star } from "lucide-react";

const items = [
  { name: "Marcus Reed", role: "Fleet Manager, NorthHaul", quote: "We cut average delivery time by 22% in the first month. The hazard re-routing alone pays for itself." },
  { name: "Priya Shah", role: "Ops Lead, BlueLine Logistics", quote: "Drivers love it. Customers love the live ETAs. It's the first tool both sides actually thank us for." },
  { name: "Diego Alvarez", role: "Owner-Operator", quote: "I've avoided two storms and a closed bridge this week. FastConnect literally drove me around them." },
];

export const Testimonials = () => (
  <section id="testimonials" className="relative py-24">
    <div className="mx-auto max-w-6xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Trusted by <span className="text-gradient">modern fleets</span>
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {items.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl"
          >
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-4 text-sm text-foreground/90">"{t.quote}"</p>
            <div className="mt-5 text-sm font-semibold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);