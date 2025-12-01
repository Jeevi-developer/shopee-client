import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Star,
  ShoppingCart,
  ArrowLeft,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Minus,
  Plus,
  X,
  Check,
} from "lucide-react";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/products/${id}`
        );

        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name}`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-800 text-xl font-semibold">
            Loading Product...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-8xl mb-4">😞</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Product Not Found
        </h2>
        <p className="text-gray-500 mb-6">
          The product you're looking for doesn't exist
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-xl transition shadow-lg"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Mock images array
  const images =
    product.images && product.images.length > 0
      ? product.images
      : [
          product.images?.[0] || "https://via.placeholder.com/600",
          "https://via.placeholder.com/600/E8F4F8",
          "https://via.placeholder.com/600/F0E8F8",
          "https://via.placeholder.com/600/E8F8F0",
        ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header Navigation */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition group font-medium"
            >
              <ArrowLeft
                size={20}
                className="group-hover:-translate-x-1 transition-transform"
              />
              <span className="hidden sm:inline">Back to Products</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2.5 rounded-full transition shadow-sm ${
                  isFavorite
                    ? "bg-red-500 text-white shadow-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition shadow-sm"
              >
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 aspect-square group">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover cursor-zoom-in transition-transform hover:scale-105"
                onClick={() => setShowImageModal(true)}
              />

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                  >
                    <ChevronLeft size={24} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-700 p-3 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}

              {/* Discount Badge */}
              {product.oldPrice && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-pink-600 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {Math.round(
                    ((product.oldPrice - product.price) / product.oldPrice) *
                      100
                  )}
                  % OFF
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === idx
                        ? "border-blue-600 shadow-lg shadow-blue-200"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`View ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-3 leading-tight text-gray-900">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200">
                  <Star
                    size={18}
                    className="text-amber-500"
                    fill="currentColor"
                  />
                  <span className="font-semibold text-amber-600">
                    {product.rating || "4.8"}
                  </span>
                  <span className="text-gray-500 text-sm">(1,234 reviews)</span>
                </div>

                <div className="flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-lg border border-green-200">
                  <Check size={16} className="text-green-600" />
                  <span className="text-green-700 font-medium text-sm">
                    In Stock
                  </span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-2xl border border-blue-100 shadow-md">
              <div className="flex items-baseline gap-4 flex-wrap">
                <span className="text-4xl sm:text-5xl font-bold text-gray-900">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <div className="flex items-center gap-2">
                    <span className="text-2xl line-through text-gray-400">
                      ₹{product.oldPrice?.toLocaleString()}
                    </span>
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Save ₹
                      {(product.oldPrice - product.price)?.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>
              <p className="text-gray-600 text-sm mt-2">
                Inclusive of all taxes
              </p>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Description
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description ||
                  `Upgrade your lifestyle with ${product.name}. Designed for everyday performance and comfort with premium quality materials.`}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
              <span className="text-gray-700 font-semibold">Quantity:</span>
              <div className="flex items-center bg-gray-50 rounded-xl border border-gray-300">
                <button
                  onClick={() => handleQuantityChange("decrease")}
                  className="p-3 hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={quantity === 1}
                >
                  <Minus size={18} className="text-gray-700" />
                </button>
                <span className="px-6 py-3 font-bold text-gray-900 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange("increase")}
                  className="p-3 hover:bg-gray-100 transition"
                >
                  <Plus size={18} className="text-gray-700" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 transition shadow-lg shadow-blue-200 hover:shadow-xl">
                <ShoppingCart size={22} />
                Add to Cart
              </button>

              <button className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-xl border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition font-semibold shadow-sm">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="p-2.5 bg-green-100 rounded-lg flex-shrink-0">
                  <Truck size={22} className="text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    Free Delivery
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    Orders above ₹500
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="p-2.5 bg-blue-100 rounded-lg flex-shrink-0">
                  <Shield size={22} className="text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    Secure Payment
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">100% Protected</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="p-2.5 bg-purple-100 rounded-lg flex-shrink-0">
                  <RotateCcw size={22} className="text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">7 Days Return</p>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition">
                <div className="p-2.5 bg-amber-100 rounded-lg flex-shrink-0">
                  <Award size={22} className="text-amber-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">
                    1 Year Warranty
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">Manufacturer's</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Section */}
        <div className="mt-12 bg-white rounded-3xl border border-gray-200 shadow-xl p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900">
            Product Specifications
          </h3>

          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { label: "Material", value: "Premium Quality", icon: "🏆" },
              { label: "Warranty", value: "1 Year Manufacturer", icon: "🛡️" },
              { label: "Delivery", value: "2-5 Business Days", icon: "📦" },
              { label: "Payment", value: "Secure & Protected", icon: "💳" },
              {
                label: "Brand",
                value: product.brand || "Premium Brand",
                icon: "⭐",
              },
              { label: "Condition", value: "Brand New", icon: "✨" },
            ].map((spec, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-200 hover:shadow-md transition"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{spec.icon}</span>
                  <span className="text-gray-600 font-medium">
                    {spec.label}
                  </span>
                </div>
                <span className="text-gray-900 font-semibold">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <button
            onClick={() => setShowImageModal(false)}
            className="absolute top-4 right-4 p-3 bg-white hover:bg-gray-100 text-gray-800 rounded-full transition shadow-xl"
          >
            <X size={24} />
          </button>

          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-2xl p-4 shadow-2xl">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
            </div>

            {images.length > 1 && (
              <>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === 0 ? images.length - 1 : prev - 1
                    )
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition shadow-xl"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={() =>
                    setSelectedImage((prev) =>
                      prev === images.length - 1 ? 0 : prev + 1
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 text-gray-800 p-3 rounded-full transition shadow-xl"
                >
                  <ChevronRight size={28} />
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
