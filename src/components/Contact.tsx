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
        <div className="rounded-3xl border border-border bg-card/40 p-8 backdrop-blur-xl md:p-12">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Talk to us
          </h2>
          <p className="mt-2 text-muted-foreground">
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
              <Input required placeholder="Your name" />
              <Input required type="email" placeholder="Work email" />
            </div>
            <Input placeholder="Company" />
            <Textarea required rows={4} placeholder="How can we help?" />
            <Button
              type="submit"
              className="bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-95"
            >
              {sent ? "Sent ✓" : "Send message"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};