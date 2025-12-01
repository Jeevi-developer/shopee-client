// src/pages/admin/SellersManagement.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import adminService from "../../api/adminService";
import {
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  PauseCircle,
  PlayCircle,
} from "lucide-react";

export default function SellersManagement() {
  const { admin, token } = useAuth(); // make sure admin is logged in
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

  // ---------------- FETCH SELLERS ----------------
  const fetch = async () => {
    setLoading(true);
    try {
      const params = {
        search: search || undefined,
        status: statusFilter && statusFilter !== "All" ? statusFilter : undefined,
        page,
        limit,
      };
      const data = await adminService.listSellers(params);
      setSellers(data.sellers || []);
      setTotal(data.total || 0);
    } catch (err) {
      console.error("fetch sellers", err.message);
      alert(err.message || "Failed to load sellers");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- FETCH STATS ----------------
  const fetchStats = async () => {
    try {
      const resp = await adminService.getStats();
      if (resp.success) setStats(resp.stats);
    } catch (err) {
      console.warn("stats error", err.message);
    }
  };

  useEffect(() => {
    if (!admin || !token) return; // only fetch if admin is logged in
    fetch();
    fetchStats();
    window.scrollTo(0, 0);
    // eslint-disable-next-line
  }, [page, statusFilter, admin, token]);

  // ---------------- SEARCH ----------------
  const handleSearch = async (e) => {
    e.preventDefault();
    setPage(1);
    await fetch();
  };

  // ---------------- VIEW SELLER ----------------
  const viewSeller = async (id) => {
    try {
      const resp = await adminService.getSeller(id);
      if (resp.success) setSelected(resp.seller);
    } catch (err) {
      alert("Failed to fetch seller");
    }
  };

  // ---------------- APPROVE / REJECT ----------------
  const handleApprove = async (id, action) => {
    if (!confirm(`Are you sure to ${action} this seller?`)) return;
    setActionLoading(true);
    try {
      const resp = await adminService.approveSeller(id, action);
      if (resp.success) {
        alert(resp.message);
        fetch();
        fetchStats();
      }
    } catch (err) {
      alert(err.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  // ---------------- STATUS ----------------
  const handleStatus = async (id, status) => {
    const reason = status === "Suspended" ? prompt("Reason for suspension (optional)") : undefined;
    setActionLoading(true);
    try {
      const resp = await adminService.updateStatus(id, status, reason);
      if (resp.success) {
        alert(resp.message);
        fetch();
        fetchStats();
      }
    } catch (err) {
      alert(err.message || "Failed to update status");
    } finally {
      setActionLoading(false);
    }
  };

  // ---------------- DELETE ----------------
  const handleDelete = async (id) => {
    if (!confirm("Delete seller permanently?")) return;
    setActionLoading(true);
    try {
      const resp = await adminService.deleteSeller(id);
      if (resp.success) {
        alert("Deleted");
        fetch();
        fetchStats();
      }
    } catch (err) {
      alert("Delete failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Sellers Management</h2>

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
            <button className="bg-indigo-600 text-white px-4 rounded">Search</button>
          </form>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-3 py-2"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
            <option value="Suspended">Suspended</option>
            <option value="Active">Active</option>
          </select>
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("");
              setPage(1);
              fetch();
            }}
            className="px-3 py-2 border rounded"
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
            <div className="text-2xl font-bold">{stats.total}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Pending</div>
            <div className="text-2xl font-bold">{stats.pending}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Approved</div>
            <div className="text-2xl font-bold">{stats.approved}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Rejected</div>
            <div className="text-2xl font-bold">{stats.rejected}</div>
          </div>
          <div className="p-4 bg-white rounded shadow">
            <div className="text-sm text-gray-500">Suspended</div>
            <div className="text-2xl font-bold">{stats.suspended}</div>
          </div>
        </div>
      )}

      {/* Sellers Table */}
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Business Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Joined</th>
              <th className="text-right p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6">
                  Loading...
                </td>
              </tr>
            ) : sellers.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center">
                  No sellers
                </td>
              </tr>
            ) : (
              sellers.map((s) => (
                <tr key={s._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{s.businessName || `${s.firstName} ${s.lastName}`}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.accountStatus || "Pending"}</td>
                  <td>{new Date(s.createdAt).toLocaleDateString()}</td>
                  <td className="p-3 text-right space-x-2">
                    <button
                      title="View"
                      onClick={() => viewSeller(s._id)}
                      className="px-3 py-1 border rounded inline-flex items-center gap-2"
                      disabled={actionLoading}
                    >
                      <Eye size={14} /> View
                    </button>

                    {s.accountStatus !== "Approved" && (
                      <button
                        title="Approve"
                        onClick={() => handleApprove(s._id, "approve")}
                        className="px-3 py-1 bg-green-600 text-white rounded inline-flex items-center gap-2"
                        disabled={actionLoading}
                      >
                        <CheckCircle size={14} /> Approve
                      </button>
                    )}

                    {s.accountStatus === "Approved" && (
                      <button
                        title="Reject"
                        onClick={() => handleApprove(s._id, "reject")}
                        className="px-3 py-1 bg-orange-600 text-white rounded inline-flex items-center gap-2"
                        disabled={actionLoading}
                      >
                        <XCircle size={14} /> Reject
                      </button>
                    )}

                    {s.accountStatus !== "Suspended" ? (
                      <button
                        title="Suspend"
                        onClick={() => handleStatus(s._id, "Suspended")}
                        className="px-3 py-1 border rounded inline-flex items-center gap-2"
                        disabled={actionLoading}
                      >
                        <PauseCircle size={14} /> Suspend
                      </button>
                    ) : (
                      <button
                        title="Activate"
                        onClick={() => handleStatus(s._id, "Active")}
                        className="px-3 py-1 border rounded inline-flex items-center gap-2"
                        disabled={actionLoading}
                      >
                        <PlayCircle size={14} /> Activate
                      </button>
                    )}

                    <button
                      title="Delete"
                      onClick={() => handleDelete(s._id)}
                      className="px-3 py-1 text-red-600 border rounded inline-flex items-center gap-2"
                      disabled={actionLoading}
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-4">
        <div>
          Showing {(page - 1) * limit + 1} - {Math.min(page * limit, total)} of {total}
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

      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded p-6 shadow-lg overflow-auto max-h-[90vh]">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-bold">Seller Details</h3>
              <button onClick={() => setSelected(null)} className="text-gray-500">
                Close
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold">Business</h4>
                <p><strong>Name:</strong> {selected.businessName}</p>
                <p><strong>Type:</strong> {selected.businessType}</p>
                <p><strong>GSTIN:</strong> {selected.gstin}</p>
                <p><strong>PAN:</strong> {selected.pan}</p>
              </div>
              <div>
                <h4 className="font-semibold">Contact</h4>
                <p><strong>Name:</strong> {selected.firstName} {selected.lastName}</p>
                <p><strong>Email:</strong> {selected.email}</p>
                <p><strong>Phone:</strong> {selected.phone}</p>
                <p><strong>Address:</strong> {selected.storeAddress}</p>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="font-semibold">Documents</h4>
              <ul className="list-disc ml-6">
                {selected.gstFile && (
                  <li>
                    GST File:{" "}
                    <a href={selected.gstFile} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View
                    </a>
                  </li>
                )}
                {selected.proprietorPanCard && (
                  <li>
                    PAN Card:{" "}
                    <a href={selected.proprietorPanCard} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View
                    </a>
                  </li>
                )}
                {selected.proprietorAadhaarCard && (
                  <li>
                    Aadhaar Card:{" "}
                    <a href={selected.proprietorAadhaarCard} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View
                    </a>
                  </li>
                )}
                {selected.proprietorPhoto && (
                  <li>
                    Photo:{" "}
                    <a href={selected.proprietorPhoto} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                      View
                    </a>
                  </li>
                )}
              </ul>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => setSelected(null)} className="px-4 py-2 border rounded">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
