import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Mail, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { mockDoctors } from "@/data/mockData";
import { BookingFormData } from "@/types";

export default function BookAppointment() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const doctor = mockDoctors.find(doc => doc.id === id);
  
  const [formData, setFormData] = useState<BookingFormData>({
    patientName: "",
    patientEmail: "",
    date: "",
    time: "",
    notes: ""
  });
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

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

  const handleInputChange = (field: keyof BookingFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleTimeSlotSelect = (time: string) => {
    setSelectedTimeSlot(time);
    handleInputChange('time', time);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.patientName || !formData.patientEmail || !formData.date || !selectedTimeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast({
      title: "Appointment Booked Successfully! 🎉",
      description: `Your appointment with ${doctor.name} is confirmed for ${formData.date} at ${selectedTimeSlot}.`,
    });
    
    setIsLoading(false);
    navigate('/appointments');
  };

  // Get tomorrow's date as minimum date
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(`/doctor/${doctor.id}`)}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Profile
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-card">
              <CardHeader>
                <CardTitle className="text-2xl">Book Appointment</CardTitle>
                <p className="text-muted-foreground">
                  Schedule your appointment with {doctor.name}
                </p>
              </CardHeader>
              
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Patient Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Patient Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="patientName">Full Name *</Label>
                        <Input
                          id="patientName"
                          value={formData.patientName}
                          onChange={(e) => handleInputChange('patientName', e.target.value)}
                          placeholder="Enter your full name"
                          className="mt-1"
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="patientEmail">Email Address *</Label>
                        <Input
                          id="patientEmail"
                          type="email"
                          value={formData.patientEmail}
                          onChange={(e) => handleInputChange('patientEmail', e.target.value)}
                          placeholder="Enter your email"
                          className="mt-1"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Appointment Date */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Select Date & Time
                    </h3>
                    
                    <div>
                      <Label htmlFor="date">Preferred Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange('date', e.target.value)}
                        min={minDate}
                        className="mt-1"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label>Available Time Slots *</Label>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2">
                        {doctor.availableSlots.map(slot => (
                          <Badge
                            key={slot}
                            variant={selectedTimeSlot === slot ? "default" : "outline"}
                            className="justify-center py-3 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth"
                            onClick={() => handleTimeSlotSelect(slot)}
                          >
                            {slot}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Additional Information
                    </h3>
                    
                    <div>
                      <Label htmlFor="notes">Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Any specific concerns or symptoms you'd like to mention..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={isLoading}
                  >
                    {isLoading ? "Booking Appointment..." : "Confirm Booking"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div>
            <Card className="shadow-card sticky top-24">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-medical flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
                    {doctor.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h4 className="font-semibold">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{doctor.specialization}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium">
                      {formData.date ? new Date(formData.date).toLocaleDateString() : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium">{selectedTimeSlot || "Not selected"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location:</span>
                    <span className="font-medium">{doctor.location}</span>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Consultation Fee:</span>
                    <span className="text-2xl font-bold text-primary">${doctor.price}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}