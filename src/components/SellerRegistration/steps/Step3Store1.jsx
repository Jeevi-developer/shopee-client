/* ---- Step3Store.jsx ---- */
import React, { useEffect } from "react";
import { useSellerForm } from "../context/SellerFormContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../redux/categorySlice";

// File Validation
const fileValidation = yup
  .mixed()
  .required("Required")
  .test("fileType", "Only JPG/PNG allowed", (value) => {
    if (!value) return false;
    if (typeof value === "string") return true;
    return ["image/jpeg", "image/png"].includes(value.type);
  });

// Validation Schema
const storeSchema = yup.object().shape({
  storeName: yup.string().required("Store Name is required"),
  storeDescription: yup.string().required("Store Description is required"),
  storeCity: yup.string().required("City is required"),
  storeState: yup.string().required("State is required"),
  storePincode: yup
    .string()
    .required("Pincode is required")
    .matches(/^\d{6}$/, "Enter valid 6-digit pincode"),
  storeAddress: yup.string().required("Store Address is required"),

  /* STORE CATEGORIES */
  storeCategories: yup
    .array()
    .of(
      yup.object().shape({
        category: yup.string().required("Select category"),
        customCategory: yup.string().optional(),
      })
    )
    .min(1, "Add at least one category"),

  /* STORE FILES */
  storeLogo: fileValidation,
  storeBanner: fileValidation,

  /* PICKUP DETAILS */
  pickupAddress: yup.string().required("Pickup Address is required"),
  pickupPincode: yup
    .string()
    .required("Pickup pincode is required")
    .matches(/^\d{6}$/, "Enter valid 6-digit pincode"),
  pickupContact: yup
    .string()
    .required("Pickup contact is required")
    .matches(/^\d{10}$/, "Enter valid 10-digit number"),

  esignature: fileValidation,
  addressProof: fileValidation,
  photoId: fileValidation,
});

export default function Step3Store({ next, prev }) {
  const { formData, update } = useSellerForm();
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    if (!categories?.length) dispatch(fetchCategories());
  }, [categories]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      ...formData,
      storeCategories:
        formData.storeCategories?.length > 0
          ? formData.storeCategories
          : [{ category: "", customCategory: "" }],
    },
    resolver: yupResolver(storeSchema),
  });

  const storeCategories = watch("storeCategories") || [];

  // Add / Remove Category
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

  const onSubmit = (data) => {
    Object.keys(data).forEach((key) => update(key, data[key]));
    next();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-gray-100 text-black p-5 rounded shadow-md"
    >
      <h2 className="text-xl font-semibold mb-4">Store Setup</h2>

      {/* STORE BASIC DETAILS */}
      <div className="grid md:grid-cols-2 gap-3">
        <InputField
          label="Store Name"
          name="storeName"
          register={register}
          error={errors.storeName}
        />
        <InputField
          label="Store Description"
          name="storeDescription"
          register={register}
          error={errors.storeDescription}
        />
        <InputField
          label="City"
          name="storeCity"
          register={register}
          error={errors.storeCity}
        />
        <InputField
          label="State"
          name="storeState"
          register={register}
          error={errors.storeState}
        />
        <InputField
          label="Pincode"
          name="storePincode"
          register={register}
          error={errors.storePincode}
        />
      </div>

      {/* ADDRESS */}
      <div className="mt-3">
        <textarea
          {...register("storeAddress")}
          placeholder="Store Address *"
          className="w-full p-2 border rounded"
        />
        {errors.storeAddress && <Error msg={errors.storeAddress.message} />}
      </div>

      {/* CATEGORIES */}
      <div className="mt-3">
        <h4 className="mb-2 font-semibold">Categories *</h4>

        {storeCategories.map((c, idx) => (
          <div key={idx} className="flex gap-2 items-center mb-2">
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

        {errors.storeCategories && (
          <Error msg={errors.storeCategories.message} />
        )}

        <button
          type="button"
          onClick={addCategory}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Add Category
        </button>
      </div>

      {/* STORE LOGO & BANNER */}
      <div className="mt-3 grid md:grid-cols-2 gap-3">
        <FileUpload
          label="Store Logo"
          name="storeLogo"
          setValue={setValue}
          error={errors.storeLogo}
        />
        <FileUpload
          label="Store Banner"
          name="storeBanner"
          setValue={setValue}
          error={errors.storeBanner}
        />
      </div>

      {/* PICKUP DETAILS */}
      <h3 className="text-lg font-semibold mt-5 mb-2">Pickup Details</h3>

      <InputField
        label="Pickup Address"
        name="pickupAddress"
        register={register}
        error={errors.pickupAddress}
      />
      <InputField
        label="Pickup Pincode"
        name="pickupPincode"
        register={register}
        error={errors.pickupPincode}
      />
      <InputField
        label="Pickup Contact Number"
        name="pickupContact"
        register={register}
        error={errors.pickupContact}
      />

      {/* BUTTONS */}
      <div className="flex justify-between mt-4">
        <button
          type="button"
          onClick={prev}
          className="px-4 py-2 bg-gray-700 text-white rounded"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </form>
  );
}

/* Reusable Components */
function InputField({ label, name, register, error }) {
  return (
    <div className="mt-2">
      <input
        {...register(name)}
        placeholder={`${label} *`}
        className="p-2 border rounded w-full"
      />
      {error && <Error msg={error.message} />}
    </div>
  );
}

function FileUpload({ label, name, setValue, error }) {
  return (
    <div className="mt-2">
      <label className="block text-sm mb-1">{label} *</label>
      <input
        type="file"
        accept="image/jpeg, image/png"
        onChange={(e) => setValue(name, e.target.files[0])}
        className="text-black"
      />
      {error && <Error msg={error.message} />}
    </div>
  );
}

function Error({ msg }) {
  return <p className="text-red-600 text-sm">{msg}</p>;
}
