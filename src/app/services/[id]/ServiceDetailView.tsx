"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  FaChevronRight, 
  FaStar, 
  FaCheck, 
  FaClock, 
  FaDumbbell, 
  FaLaptopCode, 
  FaCalendarAlt, 
  FaUserGraduate, 
  FaArrowRight, 
  FaShieldAlt, 
  FaQuestionCircle, 
  FaChevronDown, 
  FaComments,
  FaCheckCircle,
  FaShoppingBag,
  FaBookOpen
} from "react-icons/fa";
import type { Service, PricingTier } from "@/data/serviceData";
import { getProduct, Product } from "@/data/productData";
import { getBlogPost, BlogPost } from "@/data/blogData";
import ProductCard from "@/components/molecules/ProductCard";

interface ServiceDetailViewProps {
  service: Service;
  relatedServices: Service[];
}

export default function ServiceDetailView({ service, relatedServices }: ServiceDetailViewProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "phases" | "pricing" | "coach">("phases");
  const [selectedTier, setSelectedTier] = useState<PricingTier>(
    service.pricingTiers.find((t) => t.isPopular) || service.pricingTiers[0]
  );
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  // Consultation booking form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    primaryGoal: "Fat Loss & Muscle Definition",
    preferredTime: "Morning (6 AM - 10 AM)",
    notes: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  // Resolve cross-linked products and blog posts
  const recommendedProducts: Product[] = service.recommendedProductIds
    .map((id) => getProduct(id))
    .filter(Boolean)
    .slice(0, 3);

  const relatedBlogArticles: BlogPost[] = service.relatedBlogIds
    .map((id) => getBlogPost(id))
    .filter(Boolean)
    .slice(0, 2);

  return (
    <div className="bg-neutral-50/70 pt-28 pb-20 min-h-screen text-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center text-xs sm:text-sm text-neutral-500 mb-8 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <FaChevronRight className="mx-2 text-[10px] text-neutral-400" />
          <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
          <FaChevronRight className="mx-2 text-[10px] text-neutral-400" />
          <span className="text-primary font-semibold">{service.category}</span>
          <FaChevronRight className="mx-2 text-[10px] text-neutral-400 hidden sm:inline" />
          <span className="text-neutral-900 truncate max-w-xs hidden sm:inline">{service.title}</span>
        </nav>

        {/* Hero Banner Card */}
        <div className="bg-white rounded-3xl shadow-xs border border-neutral-200/90 overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
            
            {/* Visual Media (Left - 6 cols) */}
            <div className="lg:col-span-6 relative min-h-[360px] lg:min-h-full">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/20 to-transparent" />
              
              {service.badge && (
                <span className="absolute top-6 left-6 bg-primary text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-md">
                  {service.badge}
                </span>
              )}

              {/* Delivery format badge */}
              <div className="absolute top-6 right-6 bg-neutral-900/90 backdrop-blur-xs text-white text-xs font-semibold py-1.5 px-3.5 rounded-xl flex items-center gap-2 border border-white/10">
                {service.deliveryFormat.includes("Online") ? (
                  <FaLaptopCode className="text-amber-400" />
                ) : (
                  <FaDumbbell className="text-primary" />
                )}
                <span>{service.deliveryFormat}</span>
              </div>

              {/* Coach overlay info on image */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-sm p-4 rounded-2xl border border-neutral-200/80 shadow-md flex items-center gap-4">
                <img 
                  src={service.leadCoach.avatar} 
                  alt={service.leadCoach.name} 
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20 flex-shrink-0"
                />
                <div>
                  <div className="text-[11px] text-neutral-400 font-bold uppercase tracking-wider">Directed By</div>
                  <h4 className="text-sm font-bold text-neutral-900">{service.leadCoach.name}</h4>
                  <p className="text-[11px] text-primary font-medium">{service.leadCoach.credentials}</p>
                </div>
              </div>
            </div>

            {/* Service Headline & Core Highlights (Right - 6 cols) */}
            <div className="lg:col-span-6 p-6 sm:p-10 flex flex-col justify-between">
              <div>
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {service.category}
                  </span>
                  <span className="text-xs text-neutral-500 font-medium flex items-center gap-1.5">
                    <FaClock className="text-neutral-400" /> {service.duration}
                  </span>
                  <span className="text-xs bg-neutral-100 text-neutral-700 font-medium px-2.5 py-0.5 rounded-md">
                    {service.difficulty}
                  </span>
                </div>

                {/* Title & Tagline */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-neutral-900 leading-tight mb-3">
                  {service.title}
                </h1>
                <p className="text-neutral-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                  {service.tagline}
                </p>

                {/* Ratings & Social Proof */}
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-neutral-100">
                  <div className="flex text-amber-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(service.rating) ? "text-amber-400" : "text-neutral-200"} />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-neutral-900">{service.rating} / 5.0</span>
                  <span className="text-neutral-300">•</span>
                  <span className="text-xs text-neutral-500 font-medium">{service.reviewsCount} verified client outcomes</span>
                </div>

                {/* Key Benefits List */}
                <div className="space-y-2.5 mb-8">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
                    Transformation Highlights:
                  </h4>
                  {service.keyBenefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-700">
                      <FaCheckCircle className="text-primary mt-0.5 flex-shrink-0 text-sm" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Action Buttons */}
              <div className="pt-6 border-t border-neutral-200 flex flex-wrap items-center gap-4">
                <div>
                  <span className="text-xs text-neutral-400 block font-medium">Starting Investment</span>
                  <span className="text-2xl font-bold font-heading text-neutral-950">
                    {service.startingPriceDisplay}
                  </span>
                </div>

                <a 
                  href="#consultation-form"
                  className="flex-1 min-w-[200px] bg-primary hover:bg-neutral-900 text-white font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 shadow-sm"
                >
                  <FaCalendarAlt /> Book Free Consultation
                </a>
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Tabs Navigation */}
        <div className="bg-white rounded-3xl shadow-xs border border-neutral-200/90 overflow-hidden mb-16">
          <div className="flex border-b border-neutral-200 overflow-x-auto no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveTab("phases")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex-shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === "phases"
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FaClock /> 3-Phase Transformation Roadmap
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex-shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === "overview"
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FaDumbbell /> Program Overview & Inclusions
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pricing")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex-shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === "pricing"
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FaShieldAlt /> Package Pricing Tiers
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("coach")}
              className={`py-4 px-6 text-sm font-bold border-b-2 transition-all flex-shrink-0 flex items-center gap-2 cursor-pointer ${
                activeTab === "coach"
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-neutral-600 hover:text-neutral-900"
              }`}
            >
              <FaUserGraduate /> Lead Coach Credentials
            </button>
          </div>

          <div className="p-6 sm:p-10">
            {/* Tab 1: 3-Phase Transformation Roadmap */}
            {activeTab === "phases" && (
              <div className="space-y-8">
                <div className="max-w-2xl">
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-900 mb-2">
                    Structured Periodization Protocol
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    No random workouts. Every 4-week block builds neuromuscular adaptations and progressive volume systematically to achieve sustainable, permanent physical transformations.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {service.phases.map((phase) => (
                    <div 
                      key={phase.phaseNumber}
                      className="bg-neutral-50/80 rounded-2xl p-6 border border-neutral-200/90 relative flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="bg-primary text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                            Phase 0{phase.phaseNumber}
                          </span>
                          <span className="text-xs font-bold text-neutral-400">
                            {phase.weeks}
                          </span>
                        </div>
                        <h4 className="font-heading font-bold text-lg text-neutral-900 mb-2">
                          {phase.title}
                        </h4>
                        <p className="text-xs text-neutral-600 leading-relaxed mb-4">
                          {phase.focus}
                        </p>
                      </div>

                      <div className="pt-4 border-t border-neutral-200">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block mb-2">
                          Key Deliverables:
                        </span>
                        <ul className="space-y-1.5">
                          {phase.deliverables.map((item, dIdx) => (
                            <li key={dIdx} className="text-xs text-neutral-700 flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 2: Overview & Deliverables */}
            {activeTab === "overview" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h3 className="text-xl font-heading font-bold text-neutral-900 mb-3">
                      Program Methodology
                    </h3>
                    <p className="text-neutral-700 text-sm sm:text-base leading-relaxed">
                      {service.overview}
                    </p>
                  </div>

                  <div className="bg-amber-50/60 border border-amber-200 rounded-2xl p-6">
                    <h4 className="font-bold text-neutral-900 text-sm mb-2 flex items-center gap-2">
                      <FaUserGraduate className="text-primary" /> Who Is This Ideal For?
                    </h4>
                    <p className="text-neutral-700 text-xs sm:text-sm leading-relaxed">
                      {service.targetAudience}
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-neutral-50 rounded-2xl p-6 border border-neutral-200">
                  <h4 className="font-heading font-bold text-neutral-900 text-base mb-4">
                    Everything Included In Your Coaching:
                  </h4>
                  <ul className="space-y-3">
                    {service.deliverablesList.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-800">
                        <FaCheckCircle className="text-primary mt-0.5 flex-shrink-0 text-sm" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Tab 3: Package Pricing Tiers */}
            {activeTab === "pricing" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-900 mb-2">
                    Investment Tiers & Enrollment Options
                  </h3>
                  <p className="text-sm text-neutral-600">
                    Transparent, contract-free coaching tiers. Choose the level of frequency and accountability that aligns with your schedule.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                  {service.pricingTiers.map((tier, idx) => {
                    const isSelected = selectedTier.name === tier.name;
                    return (
                      <div 
                        key={idx}
                        className={`rounded-2xl p-6 transition-all duration-300 border flex flex-col justify-between ${
                          tier.isPopular 
                            ? "bg-white border-primary shadow-md ring-2 ring-primary/20 relative" 
                            : "bg-neutral-50/70 border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        {tier.isPopular && (
                          <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-bold uppercase tracking-wider py-0.5 px-3 rounded-full shadow-xs">
                            Recommended
                          </span>
                        )}

                        <div>
                          <div className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-1">
                            {tier.duration}
                          </div>
                          <h4 className="font-heading font-bold text-xl text-neutral-900 mb-2">
                            {tier.name}
                          </h4>
                          <div className="text-2xl sm:text-3xl font-bold font-heading text-neutral-950 mb-1">
                            {tier.priceDisplay}
                          </div>
                          <p className="text-[11px] text-neutral-500 mb-6">
                            {tier.billingNote}
                          </p>

                          <div className="space-y-2.5 pt-4 border-t border-neutral-200/80 mb-6">
                            {tier.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex items-start gap-2 text-xs text-neutral-700">
                                <FaCheck className="text-primary mt-0.5 flex-shrink-0 text-[10px]" />
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <a 
                          href="#consultation-form"
                          onClick={() => setSelectedTier(tier)}
                          className={`w-full py-3 px-4 rounded-xl text-xs font-bold text-center transition-all ${
                            tier.isPopular
                              ? "bg-primary hover:bg-neutral-900 text-white shadow-xs"
                              : "bg-white hover:bg-neutral-900 hover:text-white text-neutral-900 border border-neutral-300"
                          }`}
                        >
                          Select This Tier & Consult
                        </a>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 4: Lead Coach Credentials */}
            {activeTab === "coach" && (
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <img 
                  src={service.leadCoach.avatar} 
                  alt={service.leadCoach.name} 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover ring-4 ring-neutral-100 flex-shrink-0 shadow-sm"
                />
                <div className="space-y-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                      Lead Program Director
                    </span>
                    <h3 className="text-2xl font-heading font-bold text-neutral-900">
                      {service.leadCoach.name}
                    </h3>
                    <p className="text-xs text-neutral-500 font-semibold mt-0.5">
                      {service.leadCoach.role} • <span className="text-neutral-800">{service.leadCoach.credentials}</span>
                    </p>
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed max-w-2xl">
                    {service.leadCoach.bio}
                  </p>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a 
                      href="#consultation-form"
                      className="bg-neutral-900 hover:bg-primary text-white text-xs font-bold py-2.5 px-5 rounded-xl transition-colors inline-flex items-center gap-2"
                    >
                      <FaComments /> Message {service.leadCoach.name.split(" ")[0]} Directly
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Consultation Intake Form Anchor Section */}
        <section id="consultation-form" className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 mb-16 shadow-xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Form Pitch (Left - 5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-primary block">
                Direct Intake Assessment
              </span>
              <h3 className="text-2xl sm:text-3xl font-heading font-bold leading-tight">
                Apply for {service.title}
              </h3>
              <p className="text-neutral-300 text-sm leading-relaxed">
                Fill in your baseline details. Our Head Coach will review your training history and reach out within 24 hours to schedule your 1-on-1 strategy call.
              </p>

              <div className="space-y-2 pt-4">
                <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <FaCheckCircle className="text-primary flex-shrink-0" />
                  <span>Zero hard sales pressure — honest alignment call</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-neutral-300">
                  <FaCheckCircle className="text-primary flex-shrink-0" />
                  <span>Complimentary movement screening & macro estimate</span>
                </div>
              </div>
            </div>

            {/* Actual Form (Right - 7 cols) */}
            <div className="lg:col-span-7 bg-white text-neutral-900 p-6 sm:p-8 rounded-2xl shadow-md">
              {isSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-xl">
                    <FaCheck />
                  </div>
                  <h4 className="font-heading font-bold text-xl text-neutral-900">
                    Consultation Request Confirmed!
                  </h4>
                  <p className="text-neutral-600 text-xs sm:text-sm max-w-md mx-auto">
                    Thank you {formData.name || "Athlete"}. {service.leadCoach.name} has received your intake request and will contact you via WhatsApp / email within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="text-xs font-bold text-primary hover:underline mt-4 cursor-pointer"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Your Full Name *
                      </label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Marcus Vance"
                        className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="marcus@example.com"
                        className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+94 77 123 4567"
                        className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                        Primary Training Focus
                      </label>
                      <select 
                        value={formData.primaryGoal}
                        onChange={(e) => setFormData({ ...formData, primaryGoal: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary bg-white"
                      >
                        <option>Fat Loss & Muscle Definition</option>
                        <option>Barbell Strength & Hypertrophy</option>
                        <option>Pain-Free Mobility & Rehab</option>
                        <option>Athletic Speed & Vertical Jump</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 uppercase tracking-wider mb-1.5">
                      Injuries or Training History Notes (Optional)
                    </label>
                    <textarea 
                      rows={3}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="e.g. Past shoulder impingement, train 3 days per week..."
                      className="w-full text-xs p-3 rounded-xl border border-neutral-300 focus:outline-none focus:border-primary"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-neutral-900 text-white font-bold text-sm py-3.5 px-6 rounded-xl transition-all duration-200 shadow-sm cursor-pointer flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? "Transmitting Intake..." : "Submit Consultation Request →"}
                  </button>
                </form>
              )}
            </div>

          </div>
        </section>

        {/* FAQs Accordion */}
        {service.faqs.length > 0 && (
          <section className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-neutral-200/90 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider mb-2">
              <FaQuestionCircle /> Clear Answers
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-neutral-900 mb-6">
              Frequently Asked Questions About This Program
            </h3>

            <div className="space-y-3">
              {service.faqs.map((faq, idx) => {
                const isOpen = openFaqIndex === idx;
                return (
                  <div 
                    key={idx} 
                    className="border border-neutral-200 rounded-2xl overflow-hidden transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(idx)}
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
        )}

        {/* Ecosystem Synergy: Recommended Products */}
        {recommendedProducts.length > 0 && (
          <section className="mb-16 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1">
                  <FaShoppingBag /> Recommended Equipment
                </span>
                <h3 className="text-2xl font-heading font-bold text-neutral-900">
                  Gear Curated For This Coaching Program
                </h3>
              </div>
              <Link 
                href="/products"
                className="text-xs font-bold text-neutral-900 hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                Browse all 100 products →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedProducts.map((p, idx) => (
                <ProductCard 
                  key={p.id}
                  id={p.id}
                  title={p.title}
                  price={p.priceDisplay}
                  oldPrice={p.oldPriceDisplay}
                  category={p.category}
                  rating={p.rating}
                  stock={p.stock}
                  image={p.image}
                  badge={p.badge}
                  index={idx}
                />
              ))}
            </div>
          </section>
        )}

        {/* Ecosystem Synergy: Related Blog Articles */}
        {relatedBlogArticles.length > 0 && (
          <section className="mb-16 pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5 mb-1">
                  <FaBookOpen /> Science & Knowledge
                </span>
                <h3 className="text-2xl font-heading font-bold text-neutral-900">
                  Related Training & Nutrition Reads
                </h3>
              </div>
              <Link 
                href="/blog"
                className="text-xs font-bold text-neutral-900 hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                Explore Blog →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedBlogArticles.map((b) => (
                <Link 
                  key={b.id} 
                  href={`/blog/${b.id}`}
                  className="group bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row gap-5 p-4"
                >
                  <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
                    <img 
                      src={b.coverImage} 
                      alt={b.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1">
                        <span>{b.category}</span>
                        <span>•</span>
                        <span>{b.readTime}</span>
                      </div>
                      <h4 className="font-heading font-bold text-sm text-neutral-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                        {b.title}
                      </h4>
                    </div>
                    <span className="text-xs font-bold text-primary flex items-center gap-1 mt-2 group-hover:translate-x-1 transition-transform">
                      Read Article <FaArrowRight className="text-[10px]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Bottom Related Services Carousel / Grid */}
        {relatedServices.length > 0 && (
          <section className="pt-10 border-t border-neutral-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">
                  Alternative Programs
                </span>
                <h3 className="text-2xl font-heading font-bold text-neutral-900">
                  Explore Other Specialized Coaching Tiers
                </h3>
              </div>
              <Link 
                href="/services"
                className="text-xs font-bold text-neutral-900 hover:text-primary flex items-center gap-1.5 transition-colors"
              >
                View all services →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedServices.map((rel, idx) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.id}`}
                  className="group bg-white rounded-2xl border border-neutral-200 p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-2">
                      {rel.category}
                    </span>
                    <h4 className="font-heading font-bold text-lg text-neutral-900 group-hover:text-primary transition-colors mb-2">
                      {rel.title}
                    </h4>
                    <p className="text-xs text-neutral-600 line-clamp-2 leading-relaxed mb-4">
                      {rel.tagline}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold">
                    <span className="text-neutral-900">{rel.startingPriceDisplay}</span>
                    <span className="text-primary flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Learn More <FaArrowRight className="text-[10px]" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}

