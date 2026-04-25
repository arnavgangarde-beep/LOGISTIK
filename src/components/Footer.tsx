import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="border-t-4 border-primary bg-background py-10 mt-12">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
      <h1 className="font-heading font-black text-xl tracking-tighter uppercase text-primary">LOGISTIK</h1>
      <p className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground">
        © {new Date().getFullYear()} LOGISTIK. FORM FOLLOWS FREIGHT.
      </p>
    </div>
  </footer>
);