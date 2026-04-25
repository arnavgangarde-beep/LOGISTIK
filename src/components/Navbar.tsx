import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { motion } from "framer-motion";

const links = [
  { label: "Features", href: "#features" },
  { label: "Dashboard", href: "#dashboard" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const navigate = useNavigate();
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto mt-4 max-w-6xl px-4">
        <div className="bg-background border-2 border-primary bauhaus-shadow flex items-center justify-between px-6 py-4">
          <Link to="/" aria-label="FastConnect home">
            <h1 className="font-heading font-black text-2xl tracking-tighter uppercase text-primary">LOGISTIK</h1>
          </Link>
          <nav className="hidden items-center gap-7 md:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground transition-colors hover:text-primary"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => navigate("/login")} className="font-heading font-bold uppercase text-[10px] tracking-widest hover:text-primary rounded-none">
              Sign in
            </Button>
            <Button
              size="sm"
              onClick={() => navigate("/signup")}
              className="bg-accent text-primary border-2 border-primary font-heading font-bold uppercase text-[10px] tracking-widest hover:bg-background transition-colors rounded-none px-6"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </motion.header>
  );
};