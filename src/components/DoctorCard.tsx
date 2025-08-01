import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Doctor } from "@/types";
import { useNavigate } from "react-router-dom";

interface DoctorCardProps {
  doctor: Doctor;
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  const navigate = useNavigate();

  return (
    <Card className="group hover:shadow-card transition-smooth cursor-pointer bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-medical flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
            {doctor.name.split(' ').map(n => n[0]).join('')}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-smooth">
                  {doctor.name}
                </h3>
                <p className="text-medical-gray text-sm">{doctor.specialization}</p>
              </div>
              <Badge variant={doctor.isAvailable ? "default" : "secondary"} className="flex-shrink-0">
                {doctor.isAvailable ? "Available" : "Unavailable"}
              </Badge>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>{doctor.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{doctor.experience} years exp.</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{doctor.location}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold text-primary">${doctor.price}</span>
              <Button 
                size="sm" 
                onClick={() => navigate(`/doctor/${doctor.id}`)}
                disabled={!doctor.isAvailable}
                className="bg-primary hover:bg-primary/90 text-primary-foreground transition-smooth"
              >
                View Profile
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}