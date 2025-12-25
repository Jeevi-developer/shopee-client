import React, { useState, useEffect } from 'react';
import { ShoppingBag, Users, Award, Heart, TrendingUp, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from "react-router-dom";

export default function AboutUs() {
  const [selectedMember, setSelectedMember] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const stats = [
    { label: 'Happy Customers', value: '50K+', icon: Users },
    { label: 'Products', value: '10K+', icon: ShoppingBag },
    { label: 'Countries', value: '25+', icon: TrendingUp },
    { label: 'Years in Business', value: '8+', icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make starts with you. Your satisfaction drives our innovation and excellence.'
    },
    {
      icon: Shield,
      title: 'Quality Guaranteed',
      description: 'We curate only the finest products, ensuring each item meets our rigorous quality standards.'
    },
    {
      icon: Award,
      title: 'Trusted Service',
      description: 'With thousands of 5-star reviews, our commitment to exceptional service speaks for itself.'
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Mumbai, Maharashtra",
      rating: 5,
      text: "Amazing platform! Found the perfect saree at an unbeatable price. The seller was responsive and delivery was super fast.",
      avatar: "PS",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "Rajesh Kumar",
      location: "Delhi, NCR",
      rating: 4,
      text: "Best marketplace for electronics. Compared prices from multiple sellers and saved ₹5,000 on my new laptop!",
      avatar: "RK",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Anita Patel",
      location: "Ahmedabad, Gujarat",
      rating: 4,
      text: "Love the variety of sellers! Found unique handmade jewelry that I couldn't find anywhere else. Highly recommend!",
      avatar: "AP",
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "Vikram Singh",
      location: "Bangalore, Karnataka",
      rating: 5,
      text: "Secure payment and excellent buyer protection. Had an issue once, and customer support resolved it within hours.",
      avatar: "VS",
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Meera Reddy",
      location: "Hyderabad, Telangana",
      rating: 5,
      text: "The verified seller badges give me confidence. I've made over 20 purchases and never been disappointed!",
      avatar: "MR",
      color: "from-orange-500 to-amber-500"
    },
    {
      name: "Arjun Menon",
      location: "Kochi, Kerala",
      rating: 3,
      text: "Great for small businesses! As a seller, this platform helped me reach customers across India. Game changer!",
      avatar: "AM",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  // Auto-slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '32px 32px'
          }}></div>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 via-purple-600/20 to-transparent"></div>
        <div className="absolute top-10 left-5 sm:top-20 sm:left-10 w-40 h-30 sm:w-72 sm:h-32 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-5 sm:bottom-20 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-15">
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-2 sm:mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-xs sm:text-sm font-medium">Trusted E-commerce Platform</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-4 leading-tight">
              <span className="block bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                About Us
              </span>
            </h1>
            
            <p className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-light px-4">
              Transforming the way you shop online, one exceptional experience at a time
            </p>
            
            <div className="flex items-center justify-center gap-2 sm:gap-4 pt-2 sm:pt-4">
              <div className="w-8 sm:w-16 h-1 bg-gradient-to-r from-transparent via-indigo-400 to-transparent"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-indigo-400"></div>
              <div className="w-8 sm:w-16 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12 lg:h-16">
            <path d="M0 80L60 73C120 66 240 53 360 46C480 40 600 40 720 43C840 46 960 53 1080 56C1200 60 1320 60 1380 60L1440 60V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="#f8fafc" fillOpacity="1"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-8 sm:-mt-12 lg:-mt-16 relative z-10">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl p-4 sm:p-8 lg:p-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 sm:mb-3 text-indigo-600" />
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Connecting Buyers & Sellers Seamlessly
            </h2>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              Founded in 2025, SHOPZY PRIVATE LIMITED was built on a revolutionary idea: create a trusted marketplace where sellers can reach millions of buyers, and customers can discover quality products with complete confidence.
            </p>
            <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
              We don't sell products ourselves—we empower sellers across India to showcase their offerings while providing buyers with instant price comparisons, secure payments, and reliable delivery.
            </p>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              Today, we're proud to be India's fastest-growing marketplace, connecting thousands of verified sellers with satisfied customers.
            </p>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop" 
                alt="Our marketplace" 
                className="w-full h-64 sm:h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent"></div>
            </div>
            <div className="absolute -bottom-4 sm:-bottom-6 -left-2 sm:-left-6 bg-pink-500 text-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl max-w-[200px] sm:max-w-xs">
              <p className="font-semibold text-base sm:text-lg">Our Promise</p>
              <p className="text-pink-100 text-xs sm:text-sm mt-1">Trusted marketplace, transparent transactions</p>
            </div>
          </div>
        </div>
      </div>

      {/* E-commerce Brands Showcase Section */}
      <div className="bg-white py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Trusted by Leading Brands</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Connecting you with India's most trusted sellers and brands</p>
          </div>
        </div>

        {/* Animated Ticker */}
        <div className="relative bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 py-6 sm:py-8 lg:py-12 overflow-hidden">
          <div className="ticker-wrapper">
            <div className="ticker-content">
              {['💼 Multi-Vendor Marketplace', '🛒 Seamless Shopping', '🔒 Secure Payment', '📦 Order Tracking', '⚡ Fast Delivery', '💳 Multiple Payments', '🎁 Exclusive Deals', '🌟 Verified Sellers', '📱 Mobile-First', '🏆 Award-Winning'].map((item, i) => (
                <span key={i} className="ticker-item">{item}</span>
              ))}
              {['💼 Multi-Vendor Marketplace', '🛒 Seamless Shopping', '🔒 Secure Payment', '📦 Order Tracking', '⚡ Fast Delivery'].map((item, i) => (
                <span key={`dup-${i}`} className="ticker-item">{item}</span>
              ))}
            </div>
          </div>
        </div>

        {/* E-commerce Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mt-8 sm:mt-12 lg:mt-16">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {[
              { icon: '🏪', title: 'Multi-Vendor', desc: 'Connect with thousands of verified sellers', gradient: 'from-blue-500 to-cyan-500' },
              { icon: '🔍', title: 'Smart Search', desc: 'AI-powered search technology', gradient: 'from-purple-500 to-pink-500' },
              { icon: '💰', title: 'Best Prices', desc: 'Compare prices instantly', gradient: 'from-orange-500 to-red-500' },
              { icon: '✅', title: 'Quality Check', desc: 'Every product verified', gradient: 'from-green-500 to-emerald-500' }
            ].map((feature, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${feature.gradient} rounded-xl sm:rounded-2xl p-4 sm:p-6 text-white transform hover:scale-105 transition-transform duration-300 shadow-lg`}>
                <div className="text-2xl sm:text-3xl lg:text-4xl mb-2 sm:mb-3">{feature.icon}</div>
                <h3 className="text-sm sm:text-lg lg:text-xl font-bold mb-1 sm:mb-2">{feature.title}</h3>
                <p className="text-white/90 text-xs sm:text-sm hidden sm:block">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Why Choose Us</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Our values aren't just words on a page—they're the foundation of everything we do
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-lg sm:rounded-xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-shadow duration-300 group">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 sm:mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-sm sm:text-base">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-gradient-to-br from-slate-50 to-purple-50 py-12 sm:py-16 lg:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">What Our Customers Say</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600">Real experiences from thousands of satisfied shoppers</p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hidden sm:block"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hidden sm:block"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>

          {/* Testimonial Cards Container */}
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="w-full flex-shrink-0 px-4">
                  <div className="bg-white rounded-2xl p-8 sm:p-12 shadow-xl max-w-4xl mx-auto">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                      <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-2xl sm:text-3xl flex-shrink-0`}>
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1 text-center sm:text-left">
                        <h4 className="font-bold text-gray-900 text-xl sm:text-2xl mb-2">{testimonial.name}</h4>
                        <p className="text-gray-500 text-sm sm:text-base mb-3">{testimonial.location}</p>
                        <div className="flex gap-1 justify-center sm:justify-start">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xl">⭐</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 text-lg sm:text-xl leading-relaxed text-center sm:text-left mb-6">
                      "{testimonial.text}"
                    </p>
                    
                    <div className="pt-6 border-t border-gray-100 flex justify-center sm:justify-start">
                      <span className="inline-flex items-center gap-2 text-sm text-indigo-600 font-medium">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        Verified Purchase
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-indigo-600' : 'w-2 bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>

          {/* Mobile Navigation Buttons */}
          <div className="flex sm:hidden justify-center gap-4 mt-6">
            <button
              onClick={prevSlide}
              className="bg-white p-3 rounded-full shadow-lg"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white p-3 rounded-full shadow-lg"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Experience the Difference?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-indigo-100 mb-6 sm:mb-8 px-4">
            Join thousands of happy customers who trust us for their shopping needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <Link to="/Homepage" className="w-full sm:w-auto">
              <button className="w-full bg-white text-indigo-600 px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-indigo-50 transition-colors duration-300 shadow-xl hover:shadow-2xl">
                Start Shopping
              </button>
            </Link>
            <Link to="/ContactUsPage" className="w-full sm:w-auto">
              <button className="w-full bg-transparent border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-semibold text-base sm:text-lg hover:bg-white/10 transition-colors duration-300">
                Contact Us
              </button>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .ticker-wrapper {
          width: 100%;
          overflow: hidden;
        }
        .ticker-content {
          display: flex;
          animation: scroll-left 40s linear infinite;
        }
        .ticker-item {
          display: inline-flex;
          align-items: center;
          white-space: nowrap;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        @media (min-width: 640px) {
          .ticker-item {
            padding: 0.75rem 2rem;
            font-size: 1.125rem;
          }
        }
        @media (min-width: 1024px) {
          .ticker-item {
            padding: 1rem 3rem;
            font-size: 1.5rem;
          }
        }
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-content:hover {
          animation-play-state: paused;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}