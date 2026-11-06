// Centralized Fitness & Coaching Services Data Store

export interface LeadCoach {
  name: string;
  role: string;
  credentials: string;
  avatar: string;
  bio: string;
}

export interface ProgramPhase {
  phaseNumber: number;
  weeks: string;
  title: string;
  focus: string;
  deliverables: string[];
}

export interface PricingTier {
  name: string;
  duration: string;
  price: number;
  priceDisplay: string;
  billingNote: string;
  isPopular?: boolean;
  features: string[];
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface Service {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "Personal Training" | "Online Coaching" | "Sports Nutrition" | "Strength & Conditioning" | "Rehab & Mobility" | "Corporate Wellness";
  deliveryFormat: "In-Person (Studio)" | "100% Online (App)" | "Hybrid (Gym + App)";
  duration: string;
  difficulty: "All Levels" | "Beginner" | "Intermediate" | "Advanced Athletes";
  rating: number;
  reviewsCount: number;
  startingPrice: number;
  startingPriceDisplay: string;
  badge?: "Most Popular" | "High Accountability" | "Elite Program" | "Transformational" | "Best Value";
  image: string;
  leadCoach: LeadCoach;
  overview: string;
  targetAudience: string;
  keyBenefits: string[];
  deliverablesList: string[];
  phases: ProgramPhase[];
  pricingTiers: PricingTier[];
  faqs: ServiceFAQ[];
  recommendedProductIds: string[];
  relatedBlogIds: string[];
}

export const serviceCategories = [
  "All Services",
  "Personal Training",
  "Online Coaching",
  "Sports Nutrition",
  "Strength & Conditioning",
  "Rehab & Mobility",
  "Corporate Wellness",
] as const;

export const deliveryFormats = [
  "All Formats",
  "In-Person (Studio)",
  "100% Online (App)",
  "Hybrid (Gym + App)",
] as const;

export const services: Service[] = [
  {
    id: "1",
    slug: "elite-1-on-1-personal-training",
    title: "Elite 1-on-1 In-Studio Personal Training",
    tagline: "High-touch, biomechanically precise private coaching designed for rapid strength, hypertrophy, and posture transformation.",
    category: "Personal Training",
    deliveryFormat: "In-Person (Studio)",
    duration: "12 Weeks (Renewable)",
    difficulty: "All Levels",
    rating: 4.9,
    reviewsCount: 142,
    startingPrice: 45000,
    startingPriceDisplay: "LKR 45,000 / mo",
    badge: "Most Popular",
    image: "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=1200&auto=format&fit=crop",
    leadCoach: {
      name: "Marcus Vance",
      role: "Head Performance Director",
      credentials: "CSCS, USAW-L2, B.Sc. Exercise Physiology",
      avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=300&auto=format&fit=crop",
      bio: "Over 14 years preparing national-level strength athletes and busy executives. Specializes in barbell mechanics, progressive overload, and postural restoration."
    },
    overview: "Our flagship private coaching experience. Every repetition is evaluated in real-time within our private, fully equipped training facility. You receive custom periodized training blocks, hands-on bar speed and form corrections, and continuous biometric feedback to eliminate plateaus and injury risk.",
    targetAudience: "Individuals who demand maximum accountability, have high-stress schedules, or need meticulous hands-on technique coaching.",
    keyBenefits: [
      "100% focused attention in private coaching bays — no waiting for gym equipment",
      "Real-time video barbell trajectory analysis and postural cueing",
      "Dynamic in-session load adjustments based on daily readiness (RPE)",
      "Integrated nutrition targets synchronized with your training density"
    ],
    deliverablesList: [
      "3x per week private 60-minute in-studio coaching sessions",
      "Full 3D movement and mobility screening before session one",
      "Custom monthly macro & calorie breakdown updated bi-weekly",
      "Access to private recovery lounge (infrared sauna & massage guns)",
      "Direct coach WhatsApp access for training & dining out questions"
    ],
    phases: [
      {
        phaseNumber: 1,
        weeks: "Weeks 1–4",
        title: "Movement Screening & Structural Balance",
        focus: "Joint mobility, core stiffness, establishing baseline compound lift motor patterns, and basal metabolic reset.",
        deliverables: ["Full mobility audit", "Custom warm-up protocol", "Macro onboarding guide"]
      },
      {
        phaseNumber: 2,
        weeks: "Weeks 5–8",
        title: "Progressive Overload & Density Hypertrophy",
        focus: "Systematic weekly load and volume progression, metabolic conditioning finishers, and carb cycling.",
        deliverables: ["Mid-point body composition scan", "Strength progression chart", "Hydration audit"]
      },
      {
        phaseNumber: 3,
        weeks: "Weeks 9–12",
        title: "Maximal Output & Sustainable Consolidation",
        focus: "Testing 3-5 rep strength maximums, stabilizing lean mass gains, and building an autonomous maintenance blueprint.",
        deliverables: ["Final performance evaluation", "Independent training playbook", "Long-term maintenance diet plan"]
      }
    ],
    pricingTiers: [
      {
        name: "Monthly Flex",
        duration: "1 Month (12 Sessions)",
        price: 52000,
        priceDisplay: "LKR 52,000",
        billingNote: "Billed monthly, cancel anytime with 14-day notice",
        features: [
          "12 In-Studio 1-on-1 Sessions (3x/week)",
          "Bi-weekly macro adjustments",
          "Movement screening",
          "Direct coach messaging"
        ]
      },
      {
        name: "12-Week Transformation",
        duration: "3 Months (36 Sessions)",
        price: 135000,
        priceDisplay: "LKR 135,000",
        billingNote: "Save LKR 21,000 • Payment split available (3 installments)",
        isPopular: true,
        features: [
          "36 In-Studio 1-on-1 Sessions",
          "Comprehensive InBody scans (Weeks 1, 6, 12)",
          "Personalized nutrition & grocery blueprint",
          "Full app access with travel workout routines",
          "Complimentary lifting straps & recovery sessions"
        ]
      },
      {
        name: "Yearly Athlete Retainer",
        duration: "12 Months (144 Sessions)",
        price: 480000,
        priceDisplay: "LKR 480,000",
        billingNote: "Ultimate commitment • Priority booking timeslots",
        features: [
          "Priority peak-hour slot reservations",
          "Blood work & metabolic panel review with sports physician",
          "Quarterly athletic testing & peak power tracking",
          "Unlimited recovery lounge & sauna access"
        ]
      }
    ],
    faqs: [
      {
        question: "What if I miss a scheduled session due to work travel?",
        answer: "With 24 hours notice, your session is saved as a makeup credit. You can also convert missed sessions into personalized remote app workouts programmed directly by your coach."
      },
      {
        question: "Do I need previous gym experience before starting?",
        answer: "Not at all. We train everyone from absolute beginners learning their first goblet squat to advanced athletes looking to break 200kg deadlift plateaus."
      }
    ],
    recommendedProductIds: ["1", "3", "7", "28"],
    relatedBlogIds: ["1", "3", "12"]
  },
  {
    id: "2",
    slug: "global-online-remote-coaching",
    title: "Global Online & Remote Performance Coaching",
    tagline: "World-class programming, weekly video check-ins, and daily asynchronous technique critiques delivered directly through our dedicated app.",
    category: "Online Coaching",
    deliveryFormat: "100% Online (App)",
    duration: "Monthly / 6 Months",
    difficulty: "All Levels",
    rating: 4.85,
    reviewsCount: 218,
    startingPrice: 24000,
    startingPriceDisplay: "LKR 24,000 / mo",
    badge: "High Accountability",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop",
    leadCoach: {
      name: "Elena Rostova",
      role: "Lead Online & Hypertrophy Specialist",
      credentials: "M.Sc. Human Kinetics, CISSN Nutritionist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop",
      bio: "Coaches over 80 remote athletes across 12 countries. Known for hyper-detailed lifting video markups, habit-based nutrition systems, and weekly loom video reviews."
    },
    overview: "Get elite coaching regardless of where you live or train. Whether you work out at a commercial gym, crossfit box, or a minimalist home gym, your training schedule, target weights, rest intervals, and macronutrient targets are engineered specifically around your available equipment and calendar.",
    targetAudience: "Busy professionals, frequent travelers, and self-motivated lifters who want expert programming and objective accountability without rigid appointment times.",
    keyBenefits: [
      "Custom programming tailored to your exact gym equipment inventory",
      "Asynchronous video analysis: upload your set and receive voiceover video feedback within 24 hours",
      "Weekly 10-15 minute Loom video check-in reviewing body weight trends and biofeedback",
      "Dynamic workout swaps if you travel or have an unexpected time crunch"
    ],
    deliverablesList: [
      "Custom mobile app access with HD exercise video library and rep tracking",
      "Weekly video check-in reviewing nutrition, sleep, recovery, and strength trends",
      "Unlimited form check submissions via app messaging",
      "Adaptive macronutrient and caloric targets adjusted each check-in",
      "Access to private community athlete forum and monthly masterclasses"
    ],
    phases: [
      {
        phaseNumber: 1,
        weeks: "Weeks 1–4",
        title: "Calibration & Equipment Optimization",
        focus: "Benchmarking working set loads, identifying technical sticking points via video, and dialling in baseline compliance.",
        deliverables: ["Initial video audit", "App training onboarding", "Custom grocery list"]
      },
      {
        phaseNumber: 2,
        weeks: "Weeks 5–8",
        title: "Volume Escalation & Micro-Periodization",
        focus: "Increasing effective volume near muscular failure (RIR 1–3) while monitoring recovery metrics (HRV, soreness, sleep).",
        deliverables: ["Mid-block deload strategy", "Refeed protocol", "Biofeedback evaluation"]
      },
      {
        phaseNumber: 3,
        weeks: "Weeks 9–12",
        title: "Strength Realization & Target Peak",
        focus: "Converting muscle gains into maximal force output or completing target fat loss milestones with diet refeeds.",
        deliverables: ["PR testing week plan", "Post-program reverse diet blueprint"]
      }
    ],
    pricingTiers: [
      {
        name: "Standard Remote",
        duration: "Month-to-Month",
        price: 26000,
        priceDisplay: "LKR 26,000 / mo",
        billingNote: "No lock-in contract • Auto-renews monthly",
        features: [
          "Full custom app programming",
          "Weekly written check-in & analysis",
          "Bi-weekly macro adjustments",
          "2 video form checks per week"
        ]
      },
      {
        name: "VIP Elite Remote",
        duration: "3-Month Commitment",
        price: 68000,
        priceDisplay: "LKR 68,000",
        billingNote: "Save LKR 10,000 • Dedicated 1-on-1 coach line",
        isPopular: true,
        features: [
          "Full custom app programming & auto-progression",
          "Weekly personalized Loom video check-in",
          "Unlimited video form reviews (24-hour turnaround)",
          "Direct coach WhatsApp voice note access",
          "Monthly 30-minute 1-on-1 Zoom strategy call"
        ]
      },
      {
        name: "6-Month Athlete Transformation",
        duration: "6 Months",
        price: 125000,
        priceDisplay: "LKR 125,000",
        billingNote: "Best long-term value • Total physique overhaul",
        features: [
          "Includes everything in VIP Elite Remote",
          "Phase-by-phase seasonal periodization (cut + bulk cycles)",
          "Contest/Photo shoot peak week preparation",
          "Supplements protocol & blood biomarker analysis"
        ]
      }
    ],
    faqs: [
      {
        question: "How do form checks work?",
        answer: "Record your working set on your phone and upload it through our app. Your coach draws on the screen, annotates your joint angles, and sends back a breakdown with exact cues."
      },
      {
        question: "What if my gym doesn't have specific machines?",
        answer: "Every exercise has automated, vetted alternatives in our app that match the exact same muscle recruitment and resistance curve."
      }
    ],
    recommendedProductIds: ["4", "12", "18", "33"],
    relatedBlogIds: ["2", "6", "15"]
  },
  {
    id: "3",
    slug: "sports-nutrition-metabolic-health",
    title: "Clinical Sports Nutrition & Metabolic Recomposition",
    tagline: "Evidence-based clinical nutrition, blood marker review, and bespoke meal architecture designed by certified sports dietitians.",
    category: "Sports Nutrition",
    deliveryFormat: "Hybrid (Gym + App)",
    duration: "8 to 16 Weeks",
    difficulty: "All Levels",
    rating: 4.95,
    reviewsCount: 184,
    startingPrice: 28000,
    startingPriceDisplay: "LKR 28,000 / mo",
    badge: "Transformational",
    image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop",
    leadCoach: {
      name: "Dr. Sarah Jenkins",
      role: "Director of Performance Nutrition",
      credentials: "Ph.D. Nutritional Biochemistry, RD, CSSD",
      avatar: "https://images.unsplash.com/photo-1594824813506-8c464ef24cb6?q=80&w=300&auto=format&fit=crop",
      bio: "Over 12 years consulting Olympic sprinters, endurance triathletes, and clients reversing metabolic dysfunction and insulin resistance."
    },
    overview: "No cookie-cutter fad diets. We build an actionable, nutrient-dense eating protocol based on your actual metabolic rate, insulin sensitivity, digestive tolerance, and culinary lifestyle. We combine flexible dieting principles with micronutrient optimization to ensure fat loss without muscle wasting or energy crashes.",
    targetAudience: "Anyone struggling with weight loss plateaus, persistent cravings, low energy, digestive bloating, or preparing for high-volume athletic competition.",
    keyBenefits: [
      "Custom caloric deficits or surpluses calculated from lean body mass, not guesswork",
      "Macro meal architecture that accommodates family dining, social events, and dining out",
      "Targeted micronutrient supplementation strategies to boost deep sleep and hormone synthesis",
      "Gastrointestinal gut health protocols to eliminate bloating and nutrient malabsorption"
    ],
    deliverablesList: [
      "Comprehensive 12-page Personal Dietary Blueprint with recipe catalog",
      "Weekly weight & waist circumference trend line analysis",
      "Dining-out guide for local and international restaurants",
      "Direct dietitian messaging access for meal photo feedback",
      "Supplement timing guide (pre, intra, and post-workout)"
    ],
    phases: [
      {
        phaseNumber: 1,
        weeks: "Weeks 1–3",
        title: "Metabolic Audit & Dietary Normalization",
        focus: "7-day food and biofeedback logging, eliminating inflammatory trigger foods, establishing consistent protein and water targets.",
        deliverables: ["Metabolic baseline calculation", "Personalized grocery master list", "Sleep & hydration checklist"]
      },
      {
        phaseNumber: 2,
        weeks: "Weeks 4–8",
        title: "Active Recomposition & Nutrient Timing",
        focus: "Optimizing peri-workout carbohydrate loading, accelerating fat oxidation while preserving lean mass.",
        deliverables: ["Carb cycling strategy", "Digestive symptom re-assessment", "Bi-weekly macro adjustments"]
      },
      {
        phaseNumber: 3,
        weeks: "Weeks 9–12",
        title: "Reverse Dieting & Sustainable Maintenance",
        focus: "Systematically increasing caloric intake back to maintenance to restore thyroid output and metabolic rate without fat regain.",
        deliverables: ["Reverse dieting protocol", "Social event survival guide", "Long-term maintenance strategy"]
      }
    ],
    pricingTiers: [
      {
        name: "Nutrition Kickstarter",
        duration: "4 Weeks",
        price: 32000,
        priceDisplay: "LKR 32,000",
        billingNote: "One-time intensive program",
        features: [
          "60-min Initial Comprehensive Nutrition Consultation",
          "Full customized macro & meal planning roadmap",
          "Weekly progress check-in & adjustments",
          "Supplement stack review"
        ]
      },
      {
        name: "12-Week Metabolic Reset",
        duration: "12 Weeks",
        price: 78000,
        priceDisplay: "LKR 78,000",
        billingNote: "Most popular • Includes reverse dieting phase",
        isPopular: true,
        features: [
          "Bi-weekly 30-min 1-on-1 strategy video calls",
          "Continuous weekly macro and meal timing tweaks",
          "Dining-out meal swaps via direct WhatsApp line",
          "In-depth blood panel (lipids, HbA1c, Vit D) interpretation",
          "Structured reverse dieting phase to prevent rebound fat"
        ]
      }
    ],
    faqs: [
      {
        question: "Do I have to weigh all my food with a kitchen scale?",
        answer: "We offer both precise gram-level tracking for athletes and intuitive hand-portion systems for busy clients. We match the methodology to your lifestyle."
      },
      {
        question: "Can I do this if I am vegetarian or follow halal / vegan diets?",
        answer: "Absolutely. All meal blueprints are authored from scratch around your ethical, religious, and culinary preferences."
      }
    ],
    recommendedProductIds: ["11", "24", "45", "62"],
    relatedBlogIds: ["4", "7", "11"]
  },
  {
    id: "4",
    slug: "athletic-strength-conditioning",
    title: "High-Performance Athletic Strength & Conditioning",
    tagline: "Periodized sports performance training to develop explosive force production, sprint speed, vertical jump, and injury resilience.",
    category: "Strength & Conditioning",
    deliveryFormat: "Hybrid (Gym + App)",
    duration: "16 Weeks",
    difficulty: "Intermediate",
    rating: 4.9,
    reviewsCount: 96,
    startingPrice: 38000,
    startingPriceDisplay: "LKR 38,000 / mo",
    badge: "Elite Program",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
    leadCoach: {
      name: "Tariq Mansoor",
      role: "Strength & Speed Coordinator",
      credentials: "CSCS, EXOS Performance Specialist, Former National Sprinter",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
      bio: "Has trained professional rugby players, track sprinters, and combat athletes. Focused on force-velocity profiling and multidirectional speed."
    },
    overview: "Built for competitive athletes and serious gym-goers who want to build functional athleticism, not just gym vanity muscles. We test your force-velocity curve, identify whether you lack max strength or explosive rate of force development (RFD), and build conjugate/block periodized training cycles that carry over directly to the field or court.",
    targetAudience: "Team sport athletes (rugby, football, basketball), martial artists, and advanced lifters wanting to sprint faster, jump higher, and remain bulletproof.",
    keyBenefits: [
      "Force-velocity profiling using jump mats and velocity-based training (VBT) sensors",
      "Deceleration mechanics and change-of-direction (COD) drills to prevent ACL injuries",
      "Conjugate and triphasic training methodologies (eccentric, isometric, concentric)",
      "Sport-specific energy system development (glycolytic and alactic conditioning)"
    ],
    deliverablesList: [
      "Bi-weekly in-person VBT bar speed and jump height benchmarking",
      "Full 16-week periodized athlete training program in mobile app",
      "Pre-game and post-game recovery & CNS reset protocols",
      "Sport-specific plyometrics and tendon elasticity progressions"
    ],
    phases: [
      {
        phaseNumber: 1,
        weeks: "Weeks 1–4",
        title: "Structural Hypertrophy & Tendon Stiffening",
        focus: "Building work capacity, reinforcing connective tissue, and unilateral strength balance.",
        deliverables: ["Force-velocity baseline report", "Unilateral balance screening"]
      },
      {
        phaseNumber: 2,
        weeks: "Weeks 5–10",
        title: "Maximal Force Production & Triphasic Training",
        focus: "Sub-maximal and maximal compound strength (80–90% 1RM) paired with rapid eccentric absorption.",
        deliverables: ["Bar speed velocity curves", "Mid-cycle power test"]
      },
      {
        phaseNumber: 3,
        weeks: "Weeks 11–16",
        title: "Speed-Strength Realization & In-Season Taper",
        focus: "Converting strength into explosive acceleration, contrast training, and peaking CNS freshness.",
        deliverables: ["Final 40m sprint & vertical jump testing", "In-season maintenance split"]
      }
    ],
    pricingTiers: [
      {
        name: "Quarterly Athlete Block",
        duration: "12 Weeks",
        price: 98000,
        priceDisplay: "LKR 98,000",
        billingNote: "Full 12-week off-season conditioning cycle",
        isPopular: true,
        features: [
          "Complete periodized programming in app",
          "Weekly in-person velocity & technique check-in",
          "Direct coach contact & video breakdown",
          "Pre-competition tapering protocol"
        ]
      }
    ],
    faqs: [
      {
        question: "Can I do this during my competitive season?",
        answer: "Yes. We offer an in-season volume model designed to preserve maximal strength and power while keeping systemic fatigue low for weekend matches."
      }
    ],
    recommendedProductIds: ["2", "5", "8", "19"],
    relatedBlogIds: ["5", "8", "16"]
  },
  {
    id: "5",
    slug: "injury-rehabilitation-functional-mobility",
    title: "Injury Rehabilitation & Functional Range Conditioning",
    tagline: "Corrective exercise therapy, joint articulation restoration, and post-rehab strength integration to get you moving completely pain-free.",
    category: "Rehab & Mobility",
    deliveryFormat: "In-Person (Studio)",
    duration: "8 to 12 Weeks",
    difficulty: "All Levels",
    rating: 4.98,
    reviewsCount: 167,
    startingPrice: 42000,
    startingPriceDisplay: "LKR 42,000 / mo",
    badge: "Transformational",
    image: "https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop",
    leadCoach: {
      name: "Dr. Alicia Chen",
      role: "Head of Physical Therapy & Mobility",
      credentials: "DPT (Doctor of Physical Therapy), FRCms, OCS",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
      bio: "Former clinical orthopedic specialist specializing in lumbar spine disc herniation, shoulder impingement, and post-ACL reconstruction return-to-sport training."
    },
    overview: "Don't let chronic aches or past injuries dictate your training. We bridge the gap between traditional clinical physical therapy and heavy resistance training. We assess joint capsule space, neurological inhibition, and tissue tolerance, then systematically build resilient tendons, active joint mobility, and bulletproof core stability.",
    targetAudience: "Individuals dealing with chronic lower back pain, knee discomfort during squats, shoulder impingement during presses, or athletes transitioning out of physical therapy.",
    keyBenefits: [
      "Detailed orthopedic physical assessment (range of motion, nerve tension, muscle firing patterns)",
      "Controlled Articular Rotations (CARs) and PAILs/RAILs isometric strengthening protocols",
      "Progressive loading strategies that eliminate fear of movement (kinesiophobia)",
      "Clear criteria-based progression to return to full deadlifts, squats, and overhead presses"
    ],
    deliverablesList: [
      "1-on-1 private corrective therapy & strength rehabilitation sessions",
      "Daily 10-minute home mobility prescription tailored to your problem joints",
      "Exercise modification matrix for your regular gym workouts",
      "Bi-weekly joint angle and passive vs active ROM re-assessments"
    ],
    phases: [
      {
        phaseNumber: 1,
        weeks: "Weeks 1–3",
        title: "Pain Modulation & Active Joint Space",
        focus: "Desensitizing painful movement pathways, restoring rotational capacity at hips/shoulders, and lumbo-pelvic control.",
        deliverables: ["Clinical diagnostic report", "Daily joint CARs routine", "Ergonomic seating guide"]
      },
      {
        phaseNumber: 2,
        weeks: "Weeks 4–7",
        title: "Isometric Tissue Strengthening (PAILs/RAILs)",
        focus: "Loading tissues in end-range positions to build new active usable range of motion and tendon collagen synthesis.",
        deliverables: ["End-range strength audit", "Modified compound lift integration"]
      },
      {
        phaseNumber: 3,
        weeks: "Weeks 8–12",
        title: "Full Compound Integration & Resilience",
        focus: "Reintroducing full-depth squats, deadlifts, and overhead loads under progressive overload without symptoms.",
        deliverables: ["Return-to-lifting blueprint", "Lifelong injury mitigation protocol"]
      }
    ],
    pricingTiers: [
      {
        name: "Clinical Rehab Package (8 Weeks)",
        duration: "8 Weeks (16 Sessions)",
        price: 76000,
        priceDisplay: "LKR 76,000",
        billingNote: "2 Sessions per week • Hands-on therapy + Strength",
        isPopular: true,
        features: [
          "16 Private 1-on-1 Corrective Sessions",
          "Comprehensive orthopedic joint screening",
          "Full video library of custom corrective drills",
          "Coordination with your orthopedic surgeon if needed"
        ]
      }
    ],
    faqs: [
      {
        question: "Can I start if I currently have an active MRI diagnosis (e.g. L4-L5 disc bulge)?",
        answer: "Yes. Our lead therapist is a licensed Doctor of Physical Therapy trained in interpreting medical imaging and tailoring movements safely around specific pathologies."
      }
    ],
    recommendedProductIds: ["15", "16", "22", "40"],
    relatedBlogIds: ["9", "14", "22"]
  },
  {
    id: "6",
    slug: "executive-corporate-wellness-coaching",
    title: "Executive & Corporate Health Coaching",
    tagline: "High-ROI health optimization for busy leaders and corporate teams—targeting cognitive stamina, stress resilience, and metabolic health.",
    category: "Corporate Wellness",
    deliveryFormat: "Hybrid (Gym + App)",
    duration: "Ongoing / Retainer",
    difficulty: "All Levels",
    rating: 4.88,
    reviewsCount: 74,
    startingPrice: 65000,
    startingPriceDisplay: "LKR 65,000 / mo",
    badge: "Best Value",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    leadCoach: {
      name: "Marcus Vance & Dr. Sarah Jenkins",
      role: "Corporate Wellness Directors",
      credentials: "CSCS & Registered Dietitian Team",
      avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?q=80&w=300&auto=format&fit=crop",
      bio: "Have delivered wellness and executive stamina programs to leading financial institutions, tech startups, and multinational boards across Sri Lanka and Singapore."
    },
    overview: "Designed for C-suite executives, senior leadership teams, and forward-thinking companies. We implement high-impact, time-efficient 30-45 minute workout architectures, business-travel nutrition protocols, and circadian rhythm sleep optimization strategies to eliminate executive burnout and drive sustained peak cognitive performance.",
    targetAudience: "Executive leaders with demanding 60+ hour work weeks, frequent international travel, and corporate organizations looking to improve employee health metrics.",
    keyBenefits: [
      "Time-efficient training blocks (30–45 mins) engineered for maximum metabolic effect",
      "Executive travel protocol (hotel room bodyweight & band routines, airport dining guides)",
      "Continuous glucose monitor (CGM) & sleep biometric integration (Oura / Apple Watch)",
      "Reduction in corporate healthcare claims and demonstrable increase in daily cognitive energy"
    ],
    deliverablesList: [
      "Monthly executive biometric health score report",
      "Direct VIP coach access for quick travel adaptations",
      "On-demand executive workout routines in custom mobile app",
      "Quarterly interactive team workshops on nutrition, ergonomics, and stress"
    ],
    phases: [
      {
        phaseNumber: 1,
        weeks: "Weeks 1–4",
        title: "Executive Health Audit & Energy Audit",
        focus: "Analyzing sleep architecture, caffeine intake, sedentary periods, and establishing 30-min micro-workout habits.",
        deliverables: ["Executive health audit", "Desk mobility routine", "Travel dining guide"]
      },
      {
        phaseNumber: 2,
        weeks: "Weeks 5–8",
        title: "Circadian Rhythm & Metabolic Optimization",
        focus: "Stabilizing blood glucose, reducing afternoon energy crashes, and progressive resistance training.",
        deliverables: ["Metabolic glucose review", "Mid-block executive progress report"]
      },
      {
        phaseNumber: 3,
        weeks: "Weeks 9–12",
        title: "Sustained Executive High Performance",
        focus: "Automating lifelong healthy travel habits, stress resilience techniques, and annual health checkups.",
        deliverables: ["Executive health scorecard", "Year-round maintenance playbook"]
      }
    ],
    pricingTiers: [
      {
        name: "Individual Executive Retainer",
        duration: "Monthly Retainer",
        price: 65000,
        priceDisplay: "LKR 65,000 / mo",
        billingNote: "Full VIP private access for one senior executive",
        isPopular: true,
        features: [
          "Private in-person or remote 1-on-1 coaching",
          "Direct priority VIP WhatsApp line with head coach",
          "Hotel & business travel custom workouts",
          "Executive nutrition concierge (meals, groceries, restaurants)",
          "Biometric sleep & recovery tracking"
        ]
      },
      {
        name: "Corporate Team Tier (Up to 10 Members)",
        duration: "Quarterly Program",
        price: 250000,
        priceDisplay: "LKR 250,000 / mo",
        billingNote: "Billed quarterly • Complete corporate wellness suite",
        features: [
          "App memberships for up to 10 employees",
          "Monthly on-site interactive workshops & wellness seminars",
          "Company-wide step & fitness challenges with prize incentives",
          "Quarterly executive board health metrics review"
        ]
      }
    ],
    faqs: [
      {
        question: "Can workouts be done with limited hotel gym equipment?",
        answer: "Yes. Our executive routines are designed specifically to be executed with just 2 pairs of dumbbells, resistance bands, or simple bodyweight circuits."
      }
    ],
    recommendedProductIds: ["7", "14", "23", "38"],
    relatedBlogIds: ["3", "10", "18"]
  }
];

// Helper functions
export function getService(id: string): Service {
  const service = services.find((s) => s.id === id || s.slug === id);
  if (service) return service;
  return services[0];
}

export function getRelatedServices(currentId: string, limit = 3): Service[] {
  return services.filter((s) => s.id !== currentId).slice(0, limit);
}

