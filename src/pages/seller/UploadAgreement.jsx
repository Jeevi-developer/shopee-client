import React, { useState } from "react";
import axios from "axios";

export default function UploadAgreement() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) return setMessage("Please select a PDF.");

    const formData = new FormData();
    formData.append("agreement", file);

    try {
      const token = localStorage.getItem("authToken");
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/admin/sellers/upload-agreement`,
        formData,
        { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } }
      );
      setMessage("Agreement uploaded successfully!");
    } catch (err) {
      console.error(err);
      setMessage("Upload failed. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-4">Upload Signed Agreement</h2>

      <div className="mb-4">
        <a
          href="/agreements/INDXIND_Seller_Agreement_Legal.pdf"
          download
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded shadow"
        >
          Download Agreement PDF
        </a>
      </div>

      <div className="mb-4">
        <input type="file" accept="application/pdf" onChange={handleFileChange} />
      </div>

      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 rounded shadow"
      >
        Upload
      </button>

      {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
    </div>
  );
}
