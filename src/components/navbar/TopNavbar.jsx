import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categorySlice";
import { Link } from "react-router-dom";
import HeroBanner from "../navbar/HeroBanner";
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  Heart,
  User,
  Store,
  ChevronDown,
  Package,
  Gift,
  CreditCard,
} from "lucide-react";

const handleSubmit = (e) => {
  e.preventDefault();
  navigate(`/search?q=${searchTerm}`);
};

export default function IntegratedNavbar() {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories);

  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [mobileLoginDropdown, setMobileLoginDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() === "") return;
    navigate(`/search?q=${searchTerm}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

 const heroSlides = [
   {
    id: 1,
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1920&h=700&fit=crop&q=95&auto=format&sat=15&brightness=5",
    title: "Fresh Organic Vegetables",
    subtitle: "Farm to table goodness",
    cta: "Shop Now",
  },
{
  id: 2,
  image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1920&h=700&fit=crop&q=95&auto=format",
  title: "Toys & Games for Kids",
  subtitle: "Endless fun and learning for your little ones",
  cta: "Explore Toys",
},
 
  {
  id: 1,
  image: "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=1920&h=700&fit=crop&q=95&sat=25",
  title: "Luxury Watches Collection",
  subtitle: "Timeless elegance for every occasion",
  cta: "Shop Watches",
},
{
  id: 2,
  image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1920&h=700&fit=crop&q=95&sat=30",
  title: "Premium Footwear",
  subtitle: "Step into style with our exclusive shoe collection",
  cta: "Shop Shoes",
},


  {
    id: 4,
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&h=700&fit=crop&q=95&auto=format&sat=15&brightness=5",
    title: "Fashion Trends",
    subtitle: "Style that speaks volumes",
    cta: "View Deals",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1920&h=800&fit=crop&q=95&auto=format",
    title: "Home Furniture",
    subtitle: "Transform your living space",
    cta: "Explore",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1920&h=800&fit=crop&q=95&auto=format",
    title: "Grocery & Essentials",
    subtitle: "Fresh products delivered daily",
    cta: "Order Now",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1920&h=800&fit=crop&q=95&auto=format",
    title: "Electronics & Tech",
    subtitle: "Limited time offers on gadgets",
    cta: "View Deals",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1920&h=800&fit=crop&q=95&auto=format",
    title: "Fashion Clothing",
    subtitle: "Latest trends in apparel",
    cta: "Shop Now",
  },
];


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleLoginMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setLoginDropdown(true);
  };

  const handleLoginMouseLeave = () => {
    const id = setTimeout(() => {
      setLoginDropdown(false);
    }, 200);
    setTimeoutId(id);
  };

  const handleCategoryMouseEnter = (index) => {
    setActive(index);
  };

  return (
    <>
      {/* TOP NAVBAR - White Header with Logo, Search, Actions */}
      <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
        <div className="border-b">
          <div className="max-w-8xl mx-auto px-3 sm:px-4 lg:px-6">
            <div className="flex items-center justify-between h-14 sm:h-16 gap-2">
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

              {/* Search Bar - Hidden on mobile */}
              <div className="hidden md:flex flex-1 max-w-xl lg:max-w-2xl mx-2 lg:mx-4">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search products, brands..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                  <Search
                    className="absolute left-3 top-2.5 w-5 h-5 text-gray-400 cursor-pointer"
                    onClick={handleSearch}
                  />
                </div>
              </div>

              {/* Desktop Actions */}
              <div className="hidden lg:flex items-center gap-2 xl:gap-3 flex-shrink-0">
                <button className="relative flex flex-col items-center group px-1">
                  <ShoppingCart className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                  <span className="text-xs text-gray-700 group-hover:text-blue-600 mt-0.5">
                    Cart
                  </span>
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-semibold">
                      {cartCount}
                    </span>
                  )}
                </button>


                {/* ACCOUNT DROPDOWN */}
                <div
                  className="relative"
                  onMouseEnter={handleLoginMouseEnter}
                  onMouseLeave={handleLoginMouseLeave}
                >
                  <button className="flex flex-col items-center group px-1">
                    <User className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                    <span className="text-xs text-gray-700 group-hover:text-blue-600 mt-0.5 flex items-center gap-0.5">
                      {localStorage.getItem("authToken") ? "Account" : "Login"}
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          loginDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </span>
                  </button>

                  {loginDropdown && (
                    <>
                      {/* ✅ IF LOGGED IN */}
                      {localStorage.getItem("authToken") ? (
                        <div className="absolute right-0 mt-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                          <div className="py-1">
                            {/* Show correct dashboard based on role */}
                            {(() => {
                              const user = JSON.parse(
                                localStorage.getItem("user")
                              );
                              const role = localStorage.getItem("userType");

                              switch (role) {
                                case "customer":
                                  return (
                                    <Link
                                      to="/customer/dashboard"
                                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                                      onClick={() => setLoginDropdown(false)}
                                    >
                                      <User className="w-4 h-4 text-gray-600" />
                                      <span className="text-sm text-gray-700">
                                        Customer Dashboard
                                      </span>
                                    </Link>
                                  );
                                case "seller":
                                  return (
                                    <Link
                                      to="/seller/dashboard"
                                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                                      onClick={() => setLoginDropdown(false)}
                                    >
                                      <Store className="w-4 h-4 text-gray-600" />
                                      <span className="text-sm text-gray-700">
                                        Seller Dashboard
                                      </span>
                                    </Link>
                                  );
                                case "admin":
                                  return (
                                    <Link
                                      to="/admin/dashboard"
                                      className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                                      onClick={() => setLoginDropdown(false)}
                                    >
                                      <User className="w-4 h-4 text-gray-600" />
                                      <span className="text-sm text-gray-700">
                                        Admin Panel
                                      </span>
                                    </Link>
                                  );
                                default:
                                  return null;
                              }
                            })()}

                            {/* Common links for all users */}
                            <Link
                              to="/Orders"
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                              onClick={() => setLoginDropdown(false)}
                            >
                              <Package className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-700">
                                Orders
                              </span>
                            </Link>

                            <Link
                              to="/Wishlist"
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                              onClick={() => setLoginDropdown(false)}
                            >
                              <Heart className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-700">
                                Wishlist
                              </span>
                            </Link>

                            <button
                              onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors w-full text-left"
                            >
                              <X className="w-4 h-4 text-red-500" />
                              <span className="text-sm text-red-500 font-medium">
                                Logout
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        /* ✅ IF NOT LOGGED IN */
                        <div className="absolute right-0 mt-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                          <div className="px-4 py-3 border-b">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">
                                New customer?
                              </span>
                              <Link
                                to="/CustomerRegistration"
                                className="text-sm font-semibold text-blue-600 px-2 py-1 rounded-md bg-blue-50/60 shadow-sm hover:bg-blue-100 hover:scale-[1.05] transition-all duration-200"
                                onClick={() => setLoginDropdown(false)}
                              >
                                Sign Up
                              </Link>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-700">
                                Existing customer?
                              </span>
                              <Link
                                to="/Login"
                                className="text-sm font-semibold text-green-600 px-2 py-1 rounded-md bg-green-50/60 shadow-sm hover:bg-green-100 hover:scale-[1.05] transition-all duration-200"
                                onClick={() => setLoginDropdown(false)}
                              >
                                Login
                              </Link>
                            </div>
                          </div>

                          <div className="border-t pt-1">
                            <Link
                              to="/SellerLogin"
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                              onClick={() => setLoginDropdown(false)}
                            >
                              <Store className="w-4 h-4 text-gray-600" />
                              <span className="text-sm text-gray-700">
                                Login as Seller
                              </span>
                            </Link>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <Link
                  to="/SellerRegistration"
                  className="flex items-center gap-1 px-2 xl:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-xs whitespace-nowrap"
                >
                  <Store className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline">Become a Seller</span>
                  <span className="xl:hidden">Seller</span>
                </Link>
              </div>

              {/* Mobile Icons */}
              <div className="flex lg:hidden items-center gap-1 sm:gap-2 flex-shrink-0">
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <Search className="w-5 h-5 text-gray-700" />
                </button>
                <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {cartCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 bg-orange-500 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-semibold">
                      {cartCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setMobileOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Menu className="w-5 h-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CATEGORY NAVBAR - Desktop only */}
        <div className="bg-white border-b shadow-sm hidden lg:block">
          <div className="max-w-8xl mx-auto px-4 sm:px-6">
            <div className="flex items-center h-12">
              <div className="flex items-center gap-4 xl:gap-6">
                {categories?.map((cat, index) => (
                  <div
                    key={cat._id}
                    className="relative"
                    onMouseEnter={() => handleCategoryMouseEnter(index)}
                    onMouseLeave={() => setActive(null)}
                  >
                    <button className="font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-1 text-sm whitespace-nowrap py-3 transition-colors">
                      {cat.name}
                      {cat.children?.length > 0 && (
                        <span className="text-gray-400 text-xs">▾</span>
                      )}
                    </button>

                    {active === index && cat.children?.length > 0 && (
                      <div
                        className="fixed left-0 right-0 z-[100] px-4 sm:px-6"
                        style={{ top: "112px" }}
                      >
                        <div className="max-w-7xl mx-auto">
                          <div className="bg-white shadow-2xl border rounded-lg p-6">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                              {cat.children.map((child) => (
                                <div key={child.name} className="min-w-0">
                                  <h3 className="text-blue-600 font-semibold mb-3 text-sm border-b pb-2">
                                    {child.name}
                                  </h3>
                                  <ul className="space-y-2">
                                    {child.products?.map((prod, i) => (
                                      <li key={i}>
                                        <a
                                          href="#"
                                          className="text-gray-700 text-sm hover:text-blue-600 hover:pl-2 transition-all block"
                                        >
                                          {prod}
                                        </a>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <HeroBanner slides={heroSlides} />

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-[60]"
            onClick={() => setMobileOpen(false)}
          />
          <div
            className="fixed left-0 top-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl z-[70] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b px-5 py-4 flex justify-between items-center z-10">
              <h2 className="text-lg font-bold text-gray-800">Menu</h2>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X size={22} />
              </button>
            </div>

{/* MOBILE LOGIN / ACCOUNT */}
<div className="p-4 border-b">
  {localStorage.getItem("authToken") ? (
    // ✅ User is logged in
    <div className="space-y-2">
      {/* Welcome */}
      <p className="text-sm font-medium text-gray-700">
        Welcome, {JSON.parse(localStorage.getItem("user"))?.name || "User"}!
      </p>

      {/* Dashboard links based on role */}
      {(() => {
        const role = localStorage.getItem("userType");
        switch (role) {
          case "customer":
            return (
              <Link
                to="/customer/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-4 h-4 text-gray-600" /> Customer Dashboard
              </Link>
            );
          case "seller":
            return (
              <Link
                to="/seller/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                <Store className="w-4 h-4 text-gray-600" /> Seller Dashboard
              </Link>
            );
          case "admin":
            return (
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                onClick={() => setMobileOpen(false)}
              >
                <User className="w-4 h-4 text-gray-600" /> Admin Panel
              </Link>
            );
          default:
            return null;
        }
      })()}

      {/* Common Links */}
      <Link
        to="/Orders"
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
        onClick={() => setMobileOpen(false)}
      >
        <Package className="w-4 h-4 text-gray-600" /> Orders
      </Link>

      <Link
        to="/Wishlist"
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
        onClick={() => setMobileOpen(false)}
      >
        <Heart className="w-4 h-4 text-gray-600" /> Wishlist
      </Link>

      {/* Logout */}
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        className="flex items-center gap-2 px-3 py-2 rounded hover:bg-red-50 text-red-600 w-full"
      >
        <X className="w-4 h-4" /> Logout
      </button>
    </div>
  ) : (
    // ✅ User NOT logged in
    <div className="space-y-2">
      <Link
        to="/CustomerRegistration"
        className="block px-3 py-2 rounded bg-blue-50 text-blue-600 text-center font-medium hover:bg-blue-100"
        onClick={() => setMobileOpen(false)}
      >
        Sign Up
      </Link>

      <Link
        to="/Login"
        className="block px-3 py-2 rounded bg-green-50 text-green-600 text-center font-medium hover:bg-green-100"
        onClick={() => setMobileOpen(false)}
      >
        Login
      </Link>

      <Link
        to="/SellerLogin"
        className="block px-3 py-2 rounded bg-gray-50 text-gray-700 text-center font-medium hover:bg-gray-100"
        onClick={() => setMobileOpen(false)}
      >
        Login as Seller
      </Link>
    </div>
  )}
</div>




{/* Categories - Mobile */}
<div className="p-4">
  <h3 className="font-bold text-gray-800 mb-3">Categories</h3>
  {categories?.map((cat, index) => (
    <div key={cat._id} className="mb-2">
      {/* Parent Category */}
      <button
        className="w-full flex justify-between items-center py-3 px-3 rounded-lg hover:bg-gray-50 font-semibold text-gray-800"
        onClick={() => setExpanded(expanded === index ? null : index)}
      >
        <span>{cat.name}</span>
        {cat.children?.length > 0 && (
          <span className="text-gray-400 text-sm">
            {expanded === index ? "▲" : "▼"}
          </span>
        )}
      </button>

      {/* Child Categories */}
      {expanded === index && cat.children?.length > 0 && (
        <div className="mt-2 pl-4 space-y-3">
          {cat.children.map((child) => (
            <div key={child.name}>
              <p className="text-blue-600 font-medium text-sm mb-1">{child.name}</p>
              <ul className="space-y-1 pl-2">
                {child.products?.map((prod, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-700 text-sm hover:text-blue-600 hover:pl-2 transition-all block"
                    >
                      {prod}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  ))}
</div>

          </div>
        </>
      )}
    </>
  );
}
