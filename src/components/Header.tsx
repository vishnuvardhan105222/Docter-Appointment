import { Stethoscope, Calendar, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-gradient-medical rounded-lg flex items-center justify-center group-hover:scale-105 transition-smooth">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">DocuEase</h1>
            <p className="text-xs text-muted-foreground">Your Health Companion</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <Button
            variant={isActive('/') ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <Home className="h-4 w-4" />
            Home
          </Button>
          <Button
            variant={isActive('/appointments') ? "default" : "ghost"}
            size="sm"
            onClick={() => navigate('/appointments')}
            className="flex items-center gap-2"
          >
            <Calendar className="h-4 w-4" />
            My Appointments
          </Button>
        </nav>
      </div>
    </header>
  );
}