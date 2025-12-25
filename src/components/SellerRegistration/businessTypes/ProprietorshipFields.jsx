import React from "react";
import { Controller } from "react-hook-form";

export default function ProprietorshipFields({ register, errors, control }) {
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-gray-50 p-4 rounded-lg border mt-6">
      <h3 className="text-lg font-semibold mb-4">Proprietorship Details</h3>

      <div className="grid md:grid-cols-3 gap-4">

        {/* Proprietor Name */}
        <div>
          <label className="block mb-1 font-medium text-black">Proprietor Name *</label>
          <input
            {...register("proprietorName")}
            className={`w-full p-2 border rounded ${errors.proprietorName ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter name"
          />
          {errors.proprietorName && <p className="text-red-500 text-sm">{errors.proprietorName.message}</p>}
        </div>

        {/* DOB */}
        <div>
          <label className="block mb-1 font-medium text-black">Date of Birth *</label>
          <input
            type="date"
            {...register("proprietorDob")}
            max={todayStr}
            className={`w-full p-2 border rounded ${errors.proprietorDob ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.proprietorDob && <p className="text-red-500 text-sm">{errors.proprietorDob.message}</p>}
        </div>

        {/* PAN */}
        <div>
          <label className="block mb-1 font-medium text-black">PAN Number *</label>
          <input
            {...register("proprietorPan")}
            className={`w-full p-2 border rounded uppercase ${errors.proprietorPan ? "border-red-500" : "border-gray-300"}`}
            maxLength={10}
            placeholder="ABCDE1234F"
          />
          {errors.proprietorPan && <p className="text-red-500 text-sm">{errors.proprietorPan.message}</p>}
        </div>

        {/* Aadhaar */}
        <div>
          <label className="block mb-1 font-medium text-black">Aadhaar Number *</label>
          <input
            {...register("proprietorAadhaar")}
            className={`w-full p-2 border rounded ${errors.proprietorAadhaar ? "border-red-500" : "border-gray-300"}`}
            maxLength={12}
            placeholder="12-digit Aadhaar"
          />
          {errors.proprietorAadhaar && <p className="text-red-500 text-sm">{errors.proprietorAadhaar.message}</p>}
        </div>

        {/* Mobile */}
        <div>
          <label className="block mb-1 font-medium text-black">Mobile *</label>
          <input
            {...register("proprietorMobile")}
            className={`w-full p-2 border rounded ${errors.proprietorMobile ? "border-red-500" : "border-gray-300"}`}
            placeholder="10-digit mobile"
            maxLength={10}
          />
          {errors.proprietorMobile && <p className="text-red-500 text-sm">{errors.proprietorMobile.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 font-medium text-black">Email *</label>
          <input
            {...register("proprietorEmail")}
            className={`w-full p-2 border rounded ${errors.proprietorEmail ? "border-red-500" : "border-gray-300"}`}
            placeholder="example@mail.com"
          />
          {errors.proprietorEmail && <p className="text-red-500 text-sm">{errors.proprietorEmail.message}</p>}
        </div>

        {/* Address */}
        <div className="md:col-span-3">
          <label className="block mb-1 font-medium text-black">Address *</label>
          <input
            {...register("proprietorAddress")}
            className={`w-full p-2 border rounded ${errors.proprietorAddress ? "border-red-500" : "border-gray-300"}`}
            placeholder="Full address"
          />
          {errors.proprietorAddress && <p className="text-red-500 text-sm">{errors.proprietorAddress.message}</p>}
        </div>

        {/* PAN Upload */}
        <div>
          <label className="block mb-1 font-medium text-black">Upload PAN Card *</label>
          <Controller
            name="proprietorPanCard"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded bg-white cursor-pointer"
              />
            )}
          />
          {errors.proprietorPanCard && <p className="text-red-500 text-sm">{errors.proprietorPanCard.message}</p>}
        </div>

        {/* Aadhaar Upload */}
        <div>
          <label className="block mb-1 font-medium text-black">Upload Aadhaar *</label>
          <Controller
            name="proprietorAadhaarCard"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded bg-white cursor-pointer"
              />
            )}
          />
          {errors.proprietorAadhaarCard && <p className="text-red-500 text-sm">{errors.proprietorAadhaarCard.message}</p>}
        </div>

        {/* Photo */}
        <div>
          <label className="block mb-1 font-medium text-black">Upload Photo *</label>
          <Controller
            name="proprietorPhoto"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => field.onChange(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded bg-white cursor-pointer"
              />
            )}
          />
          {errors.proprietorPhoto && <p className="text-red-500 text-sm">{errors.proprietorPhoto.message}</p>}
        </div>
      </div>
    </div>
  );
}
