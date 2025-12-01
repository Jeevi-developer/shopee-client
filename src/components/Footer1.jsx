import React, { useState } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa";

const Footer = () => {
  const [showCompany, setShowCompany] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Social links (replace with your actual pages if needed)
  const socialLinks = [
    { icon: <FaFacebookF />, link: "https://facebook.com", color: "#1877F2" },
    { icon: <FaInstagram />, link: "https://instagram.com", color: "#E4405F" },
    { icon: <FaYoutube />, link: "https://youtube.com", color: "#FF0000" },
    { icon: <FaWhatsapp />, link: "https://whatsapp.com", color: "#25D366" },
  ];

  return (
    <footer className="relative bg-gray-100 text-black">
      {/* Top Section */}
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-10">
        {/* Left - Logo & Company Name */}
        <div className="flex flex-col items-start gap-2">
          <img
            src="/assets/images/cdex-logo.png"
            alt="Coindexin Logo"
            className="w-12 h-12"
          />
          <h3 className="text-lg font-bold text-gray-900">Indxind Shopee</h3>
          <p className="text-sm text-gray-600 max-w-xs">
            Your one-stop destination for shopping smarter — discover quality
            products, amazing deals, and fast delivery with Indexin Shopee.
          </p>
          <button
            onClick={() => setShowCompany(true)}
            className="mt-2 px-4 py-1 border border-gray-400 rounded text-sm hover:bg-gray-200 transition"
          >
            Details
          </button>
        </div>

        {/* Center - Quick Links */}
        <div className="flex flex-col gap-2 mt-6 md:mt-0">
          <h4 className="text-lg font-semibold mb-2 text-gray-900">
            Quick Links
          </h4>
          <ul className="flex flex-col gap-1 text-sm font-medium">
            {["/home", "/products", "/about", "/contact"].map((path, idx) => (
              <li key={idx} className="relative group">
                <a
                  href={path}
                  className="relative z-10 transition-colors duration-300 hover:text-indigo-600"
                >
                  {path.replace("/", "").charAt(0).toUpperCase() +
                    path.replace("/", "").slice(1)}
                </a>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
              </li>
            ))}
            <li className="relative group">
              <button
                onClick={() => setShowTerms(true)}
                className="relative z-10 transition-colors duration-300 hover:text-indigo-600"
              >
                Terms & Conditions
              </button>
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-indigo-600 transition-all group-hover:w-full"></span>
            </li>
          </ul>
        </div>

        {/* Right - Social Media */}
        <div className="flex flex-col gap-2 mt-6 md:mt-0">
          <h4 className="text-lg font-semibold mb-2 text-gray-900">
            Follow Us
          </h4>
          <div className="flex items-center gap-3">
            {socialLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full text-white transition-transform duration-300 hover:scale-110"
                style={{ backgroundColor: item.color }}
              >
                {item.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="py-4 text-center text-gray-600 text-xs bg-gray-200 border-t border-gray-300">
        <span>
          © {new Date().getFullYear()} Indexin Shopee. All rights reserved.
        </span>
        <p className="text-gray-500 text-xs mt-2">
          Disclaimer: Product prices and availability are subject to change.
          Indexin Shopee is not liable for third-party listings or delivery
          delays.
        </p>
      </div>

      {/* Company Details Modal */}
      {showCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative animate-bounceModal">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Company Details
            </h2>
            <div className="text-gray-700 text-sm leading-relaxed space-y-2">
              <p>
                <strong>INDEXIN DIGITAL RETAIL PRIVATE LIMITED</strong>
              </p>
              <p>
                <strong>CIN:</strong> U52609TN2024PTC166789
              </p>
              <p>
                <strong>Address:</strong> No. 45, Main Road, Salem, Tamil Nadu –
                636308, India
              </p>
            </div>
            <button
              onClick={() => setShowCompany(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 transition-all"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Terms & Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-bounceModal">
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h2>
            <div className="text-gray-700 text-sm leading-relaxed space-y-3 max-h-[70vh] overflow-y-auto">
              <p>
                By shopping with <strong>Indxind Shopee</strong>, you agree to
                the following terms:
              </p>

              <p>
                💱 <strong>Crypto Commission Applicability: </strong >For
                crypto-based purchases or sales, the seller commission (5%) and
                customer cashback (10%) remain fully applicable and will be
                calculated based on the transaction value at the time of
                payment.
              </p>
              {/* <p>💰 <strong>Crypto Transactions (15%):</strong> Crypto-based orders incur a 15% handling fee.</p> */}
              <p>
                ⚡ <strong>Order Accuracy:</strong> Ensure product details and
                quantities before checkout; orders once confirmed cannot be
                modified.
              </p>
              <p>
                🚚 <strong>Delivery:</strong> Timely delivery is subject to
                logistics and availability in your region.
              </p>
              <p>
                📦 <strong>Return Policy:</strong> Returns are accepted within 7
                days for eligible items.
              </p>
              <p>
                🔒 <strong>Privacy:</strong> Customer data is protected and used
                only for order fulfillment.
              </p>
              <p>
                💳 <strong>Payment:</strong> We accept UPI, Cards, Netbanking,
                and select crypto options.
              </p>
              <p>
                ⚙️ <strong>Changes to Policy:</strong> Indexin Shopee may update
                these terms periodically.
              </p>
              <p>
                ⚖️ <strong>Governing Law:</strong> These terms are governed by
                Indian law.
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
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Animations */}
      <style>
        {`
          @keyframes bounceModal {
            0% { transform: translateY(-50px) scale(0.9); opacity: 0; }
            50% { transform: translateY(10px) scale(1.05); opacity: 1; }
            70% { transform: translateY(-5px) scale(1); }
            100% { transform: translateY(0) scale(1); }
          }
          .animate-bounceModal {
            animation: bounceModal 0.6s ease-out forwards;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;
