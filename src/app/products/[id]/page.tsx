"use client";

import { useState } from "react";
import Link from "next/link";
import { FaChevronRight, FaStar, FaMinus, FaPlus, FaShoppingCart, FaCheck, FaTruck } from "react-icons/fa";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [mainImage, setMainImage] = useState("https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop");

  const product = {
    id: params.id,
    title: "Quantum Active Jogger T120 Treadmill",
    price: "LKR 169,900",
    oldPrice: "LKR 195,000",
    category: "Treadmills",
    rating: 4.5,
    reviews: 12,
    stock: "In Stock",
    sku: "QT-T120-2023",
    description: "Discover the T120 Treadmill, offering an affordable treadmill machine price in Sri Lanka for effective and convenient home workouts. Elevate your fitness routine with versatile features including an LCD screen, multiple workout programs, and a foldable design.",
    images: [
      "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop"
    ],
    features: [
      "DC Motor : 1.5 HP (Continuous) / 2.0 HP (Peak)",
      "Speed Range : 1.0 - 12 km/h",
      "Incline : 3 Level Manual Incline",
      "Running Surface : 1100 x 400 mm",
      "Max User Weight : 100 kg",
      "Display : LCD screen with Time, Speed, Distance, Calories, Pulse"
    ]
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    if (quantity < 10) setQuantity(quantity + 1);
  };

  return (
    <div className="bg-neutral-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-neutral-500 mb-8 font-medium">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <FaChevronRight className="mx-2 text-[10px]" />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <FaChevronRight className="mx-2 text-[10px]" />
          <span className="text-neutral-900 truncate max-w-xs">{product.title}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden mb-12">
          <div className="flex flex-col lg:flex-row">
            
            {/* Product Images (Left) */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 border-b lg:border-b-0 lg:border-r border-neutral-100">
              <div className="relative bg-neutral-100 rounded-xl overflow-hidden aspect-square mb-4">
                <img 
                  src={mainImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover mix-blend-multiply transition-all duration-300"
                />
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setMainImage(img)}
                    className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-colors ${mainImage === img ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover mix-blend-multiply bg-neutral-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info (Right) */}
            <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
              <div className="mb-6">
                <p className="text-primary text-sm font-bold uppercase tracking-wider mb-2">{product.category}</p>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 leading-tight mb-4">
                  {product.title}
                </h1>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300'} />
                    ))}
                  </div>
                  <span className="text-sm text-neutral-500">({product.reviews} customer reviews)</span>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="text-3xl font-bold text-neutral-900">{product.price}</span>
                  {product.oldPrice && (
                    <span className="text-xl text-neutral-400 line-through decoration-1">{product.oldPrice}</span>
                  )}
                </div>
                
                <p className="text-neutral-600 leading-relaxed mb-6">
                  {product.description}
                </p>

                <ul className="space-y-2 mb-8 text-neutral-700">
                  {product.features.slice(0, 4).map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheck className="text-primary mt-1 flex-shrink-0" size={14} />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-neutral-100 pt-8 mt-auto">
                <div className="flex items-center gap-4 mb-6">
                  <span className={`text-sm font-bold flex items-center gap-2 ${product.stock === 'In Stock' ? 'text-green-600' : 'text-red-500'}`}>
                    {product.stock === 'In Stock' ? <FaCheck /> : null} {product.stock}
                  </span>
                  <span className="text-neutral-300">|</span>
                  <span className="text-sm text-neutral-500">SKU: <span className="font-medium text-neutral-900">{product.sku}</span></span>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex items-center justify-between border border-neutral-200 rounded-full px-4 py-3 sm:w-32 bg-white">
                    <button onClick={handleDecrease} className="text-neutral-400 hover:text-primary transition-colors p-1">
                      <FaMinus size={12} />
                    </button>
                    <span className="font-bold text-neutral-900">{quantity}</span>
                    <button onClick={handleIncrease} className="text-neutral-400 hover:text-primary transition-colors p-1">
                      <FaPlus size={12} />
                    </button>
                  </div>
                  
                  <button className="flex-1 bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-neutral-900 transition-colors duration-300 flex items-center justify-center gap-3">
                    <FaShoppingCart /> Add to Cart
                  </button>
                </div>

                <div className="mt-6 flex items-center gap-3 text-sm text-neutral-500 bg-neutral-50 p-4 rounded-xl">
                  <FaTruck className="text-primary text-lg" />
                  <span>Free delivery on orders over LKR 100,000. Ships within 3-5 business days.</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden mb-12">
          <div className="flex flex-wrap border-b border-neutral-100">
            <button 
              onClick={() => setActiveTab('description')}
              className={`px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors ${activeTab === 'description' ? 'text-primary border-b-2 border-primary bg-neutral-50/50' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('specifications')}
              className={`px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors ${activeTab === 'specifications' ? 'text-primary border-b-2 border-primary bg-neutral-50/50' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Specifications
            </button>
            <button 
              onClick={() => setActiveTab('reviews')}
              className={`px-8 py-4 font-bold text-sm tracking-wider uppercase transition-colors ${activeTab === 'reviews' ? 'text-primary border-b-2 border-primary bg-neutral-50/50' : 'text-neutral-500 hover:text-neutral-900'}`}
            >
              Reviews ({product.reviews})
            </button>
          </div>
          
          <div className="p-8 lg:p-10 min-h-[300px]">
            {activeTab === 'description' && (
              <div className="prose max-w-none text-neutral-600">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-4">Product Overview</h3>
                <p className="mb-4">
                  The {product.title} is designed for users looking to bring a professional workout experience into their home. 
                  With a robust motor and advanced shock absorption, it offers a smooth, quiet, and comfortable running experience. 
                  The easy-to-use console tracks all your essential metrics, helping you stay motivated and on target to meet your fitness goals.
                </p>
                <p>
                  Its space-saving foldable design makes it ideal for homes with limited space. Simply fold it up when you're done 
                  with your workout and roll it away using the built-in transport wheels.
                </p>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                  {product.features.map((feature, idx) => {
                    const [key, value] = feature.split(' : ');
                    return (
                      <div key={idx} className="flex border-b border-neutral-100 py-3">
                        <span className="w-1/3 font-medium text-neutral-900">{key}</span>
                        <span className="w-2/3 text-neutral-600">{value}</span>
                      </div>
                    );
                  })}
                  <div className="flex border-b border-neutral-100 py-3">
                    <span className="w-1/3 font-medium text-neutral-900">Warranty</span>
                    <span className="w-2/3 text-neutral-600">1 Year Motor, 1 Year Parts</span>
                  </div>
                  <div className="flex border-b border-neutral-100 py-3">
                    <span className="w-1/3 font-medium text-neutral-900">Foldable</span>
                    <span className="w-2/3 text-neutral-600">Yes, Hydraulic Soft Drop</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-6">Customer Reviews</h3>
                <div className="flex items-center gap-6 mb-8 p-6 bg-neutral-50 rounded-xl">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-neutral-900 mb-2">{product.rating}</p>
                    <div className="flex text-yellow-400 justify-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-neutral-300'} />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-500">Based on {product.reviews} reviews</p>
                  </div>
                  <div className="flex-1 border-l border-neutral-200 pl-6">
                    <p className="text-neutral-600 italic">"Excellent treadmill for home use. The motor is quiet and the deck has good shock absorption. Highly recommended for the price."</p>
                    <p className="text-sm font-bold mt-2">- Kasun P.</p>
                  </div>
                </div>
                <button className="bg-neutral-900 text-white font-medium py-2 px-6 rounded-lg hover:bg-primary transition-colors">
                  Write a Review
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
