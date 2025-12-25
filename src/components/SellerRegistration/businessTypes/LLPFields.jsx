/* ---- LLPFields.jsx (FINAL FIXED VERSION) ---- */
import React from "react";
import { useFieldArray } from "react-hook-form";

export default function LLPFields({ register, errors, control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "designatedPartners"
  });

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mt-6">
      <h3 className="text-lg font-bold mb-4">LLP Details</h3>

      <div className="grid md:grid-cols-3 gap-4">

        {/* LLP Name */}
        <div>
          <label className="font-medium">LLP Name *</label>
          <input
            {...register("llpName")}
            className={`w-full p-2 border rounded ${
              errors.llpName ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="LLP Name"
          />
          {errors.llpName && (
            <p className="text-red-500 text-sm">{errors.llpName.message}</p>
          )}
        </div>

        {/* Registration No */}
        <div>
          <label className="font-medium">LLP Registration No *</label>
          <input
            {...register("llpRegistrationNo")}
            className={`w-full p-2 border rounded ${
              errors.llpRegistrationNo ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Registration No"
          />
          {errors.llpRegistrationNo && (
            <p className="text-red-500 text-sm">{errors.llpRegistrationNo.message}</p>
          )}
        </div>

        {/* PAN */}
        <div>
          <label className="font-medium">LLP PAN *</label>
          <input
            {...register("llpPan")}
            maxLength={10}
            className={`w-full p-2 border rounded uppercase ${
              errors.llpPan ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="ABCDE1234F"
          />
          {errors.llpPan && (
            <p className="text-red-500 text-sm">{errors.llpPan.message}</p>
          )}
        </div>

        {/* Incorporation Date */}
        <div>
          <label className="font-medium">Incorporation Date *</label>
          <input
            type="date"
            {...register("llpIncorporationDate")}
            className={`w-full p-2 border rounded ${
              errors.llpIncorporationDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.llpIncorporationDate && (
            <p className="text-red-500 text-sm">
              {errors.llpIncorporationDate.message}
            </p>
          )}
        </div>

        {/* LLP Certificate */}
        <div>
          <label className="font-medium">Upload LLP Certificate *</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            {...register("llpCertificate")}
            className={`w-full p-2 border rounded bg-white ${
              errors.llpCertificate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.llpCertificate && (
            <p className="text-red-500 text-sm">
              {errors.llpCertificate.message}
            </p>
          )}
        </div>

        {/* LLP Agreement */}
        <div>
          <label className="font-medium">Upload LLP Agreement *</label>
          <input
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            {...register("llpAgreement")}
            className={`w-full p-2 border rounded bg-white ${
              errors.llpAgreement ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.llpAgreement && (
            <p className="text-red-500 text-sm">
              {errors.llpAgreement.message}
            </p>
          )}
        </div>

        {/* Number of Designated Partners */}
        <div>
          <label className="font-medium">Number of Designated Partners *</label>
          <input
            type="number"
            {...register("numberOfDesignatedPartners")}
            className={`w-full p-2 border rounded ${
              errors.numberOfDesignatedPartners ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.numberOfDesignatedPartners && (
            <p className="text-red-500 text-sm">
              {errors.numberOfDesignatedPartners.message}
            </p>
          )}
        </div>
      </div>

      {/* DESIGNATED PARTNERS */}
      <h4 className="mt-5 font-semibold">Designated Partners *</h4>

      {fields.map((field, idx) => (
        <div key={field.id} className="grid md:grid-cols-4 gap-4 mt-4 bg-white p-3 rounded border">

          <input
            {...register(`designatedPartners.${idx}.name`)}
            placeholder="Name"
            className={`p-2 border rounded ${
              errors.designatedPartners?.[idx]?.name ? "border-red-500" : ""
            }`}
          />

          <input
            {...register(`designatedPartners.${idx}.dinNo`)}
            placeholder="DIN Number"
            className={`p-2 border rounded ${
              errors.designatedPartners?.[idx]?.dinNo ? "border-red-500" : ""
            }`}
          />

          <input
            {...register(`designatedPartners.${idx}.panNo`)}
            placeholder="PAN"
            maxLength={10}
            className={`p-2 border rounded uppercase ${
              errors.designatedPartners?.[idx]?.panNo ? "border-red-500" : ""
            }`}
          />

          <input
            {...register(`designatedPartners.${idx}.address`)}
            placeholder="Address"
            className={`p-2 border rounded ${
              errors.designatedPartners?.[idx]?.address ? "border-red-500" : ""
            }`}
          />

          <button
            type="button"
            onClick={() => remove(idx)}
            className="px-2 py-1 bg-red-600 text-white rounded col-span-4"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() =>
          append({ name: "", dinNo: "", panNo: "", address: "" })
        }
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
      >
        + Add Designated Partner
      </button>
    </div>
  );
}
