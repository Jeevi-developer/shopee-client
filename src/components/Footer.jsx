import React, { useState } from 'react';
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { Building2, MapPin, Phone, Mail, FileText, X } from "lucide-react";

export default function Footer() {
  const [showTerms, setShowTerms] = useState(false);
  const [showCompany, setShowCompany] = useState(false);

  // Social links with brand colors
  const socialLinks = [
    { icon: <FaFacebookF />, link: "https://www.facebook.com/profile.php?id=61583591012661", color: "#1877F2" },
    { icon: <FaInstagram />, link: "https://www.instagram.com/indxind_shopee/?hl=en", color: "#E4405F" },
    { icon: <FaYoutube />, link: "http://www.youtube.com/@INDXINDSHOPEE", color: "#FF0000" },
    { icon: <FaWhatsapp />, link: "https://whatsapp.com/channel/0029Vb7WHrEFnSzIrhGgUM2Z", color: "#25D366" },
  ];

  const navLinks = [
    { path: '/home', label: 'Home' },
    { path: '/products', label: 'Products' },
    { path: '/AboutUs', label: 'AboutUs' },
    { path: '/ContactUsPage', label: 'Contact' }
  ];

  // Company details - Update these with your actual information
  const companyDetails = {
    name: "iNDXiND SHOPEE PRIVATE LIMITED",
    cin: "U46909TN2025PTC186007",
    address: "   5/45, Opposite to 1008 Sivalayam Temple , Salem to Cochin Highway, Ariyanoor, Salem, Tamilnadu, India. Pin - 636308",
    city: "Salem, Tamil Nadu - 636001",
    country: "India",
    email: "support@indexinshopee.com",
    phone: "91 04272903575",
  };

  return (
    <>
      <footer className="bg-gray-200 text-black">
        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Left - Logo & Company Name */}
            <div className="flex flex-col items-start gap-2">
              {/* Logo */}
              <div
                className="flex items-center gap-x-2 font-bold nico-font text-lg"
                style={{ color: "#1135A7" }}
              >
                <img
                  src="/assets/images/cdex-logo.webp"
                  alt="CDEX Logo"
                  className="h-9 w-9"
                />
                <span className="hidden sm:inline">iNDXiND SHOPEE</span>
                <span className="sm:hidden">iNDXiND</span>
              </div>
              
              <p className="text-sm text-gray-600 max-w-xs">
                India's fastest-growing marketplace connecting millions of buyers with trusted sellers. Enjoy instant price comparisons, encrypted payments, express delivery, COD availability, and exceptional customer service on every order.
              </p>

              <button
                onClick={() => setShowCompany(true)}
                className="mt-2 px-4 py-1 border border-gray-400 rounded text-sm hover:bg-gray-300 transition"
              >
                Details
              </button>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                {navLinks.map(({ path, label }) => (
                  <li key={path} className="relative group w-fit">
                    <a href={path} className="hover:text-indigo-600 transition-colors">
                      {label}
                    </a>
                    <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                  </li>
                ))}
                <li className="relative group w-fit">
                  <button onClick={() => setShowTerms(true)} className="hover:text-indigo-600 transition-colors">
                    Terms & Conditions
                  </button>
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 group-hover:w-full transition-all duration-300"></span>
                </li>
              </ul>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-full text-white hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: social.color }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 text-center bg-gray-200 text-gray-600 border-t border-gray-300">
          <p className="text-xs md:text-sm">
            © {new Date().getFullYear()} Indexin Shopee. All rights reserved.
          </p>
          <p className="mt-1 text-[10px] md:text-xs text-gray-500">
            Product prices & availability may change. Not liable for delays.
          </p>
        </div>
      </footer>

 {/* Company Details Modal */}
      {showCompany && (
        <div 
          className="fixed inset-0 bg-black-500 bg-opacity-50 flex items-center justify-center z-50 px-4"
          onClick={() => setShowCompany(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowCompany(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-9 h-5" />
            </button>

            {/* Header */}
            <div className="mb-4 border-b pb-3">
              <div className="flex items-center gap-2 mb-1">
                <Building2 className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-gray-900">Company Details</h2>
              </div>
              <p className="text-xs text-gray-500">Legal & Registration Information</p>
            </div>

            {/* Company Information */}
            <div className="space-y-3">
              {/* Company Name */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Company Name</p>
                <p className="text-sm font-semibold text-gray-900">{companyDetails.name}</p>
              </div>

              {/* CIN Number */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">CIN Number</p>
                <p className="text-xs font-mono font-semibold text-gray-900">{companyDetails.cin}</p>
              </div>

            
              {/* Address */}
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Registered Address</p>
                <p className="text-xs text-gray-900">{companyDetails.address}</p>
                <p className="text-xs text-gray-900">{companyDetails.city}</p>
                <p className="text-xs text-gray-900">{companyDetails.country}</p>
              </div>

              {/* Contact */}
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Email</p>
                  <a href={`mailto:${companyDetails.email}`} className="text-xs text-indigo-600 hover:underline break-all">
                    {companyDetails.email}
                  </a>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-[10px] text-gray-500 uppercase tracking-wide mb-1">Phone</p>
                  <a href={`tel:${companyDetails.phone}`} className="text-xs text-indigo-600 hover:underline">
                    {companyDetails.phone}
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t">
              <p className="text-[10px] text-gray-500 text-center">
                Registered with Ministry of Corporate Affairs, Govt. of India
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowCompany(false)}
              className="w-full mt-3 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-semibold text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative my-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h2>

            <div className="text-gray-700 text-sm leading-relaxed space-y-3 max-h-[70vh] overflow-y-auto">
              <p>
                By shopping with <strong>Indxind Shopee</strong>, you agree to
                the following terms:
              </p>

              <p>
                💱 <strong>Crypto Commission Applicability:</strong> For
                crypto-based purchases or sales, the seller commission (5%) and
                customer cashback (10%) apply based on real-time transaction
                value.
              </p>

              <p>
                ⚡ <strong>Order Accuracy:</strong> Orders once confirmed cannot
                be modified.
              </p>

              <p>
                🚚 <strong>Delivery:</strong> Delivery time may vary based on
                logistics & location.
              </p>

              <p>
                📦 <strong>Return Policy:</strong> Returns accepted within 7
                days for eligible products.
              </p>

              <p>
                🔒 <strong>Privacy:</strong> We protect customer data and use it
                only for order fulfillment.
              </p>

              <p>
                💳 <strong>Payment:</strong> Supports UPI, Cards, Netbanking,
                and select crypto methods.
              </p>

              <p>
                ⚙️ <strong>Policy Updates:</strong> Terms may be revised
                periodically.
              </p>

              <p>
                ⚖️ <strong>Governing Law:</strong> Governed by Indian law.
              </p>

              <p className="font-semibold">
                Support:{" "}
                <a
                  href="mailto:support@indexinshopee.com"
                  className="text-indigo-600"
                >
                  support@indexinshopee.com
                </a>
              </p>
            </div>

            <button
              onClick={() => setShowTerms(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}