import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Star, TrendingUp, Award, Shield } from 'lucide-react';
import TopNavbar from "./TopNavbar";
import FeaturedProducts from "../FeaturedProducts";
import { fetchFeaturedProducts } from "../../redux/productSlice";

export default function Homepage() {
  const dispatch = useDispatch();
  const { featured, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  // Sample brand logos - replace with actual product brands from your database
  const brands = [
    { name: 'Nike', logo: 'https://logo.clearbit.com/nike.com', category: 'Fashion' },
    { name: 'Apple', logo: 'https://logo.clearbit.com/apple.com', category: 'Electronics' },
    { name: 'Samsung', logo: 'https://logo.clearbit.com/samsung.com', category: 'Electronics' },
    { name: 'Adidas', logo: 'https://logo.clearbit.com/adidas.com', category: 'Fashion' },
    { name: 'Sony', logo: 'https://logo.clearbit.com/sony.com', category: 'Electronics' },
    { name: 'Puma', logo: 'https://logo.clearbit.com/puma.com', category: 'Fashion' },
    { name: 'LG', logo: 'https://logo.clearbit.com/lg.com', category: 'Electronics' },
    { name: 'Zara', logo: 'https://logo.clearbit.com/zara.com', category: 'Fashion' },
    { name: 'H&M', logo: 'https://logo.clearbit.com/hm.com', category: 'Fashion' },
    { name: 'Dell', logo: 'https://logo.clearbit.com/dell.com', category: 'Electronics' },
  ];

  // const stats = [
  //   { icon: <Star className="w-6 h-6" />, value: '500+', label: 'Premium Brands', color: 'from-amber-500 to-orange-500' },
  //   { icon: <TrendingUp className="w-6 h-6" />, value: '50K+', label: 'Products Listed', color: 'from-blue-500 to-cyan-500' },
  //   { icon: <Award className="w-6 h-6" />, value: '1M+', label: 'Happy Customers', color: 'from-purple-500 to-pink-500' },
  //   { icon: <Shield className="w-6 h-6" />, value: '100%', label: 'Authentic Products', color: 'from-green-500 to-emerald-500' },
  // ];

  
  // Category sections data
  const categoryGroups = [
    {
      id: 1,
      title: "Trending Collections",
      categories: [
        {
          id: 1,
          name: "Pilgrim Shampoo",
          label: "Most-loved",
          labelColor: "text-green-600",
          image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
        },
        {
          id: 2,
          name: "HERBLOOM Hair Treatment",
          label: "Specials",
          labelColor: "text-green-600",
          image: "https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=400&h=400&fit=crop",
        },
        {
          id: 3,
          name: "Women's Trousers",
          label: "In Focus Now",
          labelColor: "text-green-600",
          image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop",
        },
        {
          id: 4,
          name: "Co-ords",
          label: "Hand-picked",
          labelColor: "text-pink-600",
          image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      id: 2,
      title: "Popular Categories",
      categories: [
        {
          id: 5,
          name: "VeBNoR Men's T-shirts",
          label: "Top Picks",
          labelColor: "text-green-600",
          image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        },
        {
          id: 6,
          name: "NUDORA Women's Bras",
          label: "Popular",
          labelColor: "text-green-600",
          image: "https://images.unsplash.com/photo-1519657337289-077653f724ed?w=400&h=400&fit=crop",
        },
        {
          id: 7,
          name: "Women's Ethnic Sets",
          label: "In Focus Now",
          labelColor: "text-green-600",
          image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=400&fit=crop",
        },
        {
          id: 8,
          name: "Beauty And Grooming",
          label: "Widest Range",
          labelColor: "text-green-600",
          image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop",
        },
      ],
    },
    {
      id: 3,
      title: "Discounts For You",
      categories: [
        {
          id: 9,
          name: "Wireless Headphones",
          label: "Up to 70% Off",
          labelColor: "text-red-600",
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        },
        {
          id: 10,
          name: "Smart Watches",
          label: "Best Deals",
          labelColor: "text-red-600",
          image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        },
        {
          id: 11,
          name: "Running Shoes",
          label: "Special Offer",
          labelColor: "text-red-600",
          image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop",
        },
        {
          id: 12,
          name: "Home Decor",
          label: "Mega Sale",
          labelColor: "text-red-600",
          image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&h=400&fit=crop",
        },
      ],
    },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Top Navbar */}
      {/* <TopNavbar /> */}

      {/* Featured Products Section */}
<section className="py-1 bg-white mt-0">


        <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
           {/* <h2 className="text-4xl text-gray-800 mb-3 mt-5">

              Featured Products
            </h2> */}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-2">
              <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                  <div className="absolute inset-0 border-2 border-gray-200 rounded-full"></div>
                  <div className="absolute inset-0 border-t-2 border-blue-600 rounded-full animate-spin"></div>
                </div>
                <p className="text-gray-500 text-sm">Loading...</p>
              </div>
            </div>
          ) : (
            <FeaturedProducts products={featured} />
          )}
        </div>
      </section>


      {/* Category Grid Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {categoryGroups.map((group, groupIndex) => (
          <section key={group.id} className={groupIndex > 0 ? "mt-12" : ""}>
            {/* Section Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                {group.title}
              </h2>
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors">
                <span className="text-sm">View All</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {group.categories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1 line-clamp-2">
                      {category.name}
                    </h3>
                    <p className={`text-xs sm:text-sm font-medium ${category.labelColor}`}>
                      {category.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Inline Styles */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .ticker-wrapper {
          overflow: hidden;
        }

        .ticker-content-brands {
          display: flex;
          animation: scroll 30s linear infinite;
          width: fit-content;
        }

        .ticker-item-brand {
          display: inline-block;
          padding: 0 2rem;
          font-size: 1.125rem;
          font-weight: 600;
          white-space: nowrap;
          color: white;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .ticker-content-brands:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}