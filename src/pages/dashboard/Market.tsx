import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { ArrowDownRight, ArrowUpRight, Anchor, Plane, Search, Clock, Cpu } from "lucide-react";
import { useState } from "react";

export default function Market() {
  const [bidding, setBidding] = useState<string | null>(null);

  const executeBid = (carrier: string) => {
     setBidding(carrier);
     setTimeout(() => {
        setBidding(null);
     }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px] mx-auto font-sans">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-4">
          <div>
            <h1 className="font-heading font-black text-5xl tracking-tighter uppercase leading-tight mb-2">
              Market<br />
              Intelligence
            </h1>
            <p className="font-heading text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Predictive freight pricing and spot-bidding<br />
              powered by neural forecasting.
            </p>
          </div>
          <div className="text-right">
             <div className="bg-secondary text-white font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 inline-block mb-1">Global TEU Index</div>
             <div className="font-heading font-black text-5xl tracking-tighter flex items-end justify-end gap-2">
                $4,420 <ArrowUpRight className="text-destructive mb-2 w-8 h-8" />
             </div>
          </div>
        </div>

        {/* AI PREDICTION HUD */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
           <div className="lg:col-span-2 border-2 border-primary bg-background p-6 bauhaus-shadow relative overflow-hidden">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="font-heading font-bold text-xs tracking-widest uppercase">Price Forecast: Trans-Pacific Eastbound</h2>
                 <span className="text-[10px] bg-primary text-primary-foreground font-bold tracking-widest uppercase px-2 py-0.5">24H PROJECTION</span>
              </div>
              
              {/* Abstract Chart Representation */}
              <div className="h-[200px] w-full border border-primary/20 relative flex items-end pb-8 px-4 gap-2">
                 <div className="absolute w-full h-[1px] bg-destructive top-1/2 left-0 -translate-y-1/2 border-dashed border-t-2 border-destructive"></div>
                 <div className="absolute top-1/2 left-4 -translate-y-6 bg-destructive text-destructive-foreground text-[8px] font-bold px-1 uppercase tracking-widest">$4500 RESISTANCE</div>

                 <div className="w-1/6 bg-primary/20 h-[60%] relative hover:bg-primary/40"><div className="absolute -bottom-6 w-full text-center text-[10px] font-bold">-5d</div></div>
                 <div className="w-1/6 bg-primary/40 h-[65%] relative hover:bg-primary/60"><div className="absolute -bottom-6 w-full text-center text-[10px] font-bold">-4d</div></div>
                 <div className="w-1/6 bg-primary/60 h-[80%] relative hover:bg-primary/80"><div className="absolute -bottom-6 w-full text-center text-[10px] font-bold">-3d</div></div>
                 <div className="w-1/6 bg-primary h-[90%] relative hover:bg-primary/80"><div className="absolute -bottom-6 w-full text-center text-[10px] font-bold">-2d</div></div>
                 <div className="w-1/6 bg-secondary h-[95%] border-2 border-primary relative shadow-[0_0_15px_#E63B2E] z-10"><div className="absolute -bottom-6 text-secondary w-full text-center text-[10px] font-bold">TODAY</div></div>
                 <div className="w-1/6 bg-muted border-2 border-dashed border-primary h-[70%] relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(hsl(var(--primary))_1px,transparent_1px)] [background-size:4px_4px] opacity-30"></div>
                 </div>
              </div>
           </div>

           <div className="border-2 border-primary bg-primary text-primary-foreground p-8 bauhaus-shadow flex flex-col justify-between">
              <div>
                 <h2 className="font-heading font-bold text-xs tracking-widest uppercase mb-4 border-b border-primary-foreground/20 pb-2 flex items-center justify-between">
                    Algorithm Directive <Cpu className="w-4 h-4"/>
                 </h2>
                 <div className="text-[10px] uppercase font-bold tracking-widest mb-6 leading-relaxed">
                    MARKET SATURATION DETECTED IN SHANGHAI TERMINAL. SPOT RATES EXPECTED TO CRASH <span className="text-accent text-sm">18%</span> WITHIN 24 HOURS AS IDLE TONNAGE INCREASES.
                 </div>
              </div>
              <div>
                 <div className="font-heading font-black text-6xl tracking-tighter mb-2 text-accent">WAIT.</div>
                 <div className="bg-background text-primary font-heading font-bold text-[10px] tracking-widest uppercase p-3 border-2 border-primary-foreground flex justify-between items-center cursor-not-allowed opacity-80">
                    Confidence Interval <span>94.2%</span>
                 </div>
              </div>
           </div>
        </div>

        {/* CARRIER BIDS TABLE */}
        <div className="border-2 border-primary bg-background p-6 bauhaus-shadow mt-6">
           <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading font-bold text-xs tracking-widest uppercase flex items-center gap-2"><Anchor className="w-4 h-4" /> Live Carrier Bids</h2>
              <div className="flex bg-muted border-2 border-primary w-64 items-center px-2">
                 <Search className="w-3 h-3 text-primary mr-2" />
                 <input type="text" placeholder="FILTER ORIGIN/DESTINATION..." className="w-full bg-transparent text-[8px] font-bold uppercase tracking-widest outline-none py-2" />
              </div>
           </div>

           <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="bg-primary text-primary-foreground text-[10px] font-heading font-bold uppercase tracking-widest">
                       <th className="p-3">Carrier / Alliance</th>
                       <th className="p-3">Route Vector</th>
                       <th className="p-3">Service Speed</th>
                       <th className="p-3 text-right">Spot Rate (TEU)</th>
                       <th className="p-3 text-center">Action</th>
                    </tr>
                 </thead>
                 <tbody className="text-xs uppercase font-bold">
                    <tr className="border-b-2 border-primary/20 hover:bg-muted/50 transition-colors">
                       <td className="p-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-secondary border-2 border-primary"></div>
                          <div>MAERSK LINE<br/><span className="text-[8px] text-muted-foreground tracking-widest">2M ALLIANCE</span></div>
                       </td>
                       <td className="p-4"><span className="text-primary/70">SHG</span>-&gt; <span className="text-primary">LAX</span></td>
                       <td className="p-4 flex items-center gap-2"><Clock className="w-3 h-3" /> 14 DAYS</td>
                       <td className="p-4 text-right font-heading font-black text-xl">$4,450</td>
                       <td className="p-4">
                          <button onClick={() => executeBid('MAERSK')} className="w-full bg-background border-2 border-primary text-[10px] tracking-widest p-2 hover:bg-primary hover:text-white transition-colors">
                             {bidding === 'MAERSK' ? 'TRANSMITTING...' : 'PLACE BID'}
                          </button>
                       </td>
                    </tr>
                    
                    <tr className="border-b-2 border-primary/20 hover:bg-muted/50 transition-colors">
                       <td className="p-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#0055FF] border-2 border-primary"></div>
                          <div>MSC<br/><span className="text-[8px] text-muted-foreground tracking-widest">2M ALLIANCE</span></div>
                       </td>
                       <td className="p-4"><span className="text-primary/70">SHG</span>-&gt; <span className="text-primary">LGB</span></td>
                       <td className="p-4 flex items-center gap-2"><Clock className="w-3 h-3 text-destructive" /> 18 DAYS</td>
                       <td className="p-4 text-right font-heading font-black text-xl">$4,100</td>
                       <td className="p-4">
                          <button onClick={() => executeBid('MSC')} className="w-full bg-background border-2 border-primary text-[10px] tracking-widest p-2 hover:bg-primary hover:text-white transition-colors">
                             {bidding === 'MSC' ? 'TRANSMITTING...' : 'PLACE BID'}
                          </button>
                       </td>
                    </tr>

                    <tr className="border-b-2 border-primary/20 hover:bg-muted/50 transition-colors">
                       <td className="p-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-accent border-2 border-primary"></div>
                          <div>EVERGREEN<br/><span className="text-[8px] text-muted-foreground tracking-widest">OCEAN ALLIANCE</span></div>
                       </td>
                       <td className="p-4"><span className="text-primary/70">SHG</span>-&gt; <span className="text-primary">LAX</span></td>
                       <td className="p-4 flex items-center gap-2"><Clock className="w-3 h-3" /> 16 DAYS</td>
                       <td className="p-4 text-right font-heading font-black text-xl text-secondary relative">
                          $4,250
                          <div className="absolute right-0 -top-2 text-[8px] bg-secondary text-white px-1">AI CHOICE</div>
                       </td>
                       <td className="p-4">
                          <button onClick={() => executeBid('EVERGREEN')} className="w-full bg-secondary text-white border-2 border-primary text-[10px] tracking-widest p-2 hover:bg-primary transition-colors">
                             {bidding === 'EVERGREEN' ? 'TRANSMITTING...' : 'PLACE BID'}
                          </button>
                       </td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
