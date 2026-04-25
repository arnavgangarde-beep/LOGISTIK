import { ReactNode, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Map,
  Package,
  AlertTriangle,
  CloudRain,
  Settings,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const items = [
  { to: "/dashboard", label: "Command Center", icon: LayoutDashboard, end: true },
  { to: "/dashboard/map", label: "Network Map", icon: Map },
  { to: "/dashboard/disruptions", label: "Disruptions", icon: AlertTriangle },
  { to: "/dashboard/shipments", label: "Global Shipments", icon: Package },
  { to: "/dashboard/weather", label: "Weather Intel", icon: CloudRain },
  { to: "/dashboard/settings", label: "System Config", icon: Settings },
];

export const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const SidebarContent = (
    <div className="flex h-full flex-col bg-sidebar-background">
      <div className="px-5 pt-8 pb-4 border-b-2 border-primary bg-background">
        <h1 className="font-heading font-bold text-3xl tracking-tighter uppercase text-primary">LOGISTIK</h1>
      </div>
      <nav className="mt-6 flex-1 space-y-2 px-4">
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-none px-4 py-3 text-xs font-heading font-bold tracking-wider uppercase transition-all ${
                isActive
                  ? "bg-accent text-accent-foreground border-2 border-primary bauhaus-shadow"
                  : "text-muted-foreground border-2 border-transparent hover:border-primary hover:text-primary"
              }`
            }
          >
            <it.icon className="h-4 w-4" />
            {it.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t-2 border-primary bg-background">
        <Button
          variant="ghost"
          className="w-full justify-start text-primary rounded-none border-2 border-transparent hover:border-primary font-heading font-bold uppercase text-xs tracking-wider"
          onClick={() => navigate("/")}
        >
          <LogOut className="mr-3 h-4 w-4" /> Logout
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen w-full bg-background text-foreground font-sans">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r-2 border-primary bg-background lg:block">
        {SidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-foreground/80 lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="h-full w-72 border-r-2 border-primary bg-background"
            >
              {SidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b-2 border-primary bg-background px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden rounded-none border-2 border-primary"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <div className="font-heading font-bold text-xs uppercase tracking-wider text-muted-foreground flex items-center gap-4 hidden xl:flex">
             <NavLink to="/dashboard" className={({isActive}) => isActive ? "text-primary bg-primary/10 px-2 py-0.5" : "hover:text-primary px-2 py-0.5"}>Top-Down</NavLink>
             <NavLink to="/dashboard/shipments" className={({isActive}) => isActive ? "text-primary bg-primary/10 px-2 py-0.5" : "hover:text-primary px-2 py-0.5"}>Shipments</NavLink>
             <NavLink to="/dashboard/inventory" className={({isActive}) => isActive ? "text-primary bg-primary/10 px-2 py-0.5" : "hover:text-primary px-2 py-0.5"}>Inventory</NavLink>
             <NavLink to="/dashboard/esg" className={({isActive}) => isActive ? "text-primary bg-primary/10 px-2 py-0.5" : "hover:text-primary px-2 py-0.5"}>Carbon Audit</NavLink>
             <NavLink to="/dashboard/market" className={({isActive}) => isActive ? "text-primary bg-primary/10 px-2 py-0.5" : "hover:text-primary px-2 py-0.5"}>Market Pricing</NavLink>
          </div>
          <div className="ml-auto flex items-center gap-3 text-xs font-heading font-bold tracking-wider text-primary uppercase">
            <div className="h-3 w-3 rounded-none bg-secondary" />
            System Online
          </div>
        </header>
        <main className="flex-1 bg-background p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
};