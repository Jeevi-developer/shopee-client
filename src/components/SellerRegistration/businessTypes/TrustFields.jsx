/* ---- TrustFields.jsx ---- */
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

export default function TrustFields({ register, control, errors }) {
  // Optional: if you have multiple trustees
  const { fields, append, remove } = useFieldArray({
    control,
    name: "trustees", // Array of trustees if needed
  });

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mt-6">
      <h3 className="text-lg font-semibold mb-4">Trust Details</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Trust Name */}
        <div>
          <label className="block mb-1 font-medium">Trust Name *</label>
          <input
            {...register("trustName")}
            className={`w-full p-2 border rounded ${
              errors.trustName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.trustName && (
            <p className="text-red-500 text-sm">{errors.trustName.message}</p>
          )}
        </div>

        {/* Trust PAN */}
        <div>
          <label className="block mb-1 font-medium">Trust PAN *</label>
          <input
            {...register("trustPAN")}
            maxLength={10}
            className={`w-full p-2 border rounded uppercase ${
              errors.trustPAN ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.trustPAN && (
            <p className="text-red-500 text-sm">{errors.trustPAN.message}</p>
          )}
        </div>

        {/* Registration Certificate */}
        <div>
          <label className="block mb-1 font-medium">Registration Certificate *</label>
          <Controller
            name="trustCertificate"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={`w-full p-2 border rounded bg-white cursor-pointer ${
                  errors.trustCertificate ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.trustCertificate && (
            <p className="text-red-500 text-sm">{errors.trustCertificate.message}</p>
          )}
        </div>

        {/* Trust Address */}
        <div className="md:col-span-3">
          <label className="block mb-1 font-medium">Trust Address *</label>
          <input
            {...register("trustAddress")}
            className={`w-full p-2 border rounded ${
              errors.trustAddress ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.trustAddress && (
            <p className="text-red-500 text-sm">{errors.trustAddress.message}</p>
          )}
        </div>
      </div>

      {/* Optional Trustees Array */}
      {fields.length > 0 && <h4 className="mt-5 font-semibold">Trustees</h4>}
      {fields.map((item, idx) => (
        <div key={item.id} className="grid md:grid-cols-4 gap-4 bg-white p-3 mt-3 rounded">
          <input
            {...register(`trustees.${idx}.name`)}
            placeholder="Trustee Name"
            className={`p-2 border rounded ${
              errors.trustees?.[idx]?.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register(`trustees.${idx}.panNo`)}
            placeholder="PAN"
            className={`p-2 border rounded uppercase ${
              errors.trustees?.[idx]?.panNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register(`trustees.${idx}.address`)}
            placeholder="Address"
            className={`p-2 border rounded ${
              errors.trustees?.[idx]?.address ? "border-red-500" : "border-gray-300"
            }`}
          />
          <button
            type="button"
            onClick={() => remove(idx)}
            className="px-2 py-1 bg-red-600 text-white rounded md:col-span-4"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={() => append({ name: "", panNo: "", address: "" })}
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
      >
        + Add Trustee
      </button>
    </div>
  );
}
