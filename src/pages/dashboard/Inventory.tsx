import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AlertTriangle, Cpu, Factory, Truck, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";

// Structure of the multi-tier graph
const initialNodes = {
  tier3: [
    { id: "T3-A", name: "Silicon Foundries", location: "Taiwan", status: "CRITICAL", alert: "EARTHQUAKE", type: "Raw Silicates" },
    { id: "T3-B", name: "Lithium Mines", location: "Chile", status: "STABLE", type: "Raw Elements" },
    { id: "T3-C", name: "Aluminum Smelters", location: "Canada", status: "STABLE", type: "Raw Metals" },
  ],
  tier2: [
    { id: "T2-A", name: "Microchip Fab", location: "Taiwan", status: "CRITICAL", alert: "CASCADING FAILURE", dependency: "T3-A", type: "Processors" },
    { id: "T2-B", name: "Battery Assembly", location: "Nevada, US", status: "STABLE", dependency: "T3-B", type: "Power Cells" },
    { id: "T2-C", name: "Chassis Stamping", location: "Mexico", status: "STABLE", dependency: "T3-C", type: "Frames" },
  ],
  tier1: [
    { id: "T1-A", name: "Electronics Subsystems", location: "Shenzhen, CN", status: "CRITICAL", alert: "SUPPLY STARVED", dependency: "T2-A", type: "Motherboards" },
    { id: "T1-B", name: "Drivetrain Integration", location: "Detroit, US", status: "STABLE", dependency: "T2-B", type: "Motors" },
  ],
  assembly: [
    { id: "ASM-1", name: "Final Assembly Hub", location: "Berlin, DE", status: "WARNING", alert: "LINE HALT RISK (T-36 HOURS)", type: "Vehicles" }
  ]
};

export default function InventoryNetwork() {
  const [nodes, setNodes] = useState(initialNodes);
  const [isSimulating, setIsSimulating] = useState(false);

  const triggerReroute = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Heal the network by finding alternative supplier
      setNodes({
        ...nodes,
        tier3: [
           { id: "T3-A", name: "Silicon Foundries", location: "Texas, US", status: "STABLE", alert: "FAILOVER ACTIVATED", type: "Raw Silicates" },
           ...nodes.tier3.slice(1)
        ],
        tier2: nodes.tier2.map(n => n.id === "T2-A" ? { ...n, status: "STABLE", alert: "RE-ROUTED VIA AIR-FREIGHT", location: "Texas, US" } : n),
        tier1: nodes.tier1.map(n => n.id === "T1-A" ? { ...n, status: "STABLE", alert: "INBOUND SECURED" } : n),
        assembly: [{ ...nodes.assembly[0], status: "STABLE", alert: "PRODUCTION NOMINAL" }]
      });
      setIsSimulating(false);
    }, 2000);
  };

  const NodeCard = ({ node, tier }: { node: any, tier: string }) => {
    const isCritical = node.status === "CRITICAL";
    const isWarning = node.status === "WARNING";
    
    let bgColor = "bg-background";
    let textColor = "text-primary";
    
    if (isCritical) {
      bgColor = "bg-destructive";
      textColor = "text-destructive-foreground";
    } else if (isWarning) {
      bgColor = "bg-accent";
      textColor = "text-primary";
    }

    return (
      <div className={`relative border-2 border-primary ${bgColor} ${textColor} p-4 bauhaus-shadow min-w-[220px] transition-all`}>
         <div className="flex justify-between items-start mb-4">
            <div className="font-heading font-black text-2xl">{node.id}</div>
            <div className="text-[8px] font-bold uppercase tracking-widest bg-primary text-primary-foreground px-2 py-1">{tier}</div>
         </div>
         <div className="space-y-1">
            <div className="font-heading font-bold uppercase text-[10px] tracking-wider truncate">{node.name}</div>
            <div className={`text-[10px] font-bold ${isCritical ? 'text-white/80' : 'text-muted-foreground'}`}>{node.location}</div>
            <div className={`text-[10px] ${isCritical ? 'text-white' : 'text-primary'} font-bold`}>[ {node.type} ]</div>
         </div>
         
         {(isCritical || isWarning || node.alert) && (
           <div className={`mt-4 border-t-2 ${isCritical ? 'border-primary/20' : 'border-primary'} pt-2 flex items-center gap-1 font-heading font-bold text-[8px] uppercase tracking-widest`}>
              {(isCritical || isWarning) && <AlertTriangle className="w-3 h-3 animate-pulse" />}
              {!isCritical && !isWarning && <CheckCircle2 className="w-3 h-3 text-green-600" />}
              {node.alert}
           </div>
         )}
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1400px] mx-auto font-sans">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-4">
          <div>
            <h1 className="font-heading font-black text-5xl tracking-tighter uppercase leading-tight mb-2">
              Deep-Tier<br />
              Node Graph
            </h1>
            <p className="font-heading text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Multi-tier dependency mapping and cascading<br />
              failure detection architecture.
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
             <button 
                onClick={triggerReroute}
                disabled={isSimulating}
                className="bg-primary text-primary-foreground font-heading font-bold tracking-widest uppercase px-6 py-3 border-2 border-primary hover:bg-background hover:text-primary transition-colors flex items-center gap-2"
              >
                {isSimulating ? <Cpu className="w-4 h-4 animate-spin" /> : <Factory className="w-4 h-4" />}
                {isSimulating ? "Running AI Failover..." : "Execute AI Failover"}
             </button>
          </div>
        </div>

        {/* GRAPH CANVAS */}
        <div className="border-2 border-primary bg-muted/20 bauhaus-shadow overflow-hidden relative min-h-[600px] p-8">
           <div className="absolute inset-0 bg-[radial-gradient(#1a1a1a_2px,transparent_2px)] [background-size:32px_32px] opacity-5"></div>
           
           <div className="relative z-10 flex flex-col md:flex-row justify-between h-full gap-8 overflow-x-auto pb-4">
              
              {/* TIER 3 */}
              <div className="flex flex-col gap-8 flex-1 min-w-[220px]">
                 <div className="font-heading font-black text-xl uppercase tracking-tighter border-b-4 border-primary pb-2">Tier 3 <span className="text-[10px] font-bold text-muted-foreground tracking-widest ml-2">Raw Materials</span></div>
                 {nodes.tier3.map(node => <NodeCard key={node.id} node={node} tier="T-3" />)}
              </div>

              {/* TIER 2 */}
              <div className="flex flex-col gap-16 flex-1 min-w-[220px] pt-12 relative">
                 <div className="font-heading font-black text-xl uppercase tracking-tighter border-b-4 border-primary pb-2">Tier 2 <span className="text-[10px] font-bold text-muted-foreground tracking-widest ml-2">Sub-Assembly</span></div>
                 {nodes.tier2.map(node => <NodeCard key={node.id} node={node} tier="T-2" />)}
                 {/* Decorative connecting lines */}
                 <div className="hidden lg:block absolute left-[-2rem] top-40 w-8 h-[2px] bg-primary"></div>
                 <div className="hidden lg:block absolute left-[-2rem] top-32 w-[2px] h-32 bg-primary"></div>
                 <div className="hidden lg:block absolute left-[-2rem] top-[60%] w-8 h-[2px] bg-primary"></div>
                 <div className="hidden lg:block absolute left-[-2rem] bottom-32 w-8 h-[2px] bg-primary"></div>
              </div>

              {/* TIER 1 */}
              <div className="flex flex-col justify-center gap-16 flex-1 min-w-[220px] relative">
                 <div className="font-heading font-black text-xl uppercase tracking-tighter border-b-4 border-primary pb-2 absolute top-0 w-full">Tier 1 <span className="text-[10px] font-bold text-muted-foreground tracking-widest ml-2">Components</span></div>
                 {nodes.tier1.map(node => <NodeCard key={node.id} node={node} tier="T-1" />)}
                 <div className="hidden lg:block absolute left-[-2rem] top-1/3 w-8 h-[2px] bg-primary"></div>
                 <div className="hidden lg:block absolute left-[-2rem] bottom-1/3 w-8 h-[2px] bg-primary"></div>
              </div>

              {/* FINAL ASSEMBLY */}
              <div className="flex flex-col justify-center gap-16 flex-1 min-w-[240px] relative">
                 <div className="font-heading font-black text-xl uppercase tracking-tighter border-b-4 border-primary pb-2 absolute top-0 w-full">Final <span className="text-[10px] font-bold text-muted-foreground tracking-widest ml-2">Production</span></div>
                 {nodes.assembly.map(node => <NodeCard key={node.id} node={node} tier="CORE" />)}
                 <div className="hidden lg:block absolute left-[-2rem] top-1/2 w-8 h-[2px] bg-primary"></div>
                 <div className="hidden lg:block absolute left-[-3rem] top-1/3 w-[2px] h-[17%] bg-primary"></div>
                 <div className="hidden lg:block absolute left-[-3rem] bottom-1/3 w-[2px] h-[17%] bg-primary"></div>
              </div>
              
           </div>
        </div>

        {/* IMPACT SUMMARY FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-primary text-primary-foreground border-2 border-primary p-6 flex flex-col justify-between bauhaus-shadow">
              <h3 className="font-heading font-bold text-xs uppercase tracking-widest mb-4">Network Integrity</h3>
              <div className="font-heading font-black text-6xl">{isSimulating || nodes.tier3[0].status === "CRITICAL" ? '66%' : '99%'}</div>
           </div>
           <div className="md:col-span-2 bg-background border-2 border-primary p-6 bauhaus-shadow">
              <h3 className="font-heading font-bold text-xs uppercase tracking-widest mb-4 border-b-2 border-primary pb-2">Diagnostic Log</h3>
              <div className="space-y-3 font-mono text-[10px] uppercase">
                 <div className="flex gap-4"><span className="text-muted-foreground">14:02:11</span> <span className="text-destructive font-bold">CRITICAL: SEISMIC EVENT DETECTED SECTOR TAIWAN</span></div>
                 <div className="flex gap-4"><span className="text-muted-foreground">14:02:15</span> <span className="text-primary font-bold">PROPAGATING IMPACT TRAJECTORY DOWNSTREAM...</span></div>
                 <div className="flex gap-4"><span className="text-muted-foreground">14:02:18</span> <span className="text-accent font-bold">WARNING: BERLIN ASSEMBLY WILL STARVE IN 36H</span></div>
                 {nodes.tier3[0].status === "STABLE" && (
                   <>
                     <div className="flex gap-4"><span className="text-muted-foreground">14:04:00</span> <span className="text-tertiary font-bold">AUTO-FAILOVER EXECUTED. SOURCING TEXAS CHIP FAB.</span></div>
                     <div className="flex gap-4"><span className="text-muted-foreground">14:04:12</span> <span className="text-green-600 font-bold">AIR FREIGHT CHARTERED. PRODUCTION NOMINAL.</span></div>
                   </>
                 )}
              </div>
           </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
