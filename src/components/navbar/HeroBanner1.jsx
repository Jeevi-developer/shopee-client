import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ADD THIS IMPORT
import { ChevronLeft, ChevronRight, X, Store, TrendingUp, Users, Zap, Shield, Award } from "lucide-react";

export default function HeroBanner({ slides }) {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate(); // ADD THIS LINE

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const auto = setInterval(nextSlide, 4000);
    return () => clearInterval(auto);
  }, [slides.length]);

  // Handler for Start Selling button
  const handleStartSelling = () => {
    setShowModal(false);
    navigate('/SellerRegistration');
  };

  return (
    <div className="w-full relative overflow-hidden h-[480px]">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover brightness-125 contrast-110"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 flex flex-col justify-center px-12 text-white">
            <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
            <p className="text-lg mb-6">{slide.subtitle}</p>
            <button className="bg-white text-black font-semibold px-5 py-2 rounded-lg hover:bg-gray-200 transition w-fit">
              {slide.cta}
            </button>
          </div>
        </div>
      ))}

      {/* SELL STAR BADGE - Shows on ALL slides */}
      <div className="absolute top-8 right-8 md:top-12 md:right-12 z-20">
        <button
          onClick={() => setShowModal(true)} // Changed to show modal first
          className="relative group"
        >
          {/* Animated Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 animate-spin-slow opacity-75 blur-md"></div>
          
          {/* Star Badge */}
          <div className="relative w-28 h-28 md:w-36 md:h-36 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow hover:scale-110 transition-transform duration-300 border-4 border-white">
            <svg viewBox="0 0 100 100" className="w-24 h-24 md:w-28 md:h-28 animate-rotate-slow">
              <path
                d="M50 10 L61 39 L92 39 L67 57 L78 86 L50 68 L22 86 L33 57 L8 39 L39 39 Z"
                fill="white"
                stroke="#FFD700"
                strokeWidth="3"
              />
              <text
                x="50"
                y="52"
                textAnchor="middle"
                fill="#FF6B00"
                fontSize="10"
                fontWeight="bold"
                fontFamily="Arial, sans-serif"
                className="animate-pulse"
              >
                SELLER
              </text>
            </svg>
          </div>

          {/* Pulsing Rings */}
          <div className="absolute inset-0 rounded-full border-4 border-yellow-300 animate-ping opacity-50"></div>
          <div className="absolute inset-0 rounded-full border-2 border-orange-400 animate-ping-delayed opacity-40"></div>
        </button>
      </div>

      {/* Left Arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 -translate-y-1/2 p-3 bg-white/60 rounded-full hover:bg-white transition z-10"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Right Arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 -translate-y-1/2 p-3 bg-white/60 rounded-full hover:bg-white transition z-10"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === current ? "bg-white w-8" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>

      {/* PREMIUM SELLER MODAL */}
      {showModal && (
        <>
          {/* Backdrop with blur */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[95%] max-w-4xl animate-scaleIn">
            <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20">
              
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.8),transparent_50%)] animate-pulse-slow"></div>
              </div>

              {/* Header */}
              <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 px-6 py-5 flex items-center justify-between border-b-4 border-white/30">
                <div className="flex items-center gap-3">
                  <div className="bg-white rounded-full p-2 animate-bounce-slow">
                    <Store className="w-8 h-8 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-black text-white drop-shadow-lg">
                      Start Selling Today! 🚀
                    </h3>
                    <p className="text-white/90 text-sm font-semibold">Join 50,000+ Successful Sellers</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 bg-white/90 rounded-full hover:bg-white hover:rotate-90 transition-all duration-300 shadow-lg"
                >
                  <X className="w-6 h-6 text-gray-800" />
                </button>
              </div>

     {/* PREMIUM SELLER MODAL */}
{showModal && (
  <>
    {/* Backdrop with blur */}
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fadeIn"
      onClick={() => setShowModal(false)}
    ></div>

    {/* Modal */}
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[95%] max-w-5xl max-h-[95vh] overflow-y-auto animate-scaleIn scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-transparent">
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl overflow-hidden border-4 border-white/20">
        
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.8),transparent_50%)] animate-pulse-slow"></div>
        </div>

        {/* Header */}
        <div className="relative bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-4 md:px-6 md:py-5 flex items-center justify-between border-b-4 border-white/30">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="bg-white rounded-full p-1.5 md:p-2 animate-bounce-slow">
              <Store className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl md:text-3xl font-black text-white drop-shadow-lg">
                Start Selling Today! 🚀
              </h3>
              <p className="text-white/90 text-xs md:text-sm font-semibold">Join 50,000+ Successful Sellers</p>
            </div>
          </div>
          <button
            onClick={() => setShowModal(false)}
            className="p-1.5 md:p-2 bg-white/90 rounded-full hover:bg-white hover:rotate-90 transition-all duration-300 shadow-lg flex-shrink-0"
          >
            <X className="w-5 h-5 md:w-6 md:h-6 text-gray-800" />
          </button>
        </div>

        {/* Content */}
        <div className="relative p-4 md:p-8 space-y-4 md:space-y-6">
          
          {/* Flash Deal Banner */}
          <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-xl md:rounded-2xl p-3 md:p-5 text-center animate-blink-intense border-2 md:border-4 border-yellow-300 shadow-xl">
            <div className="flex items-center justify-center gap-2 md:gap-3 mb-1 md:mb-2">
              <Zap className="w-5 h-5 md:w-8 md:h-8 text-yellow-300 animate-pulse flex-shrink-0" />
              <p className="text-lg md:text-2xl font-black text-white uppercase tracking-wide">
                🔥 Limited Time Offer! 🔥
              </p>
              <Zap className="w-5 h-5 md:w-8 md:h-8 text-yellow-300 animate-pulse flex-shrink-0" />
            </div>
            <p className="text-sm md:text-xl font-bold text-yellow-100">
              First 100 Sellers: FREE Premium Listing for 6 Months!
            </p>
            <p className="text-white/90 text-xs md:text-sm mt-1 font-semibold">⏰ Only 23 Spots Left!</p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {/* Benefit 1 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 shadow-xl hover:scale-105 transition-transform duration-300 animate-slide-up border-2 border-purple-200">
              <div className="bg-gradient-to-br from-green-400 to-emerald-600 rounded-lg md:rounded-xl p-2 md:p-3 w-fit mb-2 md:mb-3 animate-bounce-slow">
                <Award className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-gray-900 font-bold text-base md:text-lg mb-1 md:mb-2">Zero Commission</h4>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                Keep 100% of your profits. No hidden fees or charges.
              </p>
              <div className="mt-2 md:mt-3 bg-green-50 rounded-lg p-1.5 md:p-2">
                <p className="text-green-700 text-xs font-bold">✓ Save ₹10,000+ monthly</p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 shadow-xl hover:scale-105 transition-transform duration-300 animate-slide-up animation-delay-200 border-2 border-purple-200">
              <div className="bg-gradient-to-br from-blue-400 to-cyan-600 rounded-lg md:rounded-xl p-2 md:p-3 w-fit mb-2 md:mb-3 animate-bounce-slow animation-delay-200">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-gray-900 font-bold text-base md:text-lg mb-1 md:mb-2">Instant Payments</h4>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                Get paid within 24 hours directly to your bank account.
              </p>
              <div className="mt-2 md:mt-3 bg-blue-50 rounded-lg p-1.5 md:p-2">
                <p className="text-blue-700 text-xs font-bold">✓ Daily settlements</p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white/95 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 md:p-5 shadow-xl hover:scale-105 transition-transform duration-300 animate-slide-up animation-delay-400 border-2 border-purple-200">
              <div className="bg-gradient-to-br from-purple-400 to-pink-600 rounded-lg md:rounded-xl p-2 md:p-3 w-fit mb-2 md:mb-3 animate-bounce-slow animation-delay-400">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              <h4 className="text-gray-900 font-bold text-base md:text-lg mb-1 md:mb-2">Huge Reach</h4>
              <p className="text-gray-700 text-xs md:text-sm leading-relaxed">
                Access to 10M+ active buyers across India.
              </p>
              <div className="mt-2 md:mt-3 bg-purple-50 rounded-lg p-1.5 md:p-2">
                <p className="text-purple-700 text-xs font-bold">✓ 5X more visibility</p>
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl md:rounded-2xl p-4 md:p-6 shadow-xl">
            <h4 className="text-white font-bold text-lg md:text-xl mb-3 md:mb-4 text-center">🎁 Seller Perks Included</h4>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center animate-pulse-benefit">
                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white mx-auto mb-1 md:mb-2" />
                <p className="text-white text-xs font-bold">Payment Protection</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center animate-pulse-benefit animation-delay-200">
                <Store className="w-5 h-5 md:w-6 md:h-6 text-white mx-auto mb-1 md:mb-2" />
                <p className="text-white text-xs font-bold">Free Store Setup</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center animate-pulse-benefit animation-delay-400">
                <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white mx-auto mb-1 md:mb-2" />
                <p className="text-white text-xs font-bold">Marketing Tools</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 md:p-3 text-center animate-pulse-benefit animation-delay-600">
                <Users className="w-5 h-5 md:w-6 md:h-6 text-white mx-auto mb-1 md:mb-2" />
                <p className="text-white text-xs font-bold">24/7 Support</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center space-y-3 md:space-y-4">
            <button 
              onClick={handleStartSelling}
              className="w-full md:w-auto bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-base md:text-2xl px-6 md:px-12 py-3 md:py-5 rounded-full hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all shadow-2xl border-2 md:border-4 border-white animate-pulse-cta-glow"
            >
              <span className="flex items-center gap-2 md:gap-3 justify-center">
                <Zap className="w-5 h-5 md:w-8 md:h-8 animate-bounce flex-shrink-0" />
                <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                  🚀 Start Selling Now - FREE! 🚀
                </span>
                <Zap className="w-5 h-5 md:w-8 md:h-8 animate-bounce flex-shrink-0" />
              </span>
            </button>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-6 text-white/90 text-xs md:text-sm">
              <span className="flex items-center gap-1">
                ✓ <strong>No Credit Card</strong>
              </span>
              <span className="flex items-center gap-1">
                ✓ <strong>Setup in 5 Minutes</strong>
              </span>
              <span className="flex items-center gap-1">
                ✓ <strong>Cancel Anytime</strong>
              </span>
            </div>
          </div>

          {/* Trust Badge */}
          <div className="text-center">
            <p className="text-white/80 text-xs leading-relaxed">
              🔒 Trusted by 50,000+ sellers • ⭐ 4.8/5 Rating • 🏆 Award-Winning Platform
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
)}
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ping-delayed {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes pulse-benefit {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(0.95); }
        }
        @keyframes blink-intense {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.02); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
        @keyframes pulse-cta-glow {
          0%, 100% { 
            transform: scale(1); 
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.6),
                        0 0 40px rgba(255, 165, 0, 0.4),
                        0 0 60px rgba(255, 69, 0, 0.3);
          }
          50% { 
            transform: scale(1.05); 
            box-shadow: 0 0 30px rgba(255, 215, 0, 0.8),
                        0 0 60px rgba(255, 165, 0, 0.6),
                        0 0 90px rgba(255, 69, 0, 0.5);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      
        .animate-ping-delayed {
          animation: ping-delayed 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          animation-delay: 0.5s;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        .animate-pulse-benefit {
          animation: pulse-benefit 2s ease-in-out infinite;
        }
        .animate-blink-intense {
          animation: blink-intense 1s ease-in-out infinite;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-pulse-cta-glow {
          animation: pulse-cta-glow 2s ease-in-out infinite;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}