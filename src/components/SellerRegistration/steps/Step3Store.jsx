import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useSellerForm } from "../context/SellerFormContext";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/categorySlice";

// Validation Schema
const schema = yup.object({
  storeName: yup.string().required("Store Name is required"),
  storeDescription: yup.string().required("Store Description is required"),
  storeCity: yup.string().required("City is required"),
  storeState: yup.string().required("State is required"),
  storePincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Enter valid 6-digit pincode"),
  storeAddress: yup.string().required("Store Address is required"),
  storeCategories: yup
    .array()
    .of(
      yup.object().shape({
        category: yup.string().required("Select category"),
        customCategory: yup.string().optional(),
      })
    )
    .min(1, "Add at least one category"),
  storeLogo: yup.mixed().required("Store Logo is required"),
  pickupAddress: yup.string().required("Pickup Address is required"),
  pickupPincode: yup
    .string()
    .required("Pickup pincode is required")
    .matches(/^\d{6}$/, "Enter valid 6-digit pincode"),
  pickupContact: yup
    .string()
    .required("Pickup contact is required")
    .matches(/^\d{10}$/, "Enter valid 10-digit number"),
});

export default function Step3Store({ next, back }) {
  const { formData, update } = useSellerForm();
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories);

  const [logoPreview, setLogoPreview] = useState(formData.storeLogo || null);

  useEffect(() => {
    if (!categories?.length) dispatch(fetchCategories());
  }, [categories]);

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      storeName: formData.storeName || "",
      storeDescription: formData.storeDescription || "",
      storeCity: formData.storeCity || "",
      storeState: formData.storeState || "",
      storePincode: formData.storePincode || "",
      storeAddress: formData.storeAddress || "",
      storeCategories:
        formData.storeCategories?.length > 0
          ? formData.storeCategories
          : [{ category: "", customCategory: "" }],
      storeLogo: formData.storeLogo || null,
      pickupAddress: formData.pickupAddress || "",
      pickupPincode: formData.pickupPincode || "",
      pickupContact: formData.pickupContact || "",
    },
    resolver: yupResolver(schema),
  });

  const storeCategories = watch("storeCategories") || [];
  const logoFile = watch("storeLogo");

  useEffect(() => {
    if (logoFile && logoFile instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setLogoPreview(reader.result);
      reader.readAsDataURL(logoFile);
    }
  }, [logoFile]);

  const addCategory = () =>
    setValue("storeCategories", [
      ...storeCategories,
      { category: "", customCategory: "" },
    ]);

  const removeCategory = (i) =>
    setValue(
      "storeCategories",
      storeCategories.filter((_, idx) => idx !== i)
    );

  const setCategory = (i, key, val) =>
    setValue(
      "storeCategories",
      storeCategories.map((c, idx) => (idx === i ? { ...c, [key]: val } : c))
    );

  const onSubmit = (values) => {
    // Update form values
    Object.keys(values).forEach((key) => {
      update(key, values[key]);
    });

    next(); // Proceed to next step
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <h2 className="text-2xl font-semibold">Store Setup</h2>

      {/* Store Basic Details */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Store Name */}
        <div>
          <label>Store Name *</label>
          <input
            {...register("storeName")}
            className={`w-full p-3 border rounded ${
              errors.storeName ? "border-red-500" : ""
            }`}
          />
          {errors.storeName && (
            <p className="text-red-600 text-sm">{errors.storeName.message}</p>
          )}
        </div>

        {/* Store Description */}
        <div className="md:col-span-2">
          <label>Store Description *</label>
          <textarea
            {...register("storeDescription")}
            rows={3}
            className={`w-full p-3 border rounded ${
              errors.storeDescription ? "border-red-500" : ""
            }`}
          />
          {errors.storeDescription && (
            <p className="text-red-600 text-sm">
              {errors.storeDescription.message}
            </p>
          )}
        </div>

        {/* Store Address */}
        <div className="md:col-span-2">
          <label>Store Address *</label>
          <textarea
            {...register("storeAddress")}
            rows={3}
            className={`w-full p-3 border rounded ${
              errors.storeAddress ? "border-red-500" : ""
            }`}
          />
          {errors.storeAddress && (
            <p className="text-red-600 text-sm">
              {errors.storeAddress.message}
            </p>
          )}
        </div>

        <div>
          <label>City *</label>
          <input
            {...register("storeCity")}
            className={`w-full p-3 border rounded ${
              errors.storeCity ? "border-red-500" : ""
            }`}
          />
          {errors.storeCity && (
            <p className="text-red-600 text-sm">{errors.storeCity.message}</p>
          )}
        </div>

        <div>
          <label>State *</label>
          <input
            {...register("storeState")}
            className={`w-full p-3 border rounded ${
              errors.storeState ? "border-red-500" : ""
            }`}
          />
          {errors.storeState && (
            <p className="text-red-600 text-sm">{errors.storeState.message}</p>
          )}
        </div>

        <div>
          <label>Pincode *</label>
          <input
            {...register("storePincode")}
            className={`w-full p-3 border rounded ${
              errors.storePincode ? "border-red-500" : ""
            }`}
          />
          {errors.storePincode && (
            <p className="text-red-600 text-sm">
              {errors.storePincode.message}
            </p>
          )}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-2">Categories *</h3>
        {storeCategories.map((c, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <select
              value={c.category}
              onChange={(e) => setCategory(idx, "category", e.target.value)}
              className="p-2 border rounded flex-1"
            >
              <option value="">Select Category</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <input
              value={c.customCategory}
              onChange={(e) =>
                setCategory(idx, "customCategory", e.target.value)
              }
              placeholder="Custom (optional)"
              className="p-2 border rounded flex-1"
            />

            <button
              type="button"
              onClick={() => removeCategory(idx)}
              className="px-2 py-1 bg-red-600 text-white rounded"
            >
              Remove
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addCategory}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add Category
        </button>
      </div>

      {/* Store Logo */}
      <div>
        <label>Store Logo *</label>
        <Controller
          name="storeLogo"
          control={control}
          render={({ field }) => (
            <input
              type="file"
              accept="image/png,image/jpeg"
              onChange={(e) => field.onChange(e.target.files[0])}
              className="w-full p-3 border rounded"
            />
          )}
        />
        {errors.storeLogo && (
          <p className="text-red-600 text-sm">{errors.storeLogo.message}</p>
        )}
        {logoPreview && (
          <img
            src={logoPreview}
            alt="Logo Preview"
            className="mt-2 h-24 w-24 object-contain border p-1 rounded"
          />
        )}
      </div>

      {/* Pickup Details */}
      <h3 className="text-lg font-semibold mt-4">Pickup Details</h3>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label>Pickup Address *</label>
          <input
            {...register("pickupAddress")}
            className={`w-full p-3 border rounded ${
              errors.pickupAddress ? "border-red-500" : ""
            }`}
          />
          {errors.pickupAddress && (
            <p className="text-red-600 text-sm">
              {errors.pickupAddress.message}
            </p>
          )}
        </div>

        <div>
          <label>Pickup Pincode *</label>
          <input
            {...register("pickupPincode")}
            className={`w-full p-3 border rounded ${
              errors.pickupPincode ? "border-red-500" : ""
            }`}
          />
          {errors.pickupPincode && (
            <p className="text-red-600 text-sm">
              {errors.pickupPincode.message}
            </p>
          )}
        </div>

        <div>
          <label>Pickup Contact *</label>
          <input
            {...register("pickupContact")}
            className={`w-full p-3 border rounded ${
              errors.pickupContact ? "border-red-500" : ""
            }`}
          />
          {errors.pickupContact && (
            <p className="text-red-600 text-sm">
              {errors.pickupContact.message}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-4">
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
