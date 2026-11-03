"use client";

import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock } from "react-icons/fa";
import ContactInfoItem from "@/components/molecules/ContactInfoItem";

export interface ContactDetails {
  address?: string[];
  phone?: string;
  emails?: string[];
  hours?: string[];
}

export interface ContactInfoSectionProps {
  title?: string;
  description?: string;
  contactDetails?: ContactDetails;
  className?: string;
}

export default function ContactInfoSection({
  title = "Contact Information",
  description = "Have questions about our programs, memberships, or personal training? Reach out to us and we'll get back to you as soon as possible!",
  contactDetails = {
    address: ["123 Fitness Avenue,", "Wellness City, NY 10001"],
    phone: "+1 (555) 123-4567",
    emails: ["info@fitlifecoach.com", "support@fitlifecoach.com"],
    hours: ["Mon - Fri: 5:30 AM - 10:00 PM", "Sat - Sun: 7:00 AM - 8:00 PM"],
  },
  className = "",
}: ContactInfoSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`w-full lg:w-1/3 ${className}`}
    >
      <div className="mb-10">
        <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
          {title}
        </h2>
        <p className="text-neutral-600 leading-relaxed">{description}</p>
      </div>

      <div className="space-y-8">
        <ContactInfoItem
          icon={<FaMapMarkerAlt size={20} />}
          title="Our Location"
          description={
            <>
              {contactDetails.address?.map((line, idx) => (
                <span key={idx}>
                  {line}
                  <br />
                </span>
              ))}
            </>
          }
        />

        <ContactInfoItem
          icon={<FaPhoneAlt size={20} />}
          title="Phone Number"
          description={<p>{contactDetails.phone}</p>}
        />

        <ContactInfoItem
          icon={<FaEnvelope size={20} />}
          title="Email Address"
          description={
            <>
              {contactDetails.emails?.map((email, idx) => (
                <span key={idx}>
                  {email}
                  <br />
                </span>
              ))}
            </>
          }
        />

        <ContactInfoItem
          icon={<FaClock size={20} />}
          title="Operating Hours"
          description={
            <>
              {contactDetails.hours?.map((hr, idx) => (
                <span key={idx}>
                  {hr}
                  <br />
                </span>
              ))}
            </>
          }
        />
      </div>
    </motion.div>
  );
}

