export interface ContactMapProps {
  mapSrc?: string;
  className?: string;
}

export default function ContactMap({
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126743.63162590213!2d79.7738032704285!3d6.921833527581561!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1717646197576!5m2!1sen!2sus",
  className = "",
}: ContactMapProps) {
  return (
    <section className={`bg-neutral-200 h-96 relative w-full ${className}`}>
      <iframe
        src={mapSrc}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 grayscale contrast-125"
        title="Location Map"
      />
    </section>
  );
}

