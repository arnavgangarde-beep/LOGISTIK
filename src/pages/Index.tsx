import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { DashboardPreview } from "@/components/DashboardPreview";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

const Index = () => (
  <main className="min-h-screen bg-background text-foreground">
    <Navbar />
    <Hero />
    <Features />
    <DashboardPreview />
    <Testimonials />
    <Contact />
    <Footer />
  </main>
);

export default Index;
