import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";
import MapPage from "./pages/dashboard/MapPage.tsx";
import Disruptions from "./pages/dashboard/Disruptions.tsx";
import Shipments from "./pages/dashboard/Shipments.tsx";
import Settings from "./pages/dashboard/Settings.tsx";
import Weather from "./pages/dashboard/Weather.tsx";
import InventoryNetwork from "./pages/dashboard/Inventory.tsx";
import Sustainability from "./pages/dashboard/Sustainability.tsx";
import Market from "./pages/dashboard/Market.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/map" element={<MapPage />} />
          <Route path="/dashboard/disruptions" element={<Disruptions />} />
          <Route path="/dashboard/shipments" element={<Shipments />} />
          <Route path="/dashboard/settings" element={<Settings />} />
          <Route path="/dashboard/weather" element={<Weather />} />
          <Route path="/dashboard/inventory" element={<InventoryNetwork />} />
          <Route path="/dashboard/esg" element={<Sustainability />} />
          <Route path="/dashboard/market" element={<Market />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
