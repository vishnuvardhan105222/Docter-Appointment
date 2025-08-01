export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  profilePicture: string;
  isAvailable: boolean;
  rating: number;
  experience: number;
  location: string;
  bio: string;
  availableSlots: string[];
  price: number;
}

export interface Appointment {
  id: string;
  doctorId: string;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  notes?: string;
}

export interface BookingFormData {
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  notes?: string;
}