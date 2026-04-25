import dashImg from "@/assets/dashboard-preview.jpg";
import { motion } from "framer-motion";

export const DashboardPreview = () => (
  <section id="dashboard" className="relative py-24">
    <div className="mx-auto max-w-6xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-heading font-black text-5xl tracking-tighter uppercase leading-tight md:text-6xl text-primary">
          Live System <span className="text-secondary">Terminal</span>
        </h2>
        <p className="mt-4 text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
          See every truck, every hazard, every ETA — in one geometric command center.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto mt-12 max-w-5xl"
      >
        <div className="relative border-2 border-primary bg-background p-4 bauhaus-shadow-lg z-10 w-full overflow-hidden">
          <div className="flex gap-2 mb-4 border-b-2 border-primary pb-2">
             <div className="w-3 h-3 bg-secondary border-2 border-primary"></div>
             <div className="w-3 h-3 bg-accent border-2 border-primary"></div>
             <div className="w-3 h-3 bg-tertiary border-2 border-primary"></div>
             <div className="ml-2 font-heading font-bold text-[8px] uppercase tracking-widest text-primary flex items-center">ROOT / TERMINAL</div>
          </div>
          <img src={dashImg} alt="FastConnect dashboard" loading="lazy" width={1600} height={1024} className="grayscale contrast-125 border-2 border-primary" />
          <div className="absolute inset-x-4 inset-y-12 bg-primary/5 opacity-50 mix-blend-multiply pointer-events-none border-2 border-primary"></div>
        </div>
        <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-[radial-gradient(hsl(var(--tertiary))_2px,transparent_2px)] [background-size:16px_16px] z-0 opacity-50"></div>
      </motion.div>
    </div>
  </section>
);