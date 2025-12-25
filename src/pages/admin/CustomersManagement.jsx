import React, { useEffect, useState } from "react";
import adminService from "../../api/adminService";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Package,
  DollarSign,
  ShoppingCart,
} from "lucide-react";

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
  const [stats, setStats] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch customers from API
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const params = {
        search: search || undefined,
        status:
          statusFilter && statusFilter !== "All"
            ? statusFilter.toLowerCase()
            : undefined,
        page,
        limit,
      };
      const data = await adminService.listCustomers(params);
      console.log("Customer API response:", data);
      setCustomers(data.customers || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Error fetching customers:", err);
      alert(err?.message || "Failed to load customers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch customer stats
  const fetchStats = async () => {
    try {
      const resp = await adminService.getCustomerStats();
      if (resp.success) setStats(resp.stats);
    } catch (err) {
      console.warn("Stats error:", err);
    }
  };

  // Fetch data on mount and when page/status changes
  useEffect(() => {
    fetchCustomers();
    fetchStats();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page, statusFilter]);

  // Handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchCustomers();
  };

  // View customer details
  const viewCustomer = async (id) => {
    try {
      const resp = await adminService.getCustomer(id);
      if (resp.success) {
        setSelectedCustomer(resp.customer);
        setShowModal(true);
      }
    } catch (err) {
      alert("Failed to fetch customer details");
    }
  };

  // Approve customer
  const handleApprove = async (customerId) => {
    setActionLoading(true);
    try {
      const resp = await adminService.approveCustomer(
        customerId,
        true,
        "Customer verified"
      );
      if (resp.success) {
        alert("Customer approved successfully!");
        await fetchCustomers();
        await fetchStats();
      } else {
        alert(resp.message || "Failed to approve customer");
      }
    } catch (error) {
      console.error("Error approving customer:", error);
      alert("Error approving customer");
    } finally {
      setActionLoading(false);
    }
  };

  // Reject customer
  const handleReject = async (customerId) => {
    const reason = prompt("Reason for rejection (optional)");
    setActionLoading(true);
    try {
      const resp = await adminService.approveCustomer(
        customerId,
        false,
        reason || "Documents incomplete"
      );
      if (resp.success) {
        alert("Customer rejected!");
        await fetchCustomers();
        await fetchStats();
      } else {
        alert(resp.message || "Failed to reject customer");
      }
    } catch (error) {
      console.error("Error rejecting customer:", error);
      alert("Error rejecting customer");
    } finally {
      setActionLoading(false);
    }
  };

  // Update customer status (suspend/activate)
  const handleStatus = async (id, status) => {
    const reason =
      status.toLowerCase() === "suspended"
        ? prompt("Reason for suspension (optional)")
        : undefined;
    setActionLoading(true);
    try {
      const resp = await adminService.updateCustomerStatus(
        id,
        status.toLowerCase(),
        reason || "Status updated by admin"
      );
      if (resp.success) {
        alert(`Customer status updated to ${status}!`);
        await fetchCustomers();
        await fetchStats();
      } else {
        alert(resp.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete customer
  const handleDelete = async (id) => {
    if (!confirm("Delete customer permanently?")) return;
    setActionLoading(true);
    try {
      const resp = await adminService.deleteCustomer(id);
      if (resp.success) {
        alert("Deleted successfully");
        await fetchCustomers();
        await fetchStats();
      }
    } catch (err) {
      alert("Delete failed");
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
            <button className="bg-indigo-600 text-white px-4 rounded">
              Search
            </button>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="pending">Pending</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setPage(1);
              fetchCustomers();
            }}
            className="px-3 py-2 border rounded text-black"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total Customers</div>
            <div className="text-2xl font-bold text-black">{stats.total}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Active</div>
            <div className="text-2xl font-bold text-black">{stats.active}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Rejected</div>
            <div className="text-2xl font-bold text-black">
              {stats.rejected}
            </div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Suspended</div>
            <div className="text-2xl font-bold text-black">
              {stats.suspended}
            </div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Orders</div>
            <div className="text-2xl font-bold text-black">
              {stats.totalOrders}
            </div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Revenue</div>
            <div className="text-xl font-bold text-black">
              ₹{stats.totalRevenue?.toLocaleString()}
            </div>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div className="bg-white text-black rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left text-gray-800 border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 font-semibold">Customer Name</th>
              <th className="p-3 font-semibold">Email</th>
              <th className="p-3 font-semibold">Phone</th>
              <th className="p-3 font-semibold">Status</th>
              <th className="p-3 font-semibold">Joined</th>
              <th className="p-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : customers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            ) : (
              customers.map((c) => {
                const customerStatus = (
                  c.status ||
                  c.accountStatus ||
                  "pending"
                ).toLowerCase();

                return (
                  <tr
                    key={c._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      {c.fullName || `${c.firstName || ""} ${c.lastName || ""}`}
                    </td>

                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.mobile || c.phone || "N/A"}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm capitalize ${
                          customerStatus === "active"
                            ? "bg-green-100 text-green-700"
                            : customerStatus === "rejected"
                            ? "bg-red-100 text-red-700"
                            : customerStatus === "suspended"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {customerStatus}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <button
                        title="View"
                        onClick={() => viewCustomer(c._id)}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-200"
                        disabled={actionLoading}
                      >
                        View
                      </button>

                      {customerStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(c._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            disabled={actionLoading}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(c._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            disabled={actionLoading}
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {customerStatus === "active" && (
                        <button
                          onClick={() => handleStatus(c._id, "suspended")}
                          className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
                          disabled={actionLoading}
                        >
                          Suspend
                        </button>
                      )}

                      {customerStatus === "suspended" && (
                        <button
                          onClick={() => handleStatus(c._id, "active")}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                          disabled={actionLoading}
                        >
                          Activate
                        </button>
                      )}

                      {customerStatus === "rejected" && (
                        <button
                          onClick={() => handleApprove(c._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          disabled={actionLoading}
                        >
                          Re-approve
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(c._id)}
                        className="px-3 py-1 border text-red-600 rounded text-sm hover:bg-red-50"
                        disabled={actionLoading}
                      >
                        Delete
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
        <div>
          Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of{" "}
          {total}
        </div>
        <div className="space-x-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded"
          >
            Prev
          </button>
          <button
            disabled={page * limit >= total}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded"
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
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-auto max-h-[70vh]">
              {/* Status Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">Account Status</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                          (
                            selectedCustomer.status || "pending"
                          ).toLowerCase() === "active"
                            ? "bg-green-100 text-green-700"
                            : (
                                selectedCustomer.status || "pending"
                              ).toLowerCase() === "rejected"
                            ? "bg-red-100 text-red-700"
                            : (
                                selectedCustomer.status || "pending"
                              ).toLowerCase() === "suspended"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {selectedCustomer.status || "pending"}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="font-semibold">
                      {new Date(
                        selectedCustomer.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {selectedCustomer.statusReason && (
                  <p className="text-sm text-gray-600 mt-3 p-2 bg-white rounded">
                    <strong>Reason:</strong> {selectedCustomer.statusReason}
                  </p>
                )}
              </div>

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
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
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
