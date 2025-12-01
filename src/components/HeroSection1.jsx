import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Smartphone, Laptop, Camera, Headphones, Watch, Gamepad2, Shirt, ShoppingBag, Home, Sofa, UtensilsCrossed, Dumbbell, Bike, Droplet, Sparkles, BookOpen, Baby, Search, ShoppingCart, Menu, X, Heart, User } from 'lucide-react';
import { Link } from "react-router-dom";

const DropdownCategoryMenu = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount] = useState(5);

  const categories = [
    { 
      name: 'All Products',
      icon: <ShoppingBag className="w-5 h-5" />,
      subcategories: []
    },
    { 
      name: 'Electronics',
      icon: <Smartphone className="w-5 h-5" />,
      subcategories: [
        { name: 'Smartphones', icon: '📱' },
        { name: 'Laptops & Computers', icon: '💻' },
        { name: 'Tablets & E-readers', icon: '📱' },
        { name: 'Cameras & Photography', icon: '📷' },
        { name: 'Audio & Headphones', icon: '🎧' },
        { name: 'Wearables & Smartwatches', icon: '⌚' },
        { name: 'Gaming Consoles', icon: '🎮' },
        { name: 'TV & Home Theater', icon: '📺' },
        { name: 'Accessories', icon: '🔌' }
      ]
    },
    { 
      name: 'Fashion',
      icon: <Shirt className="w-5 h-5" />,
      subcategories: [
        { name: 'Men\'s Clothing', icon: '👔' },
        { name: 'Women\'s Clothing', icon: '👗' },
        { name: 'Kids\' Clothing', icon: '👶' },
        { name: 'Shoes & Footwear', icon: '👟' },
        { name: 'Bags & Luggage', icon: '👜' },
        { name: 'Accessories', icon: '🧢' },
        { name: 'Jewelry', icon: '💍' },
        { name: 'Watches', icon: '⌚' },
        { name: 'Sunglasses', icon: '🕶️' }
      ]
    },
    { 
      name: 'Home & Garden',
      icon: <Home className="w-5 h-5" />,
      subcategories: [
        { name: 'Furniture', icon: '🛋️' },
        { name: 'Home Decor', icon: '🖼️' },
        { name: 'Kitchen & Dining', icon: '🍽️' },
        { name: 'Bedding & Bath', icon: '🛏️' },
        { name: 'Garden & Outdoor', icon: '🌱' },
        { name: 'Tools & Hardware', icon: '🔧' },
        { name: 'Lighting', icon: '💡' },
        { name: 'Storage & Organization', icon: '📦' },
        { name: 'Home Improvement', icon: '🏠' }
      ]
    },
    { 
      name: 'Sports & Fitness',
      icon: <Dumbbell className="w-5 h-5" />,
      subcategories: [
        { name: 'Fitness Equipment', icon: '🏋️' },
        { name: 'Outdoor Sports', icon: '⛰️' },
        { name: 'Team Sports', icon: '⚽' },
        { name: 'Cycling', icon: '🚴' },
        { name: 'Swimming', icon: '🏊' },
        { name: 'Yoga & Pilates', icon: '🧘' },
        { name: 'Running & Jogging', icon: '🏃' },
        { name: 'Camping & Hiking', icon: '⛺' },
        { name: 'Sports Nutrition', icon: '🥤' }
      ]
    },
    { 
      name: 'Beauty & Personal Care',
      icon: <Sparkles className="w-5 h-5" />,
      subcategories: [
        { name: 'Skincare', icon: '🧴' },
        { name: 'Makeup & Cosmetics', icon: '💄' },
        { name: 'Haircare', icon: '💇' },
        { name: 'Fragrances & Perfumes', icon: '🌸' },
        { name: 'Bath & Body', icon: '🛁' },
        { name: 'Men\'s Grooming', icon: '🪒' },
        { name: 'Beauty Tools', icon: '💅' },
        { name: 'Nail Care', icon: '💅' },
        { name: 'Oral Care', icon: '🦷' }
      ]
    },
    { 
      name: 'Books & Media',
      icon: <BookOpen className="w-5 h-5" />,
      subcategories: [
        { name: 'Fiction', icon: '📚' },
        { name: 'Non-Fiction', icon: '📖' },
        { name: 'Children\'s Books', icon: '📕' },
        { name: 'Comics & Graphic Novels', icon: '📔' },
        { name: 'Educational & Textbooks', icon: '📘' },
        { name: 'Self-Help & Motivation', icon: '📙' },
        { name: 'Business & Finance', icon: '💼' },
        { name: 'Magazines & Newspapers', icon: '📰' },
        { name: 'E-books & Audiobooks', icon: '🎧' }
      ]
    },
    { 
      name: 'Toys & Kids',
      icon: <Baby className="w-5 h-5" />,
      subcategories: [
        { name: 'Action Figures & Collectibles', icon: '🦸' },
        { name: 'Dolls & Accessories', icon: '🧸' },
        { name: 'Board Games & Puzzles', icon: '🎲' },
        { name: 'Educational Toys', icon: '🎓' },
        { name: 'Remote Control Toys', icon: '🚗' },
        { name: 'Building Blocks & Sets', icon: '🧱' },
        { name: 'Outdoor Play Equipment', icon: '🛝' },
        { name: 'Arts & Crafts', icon: '🎨' },
        { name: 'Baby & Toddler Toys', icon: '🍼' }
      ]
    }
  ];

  const handleCategoryClick = (categoryName) => {
    if (openDropdown === categoryName) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(categoryName);
      setSelectedCategory(categoryName);
    }
  };

  const handleSubcategoryClick = (categoryName, subcategoryName) => {
    setSelectedSubcategory(subcategoryName);
    setSelectedCategory(categoryName);
    setOpenDropdown(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Announcement Bar */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 text-center text-sm">
        <p className="font-medium">🎉 Special Offer: Get 50% OFF on all categories! Limited time only</p>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                INDXIND SHOPEE
              </span>
            </motion.div>

            {/* Desktop Search */}
            <div className="hidden md:flex flex-1 max-w-2xl mx-8">
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
  <nav className="flex items-center justify-end space-x-4 p-2 bg-white shadow-sm">
      {/* Login Button */}
      <Link
        to="/Herosection"
        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
      >
     Home
      </Link>
  <Link
        to="/Login"
        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
      >
   login
      </Link>
      {/* Start a Seller */}
      <Link
        to="/Faqs"
        className="text-gray-700 hover:text-indigo-600 font-medium transition-colors"
      >
        Start a Seller
      </Link>

      {/* Sign Up Button */}
      <Link
        to="/Login"
        className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full font-medium hover:shadow-lg transform hover:scale-105 transition-all"
      >
       login
      </Link>
    </nav>
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors">
                <User className="w-5 h-5" />
                <span className="font-medium">Account</span>
              </button>

              <button className="flex items-center space-x-1 text-gray-700 hover:text-purple-600 transition-colors">
                <Heart className="w-5 h-5" />
                <span className="font-medium">Wishlist</span>
              </button>

              <button className="relative p-2 hover:bg-gray-100 rounded-full transition-colors">
                <ShoppingCart className="w-6 h-6 text-gray-700" />
                {cartCount > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Desktop Category Dropdown Menu */}
        <div className="hidden md:block border-t border-gray-200 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-1 py-3">
              {categories.map((category) => (
                <div key={category.name} className="relative">
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    onMouseEnter={() => category.subcategories.length > 0 && setOpenDropdown(category.name)}
                    className={`flex items-center space-x-2 px-4 py-2.5 rounded-lg font-medium transition-all ${
                      selectedCategory === category.name
                        ? 'bg-purple-600 text-white'
                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                    }`}
                  >
                    {category.icon}
                    <span className="whitespace-nowrap">{category.name}</span>
                    {category.subcategories.length > 0 && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === category.name ? 'rotate-180' : ''}`} />
                    )}
                  </button>
                  
                  {/* Dropdown Mega Menu */}
                  {category.subcategories.length > 0 && (
                    <AnimatePresence>
                      {openDropdown === category.name && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          onMouseLeave={() => setOpenDropdown(null)}
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
                        >
                          <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 border-b border-gray-100">
                            <h3 className="font-bold text-gray-800 text-lg">{category.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{category.subcategories.length} subcategories</p>
                          </div>
                          <div className="max-h-96 overflow-y-auto py-2">
                            {category.subcategories.map((sub, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSubcategoryClick(category.name, sub.name)}
                                className={`w-full flex items-center space-x-3 px-5 py-3 hover:bg-purple-50 transition-all group ${
                                  selectedSubcategory === sub.name ? 'bg-purple-50 text-purple-600' : 'text-gray-700'
                                }`}
                              >
                                <span className="text-2xl group-hover:scale-110 transition-transform">{sub.icon}</span>
                                <span className="font-medium text-left flex-1">{sub.name}</span>
                                <ChevronDown className="w-4 h-4 -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200 bg-white"
            >
              <div className="px-4 py-4 space-y-3 max-h-96 overflow-y-auto">
                {/* Mobile Search */}
                <div className="relative mb-4">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full pl-12 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* Mobile Categories */}
                {categories.map((category) => (
                  <div key={category.name} className="space-y-2">
                    <button
                      onClick={() => handleCategoryClick(category.name)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-lg font-medium transition-all ${
                        selectedCategory === category.name
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-50 text-gray-700 hover:bg-purple-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {category.icon}
                        <span>{category.name}</span>
                      </div>
                      {category.subcategories.length > 0 && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${openDropdown === category.name ? 'rotate-180' : ''}`} />
                      )}
                    </button>

                    {/* Mobile Subcategories */}
                    <AnimatePresence>
                      {openDropdown === category.name && category.subcategories.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 space-y-1"
                        >
                          {category.subcategories.map((sub, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSubcategoryClick(category.name, sub.name)}
                              className={`w-full flex items-center space-x-3 px-4 py-2.5 rounded-lg text-sm transition-all ${
                                selectedSubcategory === sub.name
                                  ? 'bg-purple-100 text-purple-600 font-medium'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <span className="text-lg">{sub.icon}</span>
                              <span className="text-left flex-1">{sub.name}</span>
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}

                {/* Mobile Menu Links */}
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <User className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 font-medium">My Account</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors">
                    <Heart className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700 font-medium">Wishlist</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Content Display Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {selectedCategory && selectedSubcategory ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-full mb-6">
              <p className="font-semibold">
                {selectedCategory} → {selectedSubcategory}
              </p>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              {selectedSubcategory}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Browse our amazing collection of {selectedSubcategory.toLowerCase()}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-4 flex items-center justify-center text-6xl">
                    🛍️
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2">Product {item}</h3>
                  <p className="text-gray-600 text-sm mb-4">Amazing product description</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-purple-600">$99.99</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:shadow-lg transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-8xl mb-6">🛒</div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to INDXIND SHOPEE
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Select a category from the menu above to start shopping
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-lg hover:shadow-2xl transform hover:scale-105 transition-all">
              Explore All Categories
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DropdownCategoryMenu;