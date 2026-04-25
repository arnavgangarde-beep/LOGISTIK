import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

export const Contact = () => {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-3xl px-4">
        <div className="border-2 border-primary bg-primary text-primary-foreground p-8 bauhaus-shadow md:p-12">
          <h2 className="font-heading font-black text-5xl tracking-tighter uppercase md:text-6xl">
            INITIALIZE CONNECTION
          </h2>
          <p className="mt-4 text-[10px] font-bold tracking-widest uppercase text-primary-foreground/70">
            Tell us about your fleet — we'll show you a live demo within 24 hours.
          </p>
          <form
            className="mt-6 grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
              toast.success("Message sent — we'll be in touch soon.");
            }}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Input required placeholder="YOUR NAME" className="border-2 border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground rounded-none rounded-none placeholder:text-primary-foreground/50 font-heading font-bold uppercase text-[10px] tracking-wider py-6" />
              <Input required type="email" placeholder="WORK EMAIL" className="border-2 border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground rounded-none placeholder:text-primary-foreground/50 font-heading font-bold uppercase text-[10px] tracking-wider py-6" />
            </div>
            <Input placeholder="COMPANY" className="border-2 border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground rounded-none placeholder:text-primary-foreground/50 font-heading font-bold uppercase text-[10px] tracking-wider py-6" />
            <Textarea required rows={4} placeholder="HOW CAN WE HELP?" className="border-2 border-primary-foreground/30 bg-primary-foreground/5 text-primary-foreground rounded-none font-heading font-bold uppercase text-[10px] tracking-wider placeholder:text-primary-foreground/50 resize-none" />
            <Button
              type="submit"
              className="bg-accent text-primary border-2 border-primary hover:bg-background transition-colors rounded-none font-heading font-bold uppercase text-[12px] tracking-widest py-6 mt-4"
            >
              {sent ? "TRANSMISSION SENT ✓" : "SUBMIT DATA"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};