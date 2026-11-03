import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="font-heading text-2xl font-bold text-white mb-4 block">
              FitLife<span className="text-primary">Coach</span>
            </Link>
            <p className="text-sm mt-4 leading-relaxed">
              Better Eat, Better Life. Empowering you to achieve your health and wellness goals through personalized coaching, nutrition, and support.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors"><FaFacebook size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors"><FaTwitter size={20} /></a>
              <a href="#" className="text-neutral-400 hover:text-primary transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Services</Link></li>
              <li><Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/services" className="hover:text-primary transition-colors">Weight Loss Program</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Sports Nutrition</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Individual Coaching</Link></li>
              <li><Link href="/services" className="hover:text-primary transition-colors">Workout Routines</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>123 Fitness Avenue, Wellness City, NY 10001</li>
              <li>info@fitlifecoach.com</li>
              <li>+1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-sm text-neutral-500">
          <p>&copy; {new Date().getFullYear()} FitLifeCoach. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
