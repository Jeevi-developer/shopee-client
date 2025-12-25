/* ---- PubLtdFields.jsx ---- */
import React from "react";
import { Controller, useFieldArray } from "react-hook-form";

export default function PubLtdFields({ register, control, errors }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "publicDirectors",
  });

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mt-6">
      <h3 className="text-lg font-bold mb-4">Public Limited Company Details</h3>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Company Name */}
        <div>
          <label className="font-medium">Company Name *</label>
          <input
            {...register("publicLtdName")}
            className={`w-full p-2 border rounded ${
              errors.publicLtdName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.publicLtdName && (
            <p className="text-red-500 text-sm">{errors.publicLtdName.message}</p>
          )}
        </div>

        {/* CIN Number */}
        <div>
          <label className="font-medium">CIN Number *</label>
          <input
            {...register("publicCinNumber")}
            className={`w-full p-2 border rounded ${
              errors.publicCinNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.publicCinNumber && (
            <p className="text-red-500 text-sm">{errors.publicCinNumber.message}</p>
          )}
        </div>

        {/* PAN */}
        <div>
          <label className="font-medium">Company PAN *</label>
          <input
            {...register("publicLtdPan")}
            maxLength={10}
            className={`w-full p-2 border rounded uppercase ${
              errors.publicLtdPan ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.publicLtdPan && (
            <p className="text-red-500 text-sm">{errors.publicLtdPan.message}</p>
          )}
        </div>

        {/* Incorporation Certificate */}
        <div>
          <label className="font-medium">Incorporation Certificate *</label>
          <Controller
            name="publicIncorporationCertificate"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={`w-full p-2 border rounded bg-white ${
                  errors.publicIncorporationCertificate ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.publicIncorporationCertificate && (
            <p className="text-red-500 text-sm">{errors.publicIncorporationCertificate.message}</p>
          )}
        </div>
      </div>

      {/* Directors */}
      <h4 className="mt-5 font-semibold">Directors *</h4>
      {fields.map((item, idx) => (
        <div key={item.id} className="grid md:grid-cols-4 gap-4 bg-white p-3 mt-3 rounded">
          <input
            {...register(`publicDirectors.${idx}.name`)}
            placeholder="Director Name"
            className={`p-2 border rounded ${
              errors.publicDirectors?.[idx]?.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register(`publicDirectors.${idx}.dinNo`)}
            placeholder="DIN"
            className={`p-2 border rounded ${
              errors.publicDirectors?.[idx]?.dinNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register(`publicDirectors.${idx}.panNo`)}
            placeholder="PAN"
            maxLength={10}
            className={`p-2 border rounded uppercase ${
              errors.publicDirectors?.[idx]?.panNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register(`publicDirectors.${idx}.address`)}
            placeholder="Address"
            className={`p-2 border rounded ${
              errors.publicDirectors?.[idx]?.address ? "border-red-500" : "border-gray-300"
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
        onClick={() => append({ name: "", dinNo: "", panNo: "", address: "" })}
        className="mt-3 px-3 py-1 bg-blue-600 text-white rounded"
      >
        + Add Director
      </button>
    </div>
  );
}
