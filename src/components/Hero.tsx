import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-truck.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-hero pt-32 pb-24">
      <div className="absolute inset-0 grid-bg opacity-60" aria-hidden />
      <div className="absolute -left-32 top-40 h-72 w-72 rounded-full bg-primary/30 blur-3xl" aria-hidden />
      <div className="absolute -right-32 top-10 h-72 w-72 rounded-full bg-accent/30 blur-3xl" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-2">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            AI-powered re-routing in real time
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-5 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl lg:text-7xl"
          >
            Deliver Faster,
            <br />
            <span className="text-gradient">Drive Smarter.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground"
          >
            AI-powered logistics route planning for trucks. Avoid traffic, storms, and
            delays in real time — and keep every customer in the loop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="group bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-[0_0_36px_hsl(var(--primary)/0.5)] hover:opacity-95"
            >
              Get Started
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-border bg-card/40 backdrop-blur">
              <Play className="mr-1 h-4 w-4" /> Watch Demo
            </Button>
          </motion.div>

          <div className="mt-10 grid max-w-md grid-cols-3 gap-6 text-sm">
            {[
              { k: "12k+", v: "Trucks routed" },
              { k: "23%", v: "Faster ETAs" },
              { k: "99.9%", v: "Uptime" },
            ].map((s) => (
              <div key={s.v}>
                <div className="text-2xl font-semibold text-gradient">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="relative"
        >
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-tr from-primary/40 to-accent/40 blur-2xl" aria-hidden />
          <div className="overflow-hidden rounded-[1.75rem] border border-border bg-card/40 p-2 backdrop-blur-xl">
            <img
              src={heroImg}
              alt="Smart logistics truck driving on a glowing neon highway"
              width={1600}
              height={900}
              className="rounded-[1.4rem]"
            />
          </div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-6 top-10 hidden rounded-2xl border border-border glass-strong px-4 py-3 shadow-elegant md:block"
          >
            <div className="text-xs text-muted-foreground">ETA</div>
            <div className="text-lg font-semibold">2h 14m</div>
            <div className="text-xs text-accent">Saved 24 mins</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-4 bottom-8 hidden rounded-2xl border border-border glass-strong px-4 py-3 shadow-elegant md:block"
          >
            <div className="text-xs text-muted-foreground">Hazard</div>
            <div className="text-sm font-semibold">⚠ Storm rerouted</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};