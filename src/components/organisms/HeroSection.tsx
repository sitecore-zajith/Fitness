import Breadcrumb from "../molecules/Breadcrumb";

export interface HeroSectionProps {
  title: string;
  pageName: string;
  bgImage: string;
}

export default function HeroSection({ title, pageName, bgImage }: HeroSectionProps) {
  return (
    <section className="relative pt-40 pb-32 flex items-center bg-neutral-900 justify-center text-center">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <img 
          src={bgImage} 
          alt={title} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb pageName={pageName} />
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-white mb-0">
          {title}
        </h1>
      </div>
    </section>
  );
}
