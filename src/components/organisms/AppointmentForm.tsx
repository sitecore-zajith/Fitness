"use client";

import { motion } from "framer-motion";
import Button from "../atoms/Button";
import SectionHeading from "../molecules/SectionHeading";

export default function AppointmentForm() {
  return (
    <section id="appointment" className="py-24 bg-neutral-50 relative overflow-hidden">
      {/* Decorative shape */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col lg:flex-row">
          
          {/* Left side: Content */}
          <div className="bg-primary p-12 lg:w-2/5 text-white flex flex-col justify-center">
            <h3 className="text-3xl font-heading font-bold mb-4">Start Your Journey Today</h3>
            <p className="text-primary-foreground/80 mb-8 leading-relaxed">
              Take the first step towards a healthier, happier you. Fill out the form, and our coaching team will get back to you within 24 hours.
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  📍
                </div>
                <span>123 Fitness Avenue, Wellness City</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  📞
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mr-4">
                  ✉️
                </div>
                <span>info@fitlifecoach.com</span>
              </div>
            </div>
          </div>

          {/* Right side: Form */}
          <div className="p-12 lg:w-3/5">
            <SectionHeading title="Make an Appointment" subtitle="Get in Touch" />
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors bg-neutral-50 focus:bg-white" 
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors bg-neutral-50 focus:bg-white" 
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-neutral-700 mb-2">Service of Interest</label>
                  <select 
                    id="service" 
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors bg-neutral-50 focus:bg-white text-neutral-700"
                  >
                    <option>Weight Loss Program</option>
                    <option>Sports Nutrition</option>
                    <option>Individual Coaching</option>
                    <option>Workout Routines</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-2">Preferred Date</label>
                  <input 
                    type="date" 
                    id="date" 
                    className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors bg-neutral-50 focus:bg-white text-neutral-700" 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">Message (Optional)</label>
                <textarea 
                  id="message" 
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors bg-neutral-50 focus:bg-white" 
                  placeholder="Tell us about your goals..."
                ></textarea>
              </div>

              <Button type="submit" className="w-full md:w-auto">
                Book Appointment
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
