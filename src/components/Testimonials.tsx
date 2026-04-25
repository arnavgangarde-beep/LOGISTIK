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
        <h2 className="font-heading font-black text-5xl tracking-tighter uppercase md:text-6xl text-primary">
          Verified <span className="text-accent">Telemetry</span>
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
            className="border-2 border-primary bg-background p-6 bauhaus-shadow relative"
          >
             <div className="absolute top-0 right-0 border-l-2 border-b-2 border-primary bg-tertiary text-primary font-heading font-bold px-2 py-1 text-[10px]">VERIFIED LOG</div>
            <div className="flex gap-0.5 text-accent">
              {Array.from({ length: 5 }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="mt-8 text-sm font-medium text-foreground/90 uppercase">"{t.quote}"</p>
            <div className="mt-8 pt-4 border-t-2 border-primary">
               <div className="text-sm font-heading font-bold uppercase tracking-widest">{t.name}</div>
               <div className="text-[10px] font-bold text-muted-foreground uppercase">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);