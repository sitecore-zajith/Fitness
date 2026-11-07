import type { ComponentRendering } from "@sitecore-content-sdk/nextjs";
import type { AboutSnippetFields } from "../components/AboutSnippet";
import type { AppointmentFormFields } from "../components/AppointmentForm";
import type { FooterFields } from "../components/Footer";
import type { HomeHeroFields } from "../components/HomeHero";
import type { NavbarFields } from "../components/Navbar";
import type { ProcedureFields } from "../components/Procedure";
import type { ServicesPreviewFields } from "../components/ServicesPreview";
import type { TestimonialsFields } from "../components/Testimonials";
import { image, item, link, rendering, text } from "./mock-helpers";

/**
 * Mirrors the Layout Service response for /sitecore/content/Corporate/FitLife/Home
 * (route.placeholders["headless-header"], ["headless-main"], ["headless-footer"])
 * with the content seeded by plan/Create-SitecoreAITemplates.ps1 and plan/Assign-HomePageRenderings.ps1.
 */

const navbar: NavbarFields = {
  BrandPrefix: text("FitLife"),
  BrandSuffix: text("Coach"),
  DesktopCtaLink: link("/#appointment", "Appointment"),
  MobileCtaLink: link("/#appointment", "Make an Appointment"),
  NavigationLinks: [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ].map((l) => item(l.name, { LinkTitle: text(l.name), TargetLink: link(l.href, l.name) })),
};

const footer: FooterFields = {
  BrandPrefix: text("FitLife"),
  BrandSuffix: text("Coach"),
  BrandSummary: text(
    "Better Eat, Better Life. Empowering you to achieve your health and wellness goals through personalized coaching, nutrition, and support."
  ),
  FacebookLink: link("https://facebook.com", "Facebook"),
  InstagramLink: link("https://instagram.com", "Instagram"),
  TwitterLink: link("https://twitter.com", "Twitter"),
  YoutubeLink: link("https://youtube.com", "YouTube"),
  QuickLinksHeading: text("Quick Links"),
  QuickLinks: [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Gallery", href: "/gallery" },
    { name: "Blog", href: "/blog" },
  ].map((l) => item(l.name, { LinkTitle: text(l.name), TargetLink: link(l.href, l.name) })),
  ServicesHeading: text("Our Services"),
  ServiceLinks: [
    { name: "Weight Loss Program", href: "/services" },
    { name: "Sports Nutrition", href: "/services" },
    { name: "Individual Coaching", href: "/services" },
    { name: "Workout Routines", href: "/services" },
  ].map((l) => item(l.name, { LinkTitle: text(l.name), TargetLink: link(l.href, l.name) })),
  ContactHeading: text("Contact Us"),
  Address: text("123 Fitness Avenue, Wellness City, NY 10001"),
  Email: text("info@fitlifecoach.com"),
  Phone: text("+1 (555) 123-4567"),
  CopyrightText: text("FitLifeCoach. All rights reserved."),
};

const homeHero: HomeHeroFields = {
  Subtitle: text("Transform Your Life"),
  Title: text("Eat Mindfully, Sweat Often & Self Love Always"),
  Description: text(
    "Discover a balanced approach to fitness and nutrition. Our personalized coaching programs are designed to help you achieve sustainable results."
  ),
  Image: image(
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop",
    "Fitness Training"
  ),
  CtaLink: link("/#appointment", "Make an Appointment"),
  SecondaryCta: link("/services", "Explore Services"),
  AIGeneratedPromoBadge: text("Free 7-Day Nutrition Assessment"),
};

const aboutSnippet: AboutSnippetFields = {
  Subtitle: text("About Us"),
  Title: text("Better Eat, Better Life"),
  Image: image(
    "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop",
    "Health Coach"
  ),
  CtaLink: link("/about", "Discover Our Story"),
  PrimaryParagraph: {
    value:
      "We believe that true wellness comes from a balance of nourishing food, regular physical activity, and a positive mindset. Our approach is holistic and tailored to your unique lifestyle and goals.",
  },
  SecondaryParagraph: {
    value:
      "With over two decades of experience, we have helped thousands of individuals transform their bodies and their relationship with food. Let us guide you on your journey to a healthier, happier you.",
  },
  FeatureHighlights: [
    item("Personalized Nutrition Plans", { Title: text("Personalized Nutrition Plans") }),
    item("Expert Fitness Coaching", { Title: text("Expert Fitness Coaching") }),
    item("Ongoing Support and Motivation", { Title: text("Ongoing Support & Motivation") }),
  ],
  ExperienceYears: text("24+"),
  ExperienceLabel: text("Years of Experience"),
};

const servicesPreview: ServicesPreviewFields = {
  Subtitle: text("What We Do"),
  Title: text("Our Core Offerings"),
  FeaturedServices: [
    item("Nutrition Strategies", {
      Title: text("Nutrition Strategies"),
      Description: text("Customized meal plans and nutritional advice to fuel your body and reach your goals."),
      IconName: text("FaAppleAlt"),
    }),
    item("Workout Routines", {
      Title: text("Workout Routines"),
      Description: text("Effective, science-based training programs tailored to your fitness level."),
      IconName: text("FaDumbbell"),
    }),
    item("Support and Motivation", {
      Title: text("Support & Motivation"),
      Description: text("Daily check-ins and unwavering support to keep you on track and motivated."),
      IconName: text("FaHeartbeat"),
    }),
  ],
};

const procedure: ProcedureFields = {
  Subtitle: text("Procedure"),
  Title: text("How It Works"),
  Steps: [
    ["01", "Trusted Services", "Start with a comprehensive consultation to understand your needs."],
    ["02", "Natural Ways", "We build a plan focusing on whole foods and natural supplements."],
    ["03", "Routine Exercise", "Implement a sustainable and enjoyable workout regimen."],
    ["04", "Success & Goal", "Achieve your desired results and maintain them for life."],
  ].map(([num, title, desc]) =>
    item(`Step ${num}`, { StepNumber: text(num), Title: text(title), Description: text(desc) })
  ),
};

const testimonials: TestimonialsFields = {
  Subtitle: text("Testimonials"),
  Title: text("Success Stories"),
  TestimonialsList: [
    {
      name: "Sarah Johnson",
      role: "Marketing Executive",
      quote: "FitLifeCoach completely changed my relationship with food. I've lost 20lbs and gained so much energy!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop",
    },
    {
      name: "Michael Chen",
      role: "Software Developer",
      quote: "The personalized workout routines fit perfectly into my busy schedule. Highly recommend their services.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    },
    {
      name: "Emily Rodriguez",
      role: "Mother of two",
      quote: "Finally, a sustainable approach to health. The continuous support kept me motivated throughout my journey.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=100&auto=format&fit=crop",
    },
  ].map((t) =>
    item(t.name, {
      Title: text(t.name),
      Description: text(t.quote),
      ClientRole: text(t.role),
      Rating: text<number>(5),
      AvatarImage: image(t.avatar, t.name),
    })
  ),
};

const appointmentForm: AppointmentFormFields = {
  Subtitle: text("Get in Touch"),
  Title: text("Make an Appointment"),
  PanelTitle: text("Start Your Journey Today"),
  PanelDescription: text(
    "Take the first step towards a healthier, happier you. Fill out the form, and our coaching team will get back to you within 24 hours."
  ),
  Address: text("123 Fitness Avenue, Wellness City"),
  Phone: text("+1 (555) 123-4567"),
  Email: text("info@fitlifecoach.com"),
  ServiceOptions: ["Weight Loss Program", "Sports Nutrition", "Individual Coaching", "Workout Routines"].map((name) =>
    item(name, { Title: text(name) })
  ),
  SubmitButtonText: text("Book Appointment"),
  SubmitEndpoint: text("/api/appointments"),
};

export const homeRouteMock: { placeholders: Record<string, ComponentRendering[]> } = {
  placeholders: {
    "headless-header": [rendering("Navbar", navbar)],
    "headless-main": [
      rendering("HomeHero", homeHero),
      rendering("AboutSnippet", aboutSnippet),
      rendering("ServicesPreview", servicesPreview),
      rendering("Procedure", procedure),
      rendering("Testimonials", testimonials),
      rendering("AppointmentForm", appointmentForm),
    ],
    "headless-footer": [rendering("Footer", footer)],
  },
};

