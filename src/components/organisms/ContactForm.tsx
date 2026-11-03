import { motion } from "framer-motion";

export default function ContactForm() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="w-full lg:w-2/3"
    >
      <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-neutral-100">
        <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-8">Send Us A Message</h3>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Your Name</label>
              <input 
                type="text" 
                placeholder="John Doe"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john@example.com"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors text-sm" 
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
              <input 
                type="tel" 
                placeholder="+94 77 123 4567"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors text-sm" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Subject</label>
              <input 
                type="text" 
                placeholder="Membership Inquiry"
                className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors text-sm" 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">Your Message</label>
            <textarea 
              rows={6} 
              placeholder="How can we help you?"
              className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors resize-none text-sm"
            ></textarea>
          </div>
          
          <button type="submit" className="w-full bg-primary text-white font-bold py-4 px-8 rounded-lg hover:bg-neutral-900 transition-colors duration-300">
            Send Message
          </button>
        </form>
      </div>
    </motion.div>
  );
}
