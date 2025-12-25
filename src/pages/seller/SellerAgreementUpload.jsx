import React, { useState } from "react";
import axios from "axios";

export default function SellerAgreementUpload({ sellerId }) {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileUpload = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) {
      setMessage("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("agreement", file);
    formData.append("sellerId", sellerId);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/seller/upload-agreement",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage("Agreement uploaded successfully!");
    } catch (error) {
      setMessage("Upload failed. Try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-xl shadow-lg space-y-6">
      <h1 className="text-2xl font-bold">Upload Seller Agreement</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileUpload}
        className="w-full border p-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow"
      >
        Upload
      </button>

      {message && <p className="text-green-700 font-semibold">{message}</p>}
    </div>
  );
}
