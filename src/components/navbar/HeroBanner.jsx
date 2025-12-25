import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Store,
  TrendingUp,
  Users,
  Zap,
  Shield,
  Award,
  CheckCircle,
} from "lucide-react";

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
    navigate("/SellerRegistration");
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

      {/* YOUR LOGO BADGE - Bright Professional Style */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-8 md:right-8 lg:top-12 lg:right-12 z-20">
        <button onClick={() => setShowModal(true)} className="relative group">
          <div className="absolute inset-0 rounded-full bg-blue animate-spin-slow opacity-75 blur-md"></div>
          {/* Animated Bright Glow Ring */}
          <div
            className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-36 lg:h-36 
bg-gradient-to-br from-[#ffffff] via-[#f5f5f5] to-[#ffffff] rounded-full 
flex items-center justify-center shadow-2xl animate-bounce-slow hover:scale-110 
transition-transform duration-300 border-2 sm:border-3 md:border-4 border-white 
animate-blink-badge"
          >
            {/* Your Company Logo Image */}

            <img
              src="/assets/images/shopzy-logo.png"
              alt="Company Logo"
              className="w-30 h-30 sm:w-30 sm:h-30 md:w-30 md:h-30 lg:w-30 lg:h-30 object-contain"
            />

            {/* Text below logo - Bright theme */}
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
              <span className="text-sm sm:text-base md:text-lg font-extrabold text-green-900 drop-shadow-[0_0_6px_rgba(34,197,94,0.7)] tracking-wide">
                SELLER
              </span>
            </div>
          </div>

          {/* Pulsing Rings - Bright theme */}
          <div className="absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-indigo-400 animate-ping opacity-50"></div>
          <div className="absolute inset-0 rounded-full border border-purple-400 animate-ping-delayed opacity-40"></div>
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
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3"
          onClick={() => setShowModal(false)} // click anywhere outside modal → close
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>

          {/* Modal Wrapper */}
          <div
            className="relative w-full max-w-2xl max-h-[100vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
          >
            {/* Modal Content */}
            <div className="bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden border border-white/40 w-full animate-[fadeZoom_0.3s_ease-out]">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-600 p-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <div className="bg-white rounded-full p-1 shadow-md">
                        <Store className="w-4 h-4 text-blue-700" />
                      </div>
                      <div>
                        <h3 className="text-white text-base font-bold leading-tight">
                          Start Selling Today
                        </h3>
                        <p className="text-white/90 text-[10px] font-medium">
                          Join 50,000+ sellers
                        </p>
                      </div>
                    </div>

                    <div className="hidden sm:block text-[9px] font-bold text-emerald-700 bg-emerald-100/90 border border-emerald-400 rounded-md px-2 py-1 shadow-md whitespace-nowrap">
                      For future transactions, both the buyer and seller
                      will receive a 15% discount.
                    </div>
                  </div>

                  <div className="sm:hidden text-[9px] font-bold text-emerald-700 bg-emerald-100/90 border border-emerald-400 rounded-md px-2 py-1 shadow-md text-center">
                    For future transactions, both the buyer and seller
                    will receive a 15% discount.
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-3 space-y-3 bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Limited Offer */}
                <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 rounded-lg p-2 text-center border border-blue-400 shadow-lg">
                  <div className="flex items-center justify-center gap-1.5">
                    <Award className="w-3.5 h-3.5 text-yellow-300" />
                    <p className="text-xs font-bold text-white">
                      Premium Listing - 3 Months FREE
                    </p>
                  </div>
                  <p className="text-white/90 text-[10px] font-medium">
                    First 100 sellers • 23 spots left
                  </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-white rounded-lg p-2 text-center border border-slate-200 shadow-sm">
                    <div className="bg-green-600 rounded-md p-1 w-fit mx-auto mb-1">
                      <Award className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-slate-900 font-semibold text-xs mb-0.5">
                      Low Commission
                    </h4>
                    <p className="text-slate-600 text-[10px]">100% profits</p>
                  </div>

                  <div className="bg-white rounded-lg p-2 text-center border border-slate-200 shadow-sm">
                    <div className="bg-blue-600 rounded-md p-1 w-fit mx-auto mb-1">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-slate-900 font-semibold text-xs mb-0.5">
                      Fast Payments
                    </h4>
                    <p className="text-slate-600 text-[10px]">Quick settle</p>
                  </div>

                  <div className="bg-white rounded-lg p-2 text-center border border-slate-200 shadow-sm">
                    <div className="bg-purple-600 rounded-md p-1 w-fit mx-auto mb-1">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-slate-900 font-semibold text-xs mb-0.5">
                      Wide Reach
                    </h4>
                    <p className="text-slate-600 text-[10px]">10M+ buyers</p>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-400 p-2 rounded-lg flex justify-center">
                  <button
                    onClick={handleStartSelling}
                    className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white font-bold text-sm px-6 py-2.5 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.7)] hover:shadow-[0_0_30px_rgba(99,102,241,1)] hover:scale-105 active:scale-95 transition-all duration-300 animate-pulse hover:animate-none"
                  >
                    🚀 Start Selling — FREE
                  </button>
                </div>

                {/* Included Benefits */}
                <div className="bg-white rounded-lg p-2.5 border border-slate-200 shadow-sm">
                  <h4 className="text-slate-800 font-semibold text-xs mb-2 text-center">
                    ✨ Included Benefits
                  </h4>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center gap-1.5 bg-slate-50 rounded-md p-2">
                      <Shield className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <p className="text-slate-700 text-[10px] font-medium">
                        Payment Security
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 rounded-md p-2">
                      <Store className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <p className="text-slate-700 text-[10px] font-medium">
                        Free Store Setup
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 rounded-md p-2">
                      <TrendingUp className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <p className="text-slate-700 text-[10px] font-medium">
                        Marketing Tools
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 rounded-md p-2">
                      <Users className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <p className="text-slate-700 text-[10px] font-medium">
                        24/7 Support
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 text-slate-600 text-[10px]">
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" /> No Card
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" /> 5 Min
                  </span>
                  <span className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-600" /> Cancel
                    Anytime
                  </span>
                </div>

                <p className="text-slate-500 text-[10px] text-center">
                  Trusted by 50,000+ sellers • 4.8/5 ⭐
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Required CSS for animations */}
      <style>{`
  @keyframes spin-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  @keyframes bounce-slow {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes ping-delayed {
    75%, 100% { 
      transform: scale(1.5);
      opacity: 0;
    }
  }
  
  @keyframes blink-badge {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.95); }
  }
  
  @keyframes blink-icon {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
  
  @keyframes blink-slow {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.7; }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes fadeZoom {
    from { 
      opacity: 0;
      transform: scale(0.95);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }
  
  .animate-spin-slow {
    animation: spin-slow 3s linear infinite;
  }
  
  .animate-bounce-slow {
    animation: bounce-slow 2s ease-in-out infinite;
  }
  
  .animate-ping-delayed {
    animation: ping-delayed 2s cubic-bezier(0, 0, 0.2, 1) infinite;
    animation-delay: 0.5s;
  }
  
  .animate-blink-badge {
    animation: blink-badge 2s ease-in-out infinite;
  }
  
  .animate-blink-icon {
    animation: blink-icon 1.5s ease-in-out infinite;
  }
  
  .animate-blink-slow {
    animation: blink-slow 3s ease-in-out infinite;
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out;
  }
`}</style>
    </div>
  );
}
