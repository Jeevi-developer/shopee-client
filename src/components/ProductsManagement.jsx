import React, { useEffect, useState } from "react";
import {
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  Loader2,
} from "lucide-react";
import adminService from "../api/adminService";

export default function ProductsManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [search, setSearch] = useState("");
  const [actionModal, setActionModal] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ============================
  // FETCH PRODUCTS
  // ============================
  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await adminService.listProducts({ search, status: statusFilter });
      setProducts(data.products || []);
    } catch (err) {
      console.error("Load products error:", err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadProducts();
  }, [statusFilter]);

  // ============================
  // HANDLE APPROVE / REJECT
  // ============================
  const handleAction = async (productId, action, reason = "") => {
    try {
      await adminService.approveProduct(productId, action, reason);
      setActionModal(null);
      loadProducts();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Products Management</h2>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow p-4 mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg w-full md:w-1/3">
          <Search size={18} className="text-gray-500" />
          <input
            type="text"
            placeholder="Search by product title..."
            className="bg-transparent ml-2 flex-1 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadProducts()}
          />
        </div>

        <select
          className="bg-gray-100 px-4 py-2 rounded-lg"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <button
          onClick={loadProducts}
          className="bg-purple-600 text-white px-6 py-2 rounded-lg shadow hover:bg-purple-700"
        >
          <Filter size={18} className="inline mr-2" /> Apply
        </button>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-xl shadow p-6">
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-purple-600" size={32} />
          </div>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500 py-10">No products found</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b">
                  <th className="p-3">Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Seller</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr className="border-b hover:bg-gray-50" key={product._id}>
                    <td className="p-3 flex items-center gap-3">
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
                      <div>
                        <p className="font-semibold">{product.title}</p>
                      </div>
                    </td>

                    <td className="p-3">{product.categories?.join(", ")}</td>
                    <td className="p-3">{product.sellerInfo?.businessName || "N/A"}</td>
                    <td className="p-3">₹{product.price}</td>

                    <td className="p-3 font-semibold">
                      {product.approvalStatus === "Pending" && (
                        <span className="text-yellow-600">Pending</span>
                      )}
                      {product.approvalStatus === "Approved" && (
                        <span className="text-green-600">Approved</span>
                      )}
                      {product.approvalStatus === "Rejected" && (
                        <span className="text-red-600">Rejected</span>
                      )}
                    </td>

                    <td className="p-3 text-right flex gap-2 justify-end">
                      <button
                        className="text-blue-600 hover:underline"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Eye size={20} />
                      </button>

                      {product.approvalStatus === "Pending" && (
                        <>
                          <button
                            className="text-green-600 hover:underline"
                            onClick={() =>
                              setActionModal({ product, action: "approve" })
                            }
                          >
                            <CheckCircle size={20} />
                          </button>

                          <button
                            className="text-red-600 hover:underline"
                            onClick={() =>
                              setActionModal({ product, action: "reject" })
                            }
                          >
                            <XCircle size={20} />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Approve / Reject Modal */}
      {actionModal && (
        <ActionModal
          data={actionModal}
          onClose={() => setActionModal(null)}
          onSubmit={handleAction}
        />
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductPreviewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}

// ======================================================
// ACTION MODAL
// ======================================================
function ActionModal({ data, onClose, onSubmit }) {
  const { product, action } = data;
  const [reason, setReason] = useState("");

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow p-6 w-full max-w-md">
        <h3 className="text-xl font-bold mb-3 capitalize">
          {action} Product — {product.title}
        </h3>

        {action === "reject" && (
          <textarea
            rows="3"
            className="w-full bg-gray-100 p-3 rounded-lg"
            placeholder="Reason for rejection..."
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded-lg"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={`px-4 py-2 rounded-lg text-white ${
              action === "approve" ? "bg-green-600" : "bg-red-600"
            }`}
            onClick={() => onSubmit(product._id, action, reason)}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

// ======================================================
// PRODUCT PREVIEW MODAL
// ======================================================
function ProductPreviewModal({ product, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl shadow">
        <h3 className="text-2xl font-bold mb-4">{product.title}</h3>

        {product.images?.length > 0 && (
          <div className="flex gap-2 overflow-x-auto mb-4">
            {product.images.map((img, idx) => (
              <img key={idx} src={img} className="w-48 h-48 object-cover rounded" />
            ))}
          </div>
        )}

        <p className="text-gray-700 mb-2">
          <strong>Category:</strong> {product.categories?.join(", ") || "N/A"}
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Price:</strong> ₹{product.price}
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Description:</strong> {product.description || "N/A"}
        </p>

        <p className="text-gray-700 mb-2">
          <strong>Seller:</strong> {product.sellerInfo?.businessName || "N/A"}
        </p>

        <button
          className="mt-4 bg-purple-600 text-white px-5 py-2 rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}
