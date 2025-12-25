/* ---- Step12ReviewSubmit.jsx ---- */
import React, { useState } from "react";
import { useSellerForm } from "../context/SellerFormContext";
import axiosInstance from "../../../api/axios";
export default function Step12ReviewSubmit({ prev }) {
  const { formData } = useSellerForm();
  const [loading, setLoading] = useState(false);

  const jsonFields = [
    "partners",
    "designatedPartners",
    "directors",
    "publicDirectors",
    "storeCategories",
  ];

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(formData).forEach(([k, v]) => {
        if (jsonFields.includes(k)) fd.append(k, JSON.stringify(v || []));
        else if (v instanceof File) fd.append(k, v);
        else if (typeof v === "boolean") fd.append(k, v ? "true" : "false");
        else if (v === null || v === undefined) fd.append(k, "");
        else fd.append(k, v);
      });

      const res = await axiosInstance.post("/seller/register", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data?.success) {
        alert("Registered successfully");
        // redirect if needed
      } else {
        alert(res.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Review & Submit</h2>
      <div className="max-h-64 overflow-auto p-3 border rounded bg-gray-50">
        <pre className="text-xs">{JSON.stringify(formData, null, 2)}</pre>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
}
