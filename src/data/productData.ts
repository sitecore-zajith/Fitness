// Auto-generated 100 fitness, coaching, equipment, and nutrition products
export interface Product {
  id: string;
  sku: string;
  title: string;
  price: number;
  priceDisplay: string;
  oldPriceDisplay?: string;
  category: string;
  productType: "Equipment" | "Coaching" | "Supplements" | "Recovery" | "Gear";
  rating: number;
  reviewsCount: number;
  stock: "In Stock" | "Low Stock" | "Pre-Order";
  badge?: "Sale" | "New" | "Hot" | "Best Seller";
  image: string;
  gallery: string[];
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specifications: Record<string, string>;
  coachTip: string;
  relatedProductIds: string[];
}

export const productCategories: string[] = [
  "All Products",
  "Strength Equipment",
  "Cardio Equipment",
  "Coaching & Programs",
  "Nutrition & Supplements",
  "Recovery & Mobility",
  "Apparel & Gear"
];

export const productTypes: string[] = [
  "All Types",
  "Equipment",
  "Coaching",
  "Supplements",
  "Recovery",
  "Gear"
];

export const products: Product[] = [
  {
    "id": "1",
    "sku": "FIT-STR-1001",
    "title": "Pro Iron Olympic Barbell 20kg",
    "price": 37000,
    "priceDisplay": "LKR 37,000",
    "oldPriceDisplay": "LKR 43,500",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.6,
    "reviewsCount": 28,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Hardened chrome Olympic barbell with 28mm shaft and 190,000 PSI tensile strength.",
    "fullDescription": "Hardened chrome Olympic barbell with 28mm shaft and 190,000 PSI tensile strength. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "190,000 PSI tensile strength",
      "Dual knurl marks for IWF and IPF lifts",
      "8 needle bearings for smooth sleeve spin",
      "1500 lb load capacity"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "4",
      "9",
      "17",
      "26"
    ]
  },
  {
    "id": "2",
    "sku": "FIT-CAR-1002",
    "title": "Commercial Heavy Duty Power Rack Cage",
    "price": 95000,
    "priceDisplay": "LKR 95,000",
    "oldPriceDisplay": "LKR 112,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.6,
    "reviewsCount": 41,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "11-gauge 3x3 steel commercial power cage with multi-grip pull-up bar and spotter arms.",
    "fullDescription": "11-gauge 3x3 steel commercial power cage with multi-grip pull-up bar and spotter arms. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "3x3 inch 11-gauge structural steel",
      "Westside hole spacing through bench zone",
      "Laser-cut numbered uprights",
      "Includes sandwich J-cups & safety straps"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "5",
      "10",
      "18",
      "27"
    ]
  },
  {
    "id": "3",
    "sku": "FIT-COA-1003",
    "title": "Adjustable Quick-Select Dumbbell Set 32kg",
    "price": 22500,
    "priceDisplay": "LKR 22,500",
    "oldPriceDisplay": "LKR 26,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.7,
    "reviewsCount": 54,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Replaces 16 pairs of dumbbells in one compact dial-turn mechanism (2kg to 32kg).",
    "fullDescription": "Replaces 16 pairs of dumbbells in one compact dial-turn mechanism (2kg to 32kg). Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "16 weight increments from 2kg to 32kg",
      "Anti-slip knurled aluminum handle",
      "Heavy-duty steel cradle included",
      "Space-saving footprint"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "6",
      "11",
      "19",
      "28"
    ]
  },
  {
    "id": "4",
    "sku": "FIT-NUT-1004",
    "title": "Competition Cast Iron Kettlebell 24kg",
    "price": 6000,
    "priceDisplay": "LKR 6,000",
    "oldPriceDisplay": "LKR 7,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.8,
    "reviewsCount": 67,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Single-piece gravity cast iron kettlebell with color-coded handle and flat machined base.",
    "fullDescription": "Single-piece gravity cast iron kettlebell with color-coded handle and flat machined base. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Single-piece gravity casting for extreme durability",
      "Smooth unpainted handle for chalk adhesion",
      "Machined flat base prevents rocking",
      "Standard competition dimensions"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "7",
      "12",
      "20",
      "29"
    ]
  },
  {
    "id": "5",
    "sku": "FIT-REC-1005",
    "title": "Commercial Multi-Angle Adjustable Bench",
    "price": 6000,
    "priceDisplay": "LKR 6,000",
    "oldPriceDisplay": "LKR 7,000",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.8,
    "reviewsCount": 80,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Laser-cut ladder back bench with 7 back positions (-15° decline to 85° incline) and zero pad gap.",
    "fullDescription": "Laser-cut ladder back bench with 7 back positions (-15° decline to 85° incline) and zero pad gap. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "7 backrest angles (-15°, 0°, 15°, 30°, 45°, 60°, 85°)",
      "Zero pad gap design prevents pelvic pinch",
      "Ultra-dense high-density vinyl padding",
      "Wheels and transport handle"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "8",
      "13",
      "21",
      "30"
    ]
  },
  {
    "id": "6",
    "sku": "FIT-APP-1006",
    "title": "Urethane Olympic Bumper Plate Set 100kg",
    "price": 4500,
    "priceDisplay": "LKR 4,500",
    "oldPriceDisplay": "LKR 5,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.9,
    "reviewsCount": 93,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Low-bounce premium polyurethane bumper plates with solid steel chrome hubs.",
    "fullDescription": "Low-bounce premium polyurethane bumper plates with solid steel chrome hubs. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Solid cast chrome center hub",
      "Hard durometer urethane for dead-bounce safety",
      "Standard 450mm diameter across all weights",
      "Raised white lettering and slim profile"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "9",
      "14",
      "22",
      "31"
    ]
  },
  {
    "id": "7",
    "sku": "FIT-STR-1007",
    "title": "Trap Hex Bar with Dual High/Low Grips",
    "price": 47500,
    "priceDisplay": "LKR 47,500",
    "oldPriceDisplay": "LKR 56,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 5,
    "reviewsCount": 106,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Open-ended or dual-handle trap bar that eliminates lumbar shear stress during deadlifts.",
    "fullDescription": "Open-ended or dual-handle trap bar that eliminates lumbar shear stress during deadlifts. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual handle heights: flush and raised 4-inch",
      "Knurled 28mm grip handles",
      "Built-in bar jack for effortless plate changes",
      "Rated to 800 lbs load capacity"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "10",
      "15",
      "23",
      "32"
    ]
  },
  {
    "id": "8",
    "sku": "FIT-CAR-1008",
    "title": "Heavy-Duty Wall Mounted Pull-Up & Dip Station",
    "price": 110000,
    "priceDisplay": "LKR 110,000",
    "oldPriceDisplay": "LKR 130,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.6,
    "reviewsCount": 119,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Reinforced carbon steel wall fixture supporting wide pull-ups, close grips, and tricep dips.",
    "fullDescription": "Reinforced carbon steel wall fixture supporting wide pull-ups, close grips, and tricep dips. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Triangular gusset bracing for rock-solid stability",
      "Multi-grip ergonomic chin-up handles",
      "Padded forearm rests for leg raises",
      "350 kg weight limit"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "11",
      "16",
      "24",
      "33"
    ]
  },
  {
    "id": "9",
    "sku": "FIT-COA-1009",
    "title": "Commercial Dual Cable Functional Trainer",
    "price": 27000,
    "priceDisplay": "LKR 27,000",
    "oldPriceDisplay": "LKR 32,000",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.6,
    "reviewsCount": 132,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Dual 90kg weight stacks with 30-position adjustable pulleys and aircraft-grade steel cables.",
    "fullDescription": "Dual 90kg weight stacks with 30-position adjustable pulleys and aircraft-grade steel cables. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual 90kg precision steel weight stacks",
      "2:1 pulley ratio for smooth explosive movement",
      "Multi-grip center chin-up bar",
      "Includes 6 commercial attachments"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "12",
      "17",
      "25",
      "34"
    ]
  },
  {
    "id": "10",
    "sku": "FIT-NUT-1010",
    "title": "Adjustable Glute Ham Developer (GHD)",
    "price": 7500,
    "priceDisplay": "LKR 7,500",
    "oldPriceDisplay": "LKR 9,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.7,
    "reviewsCount": 145,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Heavy commercial GHD machine for bulletproofing the posterior chain, glutes, and hamstrings.",
    "fullDescription": "Heavy commercial GHD machine for bulletproofing the posterior chain, glutes, and hamstrings. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Split crescent pad design for pelvic comfort",
      "Smooth horizontal and vertical footplate adjustments",
      "Band pegs for accommodating resistance",
      "Oversized foot roller pads"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "13",
      "18",
      "26",
      "35"
    ]
  },
  {
    "id": "11",
    "sku": "FIT-REC-1011",
    "title": "Quantum Apex Commercial Treadmill T500",
    "price": 8000,
    "priceDisplay": "LKR 8,000",
    "oldPriceDisplay": "LKR 9,500",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.8,
    "reviewsCount": 158,
    "stock": "In Stock",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Commercial 4.0 HP AC motor treadmill with 15% motorized incline and orthopedic belt.",
    "fullDescription": "Commercial 4.0 HP AC motor treadmill with 15% motorized incline and orthopedic belt. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "4.0 HP continuous AC motor (22 km/h top speed)",
      "15% auto motorized incline",
      "Multi-ply commercial orthopedic running deck",
      "15.6-inch touchscreen console with Bluetooth"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "14",
      "19",
      "27",
      "36"
    ]
  },
  {
    "id": "12",
    "sku": "FIT-APP-1012",
    "title": "HydroRower Water Resistance Rower",
    "price": 6000,
    "priceDisplay": "LKR 6,000",
    "oldPriceDisplay": "LKR 7,000",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.8,
    "reviewsCount": 171,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Real water flywheel rowing ergometer crafted with solid ash wood and dual-blade impeller.",
    "fullDescription": "Real water flywheel rowing ergometer crafted with solid ash wood and dual-blade impeller. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Natural water flywheel resistance for silent stroke dynamics",
      "Precision digital performance monitor with stroke rate",
      "Vertical storage footprint takes under 2 sq ft",
      "Ergonomic contoured seat on dual aluminum rails"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "15",
      "20",
      "28",
      "37"
    ]
  },
  {
    "id": "13",
    "sku": "FIT-STR-1013",
    "title": "Commercial Assault Air Bike Pro",
    "price": 58500,
    "priceDisplay": "LKR 58,500",
    "oldPriceDisplay": "LKR 69,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.9,
    "reviewsCount": 184,
    "stock": "In Stock",
    "badge": "New",
    "image": "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Heavy-duty 27-inch steel fan air bike delivering limitless exponential wind resistance.",
    "fullDescription": "Heavy-duty 27-inch steel fan air bike delivering limitless exponential wind resistance. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "27-inch diameter steel fan wheel",
      "Sealed cartridge bearings at every pivot point",
      "Integrated Tabata and interval programming console",
      "Universal multi-grip push/pull handlebars"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "16",
      "21",
      "29",
      "38"
    ]
  },
  {
    "id": "14",
    "sku": "FIT-CAR-1014",
    "title": "Curved Non-Motorized Slat Treadmill",
    "price": 125000,
    "priceDisplay": "LKR 125,000",
    "oldPriceDisplay": "LKR 147,500",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 5,
    "reviewsCount": 17,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Self-powered curved treadmill that forces natural midfoot running and burns 30% more calories.",
    "fullDescription": "Self-powered curved treadmill that forces natural midfoot running and burns 30% more calories. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "100% human-powered zero electricity requirement",
      "Heavy-duty rubberized aluminum slat track",
      "Curved ergonomic deck promotes proper forefoot striking",
      "Infinite speed capability for maximal sprint drills"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "17",
      "22",
      "30",
      "39"
    ]
  },
  {
    "id": "15",
    "sku": "FIT-COA-1015",
    "title": "Magnetic Resistance Indoor Cycling Studio Bike",
    "price": 31500,
    "priceDisplay": "LKR 31,500",
    "oldPriceDisplay": "LKR 37,000",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.5,
    "reviewsCount": 30,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Whisper-quiet magnetic resistance spin bike with 20kg perimeter-weighted flywheel.",
    "fullDescription": "Whisper-quiet magnetic resistance spin bike with 20kg perimeter-weighted flywheel. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Silent magnetic resistance system with emergency stop",
      "20kg flywheel for authentic road inertia",
      "Dual-sided pedals with SPD clips and toe cages",
      "4-way adjustable racing seat and aero handlebars"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "18",
      "23",
      "31",
      "40"
    ]
  },
  {
    "id": "16",
    "sku": "FIT-NUT-1016",
    "title": "Commercial Stepmill Stair Climber",
    "price": 9000,
    "priceDisplay": "LKR 9,000",
    "oldPriceDisplay": "LKR 10,500",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.6,
    "reviewsCount": 43,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Revolving staircase cardio machine targeting glutes, calves, and extreme aerobic stamina.",
    "fullDescription": "Revolving staircase cardio machine targeting glutes, calves, and extreme aerobic stamina. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Revolving staircase with 8-inch step depth",
      "Infrared safety stop sensors",
      "20 resistance levels with 24 to 162 steps per minute",
      "Contact heart rate grips and sweat-resistant console"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "19",
      "24",
      "32",
      "41"
    ]
  },
  {
    "id": "17",
    "sku": "FIT-REC-1017",
    "title": "1-on-1 Elite Coaching Program (3 Months)",
    "price": 10000,
    "priceDisplay": "LKR 10,000",
    "oldPriceDisplay": "LKR 12,000",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.7,
    "reviewsCount": 56,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Direct weekly 1-on-1 performance coaching, personalized hypertrophy cycles, and nutrition oversight.",
    "fullDescription": "Direct weekly 1-on-1 performance coaching, personalized hypertrophy cycles, and nutrition oversight. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Weekly 45-minute video coaching consultation",
      "Fully individualized training split updated bi-weekly",
      "Daily WhatsApp accountability and lifting form checks",
      "Personalized clinical macronutrient and calorie plan"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "20",
      "25",
      "33",
      "42"
    ]
  },
  {
    "id": "18",
    "sku": "FIT-APP-1018",
    "title": "12-Week Body Recomposition Blueprint",
    "price": 7000,
    "priceDisplay": "LKR 7,000",
    "oldPriceDisplay": "LKR 8,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.8,
    "reviewsCount": 69,
    "stock": "Low Stock",
    "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Comprehensive phase-based strength & nutrition protocol engineered to burn fat and retain muscle.",
    "fullDescription": "Comprehensive phase-based strength & nutrition protocol engineered to burn fat and retain muscle. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "3 progressive 4-week mesocycles with video exercise library",
      "Interactive macro and calorie calculation spreadsheet",
      "Deload protocols and metabolic rate protection guide",
      "Lifetime community access and private Q&A forum"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "21",
      "26",
      "34",
      "43"
    ]
  },
  {
    "id": "19",
    "sku": "FIT-STR-1019",
    "title": "Clinical Sports Nutrition & Meal Planning Consultation",
    "price": 69000,
    "priceDisplay": "LKR 69,000",
    "oldPriceDisplay": "LKR 81,500",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.8,
    "reviewsCount": 82,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Comprehensive metabolic assessment, blood panel review, and customized meal schedule with Dr. Elena Rostova.",
    "fullDescription": "Comprehensive metabolic assessment, blood panel review, and customized meal schedule with Dr. Elena Rostova. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "60-minute in-depth clinical dietary video review",
      "Custom 7-day meal plan aligned with your work schedule",
      "Targeted micronutrient, gut health, and supplement stack",
      "30 days of direct messaging support"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "22",
      "27",
      "35",
      "44"
    ]
  },
  {
    "id": "20",
    "sku": "FIT-CAR-1020",
    "title": "Functional Range Mobility & Joint Longevity Protocol",
    "price": 140000,
    "priceDisplay": "LKR 140,000",
    "oldPriceDisplay": "LKR 165,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.9,
    "reviewsCount": 95,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "A 6-week daily joint mobility course with Maya Lin designed to eliminate knee, hip, and shoulder restrictions.",
    "fullDescription": "A 6-week daily joint mobility course with Maya Lin designed to eliminate knee, hip, and shoulder restrictions. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Daily 12-minute follow-along mobility video routines",
      "Self-assessment joint diagnostic screening tests",
      "Targeted CARs (Controlled Articular Rotations) drills",
      "Downloadable travel and office mobility PDF cheatsheets"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "23",
      "28",
      "36",
      "45"
    ]
  },
  {
    "id": "21",
    "sku": "FIT-COA-1021",
    "title": "100% Grass-Fed Whey Protein Isolate (2kg)",
    "price": 36000,
    "priceDisplay": "LKR 36,000",
    "oldPriceDisplay": "LKR 42,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 5,
    "reviewsCount": 108,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Micro-filtered pure grass-fed whey isolate delivering 27g protein, 6.2g BCAAs, and zero sugar per scoop.",
    "fullDescription": "Micro-filtered pure grass-fed whey isolate delivering 27g protein, 6.2g BCAAs, and zero sugar per scoop. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "27g protein per 30g scoop with 90% purity",
      "Cold-filtered cross-flow microfiltration preserves immunoglobulins",
      "Zero artificial colors, gums, or chemical fillers",
      "Informed-Sport certified drug-tested batch validation"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "24",
      "29",
      "37",
      "46"
    ]
  },
  {
    "id": "22",
    "sku": "FIT-NUT-1022",
    "title": "Pure Micronized Creatine Monohydrate (500g)",
    "price": 10500,
    "priceDisplay": "LKR 10,500",
    "oldPriceDisplay": "LKR 12,500",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.5,
    "reviewsCount": 121,
    "stock": "In Stock",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "200-mesh ultra-fine pure creatine monohydrate for 100% instant solubility and zero stomach upset.",
    "fullDescription": "200-mesh ultra-fine pure creatine monohydrate for 100% instant solubility and zero stomach upset. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "100 servings of 5g pure pharmaceutical-grade creatine",
      "200-mesh particle size dissolves effortlessly without grittiness",
      "Unflavored: blends seamlessly into any shake or water",
      "Supports cellular ATP resynthesis and power output"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "25",
      "30",
      "38",
      "47"
    ]
  },
  {
    "id": "23",
    "sku": "FIT-REC-1023",
    "title": "High-Potency Electrolyte Hydration Tub (60 Servings)",
    "price": 12000,
    "priceDisplay": "LKR 12,000",
    "oldPriceDisplay": "LKR 14,000",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.6,
    "reviewsCount": 134,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Clinical ratio of sodium (1000mg), potassium (200mg), and magnesium malate (60mg) with zero sugar.",
    "fullDescription": "Clinical ratio of sodium (1000mg), potassium (200mg), and magnesium malate (60mg) with zero sugar. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1,000mg natural sodium from Himalayan pink salt",
      "200mg potassium citrate and 60mg magnesium malate",
      "Sweetened with organic stevia leaf extract and real lime juice",
      "Prevents exercise cramps, dehydration headaches, and brain fog"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "26",
      "31",
      "39",
      "48"
    ]
  },
  {
    "id": "24",
    "sku": "FIT-APP-1024",
    "title": "Ultra-Pure Molecularly Distilled Omega-3 (120 Softgels)",
    "price": 8000,
    "priceDisplay": "LKR 8,000",
    "oldPriceDisplay": "LKR 9,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.7,
    "reviewsCount": 147,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Triglyceride-form wild fish oil providing 1,200mg EPA and 800mg DHA per daily serving.",
    "fullDescription": "Triglyceride-form wild fish oil providing 1,200mg EPA and 800mg DHA per daily serving. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1,200mg EPA and 800mg DHA in high-potency triglyceride form",
      "Molecularly distilled to eliminate heavy metals and PCBs",
      "Enteric-coated to prevent fishy aftertaste or burps",
      "Third-party tested by IFOS (5-star rating)"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "27",
      "32",
      "40",
      "49"
    ]
  },
  {
    "id": "25",
    "sku": "FIT-STR-1025",
    "title": "Pro Percussive Massage Gun (30 Speeds)",
    "price": 80000,
    "priceDisplay": "LKR 80,000",
    "oldPriceDisplay": "LKR 94,500",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.8,
    "reviewsCount": 160,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Brushless motor massage gun with 14mm stroke amplitude, 45 lbs stall force, and 6 interchangeable heads.",
    "fullDescription": "Brushless motor massage gun with 14mm stroke amplitude, 45 lbs stall force, and 6 interchangeable heads. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "14mm deep tissue stroke amplitude",
      "Brushless quiet-glide motor (under 45dB)",
      "6 interchangeable massage attachment heads",
      "6-hour rechargeable lithium-ion battery life"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "28",
      "33",
      "41",
      "50"
    ]
  },
  {
    "id": "26",
    "sku": "FIT-CAR-1026",
    "title": "High-Density Foam Roller with Trigger Grid (36 Inch)",
    "price": 155000,
    "priceDisplay": "LKR 155,000",
    "oldPriceDisplay": "LKR 183,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.8,
    "reviewsCount": 173,
    "stock": "In Stock",
    "badge": "New",
    "image": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Solid EVA foam roller with multi-density grid pattern that won't deform under heavy bodyweight.",
    "fullDescription": "Solid EVA foam roller with multi-density grid pattern that won't deform under heavy bodyweight. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Heavy-duty solid core won't flatten over time",
      "Distrodensity zones mimic massage therapist hands",
      "Ideal for thoracic spine extension and quad rolling",
      "36-inch length supports full spine alignment"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "29",
      "34",
      "42",
      "51"
    ]
  },
  {
    "id": "27",
    "sku": "FIT-COA-1027",
    "title": "Slant Board for Knee Mobility & Squat Depth",
    "price": 40500,
    "priceDisplay": "LKR 40,500",
    "oldPriceDisplay": "LKR 48,000",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.9,
    "reviewsCount": 186,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Solid laser-cut steel adjustable slant board (15° to 35°) with anti-slip grip tape for VMO training.",
    "fullDescription": "Solid laser-cut steel adjustable slant board (15° to 35°) with anti-slip grip tape for VMO training. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "4 angle adjustments: 15°, 20°, 25°, 35°",
      "Heavy-gauge steel supports 450 kg working load",
      "Full grip tape deck ensures zero foot slipping",
      "Essential for ATG split squats and patellar rehabilitation"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "30",
      "35",
      "43",
      "52"
    ]
  },
  {
    "id": "28",
    "sku": "FIT-NUT-1028",
    "title": "Heavy-Duty Latex Resistance Loop Bands (Set of 5)",
    "price": 12000,
    "priceDisplay": "LKR 12,000",
    "oldPriceDisplay": "LKR 14,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 5,
    "reviewsCount": 19,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1598266663412-7bb9605ed56b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1598266663412-7bb9605ed56b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "100% natural Malaysian latex continuous loop bands ranging from 10 lbs to 150 lbs resistance.",
    "fullDescription": "100% natural Malaysian latex continuous loop bands ranging from 10 lbs to 150 lbs resistance. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "5 resistance levels: Light, Medium, Heavy, X-Heavy, Monster",
      "100% layered natural latex resists snapping",
      "Versatile for banded bench presses, pull-up assist, and mobility",
      "Includes waterproof travel carry pouch"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "31",
      "36",
      "44",
      "53"
    ]
  },
  {
    "id": "29",
    "sku": "FIT-REC-1029",
    "title": "10mm Genuine Leather Lever Weightlifting Belt",
    "price": 14000,
    "priceDisplay": "LKR 14,000",
    "oldPriceDisplay": "LKR 16,500",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.5,
    "reviewsCount": 32,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "IPF-spec 10mm vegetable-tanned leather powerlifting belt with heavy-duty alloy quick-release lever.",
    "fullDescription": "IPF-spec 10mm vegetable-tanned leather powerlifting belt with heavy-duty alloy quick-release lever. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "10mm thickness provides optimal intra-abdominal support",
      "Solid zinc alloy quick-release lever buckle",
      "Non-slip suede interior lining",
      "Competition-legal 4-inch uniform width"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "32",
      "37",
      "45",
      "54"
    ]
  },
  {
    "id": "30",
    "sku": "FIT-APP-1030",
    "title": "7mm Neoprene Compression Knee Sleeves (Pair)",
    "price": 9000,
    "priceDisplay": "LKR 9,000",
    "oldPriceDisplay": "LKR 10,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.6,
    "reviewsCount": 45,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Dense 7mm high-grade SCR neoprene knee sleeves delivering maximum joint warmth and rebound power.",
    "fullDescription": "Dense 7mm high-grade SCR neoprene knee sleeves delivering maximum joint warmth and rebound power. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "7mm competition-grade SCR neoprene construction",
      "Reinforced double-stitched flatlock seams",
      "Anatomical tapered fit prevents slipping during heavy squats",
      "IPF and USAPL legal"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "33",
      "38",
      "46",
      "55"
    ]
  },
  {
    "id": "31",
    "sku": "FIT-STR-1031",
    "title": "Heavy-Duty Figure-8 Lifting Straps",
    "price": 91000,
    "priceDisplay": "LKR 91,000",
    "oldPriceDisplay": "LKR 107,500",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.7,
    "reviewsCount": 58,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Ultra-thick dual-loop cotton webbing straps locked in for maximal deadlifts and heavy shrugs.",
    "fullDescription": "Ultra-thick dual-loop cotton webbing straps locked in for maximal deadlifts and heavy shrugs. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual-loop figure-8 locking design eliminates strap winding",
      "Heavy cotton canvas webbing tested to 1,000 lbs",
      "Neoprene wrist padding prevents skin pinching",
      "Allows complete hand release without dropping the bar"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "34",
      "39",
      "47",
      "56"
    ]
  },
  {
    "id": "32",
    "sku": "FIT-CAR-1032",
    "title": "Waterproof Tactical Gym Duffle Bag 45L",
    "price": 170000,
    "priceDisplay": "LKR 170,000",
    "oldPriceDisplay": "LKR 200,500",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.7,
    "reviewsCount": 71,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "1000D ballistic nylon waterproof duffle with dedicated ventilated shoe tunnel and wet pocket.",
    "fullDescription": "1000D ballistic nylon waterproof duffle with dedicated ventilated shoe tunnel and wet pocket. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1000D water-repellent military-grade ballistic nylon",
      "Isolated ventilated bottom shoe tunnel fits up to size 14 shoes",
      "Wet/dry waterproof interior pocket for sweaty gym gear",
      "Tactical MOLLE webbing and padded shoulder harness"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "35",
      "40",
      "48",
      "57"
    ]
  },
  {
    "id": "33",
    "sku": "FIT-COA-1033",
    "title": "Elite Iron Olympic Barbell 20kg V1",
    "price": 45000,
    "priceDisplay": "LKR 45,000",
    "oldPriceDisplay": "LKR 53,000",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.8,
    "reviewsCount": 84,
    "stock": "In Stock",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Hardened chrome Olympic barbell with 28mm shaft and 190,000 PSI tensile strength.",
    "fullDescription": "Hardened chrome Olympic barbell with 28mm shaft and 190,000 PSI tensile strength. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "190,000 PSI tensile strength",
      "Dual knurl marks for IWF and IPF lifts",
      "8 needle bearings for smooth sleeve spin",
      "1500 lb load capacity"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "36",
      "41",
      "49",
      "58"
    ]
  },
  {
    "id": "34",
    "sku": "FIT-NUT-1034",
    "title": "Commercial Heavy Duty Power Rack Cage V2",
    "price": 13500,
    "priceDisplay": "LKR 13,500",
    "oldPriceDisplay": "LKR 16,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.9,
    "reviewsCount": 97,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "11-gauge 3x3 steel commercial power cage with multi-grip pull-up bar and spotter arms.",
    "fullDescription": "11-gauge 3x3 steel commercial power cage with multi-grip pull-up bar and spotter arms. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "3x3 inch 11-gauge structural steel",
      "Westside hole spacing through bench zone",
      "Laser-cut numbered uprights",
      "Includes sandwich J-cups & safety straps"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "37",
      "42",
      "50",
      "59"
    ]
  },
  {
    "id": "35",
    "sku": "FIT-REC-1035",
    "title": "Heavy-Duty Adjustable Quick-Select Dumbbell Set 32kg V3",
    "price": 15500,
    "priceDisplay": "LKR 15,500",
    "oldPriceDisplay": "LKR 18,500",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 5,
    "reviewsCount": 110,
    "stock": "Pre-Order",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Replaces 16 pairs of dumbbells in one compact dial-turn mechanism (2kg to 32kg).",
    "fullDescription": "Replaces 16 pairs of dumbbells in one compact dial-turn mechanism (2kg to 32kg). Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "16 weight increments from 2kg to 32kg",
      "Anti-slip knurled aluminum handle",
      "Heavy-duty steel cradle included",
      "Space-saving footprint"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "38",
      "43",
      "51",
      "60"
    ]
  },
  {
    "id": "36",
    "sku": "FIT-APP-1036",
    "title": "Precision Competition Cast Iron Kettlebell 24kg V1",
    "price": 10500,
    "priceDisplay": "LKR 10,500",
    "oldPriceDisplay": "LKR 12,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.5,
    "reviewsCount": 123,
    "stock": "Low Stock",
    "image": "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Single-piece gravity cast iron kettlebell with color-coded handle and flat machined base.",
    "fullDescription": "Single-piece gravity cast iron kettlebell with color-coded handle and flat machined base. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Single-piece gravity casting for extreme durability",
      "Smooth unpainted handle for chalk adhesion",
      "Machined flat base prevents rocking",
      "Standard competition dimensions"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "39",
      "44",
      "52",
      "61"
    ]
  },
  {
    "id": "37",
    "sku": "FIT-STR-1037",
    "title": "Titanium Multi-Angle Adjustable Bench V2",
    "price": 101500,
    "priceDisplay": "LKR 101,500",
    "oldPriceDisplay": "LKR 120,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.6,
    "reviewsCount": 136,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Laser-cut ladder back bench with 7 back positions (-15° decline to 85° incline) and zero pad gap.",
    "fullDescription": "Laser-cut ladder back bench with 7 back positions (-15° decline to 85° incline) and zero pad gap. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "7 backrest angles (-15°, 0°, 15°, 30°, 45°, 60°, 85°)",
      "Zero pad gap design prevents pelvic pinch",
      "Ultra-dense high-density vinyl padding",
      "Wheels and transport handle"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "40",
      "45",
      "53",
      "62"
    ]
  },
  {
    "id": "38",
    "sku": "FIT-CAR-1038",
    "title": "Apex Urethane Olympic Bumper Plate Set 100kg V3",
    "price": 185000,
    "priceDisplay": "LKR 185,000",
    "oldPriceDisplay": "LKR 218,500",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.7,
    "reviewsCount": 149,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Low-bounce premium polyurethane bumper plates with solid steel chrome hubs.",
    "fullDescription": "Low-bounce premium polyurethane bumper plates with solid steel chrome hubs. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Solid cast chrome center hub",
      "Hard durometer urethane for dead-bounce safety",
      "Standard 450mm diameter across all weights",
      "Raised white lettering and slim profile"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "41",
      "46",
      "54",
      "63"
    ]
  },
  {
    "id": "39",
    "sku": "FIT-COA-1039",
    "title": "Endurance Trap Hex Bar with Dual High/Low Grips V1",
    "price": 49500,
    "priceDisplay": "LKR 49,500",
    "oldPriceDisplay": "LKR 58,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.7,
    "reviewsCount": 162,
    "stock": "In Stock",
    "badge": "New",
    "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Open-ended or dual-handle trap bar that eliminates lumbar shear stress during deadlifts.",
    "fullDescription": "Open-ended or dual-handle trap bar that eliminates lumbar shear stress during deadlifts. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual handle heights: flush and raised 4-inch",
      "Knurled 28mm grip handles",
      "Built-in bar jack for effortless plate changes",
      "Rated to 800 lbs load capacity"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "42",
      "47",
      "55",
      "64"
    ]
  },
  {
    "id": "40",
    "sku": "FIT-NUT-1040",
    "title": "Pro Wall Mounted Pull-Up & Dip Station V2",
    "price": 15000,
    "priceDisplay": "LKR 15,000",
    "oldPriceDisplay": "LKR 17,500",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.8,
    "reviewsCount": 175,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Reinforced carbon steel wall fixture supporting wide pull-ups, close grips, and tricep dips.",
    "fullDescription": "Reinforced carbon steel wall fixture supporting wide pull-ups, close grips, and tricep dips. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Triangular gusset bracing for rock-solid stability",
      "Multi-grip ergonomic chin-up handles",
      "Padded forearm rests for leg raises",
      "350 kg weight limit"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "43",
      "48",
      "56",
      "65"
    ]
  },
  {
    "id": "41",
    "sku": "FIT-REC-1041",
    "title": "Elite Dual Cable Functional Trainer V3",
    "price": 17500,
    "priceDisplay": "LKR 17,500",
    "oldPriceDisplay": "LKR 20,500",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.9,
    "reviewsCount": 188,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Dual 90kg weight stacks with 30-position adjustable pulleys and aircraft-grade steel cables.",
    "fullDescription": "Dual 90kg weight stacks with 30-position adjustable pulleys and aircraft-grade steel cables. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual 90kg precision steel weight stacks",
      "2:1 pulley ratio for smooth explosive movement",
      "Multi-grip center chin-up bar",
      "Includes 6 commercial attachments"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "44",
      "49",
      "57",
      "66"
    ]
  },
  {
    "id": "42",
    "sku": "FIT-APP-1042",
    "title": "Commercial Adjustable Glute Ham Developer (GHD) V1",
    "price": 11500,
    "priceDisplay": "LKR 11,500",
    "oldPriceDisplay": "LKR 13,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.9,
    "reviewsCount": 21,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Heavy commercial GHD machine for bulletproofing the posterior chain, glutes, and hamstrings.",
    "fullDescription": "Heavy commercial GHD machine for bulletproofing the posterior chain, glutes, and hamstrings. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Split crescent pad design for pelvic comfort",
      "Smooth horizontal and vertical footplate adjustments",
      "Band pegs for accommodating resistance",
      "Oversized foot roller pads"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "45",
      "50",
      "58",
      "67"
    ]
  },
  {
    "id": "43",
    "sku": "FIT-STR-1043",
    "title": "Heavy-Duty Quantum Apex Commercial Treadmill T500 V2",
    "price": 112500,
    "priceDisplay": "LKR 112,500",
    "oldPriceDisplay": "LKR 133,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.5,
    "reviewsCount": 34,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Commercial 4.0 HP AC motor treadmill with 15% motorized incline and orthopedic belt.",
    "fullDescription": "Commercial 4.0 HP AC motor treadmill with 15% motorized incline and orthopedic belt. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "4.0 HP continuous AC motor (22 km/h top speed)",
      "15% auto motorized incline",
      "Multi-ply commercial orthopedic running deck",
      "15.6-inch touchscreen console with Bluetooth"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "46",
      "51",
      "59",
      "68"
    ]
  },
  {
    "id": "44",
    "sku": "FIT-CAR-1044",
    "title": "Precision HydroRower Water Resistance Rower V3",
    "price": 200000,
    "priceDisplay": "LKR 200,000",
    "oldPriceDisplay": "LKR 236,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.6,
    "reviewsCount": 47,
    "stock": "In Stock",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Real water flywheel rowing ergometer crafted with solid ash wood and dual-blade impeller.",
    "fullDescription": "Real water flywheel rowing ergometer crafted with solid ash wood and dual-blade impeller. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Natural water flywheel resistance for silent stroke dynamics",
      "Precision digital performance monitor with stroke rate",
      "Vertical storage footprint takes under 2 sq ft",
      "Ergonomic contoured seat on dual aluminum rails"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "47",
      "52",
      "60",
      "69"
    ]
  },
  {
    "id": "45",
    "sku": "FIT-COA-1045",
    "title": "Titanium Assault Air Bike Pro V1",
    "price": 54000,
    "priceDisplay": "LKR 54,000",
    "oldPriceDisplay": "LKR 63,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.7,
    "reviewsCount": 60,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Heavy-duty 27-inch steel fan air bike delivering limitless exponential wind resistance.",
    "fullDescription": "Heavy-duty 27-inch steel fan air bike delivering limitless exponential wind resistance. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "27-inch diameter steel fan wheel",
      "Sealed cartridge bearings at every pivot point",
      "Integrated Tabata and interval programming console",
      "Universal multi-grip push/pull handlebars"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "48",
      "53",
      "61",
      "70"
    ]
  },
  {
    "id": "46",
    "sku": "FIT-NUT-1046",
    "title": "Apex Curved Non-Motorized Slat Treadmill V2",
    "price": 16500,
    "priceDisplay": "LKR 16,500",
    "oldPriceDisplay": "LKR 19,500",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.7,
    "reviewsCount": 73,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Self-powered curved treadmill that forces natural midfoot running and burns 30% more calories.",
    "fullDescription": "Self-powered curved treadmill that forces natural midfoot running and burns 30% more calories. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "100% human-powered zero electricity requirement",
      "Heavy-duty rubberized aluminum slat track",
      "Curved ergonomic deck promotes proper forefoot striking",
      "Infinite speed capability for maximal sprint drills"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "49",
      "54",
      "62",
      "71"
    ]
  },
  {
    "id": "47",
    "sku": "FIT-REC-1047",
    "title": "Endurance Magnetic Resistance Indoor Cycling Studio Bike V3",
    "price": 19500,
    "priceDisplay": "LKR 19,500",
    "oldPriceDisplay": "LKR 23,000",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.8,
    "reviewsCount": 86,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Whisper-quiet magnetic resistance spin bike with 20kg perimeter-weighted flywheel.",
    "fullDescription": "Whisper-quiet magnetic resistance spin bike with 20kg perimeter-weighted flywheel. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Silent magnetic resistance system with emergency stop",
      "20kg flywheel for authentic road inertia",
      "Dual-sided pedals with SPD clips and toe cages",
      "4-way adjustable racing seat and aero handlebars"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "50",
      "55",
      "63",
      "72"
    ]
  },
  {
    "id": "48",
    "sku": "FIT-APP-1048",
    "title": "Pro Stepmill Stair Climber V1",
    "price": 12500,
    "priceDisplay": "LKR 12,500",
    "oldPriceDisplay": "LKR 15,000",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.9,
    "reviewsCount": 99,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Revolving staircase cardio machine targeting glutes, calves, and extreme aerobic stamina.",
    "fullDescription": "Revolving staircase cardio machine targeting glutes, calves, and extreme aerobic stamina. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Revolving staircase with 8-inch step depth",
      "Infrared safety stop sensors",
      "20 resistance levels with 24 to 162 steps per minute",
      "Contact heart rate grips and sweat-resistant console"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "51",
      "56",
      "64",
      "73"
    ]
  },
  {
    "id": "49",
    "sku": "FIT-STR-1049",
    "title": "Elite 1-on-1 Elite Coaching Program (3 Months) V2",
    "price": 123000,
    "priceDisplay": "LKR 123,000",
    "oldPriceDisplay": "LKR 145,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.9,
    "reviewsCount": 112,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Direct weekly 1-on-1 performance coaching, personalized hypertrophy cycles, and nutrition oversight.",
    "fullDescription": "Direct weekly 1-on-1 performance coaching, personalized hypertrophy cycles, and nutrition oversight. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Weekly 45-minute video coaching consultation",
      "Fully individualized training split updated bi-weekly",
      "Daily WhatsApp accountability and lifting form checks",
      "Personalized clinical macronutrient and calorie plan"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "52",
      "57",
      "65",
      "74"
    ]
  },
  {
    "id": "50",
    "sku": "FIT-CAR-1050",
    "title": "Commercial 12-Week Body Recomposition Blueprint V3",
    "price": 215000,
    "priceDisplay": "LKR 215,000",
    "oldPriceDisplay": "LKR 253,500",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.5,
    "reviewsCount": 125,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Comprehensive phase-based strength & nutrition protocol engineered to burn fat and retain muscle.",
    "fullDescription": "Comprehensive phase-based strength & nutrition protocol engineered to burn fat and retain muscle. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "3 progressive 4-week mesocycles with video exercise library",
      "Interactive macro and calorie calculation spreadsheet",
      "Deload protocols and metabolic rate protection guide",
      "Lifetime community access and private Q&A forum"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "53",
      "58",
      "66",
      "75"
    ]
  },
  {
    "id": "51",
    "sku": "FIT-COA-1051",
    "title": "Heavy-Duty Clinical Sports Nutrition & Meal Planning Consultation V1",
    "price": 58500,
    "priceDisplay": "LKR 58,500",
    "oldPriceDisplay": "LKR 69,000",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.6,
    "reviewsCount": 138,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Comprehensive metabolic assessment, blood panel review, and customized meal schedule with Dr. Elena Rostova.",
    "fullDescription": "Comprehensive metabolic assessment, blood panel review, and customized meal schedule with Dr. Elena Rostova. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "60-minute in-depth clinical dietary video review",
      "Custom 7-day meal plan aligned with your work schedule",
      "Targeted micronutrient, gut health, and supplement stack",
      "30 days of direct messaging support"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "54",
      "59",
      "67",
      "76"
    ]
  },
  {
    "id": "52",
    "sku": "FIT-NUT-1052",
    "title": "Precision Functional Range Mobility & Joint Longevity Protocol V2",
    "price": 18000,
    "priceDisplay": "LKR 18,000",
    "oldPriceDisplay": "LKR 21,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.6,
    "reviewsCount": 151,
    "stock": "In Stock",
    "badge": "New",
    "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "A 6-week daily joint mobility course with Maya Lin designed to eliminate knee, hip, and shoulder restrictions.",
    "fullDescription": "A 6-week daily joint mobility course with Maya Lin designed to eliminate knee, hip, and shoulder restrictions. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Daily 12-minute follow-along mobility video routines",
      "Self-assessment joint diagnostic screening tests",
      "Targeted CARs (Controlled Articular Rotations) drills",
      "Downloadable travel and office mobility PDF cheatsheets"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "55",
      "60",
      "68",
      "77"
    ]
  },
  {
    "id": "53",
    "sku": "FIT-REC-1053",
    "title": "Titanium 100% Grass-Fed Whey Protein Isolate (2kg) V3",
    "price": 21500,
    "priceDisplay": "LKR 21,500",
    "oldPriceDisplay": "LKR 25,500",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.7,
    "reviewsCount": 164,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Micro-filtered pure grass-fed whey isolate delivering 27g protein, 6.2g BCAAs, and zero sugar per scoop.",
    "fullDescription": "Micro-filtered pure grass-fed whey isolate delivering 27g protein, 6.2g BCAAs, and zero sugar per scoop. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "27g protein per 30g scoop with 90% purity",
      "Cold-filtered cross-flow microfiltration preserves immunoglobulins",
      "Zero artificial colors, gums, or chemical fillers",
      "Informed-Sport certified drug-tested batch validation"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "56",
      "61",
      "69",
      "78"
    ]
  },
  {
    "id": "54",
    "sku": "FIT-APP-1054",
    "title": "Apex Pure Micronized Creatine Monohydrate (500g) V1",
    "price": 14000,
    "priceDisplay": "LKR 14,000",
    "oldPriceDisplay": "LKR 16,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.8,
    "reviewsCount": 177,
    "stock": "Low Stock",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "200-mesh ultra-fine pure creatine monohydrate for 100% instant solubility and zero stomach upset.",
    "fullDescription": "200-mesh ultra-fine pure creatine monohydrate for 100% instant solubility and zero stomach upset. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "100 servings of 5g pure pharmaceutical-grade creatine",
      "200-mesh particle size dissolves effortlessly without grittiness",
      "Unflavored: blends seamlessly into any shake or water",
      "Supports cellular ATP resynthesis and power output"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "57",
      "62",
      "70",
      "79"
    ]
  },
  {
    "id": "55",
    "sku": "FIT-STR-1055",
    "title": "Endurance High-Potency Electrolyte Hydration Tub (60 Servings) V2",
    "price": 134000,
    "priceDisplay": "LKR 134,000",
    "oldPriceDisplay": "LKR 158,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.9,
    "reviewsCount": 190,
    "stock": "In Stock",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Clinical ratio of sodium (1000mg), potassium (200mg), and magnesium malate (60mg) with zero sugar.",
    "fullDescription": "Clinical ratio of sodium (1000mg), potassium (200mg), and magnesium malate (60mg) with zero sugar. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1,000mg natural sodium from Himalayan pink salt",
      "200mg potassium citrate and 60mg magnesium malate",
      "Sweetened with organic stevia leaf extract and real lime juice",
      "Prevents exercise cramps, dehydration headaches, and brain fog"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "58",
      "63",
      "71",
      "80"
    ]
  },
  {
    "id": "56",
    "sku": "FIT-CAR-1056",
    "title": "Pro Ultra-Pure Molecularly Distilled Omega-3 (120 Softgels) V3",
    "price": 230000,
    "priceDisplay": "LKR 230,000",
    "oldPriceDisplay": "LKR 271,500",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.9,
    "reviewsCount": 23,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Triglyceride-form wild fish oil providing 1,200mg EPA and 800mg DHA per daily serving.",
    "fullDescription": "Triglyceride-form wild fish oil providing 1,200mg EPA and 800mg DHA per daily serving. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1,200mg EPA and 800mg DHA in high-potency triglyceride form",
      "Molecularly distilled to eliminate heavy metals and PCBs",
      "Enteric-coated to prevent fishy aftertaste or burps",
      "Third-party tested by IFOS (5-star rating)"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "59",
      "64",
      "72",
      "81"
    ]
  },
  {
    "id": "57",
    "sku": "FIT-COA-1057",
    "title": "Elite Percussive Massage Gun (30 Speeds) V1",
    "price": 63000,
    "priceDisplay": "LKR 63,000",
    "oldPriceDisplay": "LKR 74,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 5,
    "reviewsCount": 36,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Brushless motor massage gun with 14mm stroke amplitude, 45 lbs stall force, and 6 interchangeable heads.",
    "fullDescription": "Brushless motor massage gun with 14mm stroke amplitude, 45 lbs stall force, and 6 interchangeable heads. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "14mm deep tissue stroke amplitude",
      "Brushless quiet-glide motor (under 45dB)",
      "6 interchangeable massage attachment heads",
      "6-hour rechargeable lithium-ion battery life"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "60",
      "65",
      "73",
      "82"
    ]
  },
  {
    "id": "58",
    "sku": "FIT-NUT-1058",
    "title": "Commercial High-Density Foam Roller with Trigger Grid (36 Inch) V2",
    "price": 19500,
    "priceDisplay": "LKR 19,500",
    "oldPriceDisplay": "LKR 23,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.6,
    "reviewsCount": 49,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Solid EVA foam roller with multi-density grid pattern that won't deform under heavy bodyweight.",
    "fullDescription": "Solid EVA foam roller with multi-density grid pattern that won't deform under heavy bodyweight. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Heavy-duty solid core won't flatten over time",
      "Distrodensity zones mimic massage therapist hands",
      "Ideal for thoracic spine extension and quad rolling",
      "36-inch length supports full spine alignment"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "61",
      "66",
      "74",
      "83"
    ]
  },
  {
    "id": "59",
    "sku": "FIT-REC-1059",
    "title": "Heavy-Duty Slant Board for Knee Mobility & Squat Depth V3",
    "price": 23500,
    "priceDisplay": "LKR 23,500",
    "oldPriceDisplay": "LKR 27,500",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.6,
    "reviewsCount": 62,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Solid laser-cut steel adjustable slant board (15° to 35°) with anti-slip grip tape for VMO training.",
    "fullDescription": "Solid laser-cut steel adjustable slant board (15° to 35°) with anti-slip grip tape for VMO training. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "4 angle adjustments: 15°, 20°, 25°, 35°",
      "Heavy-gauge steel supports 450 kg working load",
      "Full grip tape deck ensures zero foot slipping",
      "Essential for ATG split squats and patellar rehabilitation"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "62",
      "67",
      "75",
      "84"
    ]
  },
  {
    "id": "60",
    "sku": "FIT-APP-1060",
    "title": "Precision Latex Resistance Loop Bands (Set of 5) V1",
    "price": 15000,
    "priceDisplay": "LKR 15,000",
    "oldPriceDisplay": "LKR 17,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.7,
    "reviewsCount": 75,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1598266663412-7bb9605ed56b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1598266663412-7bb9605ed56b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "100% natural Malaysian latex continuous loop bands ranging from 10 lbs to 150 lbs resistance.",
    "fullDescription": "100% natural Malaysian latex continuous loop bands ranging from 10 lbs to 150 lbs resistance. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "5 resistance levels: Light, Medium, Heavy, X-Heavy, Monster",
      "100% layered natural latex resists snapping",
      "Versatile for banded bench presses, pull-up assist, and mobility",
      "Includes waterproof travel carry pouch"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "63",
      "68",
      "76",
      "85"
    ]
  },
  {
    "id": "61",
    "sku": "FIT-STR-1061",
    "title": "Titanium 10mm Genuine Leather Lever Weightlifting Belt V2",
    "price": 145000,
    "priceDisplay": "LKR 145,000",
    "oldPriceDisplay": "LKR 171,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.8,
    "reviewsCount": 88,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "IPF-spec 10mm vegetable-tanned leather powerlifting belt with heavy-duty alloy quick-release lever.",
    "fullDescription": "IPF-spec 10mm vegetable-tanned leather powerlifting belt with heavy-duty alloy quick-release lever. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "10mm thickness provides optimal intra-abdominal support",
      "Solid zinc alloy quick-release lever buckle",
      "Non-slip suede interior lining",
      "Competition-legal 4-inch uniform width"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "64",
      "69",
      "77",
      "86"
    ]
  },
  {
    "id": "62",
    "sku": "FIT-CAR-1062",
    "title": "Apex 7mm Neoprene Compression Knee Sleeves (Pair) V3",
    "price": 245000,
    "priceDisplay": "LKR 245,000",
    "oldPriceDisplay": "LKR 289,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.8,
    "reviewsCount": 101,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Dense 7mm high-grade SCR neoprene knee sleeves delivering maximum joint warmth and rebound power.",
    "fullDescription": "Dense 7mm high-grade SCR neoprene knee sleeves delivering maximum joint warmth and rebound power. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "7mm competition-grade SCR neoprene construction",
      "Reinforced double-stitched flatlock seams",
      "Anatomical tapered fit prevents slipping during heavy squats",
      "IPF and USAPL legal"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "65",
      "70",
      "78",
      "87"
    ]
  },
  {
    "id": "63",
    "sku": "FIT-COA-1063",
    "title": "Endurance Figure-8 Lifting Straps V1",
    "price": 67500,
    "priceDisplay": "LKR 67,500",
    "oldPriceDisplay": "LKR 79,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.9,
    "reviewsCount": 114,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Ultra-thick dual-loop cotton webbing straps locked in for maximal deadlifts and heavy shrugs.",
    "fullDescription": "Ultra-thick dual-loop cotton webbing straps locked in for maximal deadlifts and heavy shrugs. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual-loop figure-8 locking design eliminates strap winding",
      "Heavy cotton canvas webbing tested to 1,000 lbs",
      "Neoprene wrist padding prevents skin pinching",
      "Allows complete hand release without dropping the bar"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "66",
      "71",
      "79",
      "88"
    ]
  },
  {
    "id": "64",
    "sku": "FIT-NUT-1064",
    "title": "Pro Waterproof Tactical Gym Duffle Bag 45L V2",
    "price": 21000,
    "priceDisplay": "LKR 21,000",
    "oldPriceDisplay": "LKR 25,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 5,
    "reviewsCount": 127,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "1000D ballistic nylon waterproof duffle with dedicated ventilated shoe tunnel and wet pocket.",
    "fullDescription": "1000D ballistic nylon waterproof duffle with dedicated ventilated shoe tunnel and wet pocket. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1000D water-repellent military-grade ballistic nylon",
      "Isolated ventilated bottom shoe tunnel fits up to size 14 shoes",
      "Wet/dry waterproof interior pocket for sweaty gym gear",
      "Tactical MOLLE webbing and padded shoulder harness"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "67",
      "72",
      "80",
      "89"
    ]
  },
  {
    "id": "65",
    "sku": "FIT-REC-1065",
    "title": "Elite Iron Olympic Barbell 20kg V3",
    "price": 25500,
    "priceDisplay": "LKR 25,500",
    "oldPriceDisplay": "LKR 30,000",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.6,
    "reviewsCount": 140,
    "stock": "In Stock",
    "badge": "New",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Hardened chrome Olympic barbell with 28mm shaft and 190,000 PSI tensile strength.",
    "fullDescription": "Hardened chrome Olympic barbell with 28mm shaft and 190,000 PSI tensile strength. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "190,000 PSI tensile strength",
      "Dual knurl marks for IWF and IPF lifts",
      "8 needle bearings for smooth sleeve spin",
      "1500 lb load capacity"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "68",
      "73",
      "81",
      "90"
    ]
  },
  {
    "id": "66",
    "sku": "FIT-APP-1066",
    "title": "Commercial Heavy Duty Power Rack Cage V1",
    "price": 16000,
    "priceDisplay": "LKR 16,000",
    "oldPriceDisplay": "LKR 19,000",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.6,
    "reviewsCount": 153,
    "stock": "In Stock",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "11-gauge 3x3 steel commercial power cage with multi-grip pull-up bar and spotter arms.",
    "fullDescription": "11-gauge 3x3 steel commercial power cage with multi-grip pull-up bar and spotter arms. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "3x3 inch 11-gauge structural steel",
      "Westside hole spacing through bench zone",
      "Laser-cut numbered uprights",
      "Includes sandwich J-cups & safety straps"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "69",
      "74",
      "82",
      "91"
    ]
  },
  {
    "id": "67",
    "sku": "FIT-STR-1067",
    "title": "Heavy-Duty Adjustable Quick-Select Dumbbell Set 32kg V2",
    "price": 155500,
    "priceDisplay": "LKR 155,500",
    "oldPriceDisplay": "LKR 183,500",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.7,
    "reviewsCount": 166,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Replaces 16 pairs of dumbbells in one compact dial-turn mechanism (2kg to 32kg).",
    "fullDescription": "Replaces 16 pairs of dumbbells in one compact dial-turn mechanism (2kg to 32kg). Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "16 weight increments from 2kg to 32kg",
      "Anti-slip knurled aluminum handle",
      "Heavy-duty steel cradle included",
      "Space-saving footprint"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "70",
      "75",
      "83",
      "92"
    ]
  },
  {
    "id": "68",
    "sku": "FIT-CAR-1068",
    "title": "Precision Competition Cast Iron Kettlebell 24kg V3",
    "price": 260000,
    "priceDisplay": "LKR 260,000",
    "oldPriceDisplay": "LKR 307,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.8,
    "reviewsCount": 179,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Single-piece gravity cast iron kettlebell with color-coded handle and flat machined base.",
    "fullDescription": "Single-piece gravity cast iron kettlebell with color-coded handle and flat machined base. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Single-piece gravity casting for extreme durability",
      "Smooth unpainted handle for chalk adhesion",
      "Machined flat base prevents rocking",
      "Standard competition dimensions"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "71",
      "76",
      "84",
      "93"
    ]
  },
  {
    "id": "69",
    "sku": "FIT-COA-1069",
    "title": "Titanium Multi-Angle Adjustable Bench V1",
    "price": 72000,
    "priceDisplay": "LKR 72,000",
    "oldPriceDisplay": "LKR 85,000",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.8,
    "reviewsCount": 192,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Laser-cut ladder back bench with 7 back positions (-15° decline to 85° incline) and zero pad gap.",
    "fullDescription": "Laser-cut ladder back bench with 7 back positions (-15° decline to 85° incline) and zero pad gap. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "7 backrest angles (-15°, 0°, 15°, 30°, 45°, 60°, 85°)",
      "Zero pad gap design prevents pelvic pinch",
      "Ultra-dense high-density vinyl padding",
      "Wheels and transport handle"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "72",
      "77",
      "85",
      "94"
    ]
  },
  {
    "id": "70",
    "sku": "FIT-NUT-1070",
    "title": "Apex Urethane Olympic Bumper Plate Set 100kg V2",
    "price": 22500,
    "priceDisplay": "LKR 22,500",
    "oldPriceDisplay": "LKR 26,500",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.9,
    "reviewsCount": 25,
    "stock": "Pre-Order",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Low-bounce premium polyurethane bumper plates with solid steel chrome hubs.",
    "fullDescription": "Low-bounce premium polyurethane bumper plates with solid steel chrome hubs. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Solid cast chrome center hub",
      "Hard durometer urethane for dead-bounce safety",
      "Standard 450mm diameter across all weights",
      "Raised white lettering and slim profile"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "73",
      "78",
      "86",
      "95"
    ]
  },
  {
    "id": "71",
    "sku": "FIT-REC-1071",
    "title": "Endurance Trap Hex Bar with Dual High/Low Grips V3",
    "price": 27000,
    "priceDisplay": "LKR 27,000",
    "oldPriceDisplay": "LKR 32,000",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 5,
    "reviewsCount": 38,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1574680096145-d05b474e2155?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Open-ended or dual-handle trap bar that eliminates lumbar shear stress during deadlifts.",
    "fullDescription": "Open-ended or dual-handle trap bar that eliminates lumbar shear stress during deadlifts. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual handle heights: flush and raised 4-inch",
      "Knurled 28mm grip handles",
      "Built-in bar jack for effortless plate changes",
      "Rated to 800 lbs load capacity"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "74",
      "79",
      "87",
      "96"
    ]
  },
  {
    "id": "72",
    "sku": "FIT-APP-1072",
    "title": "Pro Wall Mounted Pull-Up & Dip Station V1",
    "price": 17000,
    "priceDisplay": "LKR 17,000",
    "oldPriceDisplay": "LKR 20,000",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.5,
    "reviewsCount": 51,
    "stock": "Low Stock",
    "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Reinforced carbon steel wall fixture supporting wide pull-ups, close grips, and tricep dips.",
    "fullDescription": "Reinforced carbon steel wall fixture supporting wide pull-ups, close grips, and tricep dips. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Triangular gusset bracing for rock-solid stability",
      "Multi-grip ergonomic chin-up handles",
      "Padded forearm rests for leg raises",
      "350 kg weight limit"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "75",
      "80",
      "88",
      "97"
    ]
  },
  {
    "id": "73",
    "sku": "FIT-STR-1073",
    "title": "Elite Dual Cable Functional Trainer V2",
    "price": 166500,
    "priceDisplay": "LKR 166,500",
    "oldPriceDisplay": "LKR 196,500",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.6,
    "reviewsCount": 64,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Dual 90kg weight stacks with 30-position adjustable pulleys and aircraft-grade steel cables.",
    "fullDescription": "Dual 90kg weight stacks with 30-position adjustable pulleys and aircraft-grade steel cables. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual 90kg precision steel weight stacks",
      "2:1 pulley ratio for smooth explosive movement",
      "Multi-grip center chin-up bar",
      "Includes 6 commercial attachments"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "76",
      "81",
      "89",
      "98"
    ]
  },
  {
    "id": "74",
    "sku": "FIT-CAR-1074",
    "title": "Commercial Adjustable Glute Ham Developer (GHD) V3",
    "price": 275000,
    "priceDisplay": "LKR 275,000",
    "oldPriceDisplay": "LKR 324,500",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.7,
    "reviewsCount": 77,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Heavy commercial GHD machine for bulletproofing the posterior chain, glutes, and hamstrings.",
    "fullDescription": "Heavy commercial GHD machine for bulletproofing the posterior chain, glutes, and hamstrings. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Split crescent pad design for pelvic comfort",
      "Smooth horizontal and vertical footplate adjustments",
      "Band pegs for accommodating resistance",
      "Oversized foot roller pads"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "77",
      "82",
      "90",
      "99"
    ]
  },
  {
    "id": "75",
    "sku": "FIT-COA-1075",
    "title": "Heavy-Duty Quantum Apex Commercial Treadmill T500 V1",
    "price": 76500,
    "priceDisplay": "LKR 76,500",
    "oldPriceDisplay": "LKR 90,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.8,
    "reviewsCount": 90,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Commercial 4.0 HP AC motor treadmill with 15% motorized incline and orthopedic belt.",
    "fullDescription": "Commercial 4.0 HP AC motor treadmill with 15% motorized incline and orthopedic belt. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "4.0 HP continuous AC motor (22 km/h top speed)",
      "15% auto motorized incline",
      "Multi-ply commercial orthopedic running deck",
      "15.6-inch touchscreen console with Bluetooth"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "78",
      "83",
      "91",
      "100"
    ]
  },
  {
    "id": "76",
    "sku": "FIT-NUT-1076",
    "title": "Precision HydroRower Water Resistance Rower V2",
    "price": 24000,
    "priceDisplay": "LKR 24,000",
    "oldPriceDisplay": "LKR 28,500",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.8,
    "reviewsCount": 103,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Real water flywheel rowing ergometer crafted with solid ash wood and dual-blade impeller.",
    "fullDescription": "Real water flywheel rowing ergometer crafted with solid ash wood and dual-blade impeller. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Natural water flywheel resistance for silent stroke dynamics",
      "Precision digital performance monitor with stroke rate",
      "Vertical storage footprint takes under 2 sq ft",
      "Ergonomic contoured seat on dual aluminum rails"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "79",
      "84",
      "92",
      "1"
    ]
  },
  {
    "id": "77",
    "sku": "FIT-REC-1077",
    "title": "Titanium Assault Air Bike Pro V3",
    "price": 29000,
    "priceDisplay": "LKR 29,000",
    "oldPriceDisplay": "LKR 34,000",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.9,
    "reviewsCount": 116,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Heavy-duty 27-inch steel fan air bike delivering limitless exponential wind resistance.",
    "fullDescription": "Heavy-duty 27-inch steel fan air bike delivering limitless exponential wind resistance. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "27-inch diameter steel fan wheel",
      "Sealed cartridge bearings at every pivot point",
      "Integrated Tabata and interval programming console",
      "Universal multi-grip push/pull handlebars"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "80",
      "85",
      "93",
      "2"
    ]
  },
  {
    "id": "78",
    "sku": "FIT-APP-1078",
    "title": "Apex Curved Non-Motorized Slat Treadmill V1",
    "price": 18500,
    "priceDisplay": "LKR 18,500",
    "oldPriceDisplay": "LKR 22,000",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 5,
    "reviewsCount": 129,
    "stock": "In Stock",
    "badge": "New",
    "image": "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Self-powered curved treadmill that forces natural midfoot running and burns 30% more calories.",
    "fullDescription": "Self-powered curved treadmill that forces natural midfoot running and burns 30% more calories. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "100% human-powered zero electricity requirement",
      "Heavy-duty rubberized aluminum slat track",
      "Curved ergonomic deck promotes proper forefoot striking",
      "Infinite speed capability for maximal sprint drills"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "81",
      "86",
      "94",
      "3"
    ]
  },
  {
    "id": "79",
    "sku": "FIT-STR-1079",
    "title": "Endurance Magnetic Resistance Indoor Cycling Studio Bike V2",
    "price": 177000,
    "priceDisplay": "LKR 177,000",
    "oldPriceDisplay": "LKR 209,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.5,
    "reviewsCount": 142,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Whisper-quiet magnetic resistance spin bike with 20kg perimeter-weighted flywheel.",
    "fullDescription": "Whisper-quiet magnetic resistance spin bike with 20kg perimeter-weighted flywheel. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Silent magnetic resistance system with emergency stop",
      "20kg flywheel for authentic road inertia",
      "Dual-sided pedals with SPD clips and toe cages",
      "4-way adjustable racing seat and aero handlebars"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "82",
      "87",
      "95",
      "4"
    ]
  },
  {
    "id": "80",
    "sku": "FIT-CAR-1080",
    "title": "Pro Stepmill Stair Climber V3",
    "price": 290000,
    "priceDisplay": "LKR 290,000",
    "oldPriceDisplay": "LKR 342,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.6,
    "reviewsCount": 155,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Revolving staircase cardio machine targeting glutes, calves, and extreme aerobic stamina.",
    "fullDescription": "Revolving staircase cardio machine targeting glutes, calves, and extreme aerobic stamina. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Revolving staircase with 8-inch step depth",
      "Infrared safety stop sensors",
      "20 resistance levels with 24 to 162 steps per minute",
      "Contact heart rate grips and sweat-resistant console"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "83",
      "88",
      "96",
      "5"
    ]
  },
  {
    "id": "81",
    "sku": "FIT-COA-1081",
    "title": "Elite 1-on-1 Elite Coaching Program (3 Months) V1",
    "price": 81000,
    "priceDisplay": "LKR 81,000",
    "oldPriceDisplay": "LKR 95,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.7,
    "reviewsCount": 168,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Direct weekly 1-on-1 performance coaching, personalized hypertrophy cycles, and nutrition oversight.",
    "fullDescription": "Direct weekly 1-on-1 performance coaching, personalized hypertrophy cycles, and nutrition oversight. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Weekly 45-minute video coaching consultation",
      "Fully individualized training split updated bi-weekly",
      "Daily WhatsApp accountability and lifting form checks",
      "Personalized clinical macronutrient and calorie plan"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "84",
      "89",
      "97",
      "6"
    ]
  },
  {
    "id": "82",
    "sku": "FIT-NUT-1082",
    "title": "Commercial 12-Week Body Recomposition Blueprint V2",
    "price": 25500,
    "priceDisplay": "LKR 25,500",
    "oldPriceDisplay": "LKR 30,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.7,
    "reviewsCount": 181,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Comprehensive phase-based strength & nutrition protocol engineered to burn fat and retain muscle.",
    "fullDescription": "Comprehensive phase-based strength & nutrition protocol engineered to burn fat and retain muscle. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "3 progressive 4-week mesocycles with video exercise library",
      "Interactive macro and calorie calculation spreadsheet",
      "Deload protocols and metabolic rate protection guide",
      "Lifetime community access and private Q&A forum"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "85",
      "90",
      "98",
      "7"
    ]
  },
  {
    "id": "83",
    "sku": "FIT-REC-1083",
    "title": "Heavy-Duty Clinical Sports Nutrition & Meal Planning Consultation V3",
    "price": 31000,
    "priceDisplay": "LKR 31,000",
    "oldPriceDisplay": "LKR 36,500",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.8,
    "reviewsCount": 194,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Comprehensive metabolic assessment, blood panel review, and customized meal schedule with Dr. Elena Rostova.",
    "fullDescription": "Comprehensive metabolic assessment, blood panel review, and customized meal schedule with Dr. Elena Rostova. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "60-minute in-depth clinical dietary video review",
      "Custom 7-day meal plan aligned with your work schedule",
      "Targeted micronutrient, gut health, and supplement stack",
      "30 days of direct messaging support"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "86",
      "91",
      "99",
      "8"
    ]
  },
  {
    "id": "84",
    "sku": "FIT-APP-1084",
    "title": "Precision Functional Range Mobility & Joint Longevity Protocol V1",
    "price": 19500,
    "priceDisplay": "LKR 19,500",
    "oldPriceDisplay": "LKR 23,000",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.9,
    "reviewsCount": 27,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "A 6-week daily joint mobility course with Maya Lin designed to eliminate knee, hip, and shoulder restrictions.",
    "fullDescription": "A 6-week daily joint mobility course with Maya Lin designed to eliminate knee, hip, and shoulder restrictions. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Daily 12-minute follow-along mobility video routines",
      "Self-assessment joint diagnostic screening tests",
      "Targeted CARs (Controlled Articular Rotations) drills",
      "Downloadable travel and office mobility PDF cheatsheets"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "87",
      "92",
      "100",
      "9"
    ]
  },
  {
    "id": "85",
    "sku": "FIT-STR-1085",
    "title": "Titanium 100% Grass-Fed Whey Protein Isolate (2kg) V2",
    "price": 188000,
    "priceDisplay": "LKR 188,000",
    "oldPriceDisplay": "LKR 222,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 5,
    "reviewsCount": 40,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1579722820308-d74e571900a9?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Micro-filtered pure grass-fed whey isolate delivering 27g protein, 6.2g BCAAs, and zero sugar per scoop.",
    "fullDescription": "Micro-filtered pure grass-fed whey isolate delivering 27g protein, 6.2g BCAAs, and zero sugar per scoop. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "27g protein per 30g scoop with 90% purity",
      "Cold-filtered cross-flow microfiltration preserves immunoglobulins",
      "Zero artificial colors, gums, or chemical fillers",
      "Informed-Sport certified drug-tested batch validation"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "88",
      "93",
      "1",
      "10"
    ]
  },
  {
    "id": "86",
    "sku": "FIT-CAR-1086",
    "title": "Apex Pure Micronized Creatine Monohydrate (500g) V3",
    "price": 305000,
    "priceDisplay": "LKR 305,000",
    "oldPriceDisplay": "LKR 360,000",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.5,
    "reviewsCount": 53,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "200-mesh ultra-fine pure creatine monohydrate for 100% instant solubility and zero stomach upset.",
    "fullDescription": "200-mesh ultra-fine pure creatine monohydrate for 100% instant solubility and zero stomach upset. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "100 servings of 5g pure pharmaceutical-grade creatine",
      "200-mesh particle size dissolves effortlessly without grittiness",
      "Unflavored: blends seamlessly into any shake or water",
      "Supports cellular ATP resynthesis and power output"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "89",
      "94",
      "2",
      "11"
    ]
  },
  {
    "id": "87",
    "sku": "FIT-COA-1087",
    "title": "Endurance High-Potency Electrolyte Hydration Tub (60 Servings) V1",
    "price": 85500,
    "priceDisplay": "LKR 85,500",
    "oldPriceDisplay": "LKR 101,000",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.6,
    "reviewsCount": 66,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Clinical ratio of sodium (1000mg), potassium (200mg), and magnesium malate (60mg) with zero sugar.",
    "fullDescription": "Clinical ratio of sodium (1000mg), potassium (200mg), and magnesium malate (60mg) with zero sugar. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1,000mg natural sodium from Himalayan pink salt",
      "200mg potassium citrate and 60mg magnesium malate",
      "Sweetened with organic stevia leaf extract and real lime juice",
      "Prevents exercise cramps, dehydration headaches, and brain fog"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "90",
      "95",
      "3",
      "12"
    ]
  },
  {
    "id": "88",
    "sku": "FIT-NUT-1088",
    "title": "Pro Ultra-Pure Molecularly Distilled Omega-3 (120 Softgels) V2",
    "price": 27000,
    "priceDisplay": "LKR 27,000",
    "oldPriceDisplay": "LKR 32,000",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.7,
    "reviewsCount": 79,
    "stock": "In Stock",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Triglyceride-form wild fish oil providing 1,200mg EPA and 800mg DHA per daily serving.",
    "fullDescription": "Triglyceride-form wild fish oil providing 1,200mg EPA and 800mg DHA per daily serving. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1,200mg EPA and 800mg DHA in high-potency triglyceride form",
      "Molecularly distilled to eliminate heavy metals and PCBs",
      "Enteric-coated to prevent fishy aftertaste or burps",
      "Third-party tested by IFOS (5-star rating)"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "91",
      "96",
      "4",
      "13"
    ]
  },
  {
    "id": "89",
    "sku": "FIT-REC-1089",
    "title": "Elite Percussive Massage Gun (30 Speeds) V3",
    "price": 33000,
    "priceDisplay": "LKR 33,000",
    "oldPriceDisplay": "LKR 39,000",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.7,
    "reviewsCount": 92,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Brushless motor massage gun with 14mm stroke amplitude, 45 lbs stall force, and 6 interchangeable heads.",
    "fullDescription": "Brushless motor massage gun with 14mm stroke amplitude, 45 lbs stall force, and 6 interchangeable heads. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "14mm deep tissue stroke amplitude",
      "Brushless quiet-glide motor (under 45dB)",
      "6 interchangeable massage attachment heads",
      "6-hour rechargeable lithium-ion battery life"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "92",
      "97",
      "5",
      "14"
    ]
  },
  {
    "id": "90",
    "sku": "FIT-APP-1090",
    "title": "Commercial High-Density Foam Roller with Trigger Grid (36 Inch) V1",
    "price": 20500,
    "priceDisplay": "LKR 20,500",
    "oldPriceDisplay": "LKR 24,000",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.8,
    "reviewsCount": 105,
    "stock": "Low Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Solid EVA foam roller with multi-density grid pattern that won't deform under heavy bodyweight.",
    "fullDescription": "Solid EVA foam roller with multi-density grid pattern that won't deform under heavy bodyweight. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Heavy-duty solid core won't flatten over time",
      "Distrodensity zones mimic massage therapist hands",
      "Ideal for thoracic spine extension and quad rolling",
      "36-inch length supports full spine alignment"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "93",
      "98",
      "6",
      "15"
    ]
  },
  {
    "id": "91",
    "sku": "FIT-STR-1091",
    "title": "Heavy-Duty Slant Board for Knee Mobility & Squat Depth V2",
    "price": 199000,
    "priceDisplay": "LKR 199,000",
    "oldPriceDisplay": "LKR 235,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.9,
    "reviewsCount": 118,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1434608519344-49d77a699e1d?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Solid laser-cut steel adjustable slant board (15° to 35°) with anti-slip grip tape for VMO training.",
    "fullDescription": "Solid laser-cut steel adjustable slant board (15° to 35°) with anti-slip grip tape for VMO training. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "4 angle adjustments: 15°, 20°, 25°, 35°",
      "Heavy-gauge steel supports 450 kg working load",
      "Full grip tape deck ensures zero foot slipping",
      "Essential for ATG split squats and patellar rehabilitation"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "94",
      "99",
      "7",
      "16"
    ]
  },
  {
    "id": "92",
    "sku": "FIT-CAR-1092",
    "title": "Precision Latex Resistance Loop Bands (Set of 5) V3",
    "price": 320000,
    "priceDisplay": "LKR 320,000",
    "oldPriceDisplay": "LKR 377,500",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.9,
    "reviewsCount": 131,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1598266663412-7bb9605ed56b?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1598266663412-7bb9605ed56b?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "100% natural Malaysian latex continuous loop bands ranging from 10 lbs to 150 lbs resistance.",
    "fullDescription": "100% natural Malaysian latex continuous loop bands ranging from 10 lbs to 150 lbs resistance. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "5 resistance levels: Light, Medium, Heavy, X-Heavy, Monster",
      "100% layered natural latex resists snapping",
      "Versatile for banded bench presses, pull-up assist, and mobility",
      "Includes waterproof travel carry pouch"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "95",
      "100",
      "8",
      "17"
    ]
  },
  {
    "id": "93",
    "sku": "FIT-COA-1093",
    "title": "Titanium 10mm Genuine Leather Lever Weightlifting Belt V1",
    "price": 90000,
    "priceDisplay": "LKR 90,000",
    "oldPriceDisplay": "LKR 106,000",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.5,
    "reviewsCount": 144,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "IPF-spec 10mm vegetable-tanned leather powerlifting belt with heavy-duty alloy quick-release lever.",
    "fullDescription": "IPF-spec 10mm vegetable-tanned leather powerlifting belt with heavy-duty alloy quick-release lever. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "10mm thickness provides optimal intra-abdominal support",
      "Solid zinc alloy quick-release lever buckle",
      "Non-slip suede interior lining",
      "Competition-legal 4-inch uniform width"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "96",
      "1",
      "9",
      "18"
    ]
  },
  {
    "id": "94",
    "sku": "FIT-NUT-1094",
    "title": "Apex 7mm Neoprene Compression Knee Sleeves (Pair) V2",
    "price": 28500,
    "priceDisplay": "LKR 28,500",
    "oldPriceDisplay": "LKR 33,500",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.6,
    "reviewsCount": 157,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Dense 7mm high-grade SCR neoprene knee sleeves delivering maximum joint warmth and rebound power.",
    "fullDescription": "Dense 7mm high-grade SCR neoprene knee sleeves delivering maximum joint warmth and rebound power. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "7mm competition-grade SCR neoprene construction",
      "Reinforced double-stitched flatlock seams",
      "Anatomical tapered fit prevents slipping during heavy squats",
      "IPF and USAPL legal"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "97",
      "2",
      "10",
      "19"
    ]
  },
  {
    "id": "95",
    "sku": "FIT-REC-1095",
    "title": "Endurance Figure-8 Lifting Straps V3",
    "price": 35000,
    "priceDisplay": "LKR 35,000",
    "oldPriceDisplay": "LKR 41,500",
    "category": "Recovery & Mobility",
    "productType": "Recovery",
    "rating": 4.7,
    "reviewsCount": 170,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Ultra-thick dual-loop cotton webbing straps locked in for maximal deadlifts and heavy shrugs.",
    "fullDescription": "Ultra-thick dual-loop cotton webbing straps locked in for maximal deadlifts and heavy shrugs. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Dual-loop figure-8 locking design eliminates strap winding",
      "Heavy cotton canvas webbing tested to 1,000 lbs",
      "Neoprene wrist padding prevents skin pinching",
      "Allows complete hand release without dropping the bar"
    ],
    "specifications": {
      "Category": "Recovery & Mobility",
      "Product Type": "Recovery",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "98",
      "3",
      "11",
      "20"
    ]
  },
  {
    "id": "96",
    "sku": "FIT-APP-1096",
    "title": "Pro Waterproof Tactical Gym Duffle Bag 45L V1",
    "price": 21500,
    "priceDisplay": "LKR 21,500",
    "oldPriceDisplay": "LKR 25,500",
    "category": "Apparel & Gear",
    "productType": "Gear",
    "rating": 4.7,
    "reviewsCount": 183,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "1000D ballistic nylon waterproof duffle with dedicated ventilated shoe tunnel and wet pocket.",
    "fullDescription": "1000D ballistic nylon waterproof duffle with dedicated ventilated shoe tunnel and wet pocket. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "1000D water-repellent military-grade ballistic nylon",
      "Isolated ventilated bottom shoe tunnel fits up to size 14 shoes",
      "Wet/dry waterproof interior pocket for sweaty gym gear",
      "Tactical MOLLE webbing and padded shoulder harness"
    ],
    "specifications": {
      "Category": "Apparel & Gear",
      "Product Type": "Gear",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "99",
      "4",
      "12",
      "21"
    ]
  },
  {
    "id": "97",
    "sku": "FIT-STR-1097",
    "title": "Elite Iron Olympic Barbell 20kg V2",
    "price": 209500,
    "priceDisplay": "LKR 209,500",
    "oldPriceDisplay": "LKR 247,000",
    "category": "Strength Equipment",
    "productType": "Equipment",
    "rating": 4.8,
    "reviewsCount": 16,
    "stock": "In Stock",
    "image": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Hardened chrome Olympic barbell with 28mm shaft and 190,000 PSI tensile strength.",
    "fullDescription": "Hardened chrome Olympic barbell with 28mm shaft and 190,000 PSI tensile strength. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "190,000 PSI tensile strength",
      "Dual knurl marks for IWF and IPF lifts",
      "8 needle bearings for smooth sleeve spin",
      "1500 lb load capacity"
    ],
    "specifications": {
      "Category": "Strength Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "100",
      "5",
      "13",
      "22"
    ]
  },
  {
    "id": "98",
    "sku": "FIT-CAR-1098",
    "title": "Commercial Heavy Duty Power Rack Cage V3",
    "price": 335000,
    "priceDisplay": "LKR 335,000",
    "oldPriceDisplay": "LKR 395,500",
    "category": "Cardio Equipment",
    "productType": "Equipment",
    "rating": 4.9,
    "reviewsCount": 29,
    "stock": "In Stock",
    "badge": "Sale",
    "image": "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "11-gauge 3x3 steel commercial power cage with multi-grip pull-up bar and spotter arms.",
    "fullDescription": "11-gauge 3x3 steel commercial power cage with multi-grip pull-up bar and spotter arms. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "3x3 inch 11-gauge structural steel",
      "Westside hole spacing through bench zone",
      "Laser-cut numbered uprights",
      "Includes sandwich J-cups & safety straps"
    ],
    "specifications": {
      "Category": "Cardio Equipment",
      "Product Type": "Equipment",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "1",
      "6",
      "14",
      "23"
    ]
  },
  {
    "id": "99",
    "sku": "FIT-COA-1099",
    "title": "Heavy-Duty Adjustable Quick-Select Dumbbell Set 32kg V1",
    "price": 94500,
    "priceDisplay": "LKR 94,500",
    "oldPriceDisplay": "LKR 111,500",
    "category": "Coaching & Programs",
    "productType": "Coaching",
    "rating": 4.9,
    "reviewsCount": 42,
    "stock": "In Stock",
    "badge": "Hot",
    "image": "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Replaces 16 pairs of dumbbells in one compact dial-turn mechanism (2kg to 32kg).",
    "fullDescription": "Replaces 16 pairs of dumbbells in one compact dial-turn mechanism (2kg to 32kg). Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "16 weight increments from 2kg to 32kg",
      "Anti-slip knurled aluminum handle",
      "Heavy-duty steel cradle included",
      "Space-saving footprint"
    ],
    "specifications": {
      "Category": "Coaching & Programs",
      "Product Type": "Coaching",
      "Warranty": "100% Satisfaction Guarantee",
      "Material / Source": "Heavy-Gauge Structural Steel & Alloy",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "2",
      "7",
      "15",
      "24"
    ]
  },
  {
    "id": "100",
    "sku": "FIT-NUT-1100",
    "title": "Precision Competition Cast Iron Kettlebell 24kg V2",
    "price": 30000,
    "priceDisplay": "LKR 30,000",
    "oldPriceDisplay": "LKR 35,500",
    "category": "Nutrition & Supplements",
    "productType": "Supplements",
    "rating": 4.5,
    "reviewsCount": 55,
    "stock": "In Stock",
    "badge": "Best Seller",
    "image": "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
    "gallery": [
      "https://images.unsplash.com/photo-1526506114642-54bc2828a2b5?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    "shortDescription": "Single-piece gravity cast iron kettlebell with color-coded handle and flat machined base.",
    "fullDescription": "Single-piece gravity cast iron kettlebell with color-coded handle and flat machined base. Designed for discerning fitness enthusiasts, coaches, and commercial gym facilities demanding heavy-duty build quality, bio-mechanical precision, and long-term durability. Thoroughly tested under maximal loading conditions to meet international sports safety standards.",
    "features": [
      "Single-piece gravity casting for extreme durability",
      "Smooth unpainted handle for chalk adhesion",
      "Machined flat base prevents rocking",
      "Standard competition dimensions"
    ],
    "specifications": {
      "Category": "Nutrition & Supplements",
      "Product Type": "Supplements",
      "Warranty": "2 Years Commercial Warranty",
      "Material / Source": "Pharmaceutical Grade Ingredients",
      "Suitability": "Home Gyms, Commercial Training Facilities & Competitive Athletes"
    },
    "coachTip": "Recommended by our Head Performance Coach Marcus Vance: Incorporate this into your weekly training split to optimize training density and maintain joint safety.",
    "relatedProductIds": [
      "3",
      "8",
      "16",
      "25"
    ]
  }
];

export function getProduct(id: string): Product {
  const product = products.find((p) => p.id === id);
  if (product) return product;
  return products[0];
}

export function getRelatedProducts(ids: string[]): Product[] {
  return products.filter((p) => ids.includes(p.id));
}
