import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Award, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockDoctors } from "@/data/mockData";

export default function DoctorProfile() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const doctor = mockDoctors.find(doc => doc.id === id);

  if (!doctor) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Doctor Not Found</h1>
          <Button onClick={() => navigate('/')}>Back to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Doctors
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Doctor Info */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-start gap-6">
                  <div className="w-24 h-24 rounded-full bg-gradient-medical flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <CardTitle className="text-2xl">{doctor.name}</CardTitle>
                        <p className="text-lg text-medical-gray">{doctor.specialization}</p>
                      </div>
                      <Badge variant={doctor.isAvailable ? "default" : "secondary"}>
                        {doctor.isAvailable ? "Available Today" : "Unavailable"}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{doctor.rating} Rating</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="h-4 w-4" />
                        <span>{doctor.experience} Years Experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{doctor.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3">About Dr. {doctor.name.split(' ')[1]}</h3>
                    <p className="text-muted-foreground leading-relaxed">{doctor.bio}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3">Consultation Fee</h3>
                    <div className="text-3xl font-bold text-primary">${doctor.price}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Sidebar */}
          <div>
            <Card className="shadow-card sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Available Time Slots
                </CardTitle>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-4">
                  {doctor.isAvailable ? (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground mb-3">Today's Available Slots</p>
                        <div className="grid grid-cols-2 gap-2">
                          {doctor.availableSlots.map(slot => (
                            <Badge 
                              key={slot} 
                              variant="outline" 
                              className="justify-center py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                            >
                              {slot}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        size="lg" 
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={() => navigate(`/book/${doctor.id}`)}
                      >
                        Book Appointment
                      </Button>
                    </>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">
                        Dr. {doctor.name.split(' ')[1]} is currently unavailable
                      </p>
                      <Button variant="outline" disabled>
                        No Slots Available
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}