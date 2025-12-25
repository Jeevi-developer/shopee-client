import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSellerForm } from "../context/SellerFormContext";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";

export default function Step2Business({ next, back }) {
  const { formData, update } = useSellerForm();
  const [categories, setCategories] = useState([]);

  const schema = yup.object({
    businessName: yup.string().required("Business Name is required"),
    gstNumber: yup
      .string()
      .required("GST number is required")
      .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST"),
    panNumber: yup
      .string()
      .required("PAN is required")
      .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Invalid PAN"),
    category: yup.string().required("Category required"),
    businessDocument: yup
      .mixed()
      .required("Business document required")
      .test(
        "fileSize",
        "File too large (max 5MB)",
        (file) => file && file.size <= 5 * 1024 * 1024
      )
      .test(
        "fileType",
        "Only PDF or image allowed",
        (file) =>
          file &&
          ["application/pdf", "image/jpeg", "image/png", "image/jpg"].includes(file.type)
      ),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      businessName: formData.businessName || "",
      gstNumber: formData.gstNumber || "",
      panNumber: formData.panNumber || "",
      category: formData.category || "",
      businessDocument: formData.businessDocument || null,
    },
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axiosInstance.get("/categories");
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategories();
  }, []);

  const onSubmit = (values) => {
    Object.keys(values).forEach((key) => update(key, values[key]));
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <h2 className="text-2xl font-semibold">Business Details</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label>Business Name *</label>
          <input
            {...register("businessName")}
            className={`w-full p-3 border rounded ${
              errors.businessName ? "border-red-500" : ""
            }`}
          />
          {errors.businessName && (
            <p className="text-red-600 text-sm">{errors.businessName.message}</p>
          )}
        </div>

        <div>
          <label>GST Number *</label>
          <input
            {...register("gstNumber")}
            className={`w-full p-3 border rounded ${
              errors.gstNumber ? "border-red-500" : ""
            }`}
          />
          {errors.gstNumber && (
            <p className="text-red-600 text-sm">{errors.gstNumber.message}</p>
          )}
        </div>

        <div>
          <label>PAN Number *</label>
          <input
            {...register("panNumber")}
            className={`w-full p-3 border rounded ${
              errors.panNumber ? "border-red-500" : ""
            }`}
          />
          {errors.panNumber && (
            <p className="text-red-600 text-sm">{errors.panNumber.message}</p>
          )}
        </div>

        <div>
          <label>Category *</label>
          <select
            {...register("category")}
            className={`w-full p-3 border rounded ${
              errors.category ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label>Upload Business Document *</label>
          <Controller
            name="businessDocument"
            control={control}
            render={({ field }) => (
              <input
                type="file"
                accept="application/pdf,image/*"
                onChange={(e) => field.onChange(e.target.files[0])}
                className={`w-full p-3 border rounded ${
                  errors.businessDocument ? "border-red-500" : ""
                }`}
              />
            )}
          />
          {errors.businessDocument && (
            <p className="text-red-600 text-sm">{errors.businessDocument.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={back}
          className="px-6 py-3 bg-gray-400 text-white rounded"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
}
