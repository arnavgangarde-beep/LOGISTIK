import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import authImg from "@/assets/auth-side.jpg";
import { toast } from "sonner";
import { FormEvent } from "react";

const Signup = () => {
  const navigate = useNavigate();
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    toast.success("Account created");
    navigate("/dashboard");
  };
  return (
    <div className="grid min-h-screen grid-cols-1 bg-background lg:grid-cols-2">
      <div className="relative flex flex-col justify-center px-6 py-12 sm:px-12">
        <div className="absolute left-6 top-6">
          <Link to="/"><Logo /></Link>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto w-full max-w-sm"
        >
          <h1 className="text-3xl font-bold tracking-tight">Create your account</h1>
          <p className="mt-2 text-sm text-muted-foreground">Start routing smarter today.</p>

          <form onSubmit={onSubmit} className="mt-8 space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full name</Label>
              <Input id="name" required placeholder="Alex Driver" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" required placeholder="you@company.com" />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" required placeholder="NorthHaul" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="truck">Truck #</Label>
                <Input id="truck" required placeholder="TRK-2041" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required placeholder="••••••••" />
            </div>
            <Button type="submit" className="w-full bg-gradient-to-r from-primary to-secondary text-primary-foreground hover:opacity-95">
              Create Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
          </p>
        </motion.div>
      </div>

      <div className="relative hidden overflow-hidden lg:block">
        <img src={authImg} alt="Logistics control room" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-tr from-background via-background/40 to-transparent" />
      </div>
    </div>
  );
};

export default Signup;