"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import HeroSection from "@/components/organisms/HeroSection";
import ServicesGrid from "@/components/organisms/ServicesGrid";
import { 
  services, 
  serviceCategories, 
  deliveryFormats,
  Service
} from "@/data/serviceData";
import { 
  FaFilter, 
  FaUndo, 
  FaCheckCircle, 
  FaDumbbell, 
  FaUserGraduate, 
  FaChartLine, 
  FaHeartbeat, 
  FaArrowRight, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaMagic
} from "react-icons/fa";

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Services");
  const [selectedFormat, setSelectedFormat] = useState<string>("All Formats");
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Interactive Quiz / Program Matcher state
  const [quizGoal, setQuizGoal] = useState<string>("fat-loss");
  const [quizLocation, setQuizLocation] = useState<string>("in-person");
  const [quizCommitment, setQuizCommitment] = useState<string>("3-days");

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchCategory = 
        selectedCategory === "All Services" || service.category === selectedCategory;
      const matchFormat = 
        selectedFormat === "All Formats" || service.deliveryFormat === selectedFormat;
      return matchCategory && matchFormat;
    });
  }, [selectedCategory, selectedFormat]);

  // Recommended service from quiz
  const recommendedService: Service = useMemo(() => {
    if (quizLocation === "remote") {
      return services.find((s) => s.id === "2") || services[1]; // Online Coaching
    }
    if (quizGoal === "rehab") {
      return services.find((s) => s.id === "5") || services[4]; // Rehab & Mobility
    }
    if (quizGoal === "nutrition") {
      return services.find((s) => s.id === "3") || services[2]; // Sports Nutrition
    }
    if (quizGoal === "athletic") {
      return services.find((s) => s.id === "4") || services[3]; // Athletic Strength
    }
    return services[0]; // 1-on-1 Personal Training
  }, [quizGoal, quizLocation]);

  const resetFilters = () => {
    setSelectedCategory("All Services");
    setSelectedFormat("All Formats");
  };

  const generalFaqs = [
    {
      question: "How do I know whether 1-on-1 In-Studio or Online Coaching is better for me?",
      answer: "If you thrive on hands-on bar speed corrections, private training bays, and strict in-person appointment accountability, In-Studio is optimal. If your schedule is unpredictable, you travel often, or you want high-level programming at a more accessible investment tier, our Remote App Coaching provides daily asynchronous video review and weekly check-in videos."
    },
    {
      question: "Are nutrition guidelines included with personal training packages?",
      answer: "Yes. Every private training and remote coaching package includes baseline macronutrient calculations, hydration targets, and bi-weekly diet reviews. For advanced clinical diets or gut health protocols, our dedicated Clinical Sports Nutrition program provides full blood marker analysis and daily meal photo feedback."
    },
    {
      question: "Can I switch coaches or pause my program if I travel or get injured?",
      answer: "Yes. All our month-to-month and 12-week transformation memberships can be paused for up to 30 days with advance notice. If your primary goal shifts from hypertrophy to injury rehab, you can seamlessly transition to our Physical Therapy director."
    },
    {
      question: "What equipment do I need for Remote Coaching?",
      answer: "Our remote programs are custom-written to your exact equipment inventory. Whether you have a full commercial gym membership or just an adjustable barbell and bench in your garage, your program is engineered specifically around the tools you own."
    }
  ];

  return (
    <div className="bg-neutral-50/60 min-h-screen text-neutral-800">
      {/* Hero Banner */}
      <HeroSection 
        title="Coaching & Services" 
        pageName="Services" 
        bgImage="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
      />

      {/* Trust & Proof Bar */}
      <div className="bg-white border-b border-neutral-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900">1,200+</div>
              <div className="text-xs text-neutral-500 font-medium">Transformations Delivered</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900">98%</div>
              <div className="text-xs text-neutral-500 font-medium">Program Completion Rate</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900">100%</div>
              <div className="text-xs text-neutral-500 font-medium">Certified CSCS & Dietitians</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900">4.9 / 5.0</div>
              <div className="text-xs text-neutral-500 font-medium">Client Satisfaction Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
            Structured Performance
          </span>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-neutral-950 mb-4">
            Coaching Engineered Around Your Life
          </h2>
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Choose from private in-studio sessions, global remote app coaching, clinical sports nutrition, or orthopedic injury rehabilitation.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-5 border border-neutral-200 shadow-xs mb-10 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mr-2 flex-shrink-0">
              <FaFilter className="text-[10px]" /> Category:
            </span>
            {serviceCategories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs font-bold py-2 px-4 rounded-xl transition-all flex-shrink-0 cursor-pointer ${
                    isActive 
                      ? "bg-primary text-white shadow-xs" 
                      : "bg-neutral-100 hover:bg-neutral-200 text-neutral-700"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Delivery Format & Reset Row */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-neutral-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-neutral-500 mr-2">Delivery Format:</span>
              {deliveryFormats.map((fmt) => {
                const isActive = selectedFormat === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => setSelectedFormat(fmt)}
                    className={`text-xs font-medium py-1.5 px-3 rounded-lg border transition-all cursor-pointer ${
                      isActive 
                        ? "bg-neutral-900 border-neutral-900 text-white font-bold" 
                        : "bg-white border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-neutral-500 font-medium">
                Showing <strong className="text-neutral-900">{filteredServices.length}</strong> of {services.length} programs
              </span>
              {(selectedCategory !== "All Services" || selectedFormat !== "All Formats") && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <FaUndo className="text-[10px]" /> Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Services Grid */}
        {filteredServices.length > 0 ? (
          <ServicesGrid services={filteredServices} />
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-neutral-200 max-w-lg mx-auto">
            <h3 className="font-heading font-bold text-lg text-neutral-900 mb-2">No Matching Programs Found</h3>
            <p className="text-xs text-neutral-500 mb-6">Try selecting "All Services" or "All Formats" to view our complete roster.</p>
            <button
              type="button"
              onClick={resetFilters}
              className="bg-primary text-white font-bold text-xs py-2.5 px-5 rounded-xl hover:bg-neutral-900 transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Interactive "Find Your Ideal Program" Mini-Quiz */}
        <section className="mt-20 bg-gradient-to-br from-neutral-900 via-neutral-900 to-neutral-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2">
                <FaMagic /> Smart Assessment
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-2">
                Not sure which service fits your lifestyle?
              </h3>
              <p className="text-neutral-300 text-xs sm:text-sm max-w-xl mx-auto">
                Answer 3 quick questions to instantly identify the program engineered for your exact training background and schedule.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Question 1: Goal */}
              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                  1. Primary Focus
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { id: "fat-loss", label: "Fat Loss & Hypertrophy" },
                    { id: "athletic", label: "Speed & Barbell Power" },
                    { id: "nutrition", label: "Diet & Metabolic Health" },
                    { id: "rehab", label: "Pain-Free Joint Rehab" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuizGoal(opt.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer font-medium ${
                        quizGoal === opt.id 
                          ? "bg-primary text-white font-bold shadow-xs" 
                          : "bg-white/5 hover:bg-white/15 text-neutral-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Location */}
              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                  2. Training Location
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { id: "in-person", label: "Private Studio (1-on-1)" },
                    { id: "remote", label: "Global Remote App" },
                    { id: "hybrid", label: "Hybrid (Gym + App)" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuizLocation(opt.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer font-medium ${
                        quizLocation === opt.id 
                          ? "bg-primary text-white font-bold shadow-xs" 
                          : "bg-white/5 hover:bg-white/15 text-neutral-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3: Frequency */}
              <div className="bg-white/10 backdrop-blur-xs p-5 rounded-2xl border border-white/10">
                <label className="block text-xs font-bold uppercase tracking-wider text-amber-300 mb-3">
                  3. Weekly Commitment
                </label>
                <div className="space-y-2 text-xs">
                  {[
                    { id: "2-days", label: "2–3 Hours / Week" },
                    { id: "3-days", label: "4–5 Hours / Week" },
                    { id: "6-days", label: "6+ Hours / Dedicated Athlete" }
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setQuizCommitment(opt.id)}
                      className={`w-full text-left p-2.5 rounded-xl transition-all cursor-pointer font-medium ${
                        quizCommitment === opt.id 
                          ? "bg-primary text-white font-bold shadow-xs" 
                          : "bg-white/5 hover:bg-white/15 text-neutral-200"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Quiz Result Box */}
            <div className="bg-white text-neutral-900 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-[11px] font-bold uppercase tracking-widest text-primary block">
                  Top Recommended Program For You
                </span>
                <h4 className="text-xl font-heading font-bold text-neutral-950">
                  {recommendedService.title}
                </h4>
                <p className="text-xs text-neutral-600 line-clamp-1 max-w-xl">
                  {recommendedService.tagline}
                </p>
                <div className="text-xs font-semibold text-neutral-500 pt-1">
                  Format: <span className="text-neutral-900 font-bold">{recommendedService.deliveryFormat}</span> • Starting at: <span className="text-primary font-bold">{recommendedService.startingPriceDisplay}</span>
                </div>
              </div>

              <Link
                href={`/services/${recommendedService.id}`}
                className="bg-primary hover:bg-neutral-900 text-white font-bold text-xs py-3.5 px-6 rounded-xl flex-shrink-0 flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Explore This Program</span>
                <FaArrowRight className="text-[10px]" />
              </Link>
            </div>

          </div>
        </section>

        {/* 4-Step Coaching Methodology Section */}
        <section className="mt-24">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-primary block mb-2">
              The Framework
            </span>
            <h3 className="text-3xl font-heading font-bold text-neutral-900 mb-3">
              Our 4-Phase Transformation Methodology
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
              We replace random fitness workouts with sports science principles and objective weekly biofeedback.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                icon: FaHeartbeat,
                title: "Diagnostic Screening",
                desc: "3D mobility audit, posture analysis, basal metabolic rate calculation, and medical/injury intake."
              },
              {
                step: "02",
                icon: FaDumbbell,
                title: "Custom Architecture",
                desc: "Custom periodized lifting cycles, progressive overload targets, and flexible macronutrient splits."
              },
              {
                step: "03",
                icon: FaChartLine,
                title: "Weekly Biofeedback",
                desc: "Video lift form critiques, sleep & recovery tracking, and continuous calorie/volume calibration."
              },
              {
                step: "04",
                icon: FaUserGraduate,
                title: "Lifelong Autonomy",
                desc: "Reverse dieting back to high maintenance calories and a permanent, injury-free training playbook."
              }
            ].map((method, idx) => {
              const Icon = method.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-neutral-200/90 shadow-xs relative flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg">
                        <Icon />
                      </div>
                      <span className="font-heading font-bold text-2xl text-neutral-200">
                        {method.step}
                      </span>
                    </div>
                    <h4 className="font-heading font-bold text-lg text-neutral-900 mb-2">
                      {method.title}
                    </h4>
                    <p className="text-xs text-neutral-600 leading-relaxed">
                      {method.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* General Services FAQ Accordion */}
        <section className="mt-24 bg-white rounded-3xl p-6 sm:p-12 border border-neutral-200 shadow-xs">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-primary flex items-center justify-center gap-1.5 mb-2">
              <FaQuestionCircle /> Clear Answers
            </span>
            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-900 mb-2">
              Coaching Questions & Onboarding
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500">
              Everything you need to know before stepping into your first consultation or starting with your coach.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {generalFaqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx} 
                  className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-bold text-neutral-900 text-sm hover:text-primary transition-colors cursor-pointer bg-neutral-50/50"
                  >
                    <span>{faq.question}</span>
                    <FaChevronDown className={`text-xs text-neutral-400 transition-transform duration-200 flex-shrink-0 ${isOpen ? "rotate-180 text-primary" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="p-4 sm:p-5 pt-0 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-white">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Final Consultation Call-to-Action */}
        <section className="mt-20 bg-primary text-white rounded-3xl p-8 sm:p-12 text-center shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-4">
            <h3 className="text-2xl sm:text-4xl font-heading font-bold text-white leading-tight">
              Ready to Work With a Dedicated Coach?
            </h3>
            <p className="text-neutral-100 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
              Schedule a complimentary 30-minute discovery consultation. We will assess your past training, calculate your baseline targets, and match you with the right specialist.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <Link 
                href="/contact"
                className="bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm py-3.5 px-8 rounded-full transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Book Free Discovery Call</span>
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}
