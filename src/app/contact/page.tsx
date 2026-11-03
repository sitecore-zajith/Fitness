"use client";

import HeroSection from "@/components/organisms/HeroSection";
import ContactInfoSection from "@/components/organisms/ContactInfoSection";
import ContactForm from "@/components/organisms/ContactForm";
import ContactMap from "@/components/organisms/ContactMap";

export default function ContactPage() {
  return (
    <>
      <HeroSection 
        title="Get in Touch" 
        pageName="Contact Us" 
        bgImage="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Main Content Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
            {/* Contact Info */}
            <ContactInfoSection />

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <ContactMap />
    </>
  );
}
