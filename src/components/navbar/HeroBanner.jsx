import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, X, Store, TrendingUp, Users, Zap, Shield, Award, CheckCircle } from "lucide-react";

export default function HeroBanner({ slides }) {
  const [current, setCurrent] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

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

  const handleStartSelling = () => {
    setShowModal(false);
    navigate('/SellerRegistration');
  };

  return (
    <div className="w-full relative overflow-hidden h-[260px] sm:h-[340px] md:h-[400px] lg:h-[480px]">
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
            className="w-full h-full object-cover brightness-110 contrast-105"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent flex flex-col justify-center px-4 sm:px-6 md:px-10 lg:px-12 text-white">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-1 sm:mb-2 drop-shadow-lg">
              {slide.title}
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg mb-3 sm:mb-4 md:mb-6 max-w-md drop-shadow-md">
              {slide.subtitle}
            </p>
            <button className="bg-white text-black font-semibold px-4 py-1.5 sm:px-5 sm:py-2 md:px-6 md:py-2.5 text-xs sm:text-sm md:text-base rounded-lg hover:bg-gray-200 transition w-fit shadow-lg">
              {slide.cta}
            </button>
          </div>
        </div>
      ))}

      {/* SELL STAR BADGE - Mobile Responsive WITHOUT ROTATION */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-12 lg:right-12 z-20">
        <button
          onClick={() => setShowModal(true)}
          className="relative group"
        >
          {/* Animated Glow Ring */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600 animate-spin-slow opacity-75 blur-md"></div>
          
          {/* Star Badge - NO ROTATION */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce-slow hover:scale-110 transition-transform duration-300 border-2 sm:border-3 md:border-4 border-white">
            <svg viewBox="0 0 100 100" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
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
          <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-yellow-300 animate-ping opacity-50"></div>
          <div className="absolute inset-0 rounded-full border border-orange-400 animate-ping-delayed opacity-40"></div>
        </button>
      </div>

      {/* Left Arrow - Mobile Responsive */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-3 md:left-4 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 bg-white/60 rounded-full hover:bg-white transition z-10"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
      </button>

      {/* Right Arrow - Mobile Responsive */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-3 md:right-4 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 bg-white/60 rounded-full hover:bg-white transition z-10"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 md:w-6 md:h-6" />
      </button>

      {/* Dots - Mobile Responsive */}
      <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-0 right-0 flex justify-center gap-1.5 sm:gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 rounded-full transition-all ${
              i === current ? "bg-white w-6 sm:w-7 md:w-8" : "bg-white/40"
            }`}
          ></button>
        ))}
      </div>

      {/* PROFESSIONAL MOBILE-RESPONSIVE MODAL */}
      {showModal && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Container */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] max-w-4xl animate-scaleIn">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
              
              {/* Header - Fixed */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-3 py-3 sm:px-4 sm:py-4 md:px-6 md:py-5 flex items-center justify-between border-b border-blue-500 flex-shrink-0">
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-white rounded-full p-1 sm:p-1.5 md:p-2">
                    <Store className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-2xl font-bold text-white">
                      Start Selling Today
                    </h3>
                    <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-medium hidden sm:block">Join 50,000+ successful sellers</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 sm:p-1.5 md:p-2 bg-white/20 hover:bg-white/30 rounded-full transition-all flex-shrink-0"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="overflow-y-auto flex-1 p-3 sm:p-4 md:p-6 space-y-2.5 sm:space-y-3 md:space-y-4 bg-gradient-to-br from-slate-50 to-blue-50">
                
                {/* Limited Offer Banner */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg p-2 sm:p-2.5 md:p-4 text-center border border-blue-400 shadow-lg">
                  <div className="flex items-center justify-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                    <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-300 flex-shrink-0" />
                    <p className="text-xs sm:text-sm md:text-base font-bold text-white">
                      Premium Listing - 6 Months FREE
                    </p>
                  </div>
                  <p className="text-white/90 text-[10px] sm:text-xs font-medium">First 100 sellers • 23 spots remaining</p>
                </div>

                {/* Benefits Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5 md:gap-3">
                  {/* Benefit 1 */}
                  <div className="bg-white rounded-lg p-2.5 sm:p-3 md:p-4 text-center border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-green-600 rounded-lg p-1.5 sm:p-2 w-fit mx-auto mb-1.5 sm:mb-2">
                      <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h4 className="text-slate-900 font-semibold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">Zero Commission</h4>
                    <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm">Keep 100% profits</p>
                  </div>

                  {/* Benefit 2 */}
                  <div className="bg-white rounded-lg p-2.5 sm:p-3 md:p-4 text-center border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-blue-600 rounded-lg p-1.5 sm:p-2 w-fit mx-auto mb-1.5 sm:mb-2">
                      <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h4 className="text-slate-900 font-semibold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">Fast Payments</h4>
                    <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm">Quick and reliable settlements</p>
                  </div>

                  {/* Benefit 3 */}
                  <div className="bg-white rounded-lg p-2.5 sm:p-3 md:p-4 text-center border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                    <div className="bg-purple-600 rounded-lg p-1.5 sm:p-2 w-fit mx-auto mb-1.5 sm:mb-2">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <h4 className="text-slate-900 font-semibold text-xs sm:text-sm md:text-base mb-0.5 sm:mb-1">Wide Reach</h4>
                    <p className="text-slate-600 text-[10px] sm:text-xs md:text-sm">10M+ active buyers</p>
                  </div>
                </div>

                {/* Additional Benefits */}
                <div className="bg-white rounded-lg p-2.5 sm:p-3 md:p-4 border border-slate-200 shadow-sm">
                  <h4 className="text-slate-800 font-semibold text-xs sm:text-sm md:text-base mb-2 sm:mb-2.5 text-center">Included Benefits</h4>
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 rounded-md p-1.5 sm:p-2">
                      <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-slate-700 text-[10px] sm:text-xs md:text-sm font-medium">Payment Security</p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 rounded-md p-1.5 sm:p-2">
                      <Store className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-slate-700 text-[10px] sm:text-xs md:text-sm font-medium">Free Store Setup</p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 rounded-md p-1.5 sm:p-2">
                      <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-slate-700 text-[10px] sm:text-xs md:text-sm font-medium">Marketing Tools</p>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-50 rounded-md p-1.5 sm:p-2">
                      <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                      <p className="text-slate-700 text-[10px] sm:text-xs md:text-sm font-medium">24/7 Support</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer CTA - Fixed */}
              <div className="bg-white border-t border-slate-200 p-3 sm:p-4 md:p-5 space-y-2 sm:space-y-2.5 flex-shrink-0">
                <button 
                  onClick={handleStartSelling}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-xs sm:text-sm md:text-base px-4 py-2.5 sm:px-6 sm:py-3 md:py-3.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all shadow-lg"
                >
                  Start Selling Now - FREE
                </button>
                
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 md:gap-4 text-slate-600 text-[10px] sm:text-xs">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 flex-shrink-0" />
                    <span>No Credit Card</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 flex-shrink-0" />
                    <span>5 Min Setup</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-green-600 flex-shrink-0" />
                    <span>Cancel Anytime</span>
                  </span>
                </div>

                <p className="text-slate-500 text-[10px] sm:text-xs text-center pt-1">
                  Trusted by 50,000+ sellers • 4.8/5 Rating
                </p>
              </div>
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
        @keyframes ping-delayed {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.4); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: translate(-50%, -50%) scale(0.9); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
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
          animation: scaleIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}