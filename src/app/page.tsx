import HomeHero from "@/components/organisms/HomeHero";
import AboutSnippet from "@/components/organisms/AboutSnippet";
import ServicesPreview from "@/components/organisms/ServicesPreview";
import Procedure from "@/components/organisms/Procedure";
import Testimonials from "@/components/organisms/Testimonials";
import AppointmentForm from "@/components/organisms/AppointmentForm";

export default function Home() {
  return (
    <>
      <HomeHero />
      <AboutSnippet />
      <ServicesPreview />
      <Procedure />
      <Testimonials />
      <AppointmentForm />
    </>
  );
}
