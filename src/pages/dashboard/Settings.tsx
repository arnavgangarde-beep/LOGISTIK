import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { AlertCircle, Cpu, ShieldCheck, Leaf, Key, Activity } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Settings() {
  const [costThreshold, setCostThreshold] = useState([500]);
  const [delayThreshold, setDelayThreshold] = useState([2]);

  const handleSave = () => {
    toast.success("System configurations securely updated.");
  };

  return (
    <DashboardLayout>
      <div className="mx-auto max-w-5xl space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Configuration</h1>
          <p className="text-sm text-muted-foreground">Manage global thresholds, AI autonomy parameters, and integrations.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* AI Autonomy Settings */}
          <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Cpu className="h-5 w-5 text-accent" /> AI Autonomy Engine
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Master Kill Switch</h3>
                  <p className="text-xs text-muted-foreground mt-1">Suspend all autonomous rerouting execution.</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Max Auto-Approval Cost Differential</h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-md">${costThreshold[0]}</span>
                </div>
                <Slider max={5000} step={100} value={costThreshold} onValueChange={setCostThreshold} className="py-2" />
                <p className="text-[10px] text-muted-foreground">AI requires manual approval if reroute exceeds original budget by this amount.</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-sm">Critical Delay Auto-Trigger</h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-muted rounded-md">{delayThreshold[0]} Hours</span>
                </div>
                <Slider max={24} step={1} value={delayThreshold} onValueChange={setDelayThreshold} className="py-2" />
                <p className="text-[10px] text-muted-foreground">Trigger auto-healing strictly if projected delay exceeds this timeframe.</p>
              </div>
            </div>
          </div>

          {/* Environmental & IoT Settings */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-4">
                <Leaf className="h-5 w-5 text-green-500" /> Carbon Strategy
              </h2>
              <div className="space-y-4">
                <div className="p-3 border border-border rounded-xl bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors border-green-500/50">
                  <div className="font-medium text-sm flex items-center justify-between">
                    Aggressive Reduction <div className="h-2 w-2 rounded-full bg-green-500" />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">AI optimizes heavily for lowest Scope 3 emissions, even if slower.</p>
                </div>
                <div className="p-3 border border-border rounded-xl bg-muted/20 hover:bg-muted/40 cursor-pointer transition-colors">
                  <div className="font-medium text-sm">Balanced Approach</div>
                  <p className="text-xs text-muted-foreground mt-1">Equal weight between transit speed, cost, and ESG targets.</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl">
              <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
                <Activity className="h-5 w-5 text-blue-400" /> IoT Telemetry Alerts
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm">Cold-Chain Strict Tolerance</h3>
                    <p className="text-xs text-muted-foreground mt-1">Trigger severity high when temp deviates &gt; 1.5°C.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm">Kinetic Shock Detector</h3>
                    <p className="text-xs text-muted-foreground mt-1">Flag shipments for inspection above 10g external impact.</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>

          {/* Integration & Database */}
          <div className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur-xl md:col-span-2">
            <h2 className="text-lg font-semibold flex items-center gap-2 mb-6">
              <Key className="h-5 w-5 text-amber-500" /> System Integrations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Supabase Database URL</label>
                <input type="text" disabled value="https://cmngxthqmpnhocqnoptw.supabase.co" className="w-full h-10 px-3 bg-muted border border-border rounded-md text-sm text-muted-foreground cursor-not-allowed" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium flex justify-between">
                  OpenRouteService (ORS) API Key
                  <span className="text-[10px] text-accent">Active</span>
                </label>
                <input type="password" value="********************************" disabled className="w-full h-10 px-3 bg-muted border border-border rounded-md text-sm text-muted-foreground cursor-not-allowed" />
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg flex gap-3 text-sm text-blue-500">
              <ShieldCheck className="h-5 w-5 shrink-0" />
              <p>Credentials are secured via environment variables. Contact DevOps to request rotation.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button onClick={handleSave} className="bg-primary text-primary-foreground">Save Configuration</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}
