import dashImg from "@/assets/dashboard-preview.jpg";
import { motion } from "framer-motion";

export const DashboardPreview = () => (
  <section id="dashboard" className="relative py-24">
    <div className="mx-auto max-w-6xl px-4">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
          Live Dashboard <span className="text-gradient-accent">Preview</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          See every truck, every hazard, every ETA — in one beautiful command center.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="relative mx-auto mt-12 max-w-5xl"
      >
        <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/30 to-accent/30 blur-3xl" />
        <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card/40 p-2 backdrop-blur-xl">
          <img src={dashImg} alt="FastConnect dashboard" loading="lazy" width={1600} height={1024} className="rounded-[1.4rem]" />
        </div>
      </motion.div>
    </div>
  </section>
);