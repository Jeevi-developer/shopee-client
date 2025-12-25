import React, { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  CreditCard,
  Package,
  DollarSign,
  ShoppingCart,
  Eye,
  Trash2,
  Ban,
  CheckCircle,
} from "lucide-react";
import axiosInstance from "../../api/axios"; // ✅ Import your axios instance

export default function CustomersManagement() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    suspended: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });
  const [actionLoading, setActionLoading] = useState(false);

  // ✅ Fetch customers from API using axios
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit,
        ...(search && { search }),
        ...(statusFilter &&
          statusFilter !== "All" && { status: statusFilter.toLowerCase() }),
      };

      const response = await axiosInstance.get("/admin/customers/list", {
        params,
      });

      if (response.data.success) {
        setCustomers(response.data.customers || []);
        setTotal(response.data.total || 0);
      } else {
        console.error("Failed to fetch customers:", response.data.message);
      }
    } catch (err) {
      console.error("Error fetching customers:", err);
      alert(err.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch customer stats using axios
  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get("/admin/customers/stats");

      if (response.data.success) {
        setStats(response.data.stats);
      }
    } catch (err) {
      console.warn("Stats error:", err);
    }
  };

  // Fetch data on mount and when filters change
  useEffect(() => {
    fetchCustomers();
    fetchStats();
    window.scrollTo(0, 0);
  }, [page, statusFilter]);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchCustomers();
  };

  // ✅ View customer details using axios
  const viewCustomer = async (id) => {
    try {
      const response = await axiosInstance.get(`/admin/customers/${id}`);

      if (response.data.success) {
        setSelectedCustomer(response.data.customer);
        setShowModal(true);
      } else {
        alert("Failed to fetch customer details");
      }
    } catch (err) {
      console.error("Error fetching customer:", err);
      alert(err.message || "Failed to fetch customer details");
    }
  };

  // ✅ Update customer status using axios
  const handleStatusChange = async (customerId, newStatus) => {
    const reason =
      newStatus === "suspended"
        ? prompt("Reason for suspension (optional)")
        : undefined;

    setActionLoading(true);
    try {
      const response = await axiosInstance.put(
        `/admin/customers/${customerId}/status`,
        {
          status: newStatus,
          reason: reason || "Status updated by admin",
        }
      );

      if (response.data.success) {
        alert(`Customer ${newStatus} successfully!`);
        await fetchCustomers();
        await fetchStats();
      } else {
        alert(response.data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert(error.message || "Error updating customer status");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Delete customer using axios
  const handleDelete = async (customerId) => {
    if (
      !confirm(
        "Are you sure you want to delete this customer? This action cannot be undone."
      )
    ) {
      return;
    }

    setActionLoading(true);
    try {
      const response = await axiosInstance.delete(
        `/admin/customers/${customerId}`
      );

      if (response.data.success) {
        alert("Customer deleted successfully!");
        await fetchCustomers();
        await fetchStats();
      } else {
        alert(response.data.message || "Failed to delete customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
      alert(error.message || "Error deleting customer");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-black">
        Customers Management
      </h2>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search customers (name, email, phone)"
              className="flex-1 border rounded px-3 py-2"
            />
            <button className="bg-indigo-600 text-white px-4 rounded hover:bg-indigo-700">
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-3 py-2 flex-1"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setPage(1);
              fetchCustomers();
            }}
            className="px-3 py-2 border rounded text-black hover:bg-gray-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Customers</div>
              <div className="text-2xl font-bold text-black">{stats.total}</div>
            </div>
            <User className="text-blue-600" size={32} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Active</div>
              <div className="text-2xl font-bold text-green-600">
                {stats.active}
              </div>
            </div>
            <CheckCircle className="text-green-600" size={32} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Suspended</div>
              <div className="text-2xl font-bold text-red-600">
                {stats.suspended}
              </div>
            </div>
            <Ban className="text-red-600" size={32} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Orders</div>
              <div className="text-2xl font-bold text-black">
                {stats.totalOrders}
              </div>
            </div>
            <Package className="text-purple-600" size={32} />
          </div>
        </div>

        <div className="p-4 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Total Revenue</div>
              <div className="text-2xl font-bold text-black">
                ₹{stats.totalRevenue?.toLocaleString()}
              </div>
            </div>
            <DollarSign className="text-orange-600" size={32} />
          </div>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white text-black rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 font-semibold">Customer Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Phone</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Orders</th>
              <th className="p-3 font-semibold">Joined</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  Loading customers...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-6 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((customer) => {
                const customerStatus = (
                  customer.status || "active"
                ).toLowerCase();

                return (
                  <tr
                    key={customer._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <User size={18} className="text-gray-400" />
                        <span className="font-medium">
                          {customer.fullName ||
                            `${customer.firstName || ""} ${
                              customer.lastName || ""
                            }`}
                        </span>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Mail size={16} className="text-gray-400" />
                        <span>{customer.email}</span>
                      </div>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <Phone size={16} className="text-gray-400" />
                        <span>
                          {customer.mobile || customer.phone || "N/A"}
                        </span>
                      </div>
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm font-medium capitalize ${
                          customerStatus === "active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {customerStatus}
                      </span>
                    </td>

                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <ShoppingCart size={16} className="text-gray-400" />
                        <span>{customer.ordersCount || 0}</span>
                      </div>
                    </td>

                    <td className="p-3">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <button
                        onClick={() => viewCustomer(customer._id)}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-200"
                        disabled={actionLoading}
                        title="View Details"
                      >
                        <Eye size={16} className="inline" />
                      </button>

                      {customerStatus === "active" ? (
                        <button
                          onClick={() =>
                            handleStatusChange(customer._id, "suspended")
                          }
                          className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
                          disabled={actionLoading}
                          title="Suspend Customer"
                        >
                          Suspend
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            handleStatusChange(customer._id, "active")
                          }
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          disabled={actionLoading}
                          title="Activate Customer"
                        >
                          Activate
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(customer._id)}
                        className="px-3 py-1 border text-red-600 rounded text-sm hover:bg-red-50"
                        disabled={actionLoading}
                        title="Delete Customer"
                      >
                        <Trash2 size={16} className="inline" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of{" "}
          {total}
        </div>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 border rounded bg-indigo-600 text-white">
            {page}
          </span>
          <button
            disabled={page * limit >= total}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Customer Details Modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-black w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Customer Details</h3>
                  <p className="text-sm opacity-90 mt-1">
                    Complete customer information
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {/* Personal Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3 flex items-center">
                  <User className="mr-2 text-indigo-600" size={20} />
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold">
                      {selectedCustomer.fullName ||
                        `${selectedCustomer.firstName || ""} ${
                          selectedCustomer.lastName || ""
                        }`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{selectedCustomer.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">
                      {selectedCustomer.mobile ||
                        selectedCustomer.phone ||
                        "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span
                      className={`px-2 py-1 rounded text-sm font-medium capitalize ${
                        selectedCustomer.status === "approved"
                          ? "bg-green-100 text-green-700"
                          : selectedCustomer.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : selectedCustomer.status === "rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {selectedCustomer.status || "pending"}
                    </span>
                  </div>

                  {selectedCustomer.gender && (
                    <div>
                      <p className="text-sm text-gray-600">Gender</p>
                      <p className="font-semibold">{selectedCustomer.gender}</p>
                    </div>
                  )}
                  {selectedCustomer.dob && (
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-semibold">
                        {new Date(selectedCustomer.dob).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Member Since</p>
                    <p className="font-semibold">
                      {new Date(
                        selectedCustomer.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                  {selectedCustomer.customerOwnCode && (
                    <div>
                      <p className="text-sm text-gray-600">Customer Code</p>
                      <p className="font-semibold">
                        {selectedCustomer.customerOwnCode}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Address Information */}
              {selectedCustomer.address && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <MapPin className="mr-2 text-indigo-600" size={20} />
                    Address Information
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-700">
                      {selectedCustomer.address}
                      {selectedCustomer.city && `, ${selectedCustomer.city}`}
                      {selectedCustomer.state && `, ${selectedCustomer.state}`}
                      {selectedCustomer.pincode &&
                        ` - ${selectedCustomer.pincode}`}
                      {selectedCustomer.country &&
                        `, ${selectedCustomer.country}`}
                    </p>
                  </div>
                </div>
              )}

              {/* Additional Addresses */}
              {selectedCustomer.addresses &&
                selectedCustomer.addresses.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 flex items-center">
                      <MapPin className="mr-2 text-indigo-600" size={20} />
                      Additional Saved Addresses
                    </h4>
                    <div className="space-y-3">
                      {selectedCustomer.addresses.map((address, idx) => (
                        <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                          <div className="flex items-start justify-between mb-2">
                            <p className="font-semibold">
                              {address.label || `Address ${idx + 1}`}
                            </p>
                            {address.isDefault && (
                              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs">
                                Default
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-700">
                            {address.street}, {address.city}, {address.state} -{" "}
                            {address.zipCode}
                          </p>
                          {address.phone && (
                            <p className="text-sm text-gray-600 mt-1">
                              Phone: {address.phone}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              {/* Referral Information */}
              {selectedCustomer.referralCodeUsed && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3">
                    Referral Information
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Referral Code Used</p>
                    <p className="font-semibold">
                      {selectedCustomer.referralCodeUsed}
                    </p>
                  </div>
                </div>
              )}

              {/* Order Statistics */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3 flex items-center">
                  <ShoppingCart className="mr-2 text-indigo-600" size={20} />
                  Order Statistics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <Package className="mx-auto mb-2 text-blue-600" size={32} />
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold">
                      {selectedCustomer.ordersCount || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <DollarSign
                      className="mx-auto mb-2 text-green-600"
                      size={32}
                    />
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold">
                      ₹{selectedCustomer.totalSpent?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg text-center">
                    <CreditCard
                      className="mx-auto mb-2 text-purple-600"
                      size={32}
                    />
                    <p className="text-sm text-gray-600">Average Order</p>
                    <p className="text-2xl font-bold">
                      ₹
                      {selectedCustomer.averageOrderValue?.toLocaleString() ||
                        0}
                    </p>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              {selectedCustomer.notes && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3">Admin Notes</h4>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-sm text-gray-700">
                      {selectedCustomer.notes}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
