import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AlertTriangle, Clock, MapPin, Zap } from "lucide-react";

export default function Disruptions() {
  const allDisruptions = [
    { id: "ALT-901", date: "Today, 14:02", region: "Tier-2 Supplier, Taiwan", type: "Production Halt (Earthquake)", severity: "Critical", status: "Action Required" },
    { id: "ALT-902", date: "Today, 11:15", region: "Port of Rotterdam", type: "Unexpected Strike Action", severity: "Medium", status: "Optimized" },
    { id: "ALT-903", date: "Today, 09:40", region: "Air Freight CA-440", type: "Carbon Threshold Exceeded", severity: "High", status: "Action Required" },
    { id: "ALT-899", date: "Yesterday, 16:30", region: "Suez Canal", type: "Vessel Congestion", severity: "Medium", status: "Resolved" },
    { id: "ALT-898", date: "Yesterday, 14:00", region: "A9 Autobahn, Munich", type: "Traffic Gridlock", severity: "Medium", status: "Resolved" },
    { id: "ALT-890", date: "Oct 12, 08:00", region: "Port of LA", type: "Customs Delay", severity: "High", status: "Resolved" },
  ];

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Active & Past Disruptions</h1>
          <p className="text-sm text-muted-foreground">Comprehensive log of all supply chain anomalies.</p>
        </div>

        <div className="rounded-2xl border border-border bg-card/40 backdrop-blur-xl">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-accent" /> Disruption Log
            </h2>
          </div>
          
          <div className="divide-y divide-border">
            {allDisruptions.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
                <div className="flex gap-4 items-start">
                  <div className={`mt-1 h-2 w-2 rounded-full ${
                    item.severity === 'Critical' ? 'bg-destructive animate-pulse' :
                    item.severity === 'High' ? 'bg-destructive' : 'bg-yellow-500' 
                  }`} />
                  <div>
                    <h3 className="font-medium">{item.region}</h3>
                    <p className="text-sm text-muted-foreground">{item.type}</p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {item.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {item.id}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  {item.status === 'Action Required' && (
                    <span className="bg-destructive/10 text-destructive border border-destructive/20 px-3 py-1 rounded-full text-xs font-medium">
                      Action Required
                    </span>
                  )}
                  {item.status === 'Optimized' && (
                    <span className="bg-green-500/10 text-green-500 border border-green-500/20 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                      <Zap className="h-3 w-3" /> Auto-Optimized
                    </span>
                  )}
                  {item.status === 'Resolved' && (
                    <span className="bg-muted text-muted-foreground border border-border px-3 py-1 rounded-full text-xs font-medium">
                      Resolved
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
