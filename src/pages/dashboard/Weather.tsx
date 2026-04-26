import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AlertTriangle, CloudRain, Clock, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Weather() {
  const [bottlenecks, setBottlenecks] = useState([
    { id: "01", region: "NORTH ATLANTIC", issue: "CYCLONE FORMATION - DELAY 3H", color: "bg-red-200" },
    { id: "02", region: "SUEZ CANAL", issue: "SANDSTORM VISIBILITY - DELAY 2H", color: "bg-muted" },
    { id: "03", region: "PANAMA MAX", issue: "WATER LEVEL CRITICAL", color: "bg-muted" },
    { id: "04", region: "GULF OF ADEN SEA", issue: "MONSOON FRONT - NO EXCEPTION", color: "bg-accent" }
  ]);

  const [simulating, setSimulating] = useState(false);
  const [mitigated, setMitigated] = useState(false);

  const executeMitigation = () => {
    setSimulating(true);
    setTimeout(() => {
       setSimulating(false);
       setMitigated(true);
       setBottlenecks([
          { id: "01", region: "NORTH ATLANTIC", issue: "REROUTED - AVOIDING CYCLONE", color: "bg-primary" },
          { id: "02", region: "SUEZ CANAL", issue: "SANDSTORM VISIBILITY - DELAY 2H", color: "bg-muted" },
          { id: "03", region: "PANAMA MAX", issue: "WATER LEVEL CRITICAL", color: "bg-muted" },
          { id: "04", region: "GULF OF ADEN SEA", issue: "HOLD IN PORT ACTIVE", color: "bg-primary" }
       ]);
       toast.success("AI Mitigation Protocol executed across all nodes.");
    }, 2000);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-[1400px] mx-auto font-sans">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-4">
          <div>
            <h1 className="font-heading font-black text-5xl tracking-tighter uppercase leading-tight mb-2">
              Weather<br />
              Intelligence
            </h1>
            <p className="font-heading text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Geometric monitoring of meteorological<br />
              disruption on global asset trajectories.
            </p>
          </div>
          <div className="text-right">
             <div className="bg-secondary text-white font-heading font-bold text-[10px] uppercase tracking-widest px-2 py-0.5 inline-block mb-1">Live Feed</div>
             <div className="font-heading font-black text-3xl tracking-tighter">14:32:01</div>
          </div>
        </div>

        {/* TOP ROW: GLOBAL RISK + BOTTLENECKS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Global Risk - Large Yellow Block */}
          <div className={`${mitigated ? 'bg-background' : 'bg-accent'} transition-colors border-2 border-primary bauhaus-shadow min-h-[400px] flex flex-col justify-between p-6 relative`}>
            <div className="flex items-center gap-2">
              <h2 className="font-heading font-bold text-xs tracking-widest uppercase">Global Risk</h2>
            </div>
            {!mitigated && <AlertTriangle className="absolute top-6 left-28 h-5 w-5 animate-pulse" />}
            
            <div className="mt-auto">
              <div className="font-heading font-black text-8xl tracking-tighter flex items-end">
                {mitigated ? '14' : '82'}<span className="text-4xl mb-2">%</span>
              </div>
              <div className="h-4 w-full bg-secondary border-b-4 border-primary mt-4 relative transition-all">
                <div className="absolute right-0 top-0 h-full w-1/4 bg-primary/20"></div>
                {mitigated && <div className="absolute left-0 top-0 h-full w-[14%] bg-green-500 z-10"></div>}
              </div>
            </div>
          </div>

          {/* Active Bottlenecks Grid */}
          <div className="lg:col-span-2 border-2 border-primary bg-background p-6 bauhaus-shadow">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-heading font-bold text-xs tracking-widest uppercase">Active Bottlenecks</h2>
              <button className="bg-tertiary text-white font-heading font-bold px-3 py-1 text-[10px] uppercase tracking-wider hover:bg-primary transition-colors">View All Nodes</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 h-[320px]">
              {bottlenecks.map((bn) => (
                <div key={bn.id} className={`${bn.color} ${bn.color === 'bg-primary' ? 'text-primary-foreground' : 'text-primary'} border-2 border-primary p-4 flex flex-col justify-center relative hover:-translate-y-1 transition-transform cursor-pointer`}>
                  <div className="flex items-center gap-3">
                    <span className="bg-primary text-white border-2 border-transparent font-heading font-bold text-[10px] px-2 py-1">{bn.id}</span>
                    <div className="font-heading font-bold text-[10px] uppercase tracking-wider">{bn.region}<br/><span className={bn.color === 'bg-primary' ? 'text-primary-foreground/70' : 'text-primary/70'}>{bn.issue}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RADAR SCAN & IMPACT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border-2 border-primary bg-background p-6 bauhaus-shadow relative overflow-hidden flex flex-col">
             <h2 className="font-heading font-bold text-xs tracking-widest uppercase mb-8">Geometric Radar Scan : Sector 7-B</h2>
             {/* Abstract Radar Track */}
             <div className="flex-1 relative border-t border-b border-primary/20 w-full flex items-center justify-center min-h-[150px]">
               <div className="absolute w-full h-[1px] bg-secondary top-1/2"></div>
               {/* Red Box */}
               <div className={`absolute left-1/4 top-1/4 w-16 h-12 bg-secondary border-2 border-primary flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-widest transition-all duration-1000 ${mitigated ? 'translate-y-20 rotate-45' : ''}`}>TS-300</div>
               {/* Yellow Box */}
               <div className={`absolute left-1/2 bottom-1/4 w-20 h-10 ${mitigated ? 'bg-primary' : 'bg-accent'} border-2 border-primary -rotate-6 transition-all`}></div>
               {/* Blue Box */}
               <div className="absolute right-1/4 top-1/4 w-12 h-24 bg-tertiary border-2 border-primary rotate-12 flex items-center justify-center text-[8px] font-bold text-white uppercase tracking-widest -scale-y-100"><span className="-rotate-90">STORM</span></div>
             </div>
          </div>

          <div className="flex flex-col gap-6">
             <div className="border-2 border-primary bg-background p-6 bauhaus-shadow flex-1">
                <h2 className="font-heading font-bold text-xs tracking-widest uppercase mb-4 border-b-2 border-primary pb-2 flex items-center gap-2">
                   <div className="w-4 h-0.5 bg-secondary"></div> Impact Summary
                </h2>
                <div className="space-y-4">
                  <div className="flex gap-4">
                     <span className={`${mitigated ? 'bg-primary text-white' : 'bg-accent'} font-heading font-bold text-xs px-2 py-1 self-start transition-colors`}>{mitigated ? '+2%' : '-12%'}</span>
                     <div>
                        <div className="font-heading font-bold text-[10px] uppercase tracking-widest">Fuel Efficiency</div>
                        <p className="text-[10px] text-muted-foreground">{mitigated ? "Rerouting stabilized efficiency." : "Thermal headwinds on Route-4 are increasing consumption."}</p>
                     </div>
                  </div>
                  <div className="flex gap-4">
                     <span className={`${mitigated ? 'bg-muted text-muted-foreground' : 'bg-secondary text-white'} font-heading font-bold text-xs px-2 py-1 self-start transition-colors`}>{mitigated ? '+1H' : '+4H'}</span>
                     <div>
                        <div className="font-heading font-bold text-[10px] uppercase tracking-widest">Schedule Drift</div>
                        <p className="text-[10px] text-muted-foreground">{mitigated ? "Minimized delay through Northern Passage." : "Route design preempted for 12,000 TEUs due to tropical storm."}</p>
                     </div>
                  </div>
                </div>
             </div>
             <div className={`border-2 border-primary ${mitigated ? 'bg-background text-primary' : 'bg-primary text-primary-foreground'} p-6 flex flex-col justify-between bauhaus-shadow transition-colors`}>
                <div>
                   <h2 className={`font-heading font-bold text-xs tracking-widest uppercase mb-4 border-b ${mitigated ? 'border-primary' : 'border-primary-foreground/30'} pb-2`}>AI Mitigation Protocol</h2>
                   <div className="text-[10px] mb-2"><span className="text-tertiary font-bold uppercase tracking-widest">Action #1</span><br/>Reroute Vessels E-4, T-0, and W-2 through Northern Passage to avoid PTY-99.</div>
                   <div className="text-[10px] mb-4"><span className="text-secondary font-bold uppercase tracking-widest">Action #2</span><br/>Delay departure of Singapore-bound air freight by 340 minutes.</div>
                </div>
                {!mitigated ? (
                  <button onClick={executeMitigation} disabled={simulating} className="w-full bg-accent text-primary border-2 border-primary py-3 font-heading font-bold text-[10px] uppercase tracking-widest hover:bg-background transition-colors flex items-center justify-center gap-2">
                    {simulating ? <Zap className="w-4 h-4 animate-spin"/> : <Zap className="w-4 h-4"/>}
                    {simulating ? "Executing..." : "Execute All Recommendations"}
                  </button>
                ) : (
                  <div className="w-full bg-primary text-primary-foreground border-2 border-primary py-3 font-heading font-bold text-[10px] uppercase tracking-widest text-center">
                    Protocol Deployed
                  </div>
                )}
             </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
