import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, Cpu, ShieldCheck, Leaf, Key, Activity, Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const [costThreshold, setCostThreshold] = useState([500]);
  const [delayThreshold, setDelayThreshold] = useState([2]);
  const [isSaving, setIsSaving] = useState(false);
  const [killSwitch, setKillSwitch] = useState(false);
  const [carbonStrategy, setCarbonStrategy] = useState('aggressive');

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("System configurations securely updated on network.");
    }, 1000);
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-[1400px] space-y-8 font-sans">
        
        {/* HEADER */}
        <div className="flex justify-between items-end border-b-2 border-primary pb-4">
          <div>
            <h1 className="font-heading font-black text-5xl tracking-tighter uppercase leading-tight mb-2">
              System<br />
              Config
            </h1>
            <p className="font-heading text-[10px] font-bold tracking-widest uppercase text-muted-foreground">
              Manage global thresholds, AI autonomy parameters,<br />
              and network integration protocols.
            </p>
          </div>
          <div className="text-right">
             <button 
                onClick={handleSave} 
                disabled={isSaving}
                className="bg-primary text-primary-foreground font-heading font-bold text-[10px] uppercase tracking-widest px-8 py-4 border-2 border-primary hover:bg-background hover:text-primary transition-colors flex items-center gap-2 bauhaus-shadow"
             >
                {isSaving ? <Zap className="w-4 h-4 animate-spin"/> : <Zap className="w-4 h-4"/>}
                {isSaving ? "Syncing..." : "Sync Configuration"}
             </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* AI Autonomy Settings */}
          <div className="border-2 border-primary bg-background p-6 bauhaus-shadow">
            <h2 className="font-heading font-black text-2xl tracking-tighter uppercase flex items-center gap-2 mb-8 border-b-2 border-primary pb-2">
              <Cpu className="h-6 w-6 text-accent" /> Autonomy Engine
            </h2>
            
            <div className="space-y-8">
              <div className="flex items-center justify-between p-4 border-2 border-primary bg-muted/20">
                <div>
                  <h3 className="font-heading font-bold text-xs uppercase tracking-widest text-destructive">Master Kill Switch</h3>
                  <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">Suspend all autonomous rerouting execution.</p>
                </div>
                <Switch checked={killSwitch} onCheckedChange={setKillSwitch} className="data-[state=checked]:bg-destructive" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-xs uppercase tracking-widest">Max Auto-Approval Cost Differential</h3>
                  <span className="font-heading font-black text-xl text-primary bg-accent px-3 py-1 border-2 border-primary">${costThreshold[0]}</span>
                </div>
                <Slider max={5000} step={100} value={costThreshold} onValueChange={setCostThreshold} className="py-2" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase">AI requires manual approval if reroute exceeds original budget by this amount.</p>
              </div>

              <div className="space-y-4 border-t-2 border-primary/20 pt-8">
                <div className="flex items-center justify-between">
                  <h3 className="font-heading font-bold text-xs uppercase tracking-widest">Critical Delay Auto-Trigger</h3>
                  <span className="font-heading font-black text-xl text-primary bg-secondary px-3 py-1 text-white border-2 border-primary">{delayThreshold[0]}H</span>
                </div>
                <Slider max={24} step={1} value={delayThreshold} onValueChange={setDelayThreshold} className="py-2" />
                <p className="text-[10px] font-bold text-muted-foreground uppercase">Trigger auto-healing strictly if projected delay exceeds this timeframe.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Environmental Settings */}
            <div className="border-2 border-primary bg-background p-6 bauhaus-shadow flex-1">
              <h2 className="font-heading font-black text-2xl tracking-tighter uppercase flex items-center gap-2 mb-8 border-b-2 border-primary pb-2">
                <Leaf className="h-6 w-6 text-green-500" /> Carbon Strategy
              </h2>
              <div className="grid grid-cols-1 gap-4">
                <div onClick={() => setCarbonStrategy('aggressive')} className={`p-4 border-2 ${carbonStrategy === 'aggressive' ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/20 bg-background'} cursor-pointer transition-colors`}>
                  <div className="font-heading font-bold text-xs uppercase tracking-widest flex items-center justify-between mb-2">
                    Aggressive Reduction {carbonStrategy === 'aggressive' && <div className="h-3 w-3 bg-secondary border border-white" />}
                  </div>
                  <p className={`text-[10px] font-bold uppercase ${carbonStrategy === 'aggressive' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>AI optimizes heavily for lowest emissions, even if slower.</p>
                </div>
                <div onClick={() => setCarbonStrategy('balanced')} className={`p-4 border-2 ${carbonStrategy === 'balanced' ? 'border-primary bg-primary text-primary-foreground' : 'border-primary/20 bg-background'} cursor-pointer transition-colors`}>
                  <div className="font-heading font-bold text-xs uppercase tracking-widest flex items-center justify-between mb-2">
                    Balanced Approach {carbonStrategy === 'balanced' && <div className="h-3 w-3 bg-secondary border border-white" />}
                  </div>
                  <p className={`text-[10px] font-bold uppercase ${carbonStrategy === 'balanced' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>Equal weight between transit speed, cost, and ESG targets.</p>
                </div>
              </div>
            </div>

            {/* IoT Telemetry */}
            <div className="border-2 border-primary bg-background p-6 bauhaus-shadow flex-1">
              <h2 className="font-heading font-black text-2xl tracking-tighter uppercase flex items-center gap-2 mb-6 border-b-2 border-primary pb-2">
                <Activity className="h-6 w-6 text-blue-500" /> Sensor Integration
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-heading font-bold text-xs uppercase tracking-widest">Cold-Chain Tolerance Limit</h3>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">Trigger severity-high when temp deviates &gt; 1.5°C.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between border-t border-primary/20 pt-4">
                  <div>
                    <h3 className="font-heading font-bold text-xs uppercase tracking-widest">Kinetic Shock Detector</h3>
                    <p className="text-[10px] font-bold text-muted-foreground mt-1 uppercase">Flag shipments for inspection above 10g impact.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>

          {/* Integration & Database */}
          <div className="border-2 border-primary bg-primary text-primary-foreground p-6 bauhaus-shadow md:col-span-2">
             <div className="flex items-center justify-between border-b-2 border-primary-foreground/30 mb-8 pb-4">
                <h2 className="font-heading font-black text-3xl tracking-tighter uppercase flex items-center gap-4">
                  <Key className="h-8 w-8 text-tertiary" /> External Protocols
                </h2>
                <div className="bg-tertiary text-white font-heading font-bold text-[10px] px-3 py-1 uppercase tracking-widest">SysAdmin Only</div>
             </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-heading font-bold text-[10px] uppercase tracking-widest text-primary-foreground/70">Supabase Database URL</label>
                <div className="w-full flex items-center px-4 py-3 bg-background text-primary border-2 border-transparent font-mono text-sm opacity-80 select-none">
                  https://cmngxthqmpnhocqnoptw.supabase.co
                </div>
              </div>
              <div className="space-y-2">
                <label className="font-heading font-bold text-[10px] uppercase tracking-widest text-primary-foreground/70 flex justify-between">
                  Routing API Key
                  <span className="text-secondary bg-background px-2 text-[8px] border-2 border-transparent">ACTIVE</span>
                </label>
                <div className="w-full flex items-center px-4 py-3 bg-background text-primary border-2 border-transparent font-mono text-sm opacity-80 select-none">
                  ********************************
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-4 bg-background text-primary border-2 border-primary flex items-center justify-between">
              <div className="flex gap-4 items-center">
                 <ShieldCheck className="h-6 w-6 text-green-600" />
                 <p className="font-heading font-bold text-[10px] uppercase tracking-widest">Credentials are secured via environment variables.</p>
              </div>
              <button disabled className="font-heading font-bold text-[10px] uppercase tracking-widest text-muted-foreground border-b-2 border-muted-foreground hover:border-primary transition-colors">Rotate Keys</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
