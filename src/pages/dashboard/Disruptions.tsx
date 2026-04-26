import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AlertTriangle, Clock, MapPin, Zap, CheckCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Disruptions() {
  const [disruptions, setDisruptions] = useState([
    { id: "ALT-901", date: "Today, 14:02", region: "Tier-2 Supplier, Taiwan", type: "Production Halt (Earthquake)", severity: "Critical", status: "Action Required" },
    { id: "ALT-902", date: "Today, 11:15", region: "Port of Rotterdam", type: "Unexpected Strike Action", severity: "Medium", status: "Optimized" },
    { id: "ALT-903", date: "Today, 09:40", region: "Air Freight CA-440", type: "Carbon Threshold Exceeded", severity: "High", status: "Action Required" },
    { id: "ALT-899", date: "Yesterday, 16:30", region: "Suez Canal", type: "Vessel Congestion", severity: "Medium", status: "Resolved" },
    { id: "ALT-898", date: "Yesterday, 14:00", region: "A9 Autobahn, Munich", type: "Traffic Gridlock", severity: "Medium", status: "Resolved" },
    { id: "ALT-890", date: "Oct 12, 08:00", region: "Port of LA", type: "Customs Delay", severity: "High", status: "Resolved" },
  ]);

  const [simulating, setSimulating] = useState<string | null>(null);

  const resolveDisruption = (id: string) => {
    setSimulating(id);
    setTimeout(() => {
      setDisruptions(prev => prev.map(d => d.id === id ? { ...d, status: "Optimized" } : d));
      setSimulating(null);
      toast.success(`Disruption ${id} auto-optimized by AI engine.`);
    }, 1500);
  };

  return (
    <DashboardLayout>
      <div className="space-y-8 max-w-[1400px] mx-auto font-sans">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-4">
          <div>
             <h1 className="font-heading font-black text-5xl tracking-tighter uppercase leading-tight mb-2">
              Anomaly<br />
              Log
             </h1>
             <p className="font-heading text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
               Comprehensive geometric logging of all<br />
               critical network disruptions.
             </p>
          </div>
          <div className="flex gap-2">
             <div className="bg-destructive text-white border-2 border-primary w-24 h-16 flex flex-col justify-center items-center bauhaus-shadow">
                <span className="font-heading font-black text-2xl">{disruptions.filter(d => d.status === 'Action Required').length}</span>
                <span className="text-[8px] uppercase font-bold tracking-widest mt-1 text-center leading-tight">Critical<br/>Nodes</span>
             </div>
             <div className="bg-accent text-primary border-2 border-primary w-24 h-16 flex flex-col justify-center items-center bauhaus-shadow">
                <span className="font-heading font-black text-2xl">{disruptions.filter(d => d.status === 'Optimized').length}</span>
                <span className="text-[8px] uppercase font-bold tracking-widest mt-1 text-center leading-tight">Auto-<br/>Resolved</span>
             </div>
          </div>
        </div>

        {/* LOG GRID */}
        <div className="grid grid-cols-1 gap-4">
            {disruptions.map((item) => {
              const isAction = item.status === 'Action Required';
              const isOptimized = item.status === 'Optimized';
              const isResolved = item.status === 'Resolved';
              return (
                <div key={item.id} className={`border-2 border-primary ${isAction ? 'bg-destructive/10' : 'bg-background'} bauhaus-shadow p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:bg-muted`}>
                  
                  <div className="flex gap-6 items-center">
                    <div className={`w-12 h-12 flex items-center justify-center border-2 ${isAction ? 'border-destructive bg-destructive text-white' : isOptimized ? 'border-primary bg-accent text-primary' : 'border-primary bg-muted text-muted-foreground'} bauhaus-shadow-sm`}>
                      {isAction ? <AlertTriangle className="h-5 w-5 animate-pulse" /> : isOptimized ? <Zap className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-primary text-primary-foreground font-heading font-bold text-[10px] uppercase px-2 py-0.5">{item.id}</span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground"><Clock className="inline h-3 w-3 mr-1 mb-0.5" />{item.date}</span>
                      </div>
                      <h3 className="font-heading font-black text-xl uppercase tracking-tighter">{item.region}</h3>
                      <p className="text-sm font-bold text-muted-foreground uppercase">{item.type}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:items-end gap-2 w-full md:w-auto">
                    <div className="text-[10px] font-heading font-bold uppercase tracking-widest flex items-center gap-1">
                       Severity: <span className={`${item.severity === 'Critical' ? 'text-destructive' : item.severity === 'High' ? 'text-tertiary' : 'text-primary'}`}>{item.severity}</span>
                    </div>

                    {isAction && (
                      <button 
                        onClick={() => resolveDisruption(item.id)}
                        disabled={simulating === item.id}
                        className="w-full md:w-auto bg-destructive text-white border-2 border-primary font-heading font-bold text-[10px] uppercase tracking-widest px-6 py-3 hover:bg-primary transition-colors flex items-center justify-center gap-2"
                      >
                         {simulating === item.id ? <Zap className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                         {simulating === item.id ? "Optimizing..." : "Execute Override"}
                      </button>
                    )}
                    
                    {isOptimized && (
                      <div className="w-full md:w-auto bg-accent text-primary border-2 border-primary font-heading font-bold text-[10px] uppercase tracking-widest px-6 py-3 text-center">
                         AI Optimized Route
                      </div>
                    )}

                    {isResolved && (
                      <div className="w-full md:w-auto bg-muted text-muted-foreground border-2 border-primary font-heading font-bold text-[10px] uppercase tracking-widest px-6 py-3 text-center">
                         Archived Record
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </DashboardLayout>
  );
}
