/* ---- PrivateLtdFields.jsx ---- */
import React from "react";
import { useFieldArray, Controller } from "react-hook-form";

export default function PrivateLtdFields({ register, control, errors }) {
  // Use RHF's useFieldArray for dynamic directors
  const { fields, append, remove } = useFieldArray({
    control,
    name: "directors",
  });

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mt-6">
      <h3 className="text-lg font-bold mb-4">Private Limited Company Details</h3>

      <div className="grid md:grid-cols-3 gap-4">

        <div>
          <label className="font-medium">Company Name *</label>
          <input
            {...register("pvtLtdName")}
            className={`w-full p-2 border rounded ${
              errors.pvtLtdName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pvtLtdName && (
            <p className="text-red-500 text-sm">{errors.pvtLtdName.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">CIN Number *</label>
          <input
            {...register("cinNumber")}
            className={`w-full p-2 border rounded ${
              errors.cinNumber ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.cinNumber && (
            <p className="text-red-500 text-sm">{errors.cinNumber.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Company PAN *</label>
          <input
            {...register("pvtLtdPan")}
            maxLength={10}
            className={`w-full p-2 border rounded uppercase ${
              errors.pvtLtdPan ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.pvtLtdPan && (
            <p className="text-red-500 text-sm">{errors.pvtLtdPan.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Incorporation Date *</label>
          <input
            type="date"
            {...register("incorporationDate")}
            className={`w-full p-2 border rounded ${
              errors.incorporationDate ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.incorporationDate && (
            <p className="text-red-500 text-sm">{errors.incorporationDate.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Authorized Capital *</label>
          <input
            {...register("authorizedCapital")}
            className={`w-full p-2 border rounded ${
              errors.authorizedCapital ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.authorizedCapital && (
            <p className="text-red-500 text-sm">{errors.authorizedCapital.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">Paid-Up Capital *</label>
          <input
            {...register("paidUpCapital")}
            className={`w-full p-2 border rounded ${
              errors.paidUpCapital ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.paidUpCapital && (
            <p className="text-red-500 text-sm">{errors.paidUpCapital.message}</p>
          )}
        </div>

        {/* Upload Certificates */}
        <div>
          <label className="font-medium">Incorporation Certificate *</label>
          <Controller
            name="incorporationCertificate"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={`w-full p-2 border rounded bg-white ${
                  errors.incorporationCertificate ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.incorporationCertificate && (
            <p className="text-red-500 text-sm">{errors.incorporationCertificate.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">MOA Document *</label>
          <Controller
            name="moaDocument"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={`w-full p-2 border rounded bg-white ${
                  errors.moaDocument ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.moaDocument && (
            <p className="text-red-500 text-sm">{errors.moaDocument.message}</p>
          )}
        </div>

        <div>
          <label className="font-medium">AOA Document *</label>
          <Controller
            name="aoaDocument"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={`w-full p-2 border rounded bg-white ${
                  errors.aoaDocument ? "border-red-500" : "border-gray-300"
                }`}
              />
            )}
          />
          {errors.aoaDocument && (
            <p className="text-red-500 text-sm">{errors.aoaDocument.message}</p>
          )}
        </div>
      </div>

      {/* Directors */}
      <h4 className="mt-5 font-semibold">Directors *</h4>

      {fields.map((item, idx) => (
        <div key={item.id} className="grid md:grid-cols-4 gap-4 bg-white p-3 mt-3 rounded">
          <input
            {...register(`directors.${idx}.name`)}
            placeholder="Name"
            className={`p-2 border rounded ${
              errors.directors?.[idx]?.name ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register(`directors.${idx}.dinNo`)}
            placeholder="DIN"
            className={`p-2 border rounded ${
              errors.directors?.[idx]?.dinNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register(`directors.${idx}.panNo`)}
            placeholder="PAN"
            maxLength={10}
            className={`p-2 border rounded uppercase ${
              errors.directors?.[idx]?.panNo ? "border-red-500" : "border-gray-300"
            }`}
          />
          <input
            {...register(`directors.${idx}.address`)}
            placeholder="Address"
            className={`p-2 border rounded ${
              errors.directors?.[idx]?.address ? "border-red-500" : "border-gray-300"
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
