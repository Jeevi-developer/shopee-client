/* ---- PartnershipFields.jsx ---- */
import React, { useState } from "react";

export default function PartnershipFields({ register, errors }) {
  const [partners, setPartners] = useState([{ name: "", panNo: "", mobile: "", address: "" }]);

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mt-6">
      <h3 className="text-lg font-semibold mb-4">Partnership Details</h3>

      {/* Partnership PAN */}
      <div>
        <label className="block mb-1 font-medium">Partnership PAN *</label>
        <input
          {...register("partnershipPan")}
          className={`w-full p-2 border rounded uppercase ${
            errors.partnershipPan ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="ABCDE1234F"
          maxLength={10}
        />
        {errors.partnershipPan && (
          <p className="text-red-500 text-sm">{errors.partnershipPan.message}</p>
        )}
      </div>

      {/* Deed Upload */}
      <div className="mt-3">
        <label className="block mb-1 font-medium">Upload Partnership Deed *</label>
        <input
          type="file"
          accept=".pdf,.jpg,.jpeg,.png"
          {...register("partnershipDeed")}
          className="w-full p-2 border rounded bg-white cursor-pointer"
        />
        {errors.partnershipDeed && (
          <p className="text-red-500 text-sm">{errors.partnershipDeed.message}</p>
        )}
      </div>

      {/* Partner List */}
      <h4 className="mt-5 font-semibold">Partners *</h4>

      {partners.map((p, idx) => (
        <div key={idx} className="grid md:grid-cols-4 gap-4 mt-4 bg-white p-3 rounded">
          <input
            {...register(`partners.${idx}.name`)}
            placeholder="Partner Name"
            className="p-2 border rounded"
          />
          <input
            {...register(`partners.${idx}.panNo`)}
            placeholder="PAN"
            maxLength={10}
            className="p-2 border rounded uppercase"
          />
          <input
            {...register(`partners.${idx}.mobile`)}
            placeholder="Mobile"
            maxLength={10}
            className="p-2 border rounded"
          />
          <input
            {...register(`partners.${idx}.address`)}
            placeholder="Address"
            className="p-2 border rounded"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          setPartners((prev) => [...prev, { name: "", panNo: "", mobile: "", address: "" }])
        }
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
      >
        + Add Partner
      </button>
    </div>
  );
}
