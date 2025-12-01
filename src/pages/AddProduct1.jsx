import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  Edit,
  Trash2,
  Upload,
  Star,
  ShoppingCart,
  Truck,
  Package,
  Camera,
} from "lucide-react";
import axiosInstance from "../api/axios";

const initialNewProductState = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCustomerView, setShowCustomerView] = useState(false);
  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategoriesList(res.data.categories);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const initialNewProductState = {
    name: "",
    categories: [], // ALWAYS array
    price: 0,
    stock: 0,
    description: "",
    buyList: [],
    sizes: [],
    deliveryOptions: {
      freeDelivery: false,
      withExchange: false,
      withoutExchange: false,
    },
    images: [], // (fix image upload too)
    status: "Active",
    discount: 0,
    color: "",
    material: "",
    compatibleModels: "",
    theme: "",
    type: "",
    netQuantity: "1",
    countryOfOrigin: "India",
  };

  const [newProduct, setNewProduct] = useState(initialNewProductState);

  const [customerOrder, setCustomerOrder] = useState({
    selectedSize: "",
    exchangeOption: "withoutExchange",
    deliveryOption: "standard",
    quantity: 1,
  });

  const [customerReview, setCustomerReview] = useState({
    rating: 0,
    comment: "",
    images: [],
  });

  const sizes = ["S", "M", "L", "XL", "One Size"];
  const buyListOptions = [
    "Featured",
    "Trending",
    "New Arrival",
    "Best Seller",
    "Deal of the Day",
  ];

  const handleProductInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    // Handle checkboxes separately
    if (type === "checkbox") {
      setNewProduct((prev) => ({
        ...prev,
        deliveryOptions: {
          ...prev.deliveryOptions,
          [name]: checked,
        },
      }));
    } else if (name === "category" || name === "categories") {
      setNewProduct((prev) => ({
        ...prev,
        categories: [value],
      }));
    } else {
      setNewProduct((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Sizes toggle
  const handleSizeToggle = (size) => {
    const updateTarget = editingProduct ? editingProduct : newProduct;
    const setTarget = editingProduct ? setEditingProduct : setNewProduct;

    const sizes = updateTarget.sizes.includes(size)
      ? updateTarget.sizes.filter((s) => s !== size)
      : [...updateTarget.sizes, size];

    setTarget({ ...updateTarget, sizes });
  };

  // BuyList toggle
  const handleBuyListToggle = (tag) => {
    const updateTarget = editingProduct ? editingProduct : newProduct;
    const setTarget = editingProduct ? setEditingProduct : setNewProduct;

    const buyList = updateTarget.buyList.includes(tag)
      ? updateTarget.buyList.filter((t) => t !== tag)
      : [...updateTarget.buyList, tag];

    setTarget({ ...updateTarget, buyList });
  };

  const handleProductImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const updateTarget = editingProduct ? editingProduct : newProduct;
    const setTarget = editingProduct ? setEditingProduct : setNewProduct;

    setTarget({
      ...updateTarget,
      images: [...(updateTarget.images || []), ...files],
    });
  };

  const handleReviewImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setCustomerReview({
      ...customerReview,
      images: [...customerReview.images, ...files],
    });
  };

  const handleAddProduct = async () => {
    try {
      // Validate required fields
      if (
        !newProduct.name ||
        !newProduct.categories?.length ||
        !newProduct.price ||
        !newProduct.stock
      ) {
        alert("Please fill all required fields");
        return;
      }

      // Include sellerId from logged-in seller
      const sellerId = localStorage.getItem("sellerId");

      const payload = {
        ...newProduct,
        sellerId,
      };

      console.log("Adding product:", payload);

      const { data } = await axiosInstance.post("/products/add", payload);

      if (data.success) {
        alert("Product added successfully!");
        setProducts((prev) => [...prev, data.product]); // Update product list
        setNewProduct(initialNewProductState); // reset form
        setShowAddProduct(false);
      }
    } catch (err) {
      console.error(err);
      alert("Error adding product: " + err.message);
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
    setShowAddProduct(false);
  };

  const handleUpdateProduct = () => {
    // your API call to update product
    console.log("Updating product:", editingProduct);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowAddProduct(false);
  };

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowCustomerView(true);
    setCustomerOrder({
      selectedSize: "",
      exchangeOption: "withoutExchange",
      deliveryOption: "standard",
      quantity: 1,
    });
  };

  const handleSubmitReview = () => {
    if (!customerReview.rating || !customerReview.comment) {
      alert("Please provide rating and comment");
      return;
    }

    const review = {
      ...customerReview,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      customerName: "Customer",
    };

    const updatedProduct = {
      ...selectedProduct,
      reviews: [...(selectedProduct.reviews || []), review],
      rating: calculateAverageRating([
        ...(selectedProduct.reviews || []),
        review,
      ]),
    };

    setProducts(
      products.map((p) => (p.id === selectedProduct.id ? updatedProduct : p))
    );
    setSelectedProduct(updatedProduct);
    setCustomerReview({ rating: 0, comment: "", images: [] });
    alert("Review submitted successfully!");
  };

  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  const calculateDiscountedPrice = (price, discount) => {
    if (!discount) return price;
    return (price - (price * discount) / 100).toFixed(2);
  };

  const StarRating = ({ rating, onRate, readOnly = false }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            } ${!readOnly ? "cursor-pointer" : ""}`}
            onClick={() => !readOnly && onRate && onRate(star)}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-10">
      <div className="max-w-10xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-3xl font-bold text-white">
              {" "}
              Product Management
            </h1>
            <p className="text-blue-100 mt-2">
              Manage your products and view customer interactions
            </p>
          </div>

          {/* Navigation */}
          <div className="bg-white border-b border-gray-200 px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => {
                  setActiveTab("products");
                  setShowCustomerView(false);
                }}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === "products"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => {
                  setActiveTab("customer");
                  setShowCustomerView(false);
                }}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === "customer"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Customer View
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Products Tab */}
            {activeTab === "products" && !showCustomerView && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Your Products
                  </h2>
                  <button
                    onClick={() => setShowAddProduct(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md"
                  >
                    <Plus className="w-5 h-5" />
                    <span>AddProduct</span>
                  </button>
                </div>

                {/* Add/Edit Product Form */}
                {(showAddProduct || editingProduct) && (
                  <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-800">
                        {editingProduct ? "Edit Product" : "Add New Product"}
                      </h3>
                      <button
                        onClick={handleCancelEdit}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">
                          Basic Information
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Product Title *
                            </label>
                            <input
                              type="text"
                              name="title"
                              value={
                                editingProduct
                                  ? editingProduct.title
                                  : newProduct.title
                              }
                              onChange={handleProductInputChange}
                              placeholder="e.g., Apple iPhone 15 Back Cover"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Category *
                            </label>
                            <select
                              value={newProduct.categories[0] || ""}
                              onChange={(e) =>
                                setNewProduct({
                                  ...newProduct,
                                  categories: [e.target.value],
                                })
                              }
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg"
                            >
                              <option value="">Select Category</option>

                              {categoriesList.map((cat) => (
                                <option key={cat._id} value={cat.name}>
                                  {cat.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Inventory */}
                      <div>
                        <h4 className="text-lg font-semibold text-gray-700 mb-4">
                          Pricing & Inventory
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Price (₹) *
                            </label>
                            <input
                              type="number"
                              name="price"
                              value={
                                editingProduct
                                  ? editingProduct.price
                                  : newProduct.price
                              }
                              onChange={handleProductInputChange}
                              placeholder="0.00"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Discount (%)
                            </label>
                            <input
                              type="number"
                              name="discount"
                              value={
                                editingProduct
                                  ? editingProduct.discount
                                  : newProduct.discount
                              }
                              onChange={handleProductInputChange}
                              placeholder="0"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Stock Quantity *
                            </label>
                            <input
                              type="number"
                              name="stock"
                              value={
                                editingProduct
                                  ? editingProduct.stock
                                  : newProduct.stock
                              }
                              onChange={handleProductInputChange}
                              placeholder="0"
                              className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Sizes */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Available Sizes
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {sizes.map((size, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleSizeToggle(size)}
                              className={`w-12 h-12 rounded-lg text-sm font-medium transition-all ${
                                (editingProduct
                                  ? editingProduct.sizes
                                  : newProduct.sizes
                                )?.includes(size)
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Buy List */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Buy List Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {buyListOptions.map((option, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => handleBuyListToggle(option)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                (editingProduct
                                  ? editingProduct.buyList
                                  : newProduct.buyList
                                )?.includes(option)
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                              }`}
                            >
                              {option}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          name="description"
                          value={
                            editingProduct
                              ? editingProduct.description
                              : newProduct.description
                          }
                          onChange={handleProductInputChange}
                          placeholder="Describe your product in detail..."
                          rows="4"
                          className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                      </div>

                      {/* Product Images */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Product Images
                        </label>
                        <input
                          type="file"
                          multiple
                          onChange={handleProductImageUpload}
                          accept="image/*"
                          className="w-full"
                        />
                        {((editingProduct &&
                          editingProduct.images?.length > 0) ||
                          newProduct.images?.length > 0) && (
                          <div className="flex gap-2 mt-2 overflow-x-auto">
                            {(editingProduct
                              ? editingProduct.images
                              : newProduct.images
                            ).map((img, idx) => (
                              <img
                                key={idx}
                                src={URL.createObjectURL(img)}
                                className="w-24 h-24 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex space-x-4 pt-4">
                        <button
                          onClick={
                            editingProduct
                              ? handleUpdateProduct
                              : handleAddProduct
                          }
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-md font-semibold"
                        >
                          {editingProduct ? "Update Product" : "Confirm"}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg border border-gray-300 font-semibold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Products List */}
                <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden mt-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                            Product
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                            Category
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                            Price
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                            Stock
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                            Status
                          </th>
                          <th className="text-left py-4 px-6 text-sm font-semibold text-gray-600">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length === 0 ? (
                          <tr>
                            <td
                              colSpan="6"
                              className="py-8 text-center text-gray-500"
                            >
                              No products added yet.
                            </td>
                          </tr>
                        ) : (
                          products.map((product) => (
                            <tr
                              key={product._id}
                              className="border-b border-gray-100 hover:bg-gray-50"
                            >
                              <td className="py-4 px-6 flex items-center gap-2">
                                {product.images?.[0] ? (
                                  <img
                                    src={product.images[0]}
                                    className="w-12 h-12 object-cover rounded"
                                  />
                                ) : (
                                  <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-gray-500">
                                    N/A
                                  </div>
                                )}
                                <p className="text-sm font-medium text-gray-800">
                                  {product.title}
                                </p>
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-600">
                                {product.categories?.join(", ")}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-800">
                                ₹
                                {product.price -
                                  (product.price * (product.discount || 0)) /
                                    100}
                              </td>
                              <td className="py-4 px-6 text-sm text-gray-800">
                                {product.stock}
                              </td>
                              <td className="py-4 px-6">
                                <span
                                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                                    product.approvalStatus === "Approved"
                                      ? "bg-green-100 text-green-700"
                                      : product.approvalStatus === "Rejected"
                                      ? "bg-red-100 text-red-700"
                                      : "bg-yellow-100 text-yellow-700"
                                  }`}
                                >
                                  {product.approvalStatus}
                                </span>
                              </td>
                              <td className="py-4 px-6 flex gap-2">
                                <button
                                  onClick={() => handleViewProduct(product)}
                                  className="p-2 hover:bg-blue-50 rounded-lg"
                                >
                                  <Eye className="w-4 h-4 text-blue-600" />
                                </button>
                                <button
                                  onClick={() => handleEditProduct(product)}
                                  className="p-2 hover:bg-purple-50 rounded-lg"
                                >
                                  <Edit className="w-4 h-4 text-purple-600" />
                                </button>
                                <button
                                  onClick={() =>
                                    handleDeleteProduct(product._id)
                                  }
                                  className="p-2 hover:bg-red-50 rounded-lg"
                                >
                                  <Trash2 className="w-4 h-4 text-red-600" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Customer View */}
            {(activeTab === "customer" || showCustomerView) && (
              <div className="space-y-6">
                {!selectedProduct ? (
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">
                      Browse Products
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products
                        .filter((p) => p.status === "Active")
                        .map((product) => (
                          <div
                            key={product.id}
                            className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow"
                          >
                            <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                              <Package className="w-20 h-20 text-gray-400" />
                            </div>
                            <div className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="text-lg font-bold text-gray-800">
                                  {product.name}
                                </h3>
                                {product.discount && (
                                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                                    {product.discount}% OFF
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-gray-600 mb-2">
                                {product.category}
                              </p>
                              {product.buyList?.length > 0 && (
                                <div className="flex flex-wrap gap-1 mb-3">
                                  {product.buyList.map((tag, idx) => (
                                    <span
                                      key={idx}
                                      className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                              <div className="flex items-center space-x-2 mb-3">
                                <StarRating
                                  rating={Math.round(product.rating)}
                                  readOnly
                                />
                                <span className="text-sm text-gray-600">
                                  ({product.reviews?.length || 0} reviews)
                                </span>
                              </div>
                              <div className="flex items-center justify-between mb-4">
                                <div>
                                  <p className="text-2xl font-bold text-gray-800">
                                    ₹
                                    {calculateDiscountedPrice(
                                      product.price,
                                      product.discount
                                    )}
                                  </p>
                                  {product.discount && (
                                    <p className="text-sm text-gray-500 line-through">
                                      ₹{product.price}
                                    </p>
                                  )}
                                </div>
                                {product.deliveryOptions?.freeDelivery && (
                                  <div className="flex items-center text-green-600 text-xs">
                                    <Truck className="w-4 h-4 mr-1" />
                                    Free Delivery
                                  </div>
                                )}
                              </div>
                              <button
                                onClick={() => handleViewProduct(product)}
                                className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-semibold transition-all"
                              >
                                View Details
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                ) : (
                  <div>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setShowCustomerView(false);
                      }}
                      className="mb-6 flex items-center text-blue-600 hover:text-blue-700 font-medium"
                    >
                      ← Back to Products
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Product Images */}
                      <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4">
                          <Package className="w-32 h-32 text-gray-400" />
                        </div>
                      </div>

                      {/* Product Details */}
                      <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                                {selectedProduct.name}
                              </h1>
                              <div className="flex items-center space-x-4">
                                <StarRating
                                  rating={Math.round(selectedProduct.rating)}
                                  readOnly
                                />
                                <span className="text-sm text-gray-600">
                                  {selectedProduct.rating || "0.0"} (
                                  {selectedProduct.reviews?.length || 0}{" "}
                                  reviews)
                                </span>
                              </div>
                            </div>
                            {selectedProduct.discount && (
                              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                                {selectedProduct.discount}% OFF
                              </span>
                            )}
                          </div>

                          <div className="border-t border-gray-200 pt-4 mb-4">
                            <div className="flex items-baseline space-x-3 mb-2">
                              <p className="text-4xl font-bold text-gray-800">
                                ₹
                                {calculateDiscountedPrice(
                                  selectedProduct.price,
                                  selectedProduct.discount
                                )}
                              </p>
                              {selectedProduct.discount && (
                                <p className="text-xl text-gray-500 line-through">
                                  ₹{selectedProduct.price}
                                </p>
                              )}
                            </div>
                            {selectedProduct.buyList?.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {selectedProduct.buyList.map((tag, idx) => (
                                  <span
                                    key={idx}
                                    className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="space-y-4 mb-6">
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-gray-600">Color</p>
                                <p className="font-semibold text-gray-800">
                                  {selectedProduct.color || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Material</p>
                                <p className="font-semibold text-gray-800">
                                  {selectedProduct.material || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">
                                  Compatible Models
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {selectedProduct.compatibleModels || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Net Quantity</p>
                                <p className="font-semibold text-gray-800">
                                  {selectedProduct.netQuantity}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Theme</p>
                                <p className="font-semibold text-gray-800">
                                  {selectedProduct.theme || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">Type</p>
                                <p className="font-semibold text-gray-800">
                                  {selectedProduct.type || "N/A"}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">
                                  Country of Origin
                                </p>
                                <p className="font-semibold text-gray-800">
                                  {selectedProduct.countryOfOrigin}
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-600">In Stock</p>
                                <p className="font-semibold text-green-600">
                                  {selectedProduct.stock} units
                                </p>
                              </div>
                            </div>
                          </div>

                          {selectedProduct.description && (
                            <div className="mb-6">
                              <h3 className="text-lg font-bold text-gray-800 mb-2">
                                Description
                              </h3>
                              <p className="text-gray-600">
                                {selectedProduct.description}
                              </p>
                            </div>
                          )}

                          {/* Size Selection */}
                          {selectedProduct.sizes?.length > 0 && (
                            <div className="mb-6">
                              <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Select Size
                              </label>
                              <div className="flex flex-wrap gap-2">
                                {selectedProduct.sizes.map((size, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() =>
                                      setCustomerOrder({
                                        ...customerOrder,
                                        selectedSize: size,
                                      })
                                    }
                                    className={`w-12 h-12 rounded-lg font-medium transition-all ${
                                      customerOrder.selectedSize === size
                                        ? "bg-purple-600 text-white"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                                  >
                                    {size}
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Delivery Options */}
                          <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                              Delivery Options
                            </label>
                            <div className="space-y-2">
                              {selectedProduct.deliveryOptions
                                ?.withExchange && (
                                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                  <input
                                    type="radio"
                                    name="exchangeOption"
                                    value="withExchange"
                                    checked={
                                      customerOrder.exchangeOption ===
                                      "withExchange"
                                    }
                                    onChange={(e) =>
                                      setCustomerOrder({
                                        ...customerOrder,
                                        exchangeOption: e.target.value,
                                      })
                                    }
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <span className="text-gray-700">
                                    With Exchange
                                  </span>
                                </label>
                              )}
                              {selectedProduct.deliveryOptions
                                ?.withoutExchange && (
                                <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                                  <input
                                    type="radio"
                                    name="exchangeOption"
                                    value="withoutExchange"
                                    checked={
                                      customerOrder.exchangeOption ===
                                      "withoutExchange"
                                    }
                                    onChange={(e) =>
                                      setCustomerOrder({
                                        ...customerOrder,
                                        exchangeOption: e.target.value,
                                      })
                                    }
                                    className="w-4 h-4 text-blue-600"
                                  />
                                  <span className="text-gray-700">
                                    Without Exchange
                                  </span>
                                </label>
                              )}
                              {selectedProduct.deliveryOptions
                                ?.freeDelivery && (
                                <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                                  <Truck className="w-5 h-5 text-green-600" />
                                  <span className="text-green-700 font-medium">
                                    Free Delivery Available
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Buy Now Button */}
                          <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg font-bold text-lg transition-all shadow-lg">
                            Buy Now
                          </button>
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                          <h2 className="text-2xl font-bold text-gray-800 mb-6">
                            Customer Reviews
                          </h2>

                          {/* Write Review */}
                          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4">
                              Write a Review
                            </h3>
                            <div className="space-y-4">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Your Rating
                                </label>
                                <StarRating
                                  rating={customerReview.rating}
                                  onRate={(rating) =>
                                    setCustomerReview({
                                      ...customerReview,
                                      rating,
                                    })
                                  }
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Your Review
                                </label>
                                <textarea
                                  value={customerReview.comment}
                                  onChange={(e) =>
                                    setCustomerReview({
                                      ...customerReview,
                                      comment: e.target.value,
                                    })
                                  }
                                  placeholder="Share your experience with this product..."
                                  rows="4"
                                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                ></textarea>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Upload Images (Optional)
                                </label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center bg-white hover:bg-gray-50 transition-colors">
                                  <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                  <input
                                    type="file"
                                    onChange={handleReviewImageUpload}
                                    accept="image/*"
                                    multiple
                                    className="hidden"
                                    id="reviewImages"
                                  />
                                  <label
                                    htmlFor="reviewImages"
                                    className="cursor-pointer"
                                  >
                                    <span className="text-blue-600 hover:text-blue-700 text-sm">
                                      Click to upload images
                                    </span>
                                  </label>
                                  {customerReview.images.length > 0 && (
                                    <p className="text-green-600 mt-2 text-sm">
                                      {customerReview.images.length} image(s)
                                      selected
                                    </p>
                                  )}
                                </div>
                              </div>
                              <button
                                onClick={handleSubmitReview}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                              >
                                Submit Review
                              </button>
                            </div>
                          </div>

                          {/* Display Reviews */}
                          <div className="space-y-4">
                            {selectedProduct.reviews?.length === 0 ? (
                              <p className="text-center text-gray-500 py-8">
                                No reviews yet. Be the first to review!
                              </p>
                            ) : (
                              selectedProduct.reviews?.map((review) => (
                                <div
                                  key={review.id}
                                  className="border border-gray-200 rounded-lg p-4"
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                                        {review.customerName[0]}
                                      </div>
                                      <div>
                                        <p className="font-semibold text-gray-800">
                                          {review.customerName}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                          {review.date}
                                        </p>
                                      </div>
                                    </div>
                                    <StarRating
                                      rating={review.rating}
                                      readOnly
                                    />
                                  </div>
                                  <p className="text-gray-700 mb-3">
                                    {review.comment}
                                  </p>
                                  {review.images?.length > 0 && (
                                    <div className="flex gap-2">
                                      {review.images.map((img, idx) => (
                                        <div
                                          key={idx}
                                          className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center"
                                        >
                                          <Camera className="w-8 h-8 text-gray-400" />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default initialNewProductState;
