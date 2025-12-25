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
              src="/assets/images/cdex-logo.webp"
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

      {/* // ============================================
// MODAL SECTION (Replace your existing modal code)
// ============================================ */}

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
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-2">
            <div className="w-[95%] sm:w-[90%] md:w-[85%] lg:w-[75%] max-w-4xl transition-all duration-300 ease-out transform scale-95 opacity-0 animate-[fadeZoom_0.38s_ease-out_forwards]">
              <div className="bg-white/85 backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-white/40 max-h-none flex flex-col">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 w-full bg-gradient-to-r from-blue-600 via-indigo-700 to-blue-600 p-3 sm:p-4 md:p-5">
                  <div className="flex items-center gap-2">
                    <div className="bg-white rounded-full p-2 shadow-md">
                      <Store className="w-5 h-5 md:w-6 md:h-6 text-blue-700" />
                    </div>
                    <div>
                      <h3 className="text-white sm:text-lg md:text-2xl font-bold">
                        Start Selling Today
                      </h3>
                      <p className="text-white/80 text-[10px] sm:text-xs md:text-sm font-medium">
                        Join 50,000+ successful sellers
                      </p>
                    </div>
                  </div>

                  <p className="text-[9px] sm:text-xs md:text-sm font-bold text-emerald-700 bg-emerald-100/60 border border-emerald-400 rounded-lg px-3 py-1 shadow-md animate-pulse hover:animate-none hover:bg-emerald-200 transition-all">
                    Crypto-based transactions • Buyer gets 5% • Seller gets 5% •
                    Referral gets 5%
                  </p>
                </div>

                {/* Highlight CTA Button */}
                <div className="flex justify-center p-3">
                  <button
                    onClick={handleStartSelling}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base md:text-lg px-10 py-3 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.6)] animate-pulse hover:shadow-[0_0_20px_rgba(99,102,241,0.8)] hover:scale-[1.04] active:scale-95 transition-all duration-200"
                  >
                    🚀 Start Selling — FREE
                  </button>
                </div>

                {/* Content */}
                <div className="p-3 sm:p-4 md:p-6 space-y-4 bg-gradient-to-br from-slate-50 to-blue-50">
                  {/* Limited Offer Banner */}
                  <div className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-[length:200%_200%] animate-[bgMove_4s_linear_infinite] rounded-lg p-3 sm:p-4 md:p-4 text-center border border-blue-400 shadow-xl">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <Award className="w-4 h-4 md:w-5 md:h-5 text-yellow-300" />
                      <p className="text-sm md:text-base font-bold text-white">
                        Premium Listing - 3 Months FREE
                      </p>
                    </div>
                    <p className="text-white/90 text-[10px] sm:text-xs font-medium">
                      First 100 sellers • 23 spots remaining
                    </p>
                  </div>

                  {/* Benefits Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-4 text-center border border-slate-200 shadow-sm hover:shadow-blue-200 hover:-translate-y-0.5 duration-200">
                      <div className="bg-green-600 rounded-lg p-2 w-fit mx-auto mb-2 animate-blink-icon">
                        <Award className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h4 className="text-slate-900 font-semibold text-sm md:text-base mb-1">
                        Low Commission Charges
                      </h4>
                      <p className="text-slate-600 text-xs md:text-sm">
                        Keep 100% profits
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 text-center border border-slate-200 shadow-sm hover:shadow-blue-200 hover:-translate-y-0.5 duration-200">
                      <div className="bg-blue-600 rounded-lg p-2 w-fit mx-auto mb-2 animate-blink-icon">
                        <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h4 className="text-slate-900 font-semibold text-sm md:text-base mb-1">
                        Fast Payments
                      </h4>
                      <p className="text-slate-600 text-xs md:text-sm">
                        Quick & reliable settlements
                      </p>
                    </div>

                    <div className="bg-white rounded-lg p-4 text-center border border-slate-200 shadow-sm hover:shadow-blue-200 hover:-translate-y-0.5 duration-200">
                      <div className="bg-purple-600 rounded-lg p-2 w-fit mx-auto mb-2 animate-blink-icon">
                        <Users className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      </div>
                      <h4 className="text-slate-900 font-semibold text-sm md:text-base mb-1">
                        Wide Reach
                      </h4>
                      <p className="text-slate-600 text-xs md:text-sm">
                        10M+ active buyers
                      </p>
                    </div>
                  </div>

                  {/* Included Benefits */}
                  <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
                    <h4 className="text-slate-800 font-semibold text-sm md:text-base mb-2 text-center">
                      Included Benefits
                    </h4>

                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2 bg-slate-50 rounded-md p-2">
                        <Shield className="w-4 h-4 text-blue-600" />
                        <p className="text-slate-700 text-xs font-medium">
                          Payment Security
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 rounded-md p-2">
                        <Store className="w-4 h-4 text-blue-600" />
                        <p className="text-slate-700 text-xs font-medium">
                          Free Store Setup
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 rounded-md p-2">
                        <TrendingUp className="w-4 h-4 text-blue-600" />
                        <p className="text-slate-700 text-xs font-medium">
                          Marketing Tools
                        </p>
                      </div>
                      <div className="flex items-center gap-2 bg-slate-50 rounded-md p-2">
                        <Users className="w-4 h-4 text-blue-600" />
                        <p className="text-slate-700 text-xs font-medium">
                          24/7 Support
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer CTA */}
                {/* <div className="bg-white/80 backdrop-blur-md border-t border-slate-200 p-4 space-y-3">
                  <button
                    onClick={handleStartSelling}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-sm md:text-base px-6 py-3 rounded-lg hover:scale-[1.03] hover:shadow-xl hover:shadow-blue-400/40 active:scale-95 transition-all duration-200"
                  >
                    Start Selling Now — FREE
                  </button>

                  <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600 text-[11px] sm:text-xs">
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      No Credit Card
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />5
                      Min Setup
                    </span>
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 text-green-600" />
                      Cancel Anytime
                    </span>
                  </div>

                  <p className="text-slate-500 text-[11px] sm:text-xs text-center pt-1">
                    Trusted by 50,000+ sellers • 4.8/5 Rating
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </>
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
  
  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.9);
    }
    to { 
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
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
  
  .animate-scaleIn {
    animation: scaleIn 0.3s ease-out;
  }
`}</style>
    </div>
  );
}
