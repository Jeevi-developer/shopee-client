import React, { useState } from 'react';
import { ShoppingBag, Users, Award, Heart, TrendingUp, Shield } from 'lucide-react';
import { Link } from "react-router-dom";

export default function AboutUs() {
  const [selectedMember, setSelectedMember] = useState(null);

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

  const team = [
    { 
      name: 'Jeevitha', 
      icon: '💻',
      gradient: 'from-blue-500 to-cyan-500',
      expertise: 'React, Node.js, MongoDB, AWS',
      bio: 'Passionate developer with expertise in building scalable web applications.',
      contributions: ['Built core platform architecture', 'Implemented payment gateway', 'Optimized database performance']
    },
    { 
      name: 'Sowmiya', 
      icon: '💻',
      gradient: 'from-purple-500 to-pink-500',
      expertise: 'React, Python, PostgreSQL, Docker',
      bio: 'Creative problem solver focused on delivering exceptional user experiences.',
      contributions: ['Designed responsive UI components', 'Developed API integrations', 'Enhanced security features']
    }
  ];
const relatedTeam = [
  {
    name: "kathir",
    // role: "Brand Manager",
    icon: "📈",
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    name: "Mathi Alagan",
    // role: "Content Creator",
    icon: "📈",
    gradient: "from-pink-500 to-rose-500",
  },
];

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
                Our Story
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
              Founded in 2025, iNDXiND SHOPEE PRIVATE LIMITED was built on a revolutionary idea: create a trusted marketplace where sellers can reach millions of buyers, and customers can discover quality products with complete confidence.
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

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Techincal Team </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            The talented individuals behind our platform's success
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto mb-12 sm:mb-16 lg:mb-20">
          {team.map((member, index) => (
            <div 
              key={index} 
              className="group relative cursor-pointer"
              onClick={() => setSelectedMember(member)}
            >
              <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 overflow-hidden">
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 1px 1px, rgb(99, 102, 241) 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                  }}></div>
                </div>

                <div className={`absolute -top-8 -right-8 sm:-top-10 sm:-right-10 w-24 h-24 sm:w-40 sm:h-40 bg-gradient-to-br ${member.gradient} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity duration-500`}></div>
                
                <div className="relative flex justify-center mb-4 sm:mb-6">
                  <div className={`relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gradient-to-br ${member.gradient} rounded-xl sm:rounded-2xl flex items-center justify-center shadow-xl transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                    <span className="text-4xl sm:text-5xl lg:text-6xl">{member.icon}</span>
                    <div className={`absolute inset-0 rounded-xl sm:rounded-2xl border-2 border-dashed opacity-50 animate-spin`} style={{ animationDuration: '8s', borderColor: 'currentColor' }}></div>
                  </div>
                </div>
                
                <div className="text-center relative z-10">
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors duration-300">
                    {member.name}
                  </h3>
                 
                </div>

                <div className={`absolute bottom-0 right-0 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-tl ${member.gradient} opacity-5 rounded-tl-full`}></div>
              </div>

              <div className={`absolute -bottom-2 left-4 right-4 sm:left-8 sm:right-8 h-6 sm:h-8 bg-gradient-to-r ${member.gradient} rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500`}></div>
            </div>
          ))}
        </div>
      </div>


{/* Related Team Section */}
<div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 lg:pb-20">
  <div className="text-center mb-8 sm:mb-12 lg:mb-16">
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
      Marketing Team
    </h2>
    <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto px-4">
      Other professionals who contribute to our company success
    </p>
  </div>

  <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-5xl mx-auto">
    {relatedTeam.map((member, index) => (
      <div
        key={index}
        className="group relative cursor-pointer"
        onClick={() => setSelectedMember(member)}
      >
        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-xl sm:rounded-2xl p-6 sm:p-8 border-2 border-gray-200 hover:border-indigo-300 transition-all duration-500 overflow-hidden hover:shadow-xl">
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"></div>
          </div>

          {/* Top Badge */}
          <div className="absolute -top-1 -right-1">
            <div className={`w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br ${member.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
          </div>

          {/* Content Container */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            
            {/* Icon Container */}
            <div className="relative flex-shrink-0">
              <div className={`relative w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br ${member.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}>
                <span className="text-3xl sm:text-4xl">{member.icon}</span>
                
                {/* Animated Ring */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white opacity-20"></div>
                <div className="absolute -inset-2 rounded-2xl border border-gray-300 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"></div>
              </div>
              
              {/* Status Indicator */}
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-white shadow-md"></div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-500 mb-3 sm:mb-4 font-medium">
                {member.role}
              </p>
              
              {/* Action Bar */}
              <div className="flex items-center justify-center sm:justify-start gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="text-xs sm:text-sm text-indigo-600 font-semibold">View Profile</span>
                <svg className="w-4 h-4 text-indigo-600 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom Accent Line */}
          <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${member.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
        </div>

        {/* Hover Shadow Effect */}
        <div className={`absolute inset-0 -z-10 bg-gradient-to-r ${member.gradient} rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-105`}></div>
      </div>
    ))}
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