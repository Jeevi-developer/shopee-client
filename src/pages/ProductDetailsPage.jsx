import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Star, ShoppingCart, ArrowLeft, Heart, Share2, Truck, Shield, RotateCcw, Award,
  ChevronLeft, ChevronRight, Minus, Plus, X, Check, Clock, MapPin, Package,
  ThumbsUp, Tag, Percent, CreditCard, Gift, ChevronDown
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
  const [activeTab, setActiveTab] = useState("description");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [pincode, setPincode] = useState("");
  const [deliveryChecked, setDeliveryChecked] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/products/${id}`);
        setProduct(res.data);
        if (res.data.sizes?.length > 0) setSelectedSize(res.data.sizes[0]);
        if (res.data.colors?.length > 0) setSelectedColor(res.data.colors[0]);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleQuantityChange = (type) => {
    if (type === "increase") setQuantity((prev) => prev + 1);
    else if (type === "decrease" && quantity > 1) setQuantity((prev) => prev - 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: `Check out ${product.name}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  const checkDelivery = () => {
    if (pincode.length === 6) {
      setDeliveryChecked(true);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-700 font-medium">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 px-4">
        <div className="text-6xl mb-4">😞</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition">
          Go Back
        </button>
      </div>
    );
  }

  const images = product.images?.length > 0 ? product.images : [product.images?.[0] || "https://via.placeholder.com/600"];
  const sizes = product.sizes || ["S", "M", "L", "XL"];
  const colors = product.colors || ["Black", "White", "Blue"];

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: "Reviews" },
    { id: "qa", label: "Q&A" }
  ];

  const reviews = [
    { id: 1, name: "Rahul Kumar", rating: 5, date: "15 Nov 2024", text: "Excellent product! Worth every penny. Quality is top-notch.", helpful: 45 },
    { id: 2, name: "Priya Singh", rating: 4, date: "10 Nov 2024", text: "Good quality, fast delivery. Slightly expensive but worth it.", helpful: 23 },
    { id: 3, name: "Amit Sharma", rating: 5, date: "5 Nov 2024", text: "Best purchase ever! Highly recommended to everyone.", helpful: 67 }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition font-medium">
              <ArrowLeft size={20} />
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full transition ${isFavorite ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
              >
                <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
              </button>
              <button onClick={handleShare} className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Image Gallery */}
          <div className="lg:col-span-5 space-y-4">
            <div className="sticky top-20">
              <div className="relative bg-white rounded-lg overflow-hidden shadow-md border aspect-square group">
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain cursor-zoom-in transition-transform hover:scale-105 p-4"
                  onClick={() => setShowImageModal(true)}
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {product.oldPrice && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1.5 rounded-md text-sm font-bold shadow-lg">
                    {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2 mt-4">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                        selectedImage === idx ? "border-blue-600 shadow-md" : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-contain p-1" />
                    </button>
                  ))}
                </div>
              )}

              {/* Action Buttons - Desktop */}
              <div className="hidden lg:grid grid-cols-2 gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-white font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 transition shadow-md">
                  <ShoppingCart size={20} />
                  ADD TO CART
                </button>
                <button className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-md text-white font-semibold bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transition shadow-md">
                  <Package size={20} />
                  BUY NOW
                </button>
              </div>
            </div>
          </div>

          {/* Right: Product Details */}
          <div className="lg:col-span-7 space-y-4">
            {/* Product Title & Rating */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h1 className="text-xl sm:text-2xl font-medium text-gray-800 mb-3">{product.name}</h1>

              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-md">
                  <span className="font-semibold">{product.rating || "4.5"}</span>
                  <Star size={14} fill="currentColor" />
                </div>
                <span className="text-gray-600 text-sm">1,234 Ratings & 567 Reviews</span>
              </div>
            </div>

            {/* Price & Offers */}
            <div className="bg-white rounded-lg p-4 shadow-sm border space-y-4">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-3xl font-semibold text-gray-900">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.oldPrice && (
                  <>
                    <span className="text-lg line-through text-gray-400">₹{product.oldPrice?.toLocaleString()}</span>
                    <span className="text-green-600 font-semibold text-lg">
                      {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% off
                    </span>
                  </>
                )}
              </div>

              {/* Available Offers */}
              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Tag size={18} className="text-green-600" />
                  Available Offers
                </h3>
                <div className="space-y-2">
                  {[
                    "Bank Offer: 10% instant discount on HDFC Bank Credit Cards",
                    "Partner Offer: Purchase now & get 1 surprise cashback coupon",
                    "Special Price: Get extra 5% off (price inclusive of discount)"
                  ].map((offer, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-sm">
                      <Percent size={14} className="text-green-600 mt-1 flex-shrink-0" />
                      <span className="text-gray-700">{offer}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div className="bg-gray rounded-lg p-4 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-3">Select Size</h3>
                <div className="flex gap-2 flex-wrap">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2 rounded-full border-2 font-medium transition ${
                        selectedSize === size
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <h3 className="font-semibold text-gray-900 mb-3">Select Color</h3>
                <div className="flex gap-3 flex-wrap">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-5 py-2 rounded-full border-2 font-medium transition ${
                        selectedColor === color
                          ? "border-blue-600 bg-blue-50 text-blue-600"
                          : "border-gray-300 text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Delivery Check */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Truck size={18} />
                Delivery Options
              </h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter Pincode"
                  maxLength={6}
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={checkDelivery}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-medium"
                >
                  Check
                </button>
              </div>
              {deliveryChecked && (
                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Check size={16} />
                    <span>Delivery available for pincode {pincode}</span>
                  </div>
                  <div className="text-sm text-gray-600">
                    <Clock size={14} className="inline mr-1" />
                    Get it by <strong>25 Nov 2024</strong>
                  </div>
                  <div className="text-sm text-gray-600">
                    <Package size={14} className="inline mr-1" />
                    Free Delivery on orders above ₹500
                  </div>
                </div>
              )}
            </div>

            {/* Seller Information */}
            <div className="bg-white rounded-lg p-4 shadow-sm border">
              <h3 className="font-semibold text-gray-900 mb-3">Seller Information</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Premium Seller</span>
                  <div className="flex items-center gap-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    <Star size={12} fill="currentColor" />
                    4.6
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>98% Positive Ratings</span>
                  <span>•</span>
                  <span>10K+ Products Sold</span>
                </div>
              </div>
            </div>

            {/* Product Details Tabs */}
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <div className="flex border-b overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 min-w-[100px] px-4 py-3 text-sm font-semibold transition ${
                      activeTab === tab.id
                        ? "bg-blue-50 text-blue-600 border-b-2 border-blue-600"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-4">
                {activeTab === "description" && (
                  <div className="space-y-3">
                    <p className="text-gray-700 leading-relaxed">
                      {product.description || `High-quality ${product.name} with premium features and excellent durability. Perfect for daily use with modern design and comfortable fit.`}
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Premium quality material</li>
                      <li>Long-lasting durability</li>
                      <li>Modern and stylish design</li>
                      <li>Perfect fit and comfort</li>
                    </ul>
                  </div>
                )}

                {activeTab === "specifications" && (
                  <div className="space-y-2">
                    {[
                      { label: "Brand", value: product.brand || "Premium Brand" },
                      { label: "Material", value: product.material || "High Quality Fabric" },
                      { label: "Color", value: selectedColor || "As Shown" },
                      { label: "Size", value: selectedSize || "Standard" },
                      { label: "Weight", value: product.weight || "500g" },
                      { label: "Warranty", value: "1 Year Manufacturer Warranty" },
                      { label: "Country of Origin", value: "India" },
                    ].map((spec, idx) => (
                      <div key={idx} className="flex py-2 border-b last:border-0">
                        <span className="text-gray-600 w-1/3">{spec.label}</span>
                        <span className="font-medium text-gray-900 w-2/3">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-4">
                    {/* Rating Summary */}
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="text-4xl font-bold text-gray-900">{product.rating || "4.5"}</div>
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} size={16} className="text-yellow-400" fill="currentColor" />
                            ))}
                          </div>
                          <p className="text-sm text-gray-600">Based on 1,234 reviews</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {[5, 4, 3, 2, 1].map((rating) => (
                          <div key={rating} className="flex items-center gap-2 text-sm">
                            <span className="w-8">{rating} ★</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : 5}%` }}
                              ></div>
                            </div>
                            <span className="w-12 text-gray-600">{rating === 5 ? 867 : rating === 4 ? 247 : 50}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b last:border-0 pb-4">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center gap-1 bg-green-600 text-white px-2 py-0.5 rounded text-xs font-semibold">
                              {review.rating} <Star size={10} fill="currentColor" />
                            </div>
                            <span className="font-semibold text-gray-900">{review.name}</span>
                            <span className="text-gray-500 text-sm">• {review.date}</span>
                          </div>
                          <p className="text-gray-700 mb-2">{review.text}</p>
                          <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
                            <ThumbsUp size={14} />
                            Helpful ({review.helpful})
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === "qa" && (
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <h4 className="font-semibold text-gray-900 mb-1">Q: What is the material quality?</h4>
                      <p className="text-gray-700 text-sm">A: Premium quality material with excellent durability and comfort.</p>
                      <p className="text-xs text-gray-500 mt-1">Answered by Seller • 2 days ago</p>
                    </div>
                    <div className="border-b pb-4">
                      <h4 className="font-semibold text-gray-900 mb-1">Q: Is it true to size?</h4>
                      <p className="text-gray-700 text-sm">A: Yes, it fits perfectly as per standard sizing chart.</p>
                      <p className="text-xs text-gray-500 mt-1">Answered by Customer • 5 days ago</p>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
                      Ask a Question
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: <Truck size={20} />, title: "Free Delivery", desc: "On orders ₹500+", color: "green" },
                { icon: <Shield size={20} />, title: "Secure Payment", desc: "100% Safe", color: "blue" },
                { icon: <RotateCcw size={20} />, title: "Easy Returns", desc: "7 Days Return", color: "purple" },
                { icon: <Award size={20} />, title: "Warranty", desc: "1 Year", color: "orange" },
              ].map((badge, idx) => (
                <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border text-center hover:shadow-md transition">
                  <div className={`inline-flex p-2 bg-${badge.color}-100 rounded-lg text-${badge.color}-600 mb-2`}>
                    {badge.icon}
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">{badge.title}</h4>
                  <p className="text-xs text-gray-600">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40 p-3">
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white font-semibold bg-gradient-to-r from-yellow-500 to-orange-500 shadow-md">
            <ShoppingCart size={18} />
            CART
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-md text-white font-semibold bg-gradient-to-r from-orange-500 to-orange-600 shadow-md">
            <Package size={18} />
            BUY NOW
          </button>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setShowImageModal(false)}>
          <button onClick={() => setShowImageModal(false)} className="absolute top-4 right-4 p-2.5 bg-white hover:bg-gray-100 rounded-full transition z-10">
            <X size={24} />
          </button>

          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <img src={images[selectedImage]} alt={product.name} className="w-full h-auto max-h-[90vh] object-contain" />

            {images.length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full transition"
                >
                  <ChevronLeft size={28} />
                </button>
                <button
                  onClick={() => setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white hover:bg-gray-100 p-3 rounded-full transition"
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