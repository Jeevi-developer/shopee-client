import React, { useEffect, useState } from "react";
import adminService from "../../api/adminService";
import ViewSeller from "./ViewSeller";

export default function SellersManagement() {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [stats, setStats] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [selectedSeller, setSelectedSeller] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch sellers from API
  const fetchSellers = async () => {
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
      const data = await adminService.listSellers(params);
      console.log("Seller API response:", data);
      setSellers(data.sellers || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("Error fetching sellers:", err);
      alert(err?.message || "Failed to load sellers");
    } finally {
      setLoading(false);
    }
  };

  // Fetch seller stats
  const fetchStats = async () => {
    try {
      const resp = await adminService.getStats();
      if (resp.success) setStats(resp.stats);
    } catch (err) {
      console.warn("Stats error:", err);
    }
  };

  // Fetch data on mount and when page/status changes
  useEffect(() => {
    fetchSellers();
    fetchStats();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page, statusFilter]);

  // Handle search form submit
  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetchSellers();
  };

  const viewSeller = async (id) => {
    try {
      const resp = await adminService.getSeller(id);
      if (resp.success) {
        setSelectedSeller(resp.seller);
        setShowModal(true);
      }
    } catch (err) {
      alert("Failed to fetch seller details");
    }
  };

  // ✅ Fixed Approve function
  const handleApprove = async (sellerId) => {
    setActionLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/admin/sellers/${sellerId}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({ approved: true, reason: "KYC verified" }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Seller approved successfully!");
        await fetchSellers(); // ✅ Refresh list
        await fetchStats(); // ✅ Refresh stats
      } else {
        alert(data.message || "Failed to approve seller");
      }
    } catch (error) {
      console.error("Error approving seller:", error);
      alert("Error approving seller");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Fixed Reject function
  const handleReject = async (sellerId) => {
    const reason = prompt("Reason for rejection (optional)");
    setActionLoading(true);
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/admin/sellers/${sellerId}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            approved: false,
            reason: reason || "Documents incomplete",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Seller rejected!");
        await fetchSellers(); // ✅ Refresh list
        await fetchStats(); // ✅ Refresh stats
      } else {
        alert(data.message || "Failed to reject seller");
      }
    } catch (error) {
      console.error("Error rejecting seller:", error);
      alert("Error rejecting seller");
    } finally {
      setActionLoading(false);
    }
  };

  // ✅ Suspend or activate seller
  const handleStatus = async (id, status) => {
    const reason =
      status.toLowerCase() === "suspended"
        ? prompt("Reason for suspension (optional)")
        : undefined;
    setActionLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/admin/sellers/${id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
          body: JSON.stringify({
            status: status.toLowerCase(),
            reason: reason || "Status updated by admin",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(`Seller status updated to ${status}!`);
        await fetchSellers(); // ✅ Refresh list
        await fetchStats(); // ✅ Refresh stats
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status");
    } finally {
      setActionLoading(false);
    }
  };

  // Delete seller
  const handleDelete = async (id) => {
    if (!confirm("Delete seller permanently?")) return;
    setActionLoading(true);
    try {
      const resp = await adminService.deleteSeller(id);
      if (resp.success) {
        alert("Deleted successfully");
        await fetchSellers();
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
      <h2 className="text-2xl font-bold mb-4 text-black">Sellers Management</h2>

      {/* Search & Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2">
          <form onSubmit={handleSearch} className="flex gap-2">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sellers (name, email, phone)"
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
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="suspended">Suspended</option>
          </select>
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setPage(1);
              fetchSellers();
            }}
            className="px-3 py-2 border rounded text-black"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Total Sellers</div>
            <div className="text-2xl font-bold text-black">{stats.total}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-2xl font-bold text-black">{stats.pending}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Approved</div>
            <div className="text-2xl font-bold text-black">
              {stats.approved}
            </div>
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
        </div>
      )}

      {/* Sellers Table */}
      <div className="bg-white text-black rounded-lg shadow overflow-x-auto">
        <table className="w-full text-left text-gray-800 border-collapse">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3 font-semibold">Store Name</th>
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
            ) : sellers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No sellers found
                </td>
              </tr>
            ) : (
              sellers.map((s) => {
                // ✅ Use 'status' field (with fallback to accountStatus)
                const sellerStatus = (
                  s.status ||
                  s.accountStatus ||
                  "pending"
                ).toLowerCase();

                return (
                  <tr
                    key={s._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">
                      {s.storeName || `${s.firstName} ${s.lastName}`}
                    </td>

                    <td className="p-3">{s.email}</td>
                    <td className="p-3">{s.phone}</td>

                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-sm capitalize ${
                          sellerStatus === "approved"
                            ? "bg-green-100 text-green-700"
                            : sellerStatus === "rejected"
                            ? "bg-red-100 text-red-700"
                            : sellerStatus === "suspended"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {sellerStatus}
                      </span>
                    </td>

                    <td className="p-3">
                      {new Date(s.createdAt).toLocaleDateString()}
                    </td>

                    <td className="p-3 text-right space-x-2">
                      <button
                        title="View"
                        onClick={() => viewSeller(s._id)}
                        className="px-3 py-1 border rounded text-sm hover:bg-gray-200"
                        disabled={actionLoading}
                      >
                        View
                      </button>

                      {sellerStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(s._id)}
                            className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                            disabled={actionLoading}
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(s._id)}
                            className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700"
                            disabled={actionLoading}
                          >
                            Reject
                          </button>
                        </>
                      )}

                      {sellerStatus === "approved" && (
                        <button
                          onClick={() => handleStatus(s._id, "suspended")}
                          className="px-3 py-1 bg-orange-600 text-white rounded text-sm hover:bg-orange-700"
                          disabled={actionLoading}
                        >
                          Suspend
                        </button>
                      )}

                      {sellerStatus === "suspended" && (
                        <button
                          onClick={() => handleStatus(s._id, "approved")}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                          disabled={actionLoading}
                        >
                          Activate
                        </button>
                      )}

                      {sellerStatus === "rejected" && (
                        <button
                          onClick={() => handleApprove(s._id)}
                          className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                          disabled={actionLoading}
                        >
                          Re-approve
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(s._id)}
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

      {/* Seller Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white text-black w-full max-w-4xl rounded-lg shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-6 text-white">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-2xl font-bold">Seller Details</h3>
                  <p className="text-sm opacity-90 mt-1">
                    Complete KYC Information
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
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

            {/* Modal Body - Scrollable */}
            <div className="overflow-auto max-h-[70vh] p-6">
              {/* Status Section */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-indigo-600">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-semibold text-lg">Account Status</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium capitalize ${
                          (
                            selected.status ||
                            selected.accountStatus ||
                            "pending"
                          ).toLowerCase() === "approved"
                            ? "bg-green-100 text-green-700"
                            : (
                                selected.status ||
                                selected.accountStatus ||
                                "pending"
                              ).toLowerCase() === "rejected"
                            ? "bg-red-100 text-red-700"
                            : (
                                selected.status ||
                                selected.accountStatus ||
                                "pending"
                              ).toLowerCase() === "suspended"
                            ? "bg-orange-100 text-orange-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {selected.status || selected.accountStatus || "pending"}
                      </span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Joined</p>
                    <p className="font-semibold">
                      {new Date(selected.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                {selected.statusReason && (
                  <p className="text-sm text-gray-600 mt-3 p-2 bg-white rounded">
                    <strong>Reason:</strong> {selected.statusReason}
                  </p>
                )}
              </div>

              {/* Personal Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="font-semibold">
                      {selected.firstName} {selected.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-semibold">{selected.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-semibold">{selected.phone}</p>
                  </div>
                  {selected.dateOfBirth && (
                    <div>
                      <p className="text-sm text-gray-600">Date of Birth</p>
                      <p className="font-semibold">
                        {new Date(selected.dateOfBirth).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Business Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  Business Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {selected.businessName && (
                    <div>
                      <p className="text-sm text-gray-600">Business Name</p>
                      <p className="font-semibold">{selected.businessName}</p>
                    </div>
                  )}
                  {selected.businessType && (
                    <div>
                      <p className="text-sm text-gray-600">Business Type</p>
                      <p className="font-semibold capitalize">
                        {selected.businessType}
                      </p>
                    </div>
                  )}
                  {selected.natureOfConcern && (
                    <div>
                      <p className="text-sm text-gray-600">Nature of Concern</p>
                      <p className="font-semibold">
                        {selected.natureOfConcern}
                      </p>
                    </div>
                  )}
                  {selected.firmName && (
                    <div>
                      <p className="text-sm text-gray-600">Firm Name</p>
                      <p className="font-semibold">{selected.firmName}</p>
                    </div>
                  )}
                  {selected.businessRegNumber && (
                    <div>
                      <p className="text-sm text-gray-600">
                        Registration Number
                      </p>
                      <p className="font-semibold">
                        {selected.businessRegNumber}
                      </p>
                    </div>
                  )}
                  {selected.nameAsPerPan && (
                    <div>
                      <p className="text-sm text-gray-600">Name as per PAN</p>
                      <p className="font-semibold">{selected.nameAsPerPan}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tax Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Tax Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {selected.gstNumber && (
                    <div>
                      <p className="text-sm text-gray-600">GST Number</p>
                      <p className="font-semibold">{selected.gstNumber}</p>
                    </div>
                  )}
                  {selected.pan && (
                    <div>
                      <p className="text-sm text-gray-600">PAN Number</p>
                      <p className="font-semibold">{selected.pan}</p>
                    </div>
                  )}
                  {selected.gstin && (
                    <div>
                      <p className="text-sm text-gray-600">GSTIN</p>
                      <p className="font-semibold">{selected.gstin}</p>
                    </div>
                  )}
                  {selected.taxId && (
                    <div>
                      <p className="text-sm text-gray-600">Tax ID</p>
                      <p className="font-semibold">{selected.taxId}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Store Information */}
              <div className="mb-6">
                <h4 className="text-lg font-bold mb-3 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-indigo-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  Store Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                  {selected.storeName && (
                    <div>
                      <p className="text-sm text-gray-600">Store Name</p>
                      <p className="font-semibold">{selected.storeName}</p>
                    </div>
                  )}
                  {selected.storeDescription && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Store Description</p>
                      <p className="font-semibold">
                        {selected.storeDescription}
                      </p>
                    </div>
                  )}
                  {selected.storeAddress && (
                    <div className="md:col-span-2">
                      <p className="text-sm text-gray-600">Store Address</p>
                      <p className="font-semibold">
                        {selected.storeAddress}
                        {selected.storeCity && `, ${selected.storeCity}`}
                        {selected.storeState && `, ${selected.storeState}`}
                        {selected.storePincode && ` - ${selected.storePincode}`}
                      </p>
                    </div>
                  )}
                  {selected.pickupAddress && (
                    <div>
                      <p className="text-sm text-gray-600">Pickup Address</p>
                      <p className="font-semibold">{selected.pickupAddress}</p>
                    </div>
                  )}
                  {selected.pickupPincode && (
                    <div>
                      <p className="text-sm text-gray-600">Pickup Pincode</p>
                      <p className="font-semibold">{selected.pickupPincode}</p>
                    </div>
                  )}
                  {selected.pickupContact && (
                    <div>
                      <p className="text-sm text-gray-600">Pickup Contact</p>
                      <p className="font-semibold">{selected.pickupContact}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bank Details */}
              {(selected.bankName || selected.accountNumber) && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                      />
                    </svg>
                    Bank Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    {selected.bankName && (
                      <div>
                        <p className="text-sm text-gray-600">Bank Name</p>
                        <p className="font-semibold">{selected.bankName}</p>
                      </div>
                    )}
                    {selected.accountHolderName && (
                      <div>
                        <p className="text-sm text-gray-600">
                          Account Holder Name
                        </p>
                        <p className="font-semibold">
                          {selected.accountHolderName}
                        </p>
                      </div>
                    )}
                    {selected.accountNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Account Number</p>
                        <p className="font-semibold">
                          {selected.accountNumber}
                        </p>
                      </div>
                    )}
                    {selected.accountType && (
                      <div>
                        <p className="text-sm text-gray-600">Account Type</p>
                        <p className="font-semibold capitalize">
                          {selected.accountType}
                        </p>
                      </div>
                    )}
                    {selected.routingNumber && (
                      <div>
                        <p className="text-sm text-gray-600">Routing Number</p>
                        <p className="font-semibold">
                          {selected.routingNumber}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Business Type Specific Details - Proprietorship */}
              {selected.businessType === "proprietorship" &&
                selected.proprietorName && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      Proprietor Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Proprietor Name</p>
                        <p className="font-semibold">
                          {selected.proprietorName}
                        </p>
                      </div>
                      {selected.proprietorPan && (
                        <div>
                          <p className="text-sm text-gray-600">PAN Number</p>
                          <p className="font-semibold">
                            {selected.proprietorPan}
                          </p>
                        </div>
                      )}
                      {selected.proprietorAadhaar && (
                        <div>
                          <p className="text-sm text-gray-600">
                            Aadhaar Number
                          </p>
                          <p className="font-semibold">
                            {selected.proprietorAadhaar}
                          </p>
                        </div>
                      )}
                      {selected.proprietorMobile && (
                        <div>
                          <p className="text-sm text-gray-600">Mobile</p>
                          <p className="font-semibold">
                            {selected.proprietorMobile}
                          </p>
                        </div>
                      )}
                      {selected.proprietorEmail && (
                        <div>
                          <p className="text-sm text-gray-600">Email</p>
                          <p className="font-semibold">
                            {selected.proprietorEmail}
                          </p>
                        </div>
                      )}
                      {selected.proprietorAddress && (
                        <div className="md:col-span-2">
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-semibold">
                            {selected.proprietorAddress}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Partnership Details */}
              {selected.businessType === "partnership" &&
                selected.numberOfPartners && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                      Partnership Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">
                          Number of Partners
                        </p>
                        <p className="font-semibold">
                          {selected.numberOfPartners}
                        </p>
                      </div>
                      {selected.partnershipPan && (
                        <div>
                          <p className="text-sm text-gray-600">
                            Partnership PAN
                          </p>
                          <p className="font-semibold">
                            {selected.partnershipPan}
                          </p>
                        </div>
                      )}
                      {selected.partnershipDeedDate && (
                        <div>
                          <p className="text-sm text-gray-600">Deed Date</p>
                          <p className="font-semibold">
                            {new Date(
                              selected.partnershipDeedDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* LLP Details */}
              {selected.businessType === "llp" && selected.llpName && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold mb-3 flex items-center">
                    <svg
                      className="w-5 h-5 mr-2 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    LLP Details
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">LLP Name</p>
                      <p className="font-semibold">{selected.llpName}</p>
                    </div>
                    {selected.llpRegistrationNo && (
                      <div>
                        <p className="text-sm text-gray-600">
                          Registration Number
                        </p>
                        <p className="font-semibold">
                          {selected.llpRegistrationNo}
                        </p>
                      </div>
                    )}
                    {selected.llpPan && (
                      <div>
                        <p className="text-sm text-gray-600">PAN Number</p>
                        <p className="font-semibold">{selected.llpPan}</p>
                      </div>
                    )}
                    {selected.numberOfDesignatedPartners && (
                      <div>
                        <p className="text-sm text-gray-600">
                          Number of Designated Partners
                        </p>
                        <p className="font-semibold">
                          {selected.numberOfDesignatedPartners}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Private Limited Details */}
              {selected.businessType === "private_limited" &&
                selected.pvtLtdName && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Private Limited Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Company Name</p>
                        <p className="font-semibold">{selected.pvtLtdName}</p>
                      </div>
                      {selected.cinNumber && (
                        <div>
                          <p className="text-sm text-gray-600">CIN Number</p>
                          <p className="font-semibold">{selected.cinNumber}</p>
                        </div>
                      )}
                      {selected.pvtLtdPan && (
                        <div>
                          <p className="text-sm text-gray-600">PAN Number</p>
                          <p className="font-semibold">{selected.pvtLtdPan}</p>
                        </div>
                      )}
                      {selected.authorizedCapital && (
                        <div>
                          <p className="text-sm text-gray-600">
                            Authorized Capital
                          </p>
                          <p className="font-semibold">
                            ₹{selected.authorizedCapital}
                          </p>
                        </div>
                      )}
                      {selected.paidUpCapital && (
                        <div>
                          <p className="text-sm text-gray-600">
                            Paid-up Capital
                          </p>
                          <p className="font-semibold">
                            ₹{selected.paidUpCapital}
                          </p>
                        </div>
                      )}
                      {selected.numberOfDirectors && (
                        <div>
                          <p className="text-sm text-gray-600">
                            Number of Directors
                          </p>
                          <p className="font-semibold">
                            {selected.numberOfDirectors}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Public Limited Details */}
              {selected.businessType === "public_limited" &&
                selected.publicLtdName && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                        />
                      </svg>
                      Public Limited Details
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                      <div>
                        <p className="text-sm text-gray-600">Company Name</p>
                        <p className="font-semibold">
                          {selected.publicLtdName}
                        </p>
                      </div>
                      {selected.publicCinNumber && (
                        <div>
                          <p className="text-sm text-gray-600">CIN Number</p>
                          <p className="font-semibold">
                            {selected.publicCinNumber}
                          </p>
                        </div>
                      )}
                      {selected.publicLtdPan && (
                        <div>
                          <p className="text-sm text-gray-600">PAN Number</p>
                          <p className="font-semibold">
                            {selected.publicLtdPan}
                          </p>
                        </div>
                      )}
                      {selected.listedStatus && (
                        <div>
                          <p className="text-sm text-gray-600">Listed Status</p>
                          <p className="font-semibold">
                            {selected.listedStatus}
                          </p>
                        </div>
                      )}
                      {selected.stockExchange && (
                        <div>
                          <p className="text-sm text-gray-600">
                            Stock Exchange
                          </p>
                          <p className="font-semibold">
                            {selected.stockExchange}
                          </p>
                        </div>
                      )}
                      {selected.publicAuthorizedCapital && (
                        <div>
                          <p className="text-sm text-gray-600">
                            Authorized Capital
                          </p>
                          <p className="font-semibold">
                            ₹{selected.publicAuthorizedCapital}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

              {/* Store Categories */}
              {selected.storeCategories &&
                selected.storeCategories.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-lg font-bold mb-3 flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                        />
                      </svg>
                      Store Categories
                    </h4>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex flex-wrap gap-2">
                        {selected.storeCategories.map((cat, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                          >
                            {cat.category || cat.customCategory}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setSelected(null)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
          <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-xl shadow-lg p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-xl font-bold text-gray-700 hover:text-black"
            >
              ✕
            </button>

            {/* Render Seller Details */}
            <ViewSeller seller={selectedSeller} />
          </div>
        </div>
      )}
    </div>
  );
}
