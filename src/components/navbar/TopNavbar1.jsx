import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../redux/categorySlice";
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
} from "lucide-react";

export default function TopNavbar() {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories);

  const [active, setActive] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [cartCount] = useState(3);
  const [wishlistCount] = useState(5);
  const [loginDropdown, setLoginDropdown] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sellerDropdown, setSellerDropdown] = useState(false);
  const [customerDropdown, setCustomerDropdown] = useState(false);

  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("authToken"); // <-- login state

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
      image:
        "https://images.unsplash.com/photo-1610832958506-aa56368176cf?w=1920&h=700&fit=crop&q=95&auto=format&sat=15&brightness=5",
      title: "Fresh Organic Vegetables",
      subtitle: "Farm to table goodness",
      cta: "Shop Now",
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=1920&h=700&fit=crop&q=95&auto=format",
      title: "Toys & Games for Kids",
      subtitle: "Endless fun and learning for your little ones",
      cta: "Explore Toys",
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
      {/* TOP NAVBAR */}
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
              </div>

              {/* Search */}
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
                {/* Cart */}
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
                {isLoggedIn && (
                  <div
                    className="relative"
                    onMouseEnter={handleLoginMouseEnter}
                    onMouseLeave={handleLoginMouseLeave}
                  >
                    <button className="flex flex-col items-center group px-1">
                      <User className="w-5 h-5 text-gray-700 group-hover:text-blue-600 transition-colors" />
                      <span className="text-xs text-gray-700 group-hover:text-blue-600 mt-0.5 flex items-center gap-0.5">
                        {/* Display user name instead of 'Account' */}
                        {localStorage.getItem("user")
                          ? JSON.parse(localStorage.getItem("user")).fullName
                          : "Account"}
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            loginDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    {loginDropdown && (
                      <div className="absolute right-0 mt-0 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                        <div className="py-1">
                          {/* Role-based dashboard */}
                          {(() => {
                            const role = localStorage.getItem("userType");
                            switch (role) {
                              case "customer":
                                return (
                                  <Link
                                    to="/CustomerDashboard"
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                                  >
                                    <User className="w-4 h-4 text-gray-600" />
                                    <span className="text-sm text-gray-700">
                                      My Profile
                                    </span>
                                  </Link>
                                );
                              case "seller":
                                return (
                                  <Link
                                    to="/seller/dashboard"
                                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
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

                          <Link
                            to="/Orders"
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
                          >
                            <Package className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">
                              Orders
                            </span>
                          </Link>

                          <Link
                            to="/Wishlist"
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-blue-50 transition-colors"
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
                            className="flex items-center gap-3 px-4 py-2.5 hover:bg-red-50 transition-colors w-full text-left text-red-500 font-medium"
                          >
                            <X className="w-4 h-4" /> Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Show Customer & Seller only if NOT logged in */}
                {!isLoggedIn && (
                  <>
                    {/* CUSTOMER DROPDOWN */}
                    <div
                      className="relative"
                      onMouseEnter={() => setCustomerDropdown(true)}
                      onMouseLeave={() => setCustomerDropdown(false)}
                    >
                      <button className="flex items-center gap-1 px-2 xl:px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-semibold text-xs whitespace-nowrap group">
                        <User className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">Customer</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            customerDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {customerDropdown && (
                        <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                          <div className="px-4 py-3 border-b">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">
                                New Customer?
                              </span>
                              <Link
                                to="/CustomerRegistration"
                                className="text-sm font-semibold text-green-600 px-2 py-1 rounded-md bg-green-50 shadow-sm hover:bg-green-100"
                              >
                                Sign Up
                              </Link>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-700">
                                Existing Customer?
                              </span>
                              <Link
                                to="/Login"
                                className="text-sm font-semibold text-blue-600 px-2 py-1 rounded-md bg-blue-50 shadow-sm hover:bg-blue-100"
                              >
                                Login
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* SELLER DROPDOWN */}
                    <div
                      className="relative"
                      onMouseEnter={() => setSellerDropdown(true)}
                      onMouseLeave={() => setSellerDropdown(false)}
                    >
                      <button className="flex items-center gap-1 px-2 xl:px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold text-xs whitespace-nowrap group">
                        <Store className="w-3.5 h-3.5" />
                        <span className="hidden xl:inline">Seller</span>
                        <ChevronDown
                          className={`w-3 h-3 transition-transform duration-200 ${
                            sellerDropdown ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {sellerDropdown && (
                        <div className="absolute right-0 mt-1 w-64 bg-white border border-gray-200 rounded-lg shadow-xl py-2 z-50">
                          <div className="px-4 py-3 border-b">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-700">
                                New Seller?
                              </span>
                              <Link
                                to="/SellerRegistration"
                                className="text-sm font-semibold text-blue-600 px-2 py-1 rounded-md bg-blue-50 shadow-sm hover:bg-blue-100"
                              >
                                Sign Up
                              </Link>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-sm text-gray-700">
                                Existing Seller?
                              </span>
                              <Link
                                to="/SellerLogin"
                                className="text-sm font-semibold text-green-600 px-2 py-1 rounded-md bg-green-50 shadow-sm hover:bg-green-100"
                              >
                                Login
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
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
            <div className="flex items-center h-12 gap-4 xl:gap-6">
              {categories?.map((cat, index) => (
                <div
                  key={cat._id}
                  className="relative"
                  onMouseEnter={() => handleCategoryMouseEnter(index)}
                  onMouseLeave={() => setActive(null)}
                >
                  <button className="font-semibold text-gray-700 hover:text-blue-600 flex items-center gap-1 text-sm whitespace-nowrap py-3 transition-colors">
                    {cat.name}{" "}
                    {cat.children?.length > 0 && (
                      <span className="text-gray-400 text-xs">▾</span>
                    )}
                  </button>

                  {active === index && cat.children?.length > 0 && (
                    <div
                      className="fixed left-0 right-0 z-[100] px-4 sm:px-6"
                      style={{ top: "112px" }}
                    >
                      <div className="max-w-7xl mx-auto bg-white shadow-2xl border rounded-lg p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO BANNER - only show if user is NOT logged in */}
      {!isLoggedIn && <HeroBanner slides={heroSlides} />}
    </>
  );
}
