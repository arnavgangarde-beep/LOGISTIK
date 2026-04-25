import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, AlertTriangle, Zap } from "lucide-react";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1400px] mx-auto">
        
        {/* HERO SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 border-2 border-primary">
          <div className="bg-background p-10 md:p-16 flex flex-col justify-center border-b-2 lg:border-b-0 lg:border-r-2 border-primary">
            <h1 className="font-heading font-black text-6xl md:text-8xl tracking-tighter uppercase leading-[0.9]">
              Move<br/>
              <span className="text-tertiary">The</span><br/>
              World
            </h1>
            <p className="mt-8 text-sm md:text-base font-medium max-w-md">
              Bauhaus-inspired operating system for global logistics. Modular. Precise. Functional.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/dashboard/map" className="inline-flex items-center justify-center font-heading font-bold text-xs tracking-wider uppercase px-8 py-4 bg-primary text-primary-foreground border-2 border-primary hover:bg-background hover:text-primary transition-colors">
                Initialize System
              </Link>
              <button className="inline-flex items-center justify-center font-heading font-bold text-xs tracking-wider uppercase px-8 py-4 bg-background text-primary border-2 border-primary hover:bg-muted transition-colors">
                Watch Deployment
              </button>
            </div>
          </div>
          <div className="bg-primary p-10 relative min-h-[400px] overflow-hidden">
            {/* Minimalist Graphic Elements */}
            <div className="absolute top-10 left-10 w-16 h-16 bg-secondary border-2 border-primary bauhaus-shadow"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
               <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1"><rect x="3" y="10" width="18" height="10" /><path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" /><circle cx="7" cy="20" r="1"/><circle cx="17" cy="20" r="1"/></svg>
            </div>
            <div className="absolute bottom-1/4 left-1/4 w-12 h-12 bg-accent border-2 border-primary"></div>
            <div className="absolute bottom-10 right-10 w-24 h-24 border-4 border-tertiary"></div>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="h-0.5 w-8 bg-secondary"></div>
            <h2 className="font-heading font-bold tracking-widest uppercase text-sm">System Status</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-accent border-2 border-primary p-6 bauhaus-shadow min-h-[160px] flex flex-col justify-between">
              <Truck className="h-6 w-6" />
              <div>
                <div className="font-heading font-black text-5xl tracking-tighter">1,402</div>
                <div className="font-heading font-bold text-[10px] uppercase tracking-widest mt-1">Active Shipments</div>
              </div>
            </div>
            <div className="bg-secondary text-white border-2 border-primary p-6 bauhaus-shadow min-h-[160px] flex flex-col justify-between">
              <AlertTriangle className="h-6 w-6" />
              <div>
                <div className="font-heading font-black text-5xl tracking-tighter">04</div>
                <div className="font-heading font-bold text-[10px] uppercase tracking-widest mt-1">Delay Alerts</div>
              </div>
            </div>
            <div className="bg-tertiary text-white border-2 border-primary p-6 bauhaus-shadow min-h-[160px] flex flex-col justify-between">
              <Zap className="h-6 w-6" />
              <div>
                <div className="font-heading font-black text-5xl tracking-tighter">98%</div>
                <div className="font-heading font-bold text-[10px] uppercase tracking-widest mt-1">Efficiency</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
           <div className="lg:col-span-3 border-2 border-border bg-muted h-[200px] relative overflow-hidden flex items-center justify-center p-4">
              {/* Fake Map Representation */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:16px_16px]"></div>
              <div className="absolute top-4 left-4 bg-primary text-primary-foreground font-heading font-bold text-[10px] px-2 py-1 uppercase tracking-wider">Network Real-Time</div>
           </div>
           <div className="border-2 border-primary bg-background p-6 flex flex-col justify-between bauhaus-shadow">
              <h3 className="font-heading font-bold text-xs tracking-wider uppercase mb-4">Quick Controls</h3>
              <div className="space-y-4">
                 <div className="flex justify-between font-heading font-bold text-[10px] uppercase tracking-widest border-b-2 border-primary pb-2 cursor-pointer hover:text-tertiary"><span>Re-Route</span> <ArrowRight className="h-3 w-3"/></div>
                 <div className="flex justify-between font-heading font-bold text-[10px] uppercase tracking-widest border-b-2 border-primary pb-2 cursor-pointer hover:text-tertiary"><span>Audit Log</span> <ArrowRight className="h-3 w-3"/></div>
                 <div className="flex justify-between font-heading font-bold text-[10px] uppercase tracking-widest border-b-2 border-primary pb-2 cursor-pointer hover:text-tertiary"><span>Fleet View</span> <ArrowRight className="h-3 w-3"/></div>
              </div>
           </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="bg-primary text-primary-foreground p-10 md:p-16 border-2 border-primary">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1">
                 <h2 className="font-heading font-black text-5xl md:text-6xl tracking-tighter uppercase leading-[0.9]">
                   Form<br/>
                   <span className="text-accent">Follows</span><br/>
                   Freight
                 </h2>
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8 text-sm">
                 <div>
                    <h3 className="font-heading font-bold text-tertiary mb-2 uppercase tracking-wider">01. Geometric Logic</h3>
                    <p className="text-muted-foreground">Our algorithms optimize routes using Euclidean geometry, combined with real-time variables to minimize energy expenditure.</p>
                 </div>
                 <div>
                    <h3 className="font-heading font-bold text-secondary mb-2 uppercase tracking-wider">02. Raw Data</h3>
                    <p className="text-muted-foreground">No fluff. No decorative metrics. Only the raw, essential data needed to maintain 99.9% operational uptime.</p>
                 </div>
                 <div>
                    <h3 className="font-heading font-bold text-accent mb-2 uppercase tracking-wider">03. Modular Scale</h3>
                    <p className="text-muted-foreground">Built for global enterprises, LOGISTIK scales horizontally like a grid system, maintaining structural integrity at any volume.</p>
                 </div>
                 <div>
                    <h3 className="font-heading font-bold text-white mb-2 uppercase tracking-wider">04. Total Control</h3>
                    <p className="text-muted-foreground">Every node in your network is a programmable element. Design your supply chain like an architect designs a building.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}