import React, { useState, useEffect } from "react";
import {
  Plus,
  X,
  Edit,
  Trash2,
  Camera,
  Eye,
  Star,
  Package,
  Truck,
} from "lucide-react";
import axiosInstance from "../api/axios";
import { fetchCategories } from "../redux/categorySlice";
import { useDispatch, useSelector } from "react-redux";

// ✅ CLEAN INITIAL PRODUCT STATE (NO Hooks inside)
const initialProductState = {
  name: "",
  categories: [],
  price: "",
  stock: "",
  description: "",
  discount: "",
  sizes: [],
  buyList: [],
  deliveryOptions: {
    freeDelivery: false,
    withExchange: false,
    withoutExchange: true,
  },
  color: "",
  material: "",
  compatibleModels: "",
  netQuantity: "1",
  theme: "",
  type: "",
  countryOfOrigin: "India",
  images: [],
};

export default function AddProduct() {
  const [activeTab, setActiveTab] = useState("products");
  const [products, setProducts] = useState([]);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCustomerView, setShowCustomerView] = useState(false);

  const dispatch = useDispatch();

  const { data: categories } = useSelector((state) => state.categories);

  const [newProduct, setNewProduct] = useState(initialProductState);

  // --------------------------------------------------
  // FETCH CATEGORIES FROM DATABASE
  // --------------------------------------------------
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  // --------------------------------------------------
  // HANDLE INPUT
  // --------------------------------------------------
  const handleInput = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setNewProduct((prev) => ({
        ...prev,
        deliveryOptions: { ...prev.deliveryOptions, [name]: checked },
      }));
      return;
    }

    if (name === "category") {
      setNewProduct((prev) => ({ ...prev, categories: [value] }));
      return;
    }

    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // --------------------------------------------------
  // IMAGE UPLOAD
  // --------------------------------------------------
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files],
    }));
  };

  // --------------------------------------------------
  // ADD PRODUCT
  // --------------------------------------------------
  const handleAddProduct = async () => {
    if (
      !newProduct.name ||
      !newProduct.categories.length ||
      !newProduct.price
    ) {
      alert("Please fill all required fields");
      return;
    }

    const sellerId = localStorage.getItem("sellerId");

    const formData = new FormData();
    Object.keys(newProduct).forEach((key) => {
      if (key === "images") {
        newProduct.images.forEach((img) => formData.append("images", img));
      } else if (key === "categories") {
        formData.append("categories", JSON.stringify(newProduct.categories));
      } else if (typeof newProduct[key] === "object") {
        formData.append(key, JSON.stringify(newProduct[key]));
      } else {
        formData.append(key, newProduct[key]);
      }
    });

    formData.append("sellerId", sellerId);

    try {
      const { data } = await axiosInstance.post("/products/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        alert("Product Added!");
        setProducts((p) => [...p, data.product]);
        setNewProduct(initialProductState);
        setShowAddProduct(false);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add product");
    }
  };

  // --------------------------------------------------
  // JSX
  // --------------------------------------------------
  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={() => setShowAddProduct(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl"
        >
          <Plus /> Add Product
        </button>
      </div>

      {/* ADD PRODUCT FORM */}
      {showAddProduct && (
        <div className="bg-white shadow p-6 rounded-xl">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-semibold">Add New Product</h2>
            <X
              className="cursor-pointer"
              onClick={() => setShowAddProduct(false)}
            />
          </div>

          {/* NAME & CATEGORY */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-medium">Product Name</label>
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInput}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label className="font-medium">Category</label>
              <select
                name="category"
                value={newProduct.categories[0] || ""}
                onChange={handleInput}
                className="w-full p-2 border rounded"
              >
                <option value="">Select Category</option>

                {categories?.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* PRICE & STOCK */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="font-medium">Price</label>
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInput}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="font-medium">Stock</label>
              <input
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInput}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mt-4">
            <label className="font-medium">Description</label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleInput}
              className="w-full p-2 border rounded"
            />
          </div>

          {/* IMAGE UPLOAD */}
          <div className="mt-4">
            <label className="font-medium">Images</label>
            <input type="file" multiple onChange={handleImageUpload} />
            <div className="flex gap-2 mt-3">
              {newProduct.images.map((img, idx) => (
                <img
                  key={idx}
                  src={URL.createObjectURL(img)}
                  className="w-20 h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>

          {/* SUBMIT */}
          <button
            onClick={handleAddProduct}
            className="mt-4 px-6 py-2 bg-purple-600 text-white rounded"
          >
            Add Product
          </button>
        </div>
      )}
    </div>
  );
}
