import { Doctor, Appointment } from '@/types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiologist',
    profilePicture: '/placeholder.svg',
    isAvailable: true,
    rating: 4.9,
    experience: 12,
    location: 'New York, NY',
    bio: 'Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience treating heart conditions. She specializes in preventive cardiology and non-invasive cardiac procedures.',
    availableSlots: ['09:00', '10:30', '14:00', '15:30', '16:30'],
    price: 200
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialization: 'Pediatrician',
    profilePicture: '/placeholder.svg',
    isAvailable: true,
    rating: 4.8,
    experience: 8,
    location: 'Los Angeles, CA',
    bio: 'Dr. Michael Chen is a dedicated pediatrician committed to providing comprehensive healthcare for children from infancy through adolescence.',
    availableSlots: ['08:30', '11:00', '13:30', '15:00'],
    price: 150
  },
  {
    id: '3',
    name: 'Dr. Emily Rodriguez',
    specialization: 'Dermatologist',
    profilePicture: '/placeholder.svg',
    isAvailable: false,
    rating: 4.7,
    experience: 10,
    location: 'Miami, FL',
    bio: 'Dr. Emily Rodriguez specializes in medical and cosmetic dermatology, helping patients achieve healthy skin through advanced treatments.',
    availableSlots: [],
    price: 180
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedic Surgeon',
    profilePicture: '/placeholder.svg',
    isAvailable: true,
    rating: 4.9,
    experience: 15,
    location: 'Chicago, IL',
    bio: 'Dr. James Wilson is an experienced orthopedic surgeon specializing in sports medicine and joint replacement surgery.',
    availableSlots: ['09:30', '11:30', '14:30', '16:00'],
    price: 250
  },
  {
    id: '5',
    name: 'Dr. Lisa Thompson',
    specialization: 'Neurologist',
    profilePicture: '/placeholder.svg',
    isAvailable: true,
    rating: 4.8,
    experience: 14,
    location: 'Boston, MA',
    bio: 'Dr. Lisa Thompson is a neurologist with extensive experience in treating neurological disorders and conducting research in neuroscience.',
    availableSlots: ['10:00', '13:00', '15:00', '17:00'],
    price: 220
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialization: 'Ophthalmologist',
    profilePicture: '/placeholder.svg',
    isAvailable: true,
    rating: 4.6,
    experience: 9,
    location: 'Seattle, WA',
    bio: 'Dr. Robert Kim specializes in comprehensive eye care, including cataract surgery and retinal treatments.',
    availableSlots: ['08:00', '11:00', '14:00', '16:00'],
    price: 170
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    doctorId: '1',
    patientName: 'John Doe',
    patientEmail: 'john.doe@email.com',
    date: '2024-08-15',
    time: '10:30',
    status: 'upcoming',
    notes: 'Regular checkup'
  },
  {
    id: '2',
    doctorId: '4',
    patientName: 'Jane Smith',
    patientEmail: 'jane.smith@email.com',
    date: '2024-08-20',
    time: '14:30',
    status: 'upcoming',
    notes: 'Knee pain consultation'
  }
];