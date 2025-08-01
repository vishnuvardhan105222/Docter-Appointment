import { useState } from "react";
import { Calendar, Clock, MapPin, Edit, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { mockAppointments, mockDoctors } from "@/data/mockData";
import { Appointment } from "@/types";

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const { toast } = useToast();

  const getDoctorById = (id: string) => {
    return mockDoctors.find(doc => doc.id === id);
  };

  const handleCancelAppointment = (appointmentId: string) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId 
          ? { ...apt, status: 'cancelled' as const }
          : apt
      )
    );
    
    toast({
      title: "Appointment Cancelled",
      description: "Your appointment has been cancelled successfully.",
    });
  };

  const upcomingAppointments = appointments.filter(apt => apt.status === 'upcoming');
  const pastAppointments = appointments.filter(apt => apt.status !== 'upcoming');

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Appointments</h1>
          <p className="text-muted-foreground">
            Manage your upcoming and past medical appointments
          </p>
        </div>

        {/* Upcoming Appointments */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-primary" />
            Upcoming Appointments
          </h2>

          {upcomingAppointments.length === 0 ? (
            <Card className="shadow-card">
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Upcoming Appointments</h3>
                <p className="text-muted-foreground mb-6">
                  You don't have any upcoming appointments scheduled.
                </p>
                <Button onClick={() => window.history.back()}>
                  Book an Appointment
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => {
                const doctor = getDoctorById(appointment.doctorId);
                if (!doctor) return null;

                return (
                  <Card key={appointment.id} className="shadow-card hover:shadow-medical transition-smooth">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-medical flex items-center justify-center text-white font-semibold text-sm">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{doctor.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                          </div>
                        </div>
                        <Badge variant="default">Upcoming</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{new Date(appointment.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{doctor.location}</span>
                        </div>
                      </div>

                      {appointment.notes && (
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">
                            <strong>Notes:</strong> {appointment.notes}
                          </p>
                        </div>
                      )}

                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit className="h-4 w-4" />
                          Reschedule
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex items-center gap-1 text-destructive hover:text-destructive"
                          onClick={() => handleCancelAppointment(appointment.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>

        {/* Past Appointments */}
        {pastAppointments.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
              <Clock className="h-6 w-6 text-muted-foreground" />
              Past Appointments
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pastAppointments.map((appointment) => {
                const doctor = getDoctorById(appointment.doctorId);
                if (!doctor) return null;

                return (
                  <Card key={appointment.id} className="shadow-card opacity-75">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center text-muted-foreground font-semibold text-sm">
                            {doctor.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{doctor.name}</CardTitle>
                            <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                          </div>
                        </div>
                        <Badge variant={appointment.status === 'completed' ? 'secondary' : 'destructive'}>
                          {appointment.status === 'completed' ? 'Completed' : 'Cancelled'}
                        </Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(appointment.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}