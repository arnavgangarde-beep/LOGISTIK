import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Leaf, Train, Truck, AlertTriangle, ArrowRight, Activity } from "lucide-react";
import { useState } from "react";

export default function Sustainability() {
  const [shiftActive, setShiftActive] = useState(false);
  const [co2Saved, setCo2Saved] = useState(1450); // Initial CO2 saved in Tons

  const triggerCarbonShift = () => {
    setShiftActive(true);
    // Simulate AI running and increasing CO2 saved
    let savings = 0;
    const interval = setInterval(() => {
       savings += 45;
       setCo2Saved(prev => prev + 45);
       if (savings > 800) {
          clearInterval(interval);
          setShiftActive(false);
       }
    }, 100);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px] mx-auto font-sans">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-4">
          <div>
            <h1 className="font-heading font-black text-5xl tracking-tighter uppercase leading-tight mb-2 flex items-center gap-4">
              ESG & Carbon<br />
              Audit Engine
              <Leaf className="w-12 h-12 text-green-600 hidden md:block" />
            </h1>
            <p className="font-heading text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Scope 3 regulatory compliance monitoring<br />
              and autonomous de-carbonization routing.
            </p>
          </div>
          <div className="text-right">
             <div className="bg-primary text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 inline-block mb-1">Total Offset</div>
             <div className="font-heading font-black text-5xl tracking-tighter text-green-600">{co2Saved} <span className="text-xl text-primary">Tons</span></div>
          </div>
        </div>

        {/* TOP ROW: FUEL BURN & CARBON SHIFT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          
          {/* FUEL BURN TRACKER */}
          <div className="border-2 border-primary bg-background p-6 bauhaus-shadow flex flex-col justify-between">
            <h2 className="font-heading font-bold text-xs tracking-widest uppercase mb-6 flex items-center justify-between">
               Fuel Burn Trajectory <span className="text-[8px] bg-secondary text-white px-2 py-1">2026 Q3 LIMIT</span>
            </h2>
            
            <div className="space-y-8">
               {/* OCEAN */}
               <div>
                  <div className="flex justify-between font-heading font-bold text-[10px] uppercase tracking-widest mb-2">
                     <span>Ocean Transit</span>
                     <span className="text-muted-foreground">420k Gallons / 500k Limit</span>
                  </div>
                  <div className="h-6 w-full border-2 border-primary flex bg-muted relative">
                     <div className="h-full bg-secondary" style={{width: '84%'}}></div>
                     <div className="absolute top-[-10px] bottom-[-10px] w-1 bg-primary left-[84%]"></div>
                  </div>
               </div>

               {/* ROAD */}
               <div>
                  <div className="flex justify-between font-heading font-bold text-[10px] uppercase tracking-widest mb-2">
                     <span className="flex items-center gap-1"><AlertTriangle className="w-3 h-3 text-destructive"/> Road (Diesel Grid)</span>
                     <span className="text-destructive font-black">98% CAPACITY</span>
                  </div>
                  <div className="h-6 w-full border-2 border-primary flex bg-muted relative overflow-hidden">
                     <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] [background-size:4px_4px] opacity-20"></div>
                     <div className="h-full bg-destructive" style={{width: '98%'}}></div>
                  </div>
               </div>

               {/* AIR */}
               <div>
                  <div className="flex justify-between font-heading font-bold text-[10px] uppercase tracking-widest mb-2">
                     <span>Air Freight</span>
                     <span className="text-muted-foreground">112k Gallons / 300k Limit</span>
                  </div>
                  <div className="h-6 w-full border-2 border-primary flex bg-muted">
                     <div className="h-full bg-tertiary" style={{width: '37%'}}></div>
                  </div>
               </div>
            </div>
          </div>

          {/* AI CARBON SHIFT WIDGET */}
          <div className="border-2 border-primary bg-primary text-primary-foreground p-8 flex flex-col justify-between bauhaus-shadow relative overflow-hidden">
             <div className="absolute -right-10 -bottom-10 opacity-10 blur-sm pointer-events-none">
                <Leaf className="w-64 h-64" />
             </div>
             
             <div>
                <h2 className="font-heading font-bold text-xs tracking-widest uppercase mb-4 border-b border-white/20 pb-2">AI Carbon Shift Protocol</h2>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted mb-8 max-w-sm">
                  Autonomous engine has detected severe Scope 3 emission breach in the European Diesel Network. Initiating modal shift.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                   <div className="border-2 border-white/30 bg-black/20 p-4">
                      <div className="text-[10px] uppercase tracking-widest text-destructive mb-2 flex items-center justify-between">Source <Truck className="w-4 h-4"/></div>
                      <div className="font-heading font-black text-xl">Diesel Fleet</div>
                      <div className="text-[8px] mt-1 text-muted">14,000 Containers (EU)</div>
                   </div>
                   <div className="border-2 border-green-500 bg-green-500/20 p-4 relative">
                      <div className="text-[10px] uppercase tracking-widest text-green-400 mb-2 flex items-center justify-between">Destination <Train className="w-4 h-4"/></div>
                      <div className="font-heading font-black text-xl">Electric Rail</div>
                      <div className="text-[8px] mt-1 text-green-300">Net Zero Grid (EU)</div>
                      
                      {/* Arrow overlay */}
                      <div className="hidden md:absolute -left-6 top-1/2 -translate-y-1/2 bg-primary border-2 border-white/30 w-8 h-8 flex items-center justify-center rounded-full z-10">
                         <ArrowRight className="w-4 h-4"/>
                      </div>
                   </div>
                </div>
             </div>

             <button 
               onClick={triggerCarbonShift}
               disabled={shiftActive}
               className="w-full bg-accent text-primary border-2 border-primary py-4 font-heading font-black text-xs uppercase tracking-widest hover:bg-background transition-colors flex justify-center items-center gap-2"
             >
               {shiftActive ? <Activity className="w-5 h-5 animate-pulse" /> : <Leaf className="w-5 h-5" />}
               {shiftActive ? "RE-ROUTING TO RAIL NETWORK..." : "EXECUTE CARBON SHIFT"}
             </button>
          </div>

        </div>

        {/* BOTTOM LEDGER */}
        <div className="border-2 border-primary bg-background p-6 bauhaus-shadow mt-6">
           <div className="flex justify-between items-center mb-6 border-b-2 border-primary pb-2">
              <h3 className="font-heading font-bold text-xs uppercase tracking-widest">Regulatory Ledger (Immutable)</h3>
              <span className="text-[8px] bg-primary text-white font-bold uppercase py-1 px-2 tracking-widest">EU DIRECTIVE 2024 COMPLIANT</span>
           </div>
           
           <table className="w-full text-left">
              <thead>
                 <tr className="border-b-2 border-primary/20 text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
                    <th className="pb-3 px-2">TimeStamp</th>
                    <th className="pb-3 px-2">Event ID</th>
                    <th className="pb-3 px-2">Action Taken</th>
                    <th className="pb-3 px-2 text-right">CO2 Offset</th>
                 </tr>
              </thead>
              <tbody className="text-xs font-mono font-bold uppercase">
                 <tr className="border-b border-primary/10 hover:bg-muted/30">
                    <td className="py-3 px-2">2026-10-24 08:14</td>
                    <td className="py-3 px-2 text-primary">AUD-9912A</td>
                    <td className="py-3 px-2">Bypassed idle ships at Port of LA. Sent via rail.</td>
                    <td className="py-3 px-2 text-right text-green-600">-120 TONS</td>
                 </tr>
                 <tr className="border-b border-primary/10 hover:bg-muted/30">
                    <td className="py-3 px-2">2026-10-23 14:30</td>
                    <td className="py-3 px-2 text-primary">AUD-9911X</td>
                    <td className="py-3 px-2">Consolidated 14 LTL trucks into 2 FTL electric carriers.</td>
                    <td className="py-3 px-2 text-right text-green-600">-45 TONS</td>
                 </tr>
                 <tr className="hover:bg-muted/30">
                    <td className="py-3 px-2">2026-10-22 09:00</td>
                    <td className="py-3 px-2 text-primary">AUD-9910Y</td>
                    <td className="py-3 px-2">Purchased certified kelp forest carbon offset.</td>
                    <td className="py-3 px-2 text-right text-green-600">-500 TONS</td>
                 </tr>
              </tbody>
           </table>
        </div>

      </div>
    </DashboardLayout>
  );
}
