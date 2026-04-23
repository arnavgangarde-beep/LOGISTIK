import { Logo } from "./Logo";

export const Footer = () => (
  <footer className="border-t border-border py-10">
    <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
      <Logo />
      <p className="text-xs text-muted-foreground">
        © {new Date().getFullYear()} FastConnect. Built for fleets that move the world.
      </p>
    </div>
  </footer>
);