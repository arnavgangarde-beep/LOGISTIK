import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ArrowRight, Package } from "lucide-react";

export default function Shipments() {
  const shipments = [
    { id: "LK-9022-X", origin: "BER", dest: "SIN", label: "URGENT", color: "bg-tertiary", progress: "85%", eta: "OCT 24, 14:00", weight: "1,240 KG" },
    { id: "LK-5510-Y", origin: "RTM", dest: "NYC", label: "STANDARD", color: "bg-secondary", progress: "60%", eta: "NOV 02, 08:30", weight: "42 TEUs" },
    { id: "LK-4401-Z", origin: "COL", dest: "MIA", label: "DELAYED", color: "bg-destructive", alert: true, progress: "30%", eta: "0.5 HOURS", weight: "HOLD" },
    { id: "LK-7192-A", origin: "SHG", dest: "LON", label: "IN ROUTE", color: "bg-accent", progress: "90%", eta: "OCT 30, 22:00", weight: "850 m³" },
  ];
  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px] mx-auto font-sans">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-4">
          <div>
            <h1 className="font-heading font-black text-5xl tracking-tighter uppercase leading-tight mb-2">
              Global<br />
              Shipments
            </h1>
            <p className="font-heading text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Active logistics monitoring and real-time transit<br />
              management across all global nodes.
            </p>
          </div>
          <div className="flex gap-2">
             <div className="bg-tertiary text-white border-2 border-primary w-16 h-16 flex flex-col justify-center items-center bauhaus-shadow cursor-pointer hover:bg-primary transition-colors">
                <span className="font-heading font-black text-2xl">124</span>
                <span className="text-[8px] uppercase font-bold tracking-widest mt-1">Active</span>
             </div>
             <div className="bg-accent text-primary border-2 border-primary w-16 h-16 flex flex-col justify-center items-center bauhaus-shadow cursor-pointer hover:bg-background transition-colors">
                <span className="font-heading font-black text-2xl">08</span>
                <span className="text-[8px] uppercase font-bold tracking-widest mt-1">Alerts</span>
             </div>
          </div>
        </div>

        {/* STATUS BARS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
           <div className="border-2 border-primary bg-background p-3 flex flex-col gap-2">
              <div className="flex justify-between text-[8px] font-heading font-bold uppercase tracking-widest"><span>Sea Freight</span><span>80%</span></div>
              <div className="h-4 w-full border-2 border-primary flex"><div className="w-[80%] h-full bg-tertiary"></div></div>
           </div>
           <div className="border-2 border-primary bg-background p-3 flex flex-col gap-2">
              <div className="flex justify-between text-[8px] font-heading font-bold uppercase tracking-widest"><span>Air Freight</span><span>45%</span></div>
              <div className="h-4 w-full border-2 border-primary flex"><div className="w-[45%] h-full bg-secondary"></div></div>
           </div>
           <div className="border-2 border-primary bg-background p-3 flex flex-col gap-2">
              <div className="flex justify-between text-[8px] font-heading font-bold uppercase tracking-widest"><span>Road Network</span><span>90%</span></div>
              <div className="h-4 w-full border-2 border-primary flex"><div className="w-[90%] h-full bg-primary"></div></div>
           </div>
           <div className="border-2 border-primary bg-background p-3 flex flex-col gap-2">
              <div className="flex justify-between text-[8px] font-heading font-bold uppercase tracking-widest"><span>Rail Freight</span><span>60%</span></div>
              <div className="h-4 w-full border-2 border-primary flex"><div className="w-[60%] h-full bg-accent"></div></div>
           </div>
        </div>

        {/* SHIPMENTS LIST & MAP */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
           <div className="lg:col-span-1 flex flex-col gap-4">
              {shipments.map((s) => (
                 <div key={s.id} className={`${s.alert ? 'bg-secondary/10' : 'bg-background'} border-2 border-primary bauhaus-shadow flex flex-col transition-all hover:-translate-y-1 cursor-pointer`}>
                    <div className="flex justify-between items-center bg-primary text-primary-foreground p-2 text-[10px] font-heading font-bold uppercase tracking-widest">
                       <span>{s.id}</span>
                       <div className="flex gap-2 items-center">
                         <span>{s.label}</span>
                         {s.alert && <div className="w-2 h-2 bg-secondary rounded-none shadow-[0_0_8px_red]"></div>}
                       </div>
                    </div>
                    <div className="p-4 space-y-4">
                       <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 ${s.color} border-2 border-primary flex items-center justify-center`}>
                            <Package className={`h-4 w-4 ${s.color === 'bg-accent' ? 'text-primary' : 'text-white'}`} />
                          </div>
                          <div className="flex-1">
                             <div className="flex justify-between items-center text-[10px] font-heading font-bold uppercase tracking-widest mb-1">
                                <span>{s.origin}</span>
                                <div className="h-[2px] flex-1 mx-2 bg-muted relative">
                                   <div className={`absolute top-0 left-0 h-full ${s.color}`} style={{width: s.progress}}></div>
                                </div>
                                <span>{s.dest}</span>
                             </div>
                          </div>
                       </div>
                       <div className="flex justify-between items-end border-t-2 border-primary/20 pt-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground">
                          <div>ETA<br/><span className="text-primary text-xs">{s.eta}</span></div>
                          <div className="text-right">WEIGHT<br/><span className="text-primary text-xs">{s.weight}</span></div>
                       </div>
                    </div>
                    {s.alert ? (
                      <div className="bg-secondary text-white text-[10px] font-heading font-bold uppercase tracking-widest p-2 text-center border-t-2 border-primary hover:bg-primary transition-colors flex items-center justify-center gap-2">
                         RESOLVE ALERT <ArrowRight className="w-3 h-3"/>
                      </div>
                    ) : (
                      <div className="bg-background text-primary text-[10px] font-heading font-bold uppercase tracking-widest p-2 text-center border-t-2 border-primary hover:bg-muted transition-colors flex items-center justify-center gap-2">
                         VIEW LOGS <ArrowRight className="w-3 h-3"/>
                      </div>
                    )}
                 </div>
              ))}
           </div>
           
           <div className="lg:col-span-2 border-2 border-primary bg-primary p-4 bauhaus-shadow min-h-[500px] flex flex-col relative overflow-hidden">
               <div className="flex justify-between items-center text-primary-foreground mb-4">
                 <h2 className="font-heading font-bold text-xs tracking-widest uppercase">Live Node Network</h2>
                 <span className="border-2 border-primary-foreground/30 px-2 py-1 text-[8px] font-bold uppercase tracking-widest">Global Scan Active</span>
               </div>
               
               {/* Abstract dark map with nodes */}
               <div className="flex-1 w-full relative">
                  <div className="absolute inset-0 bg-[#0A0A0A] border-2 border-primary flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
                    {/* Simulated points */}
                    <div className="absolute top-[30%] left-[20%] w-2 h-2 bg-accent shadow-[0_0_10px_#FFCC00]"></div>
                    <div className="absolute top-[40%] left-[40%] w-2 h-2 bg-tertiary"></div>
                    <div className="absolute bottom-[20%] right-[30%] w-3 h-3 bg-secondary animate-pulse shadow-[0_0_10px_#E63B2E]"></div>
                    
                    {/* Geometric scanner box */}
                    <div className="absolute bottom-[10%] right-[20%] w-48 h-32 border-2 border-tertiary opacity-50 relative">
                       <div className="absolute w-full h-[1px] bg-tertiary top-1/2"></div>
                       <div className="absolute h-full w-[1px] bg-tertiary left-1/2"></div>
                    </div>
                  </div>
               </div>
           </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
