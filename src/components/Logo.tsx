import { Truck } from "lucide-react";

export const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-2 ${className}`}>
    <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-secondary shadow-[0_0_24px_hsl(var(--primary)/0.55)]">
      <Truck className="h-5 w-5 text-primary-foreground" />
    </div>
    <span className="text-lg font-bold tracking-tight">
      Fast<span className="text-gradient">Connect</span>
    </span>
  </div>
);