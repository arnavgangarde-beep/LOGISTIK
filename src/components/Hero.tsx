import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-truck.jpg";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden bg-background pt-40 pb-24 font-sans">
      <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:24px_24px] opacity-10" aria-hidden />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 lg:grid-cols-2">
        <div className="z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 border-2 border-primary bg-background px-4 py-1.5 text-[10px] font-heading font-bold uppercase tracking-widest text-primary bauhaus-shadow"
          >
            <div className="h-2 w-2 bg-tertiary"></div>
            AI-powered re-routing in real time
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-8 font-heading font-black text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9] text-primary"
          >
            Deliver Faster,<br />
            <span className="text-secondary">Drive Smarter.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mt-8 max-w-xl text-sm font-medium text-muted-foreground"
          >
            AI-powered logistics route planning for trucks. Avoid traffic, storms, and
            delays in real time — and keep every customer in the loop.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <Button
              size="lg"
              onClick={() => navigate("/signup")}
              className="bg-primary text-primary-foreground border-2 border-primary hover:bg-tertiary hover:text-white rounded-none font-heading font-bold uppercase tracking-widest text-[10px] transition-colors py-6 shrink-0"
            >
              Get Started
              <ArrowRight className="ml-3 h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="bg-background text-primary border-2 border-primary hover:bg-muted rounded-none font-heading font-bold uppercase tracking-widest text-[10px] transition-colors py-6 shrink-0">
              <Play className="mr-3 h-4 w-4" /> Watch Demo
            </Button>
          </motion.div>

          <div className="mt-16 grid max-w-md grid-cols-3 gap-8">
            {[
              { k: "12k+", v: "Trucks routed" },
              { k: "23%", v: "Faster ETAs" },
              { k: "99.9%", v: "Uptime" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-heading font-black text-3xl tracking-tighter text-primary">{s.k}</div>
                <div className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground mt-1">{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 0.3, duration: 0.7 }}
           className="relative aspect-video lg:aspect-square flex items-center justify-center lg:justify-end"
        >
          {/* Main geometric image container */}
          <div className="relative w-full max-w-[500px] border-2 border-primary bg-background p-3 bauhaus-shadow-lg z-10">
             <img
               src={heroImg}
               alt="Smart logistics truck driving on a glowing neon highway"
               className="w-full h-auto max-h-[350px] object-cover grayscale contrast-125"
             />
             <div className="absolute inset-x-3 inset-y-3 bg-secondary/10 border-2 border-primary mix-blend-multiply pointer-events-none"></div>
          </div>

          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -left-12 top-20 hidden border-2 border-primary bg-background p-4 bauhaus-shadow z-20 md:block"
          >
            <div className="text-[8px] uppercase tracking-widest font-heading font-bold text-muted-foreground border-b-2 border-primary pb-2 mb-2">ETA</div>
            <div className="text-3xl font-heading font-black tracking-tighter text-primary">2h 14m</div>
            <div className="text-[10px] font-bold text-accent uppercase tracking-widest bg-primary px-2 py-0.5 mt-2 inline-block">Saved 24 mins</div>
          </motion.div>

          <motion.div
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -right-8 bottom-16 hidden border-2 border-primary bg-background p-4 bauhaus-shadow z-20 md:block"
          >
             <div className="text-[8px] uppercase tracking-widest font-heading font-bold text-muted-foreground border-b-2 border-primary pb-2 mb-2 flex items-center justify-between">Hazard <div className="h-2 w-2 bg-destructive"></div></div>
             <div className="text-sm font-heading font-bold uppercase tracking-wider text-primary mt-2">Storm Rerouted</div>
          </motion.div>

          {/* Decorative geometric shapes */}
          <div className="absolute top-10 right-20 w-16 h-16 bg-accent border-2 border-primary z-0 opacity-80 mix-blend-multiply rotate-12"></div>
          <div className="absolute bottom-20 left-10 w-24 h-24 border-4 border-tertiary z-0 opacity-80 -rotate-6"></div>
        </motion.div>
      </div>
    </section>
  );
};