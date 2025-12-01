import React, { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, X, MessageSquare } from "lucide-react";

export default function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.subject.trim()) newErrors.subject = "Subject is required";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://localhost:5000/api/contact/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success) {
        setShowSuccessModal(true);
        setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        alert("Something went wrong. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Server error. Try later.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Banner */}
      <div className="relative bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 sm:top-20 left-1/4 sm:left-1/2 w-48 sm:w-72 lg:w-96 h-48 sm:h-72 lg:h-96 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-20 w-40 sm:w-60 lg:w-80 h-40 sm:h-60 lg:h-80 bg-indigo-400 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-20">
          <div className="text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-3 sm:px-5 py-1.5 sm:py-2 mb-4 sm:mb-6">
              <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              <span className="text-white font-medium text-xs sm:text-sm tracking-wide">Professional Support Services</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-white/85 max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-4">
              Our dedicated team is available to assist you with your inquiries and provide expert guidance.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4 md:gap-6 max-w-5xl mx-auto mt-6 sm:mt-10">
              {[
                { value: '24/7', label: 'Availability' },
                { value: '<2 hrs', label: 'Response Time' },
                { value: '50,000+', label: 'Clients Served' },
                { value: '4.9/5', label: 'Client Rating' }
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/5 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-0.5 sm:mb-1">{stat.value}</div>
                  <div className="text-white/70 text-[10px] sm:text-xs font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-8 sm:h-12 lg:h-auto">
            <path d="M0 0L60 8C120 16 240 32 360 37.3C480 43 600 37 720 34.7C840 32 960 32 1080 37.3C1200 43 1320 53 1380 58.7L1440 64V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0V0Z" fill="white" fillOpacity="0.03"/>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 -mt-4 sm:-mt-6 lg:-mt-10 relative z-10">
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          
          {/* Contact Information Cards */}
          <div className="lg:col-span-1 space-y-4 sm:space-y-6 order-2 lg:order-1">
            {/* Call Us */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border-2 border-purple-100 hover:shadow-2xl transition-all duration-300 animate-slide-right">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl p-2 sm:p-3">
                  <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Call Us</h3>
              </div>
              <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">Mon-Fri from 8am to 5pm</p>
              <a href="tel:+9104272903575" className="text-base sm:text-lg font-bold text-blue-600 hover:text-blue-700">
                +91 04272903575
              </a>
            </div>

            {/* Email Us */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border-2 border-purple-100 hover:shadow-2xl transition-all duration-300 animate-slide-right animation-delay-200">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg sm:rounded-xl p-2 sm:p-3">
                  <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Email Us</h3>
              </div>
              <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">Our team will respond within 2 hours</p>
              <a href="mailto:Indxindshopee@gmail.com" className="text-sm sm:text-lg font-bold text-purple-600 hover:text-purple-700 break-all">
                Indxindshopee@gmail.com
              </a>
            </div>

            {/* Visit Us */}
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 border-2 border-purple-100 hover:shadow-2xl transition-all duration-300 animate-slide-right animation-delay-400">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-6">
                <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg sm:rounded-xl p-2 sm:p-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">Visit Us</h3>
              </div>
              <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">Come say hello at our office</p>
              <p className="text-gray-800 font-semibold text-sm sm:text-base">
                5/45, Opposite to 1008 Sivalayam Temple, Salem to Cochin Highway, Ariyanoor, Salem, Tamilnadu, India. Pin - 636308
              </p>
            </div>

            {/* Business Hours */}
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl sm:rounded-3xl shadow-xl p-4 sm:p-6 text-white animate-slide-right animation-delay-600">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                <h3 className="text-lg sm:text-xl font-bold">Business Hours</h3>
              </div>
              <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between">
                  <span>Monday - Friday:</span>
                  <span className="font-bold">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday:</span>
                  <span className="font-bold">9:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday:</span>
                  <span className="font-bold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-5 sm:p-8 md:p-10 border-2 border-purple-100 animate-slide-left relative overflow-hidden">
              <div className="mb-5 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-800 mb-2 sm:mb-3">
                  Send Us a Message
                </h2>
                <p className="text-gray-600 text-sm sm:text-base">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </div>

              <div className="space-y-4 sm:space-y-6">
                {/* Name & Email Row */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Phone & Subject Row */}
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base ${
                        errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="+91 00000 00000"
                    />
                    {errors.phone && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all text-sm sm:text-base ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      }`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="support">Technical Support</option>
                      <option value="sales">Sales Question</option>
                      <option value="partnership">Partnership</option>
                      <option value="feedback">Feedback</option>
                    </select>
                    {errors.subject && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.subject}</p>}
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1.5 sm:mb-2 text-sm sm:text-base">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none text-sm sm:text-base ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                  {errors.message && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-base sm:text-lg py-3 sm:py-4 rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm:gap-3"
                >
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                  Send Message
                </button>
              </div>
<div className="absolute top-2 right-2 sm:top-4 sm:right-4 md:top-2 md:right-2 lg:top-0 lg:right-0 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 animate-jump-character pointer-events-none z-10">
  <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
    <circle cx="100" cy="55" r="22" fill="#FFD4B8"/>
    <circle cx="90" cy="55" r="4" fill="#000" className="blink-eye" />
    <circle cx="110" cy="55" r="4" fill="#000" className="blink-eye" />
    <path d="M78 55 Q78 35 100 33 Q122 35 122 55 Q122 40 110 38 L90 38 Q78 40 78 55" fill="#2C2C2C"/>
    <rect x="92" y="72" width="16" height="12" rx="3" fill="#FFD4B8"/>
    <path d="M85 84 L92 84 L92 95 L85 100 Z" fill="#FFFFFF"/>
    <path d="M115 84 L108 84 L108 95 L115 100 Z" fill="#FFFFFF"/>
    <ellipse cx="100" cy="115" rx="38" ry="48" fill="#1E3A8A"/>
    <path d="M100 84 L85 100 L80 120 L75 115 L85 84 Z" fill="#1E40AF"/>
    <path d="M100 84 L115 100 L120 120 L125 115 L115 84 Z" fill="#1E40AF"/>
    <path d="M100 84 L95 95 L97 120 L100 130 L103 120 L105 95 Z" fill="#DC2626"/>
    <ellipse cx="65" cy="115" rx="12" ry="28" fill="#1E3A8A" transform="rotate(-25 65 115)"/>
    <ellipse cx="135" cy="115" rx="12" ry="28" fill="#1E3A8A" transform="rotate(25 135 115)"/>
    <circle cx="58" cy="135" r="8" fill="#FFD4B8"/>
    <circle cx="142" cy="135" r="8" fill="#FFD4B8"/>
    <rect x="75" y="155" width="20" height="35" rx="5" fill="#1F2937"/>
    <rect x="105" y="155" width="20" height="35" rx="5" fill="#1F2937"/>
    <ellipse cx="85" cy="190" rx="14" ry="7" fill="#000"/>
    <ellipse cx="115" cy="190" rx="14" ry="7" fill="#000"/>
    <rect x="140" y="125" width="18" height="22" rx="2" fill="#8B4513"/>
    <rect x="144" y="125" width="10" height="3" rx="1" fill="#654321"/>
  </svg>
</div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
            onClick={() => setShowSuccessModal(false)}
          ></div>

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[60] w-[92%] sm:w-[95%] max-w-md animate-scaleIn">
            <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border-4 border-green-400">
              {/* Header */}
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 sm:p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-white/10 animate-pulse-slow"></div>
                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="absolute top-3 right-3 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </button>
                <div className="relative flex flex-col items-center">
                  <div className="bg-white rounded-full p-3 sm:p-4 mb-3 sm:mb-4 animate-bounce-slow">
                    <CheckCircle className="w-10 h-10 sm:w-16 sm:h-16 text-green-500" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white text-center">
                    Message Sent Successfully!
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 sm:p-8 text-center">
                <p className="text-gray-700 mb-1 sm:mb-2 text-base sm:text-lg">
                  Thank you for reaching out to us!
                </p>
                <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
                  We've received your message and will get back to you within 2 hours.
                </p>
                
                <div className="bg-green-50 rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-6">
                  <p className="text-green-700 font-semibold text-xs sm:text-sm">
                    📧 A confirmation email has been sent to your inbox
                  </p>
                </div>

                <button
                  onClick={() => setShowSuccessModal(false)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all shadow-lg text-sm sm:text-base"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slide-left {
          from { opacity: 0; transform: translateX(30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
          to { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        }
        @keyframes jump-character {
          0%, 100% { transform: translateY(0) rotate(-5deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }
        .animate-slide-right {
          animation: slide-right 0.8s ease-out both;
        }
        .animate-slide-left {
          animation: slide-left 0.8s ease-out both;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s ease-in-out infinite;
        }
        .animate-pulse-slow {
          animation: pulse-slow 3s ease-in-out infinite;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
        .animate-jump-character {
          animation: jump-character 2s ease-in-out infinite;
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