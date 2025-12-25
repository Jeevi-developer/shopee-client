/* ---- Step4Proprietorship.jsx ---- */
import React from "react";
import { useSellerForm } from "../context/SellerFormContext";
import { FileField } from "../../SellerRegistration/FileField";
export default function Step4Proprietorship({ next, prev }) {
  const { formData, update } = useSellerForm();
  if (formData.natureOfConcern !== "Proprietorship")
    return (
      <div>
        <p>No Proprietorship fields for chosen nature.</p>
        <div className="flex justify-between mt-4">
          <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded">
            Back
          </button>
          <button
            onClick={next}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Next
          </button>
        </div>
      </div>
    );

  return (
    <div>
      <h2 className="text-lg font-medium mb-3">Proprietorship</h2>
      <div className="grid md:grid-cols-2 gap-3">
        <input
          value={formData.proprietorName}
          onChange={(e) => update("proprietorName", e.target.value)}
          placeholder="Proprietor name"
          className="p-2 border rounded"
        />
        <input
          value={formData.proprietorDob}
          onChange={(e) => update("proprietorDob", e.target.value)}
          type="date"
          className="p-2 border rounded"
        />
        <input
          value={formData.proprietorPan}
          onChange={(e) => update("proprietorPan", e.target.value)}
          placeholder="Proprietor PAN"
          className="p-2 border rounded"
        />
        <input
          value={formData.proprietorAadhaar}
          onChange={(e) => update("proprietorAadhaar", e.target.value)}
          placeholder="Aadhaar"
          className="p-2 border rounded"
        />
        <FileField
          label="Proprietor Photo"
          accept="image/*"
          valuePreview={
            formData.proprietorPhoto
              ? URL.createObjectURL(formData.proprietorPhoto)
              : null
          }
          onFileChange={(file) => update("proprietorPhoto", file)}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={prev} className="px-4 py-2 bg-gray-200 rounded">
          Back
        </button>
        <button
          onClick={next}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
