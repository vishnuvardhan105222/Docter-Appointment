import { useState, useMemo } from "react";
import { SearchInput } from "@/components/ui/search-input";
import { DoctorCard } from "@/components/DoctorCard";
import { Badge } from "@/components/ui/badge";
import { mockDoctors } from "@/data/mockData";
import heroImage from "@/assets/hero-medical.jpg";

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("");

  const specialties = useMemo(() => {
    const specs = Array.from(new Set(mockDoctors.map(doc => doc.specialization)));
    return specs;
  }, []);

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter(doctor => {
      const matchesSearch = doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doctor.location.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesSpecialty = !selectedSpecialty || doctor.specialization === selectedSpecialty;
      
      return matchesSearch && matchesSpecialty;
    });
  }, [searchQuery, selectedSpecialty]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 animate-fade-in">
            Find Your Perfect 
            <span className="text-primary"> Doctor</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
            Book appointments with trusted healthcare professionals near you. 
            Quality care made simple and accessible.
          </p>
          
          <div className="max-w-md mx-auto animate-slide-up">
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search doctors, specialties, or locations..."
              className="w-full"
            />
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 bg-card border-b border-border">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            <Badge
              variant={selectedSpecialty === "" ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/10 transition-smooth"
              onClick={() => setSelectedSpecialty("")}
            >
              All Specialties
            </Badge>
            {specialties.map(specialty => (
              <Badge
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-smooth"
                onClick={() => setSelectedSpecialty(specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">
              Available Doctors
            </h2>
            <p className="text-muted-foreground">
              {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''} found
            </p>
          </div>

          {filteredDoctors.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-muted-foreground mb-2">No doctors found</p>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDoctors.map((doctor, index) => (
                <div 
                  key={doctor.id} 
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <DoctorCard doctor={doctor} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}