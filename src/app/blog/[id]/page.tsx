"use client";

import Link from "next/link";
import { FaChevronRight, FaUser, FaFolder, FaComments, FaSearch, FaAngleRight } from "react-icons/fa";

export default function BlogDetailPage({ params }: { params: { id: string } }) {
  // Mock data for the blog post
  const post = {
    id: params.id,
    title: "10 Essential Yoga Poses for Beginners",
    author: "Admin",
    date: "01 Jan 2045",
    category: "Yoga & Pilates",
    comments: 15,
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1200&auto=format&fit=crop",
    content: (
      <>
        <p className="mb-6">
          Embarking on a yoga journey can be both exciting and intimidating for beginners. 
          With so many poses (asanas) to learn, it’s easy to feel overwhelmed. However, 
          mastering a few foundational poses can provide a solid base for your practice, 
          helping you build strength, flexibility, and mindfulness.
        </p>
        <p className="mb-6">
          In this guide, we'll explore 10 essential yoga poses that every beginner should know. 
          These poses are accessible, safe, and highly effective for improving your physical 
          and mental well-being.
        </p>
        
        <h2 className="text-2xl font-bold font-heading text-neutral-900 mb-4 mt-8">1. Mountain Pose (Tadasana)</h2>
        <p className="mb-6">
          Mountain pose might look like you’re just standing, but it’s an active pose that 
          teaches you how to ground yourself and improve your posture. Stand with your feet 
          together, press your toes into the mat, and lift your kneecaps. Keep your core 
          engaged and your arms by your sides with palms facing forward.
        </p>
        
        <div className="bg-primary/10 p-8 rounded-xl border-l-4 border-primary italic text-neutral-700 mb-8 mt-4 relative">
          <span className="absolute top-4 right-6 text-6xl text-primary/20 font-serif leading-none">"</span>
          <p className="relative z-10 text-lg">
            "Yoga is not about touching your toes, it’s about what you learn on the way down." - Jigar Gor
          </p>
        </div>

        <h2 className="text-2xl font-bold font-heading text-neutral-900 mb-4">2. Downward-Facing Dog (Adho Mukha Svanasana)</h2>
        <p className="mb-6">
          This is one of the most recognizable yoga poses. It stretches the hamstrings, calves, 
          and spine while building strength in the arms and shoulders. Start on your hands and knees, 
          tuck your toes, and lift your hips up and back. Keep your hands shoulder-width apart and 
          press firmly into your palms.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <img src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=600&auto=format&fit=crop" alt="Yoga pose 1" className="rounded-xl w-full h-48 object-cover" />
          <img src="https://images.unsplash.com/photo-1552196563-55259259f635?q=80&w=600&auto=format&fit=crop" alt="Yoga pose 2" className="rounded-xl w-full h-48 object-cover" />
        </div>

        <p className="mb-6">
          Remember to breathe deeply throughout your practice. Listen to your body and never force 
          yourself into a pose that causes pain. Yoga is a personal journey, so be patient and 
          enjoy the process of discovery.
        </p>
      </>
    ),
    tags: ["Fitness", "Health", "Yoga", "Mindfulness", "Beginners"]
  };

  const categories = [
    { name: "Fitness Tips", count: 150 },
    { name: "Nutrition & Diet", count: 131 },
    { name: "Yoga & Pilates", count: 56 },
    { name: "Strength Training", count: 98 },
    { name: "Cardio Workouts", count: 42 }
  ];

  const recentPosts = [
    { id: 1, title: "How to Build Muscle at Home", date: "15 Jun 2026", image: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=150&auto=format&fit=crop" },
    { id: 2, title: "The Best Pre-Workout Meals", date: "10 Jun 2026", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=150&auto=format&fit=crop" },
    { id: 3, title: "Why Rest Days Are Important", date: "05 Jun 2026", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=150&auto=format&fit=crop" }
  ];

  const tags = ["Fitness", "Health", "Workout", "Diet", "Yoga", "Cardio", "Strength", "Wellness"];

  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-40 pb-32 flex items-center bg-neutral-900 justify-center text-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <img 
            src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2070&auto=format&fit=crop" 
            alt="Blog Detail Header" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-medium uppercase tracking-widest text-primary/80 mb-4 flex items-center justify-center gap-2">
            <Link href="/" className="hover:text-primary transition-colors text-white">Home</Link> 
            <FaChevronRight className="text-[10px] text-white" />
            <Link href="/blog" className="hover:text-primary transition-colors text-white">Blog</Link> 
            <FaChevronRight className="text-[10px] text-white" />
            <span className="text-white truncate max-w-[200px]">{post.title}</span>
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-0 max-w-4xl mx-auto leading-tight">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Left Column (Main Article) */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden mb-12">
                <img src={post.image} alt={post.title} className="w-full h-[400px] object-cover" />
                <div className="p-8 lg:p-10">
                  <div className="flex flex-wrap items-center text-sm text-neutral-500 gap-6 mb-8 border-b border-neutral-100 pb-6">
                    <span className="flex items-center gap-2"><FaUser className="text-primary" /> {post.author}</span>
                    <span className="flex items-center gap-2"><FaFolder className="text-primary" /> {post.category}</span>
                    <span className="flex items-center gap-2"><FaComments className="text-primary" /> {post.comments} Comments</span>
                  </div>
                  
                  <div className="text-neutral-600 text-lg leading-relaxed">
                    {post.content}
                  </div>
                </div>
              </div>

              {/* Comment Section */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 lg:p-10 mb-12">
                <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-8">3 Comments</h3>
                
                <div className="space-y-8">
                  <div className="flex gap-6">
                    <img src="https://ui-avatars.com/api/?name=John+Doe&background=f97316&color=fff" alt="User" className="w-16 h-16 rounded-full" />
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-1">John Doe <span className="text-sm font-normal text-neutral-500 italic ml-2">01 Jan 2045</span></h4>
                      <p className="text-neutral-600 mb-2">This was incredibly helpful! As a beginner, I found these explanations very clear and easy to follow. Will definitely try them today.</p>
                      <button className="text-sm font-bold text-primary hover:text-neutral-900 transition-colors uppercase tracking-wider">Reply</button>
                    </div>
                  </div>
                  
                  <div className="flex gap-6 ml-12">
                    <img src="https://ui-avatars.com/api/?name=Jane+Smith&background=171717&color=fff" alt="User" className="w-16 h-16 rounded-full" />
                    <div>
                      <h4 className="font-bold text-neutral-900 mb-1">Jane Smith <span className="text-sm font-normal text-neutral-500 italic ml-2">02 Jan 2045</span></h4>
                      <p className="text-neutral-600 mb-2">I totally agree! The Mountain Pose seems simple but it really works your core when done right.</p>
                      <button className="text-sm font-bold text-primary hover:text-neutral-900 transition-colors uppercase tracking-wider">Reply</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Leave a Comment Form */}
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 p-8 lg:p-10">
                <h3 className="text-2xl font-heading font-bold text-neutral-900 mb-8">Leave a Comment</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Name *</label>
                      <input type="text" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Email *</label>
                      <input type="email" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Website</label>
                    <input type="url" className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Message *</label>
                    <textarea rows={5} className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                  </div>
                  <button type="submit" className="bg-primary text-white font-bold py-3 px-8 rounded-full hover:bg-neutral-900 transition-colors duration-300">
                    Post Comment
                  </button>
                </form>
              </div>

            </div>

            {/* Right Column (Sidebar) */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8">
              
              {/* Search Widget */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-6 relative pb-4 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-primary">
                  Search
                </h3>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Search keywords..." 
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-lg py-3 px-4 pr-12 focus:outline-none focus:border-primary transition-colors"
                  />
                  <button className="absolute right-0 top-0 bottom-0 bg-primary text-white px-4 rounded-r-lg hover:bg-neutral-900 transition-colors">
                    <FaSearch />
                  </button>
                </div>
              </div>

              {/* Categories Widget */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-6 relative pb-4 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-primary">
                  Categories
                </h3>
                <ul className="space-y-4">
                  {categories.map((cat, idx) => (
                    <li key={idx} className="border-b border-neutral-100 pb-3 last:border-0 last:pb-0">
                      <Link href="#" className="flex items-center justify-between text-neutral-600 hover:text-primary transition-colors group">
                        <span className="flex items-center gap-2"><FaAngleRight className="text-primary transition-transform group-hover:translate-x-1" /> {cat.name}</span>
                        <span className="bg-neutral-100 px-3 py-1 rounded-full text-xs text-neutral-500 group-hover:bg-primary group-hover:text-white transition-colors">
                          {cat.count}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Recent Posts Widget */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-6 relative pb-4 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-primary">
                  Recent Posts
                </h3>
                <div className="space-y-6">
                  {recentPosts.map(post => (
                    <div key={post.id} className="flex gap-4 items-center group">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                      </div>
                      <div>
                        <h4 className="font-bold text-neutral-900 leading-tight mb-2 group-hover:text-primary transition-colors">
                          <Link href="#">{post.title}</Link>
                        </h4>
                        <span className="text-sm text-neutral-500 italic">{post.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags Widget */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-neutral-100">
                <h3 className="text-xl font-heading font-bold text-neutral-900 mb-6 relative pb-4 before:absolute before:bottom-0 before:left-0 before:w-12 before:h-1 before:bg-primary">
                  Tags Cloud
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag, idx) => (
                    <Link 
                      key={idx} 
                      href="#" 
                      className="bg-neutral-50 border border-neutral-200 text-neutral-600 px-4 py-2 rounded-lg text-sm hover:bg-primary hover:text-white hover:border-primary transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
