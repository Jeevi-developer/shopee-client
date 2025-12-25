import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useSellerForm } from "../context/SellerFormContext";

/* Import Schemas */
import {
  proprietorshipSchema,
  partnershipSchema,
  llpSchema,
  pvtLtdSchema,
  publicLtdSchema,
  trustSchema,
} from "../validation/businessSchemas";

/* Business Type Components */
import ProprietorshipFields from "../businessTypes/ProprietorshipFields";
import PartnershipFields from "../businessTypes/PartnershipFields";
import LLPFields from "../businessTypes/LLPFields";
import PvtLtdFields from "../businessTypes/PrivateLtdFields";
import PublicLtdFields from "../businessTypes/PublicLtdFields";
import TrustFields from "../businessTypes/TrustFields";

/* Schema Map */
const schemaMap = {
  Proprietorship: proprietorshipSchema,
  Partnership: partnershipSchema,
  "Limited Liability Partnership": llpSchema,
  "Private Limited": pvtLtdSchema,
  "Public Limited": publicLtdSchema,
  Trust: trustSchema,
};

/* Lazy Schema (based on natureOfConcern) */
const lazyRootSchema = yup.lazy((value) => {
  const type = value?.natureOfConcern;
  return schemaMap[type] || proprietorshipSchema;
});

export default function Step2Business({ next, prev }) {
  const { formData, update } = useSellerForm();

  const defaultValues = {
    natureOfConcern: formData.natureOfConcern || "",
    firmName: formData.firmName || "",
    nameAsPerPan: formData.nameAsPerPan || "",
    hasGst: formData.hasGst || "",
    gstNumber: formData.gstNumber || "",
    gstFile: null,

    // NEW DOCUMENT FIELDS
    businessLicense: null,
    taxCertificate: null,
    govtIdProof: null,

    // business type fields
    partners: formData.partners || [],
    directors: formData.directors || [],
    designatedPartners: formData.designatedPartners || [],
    trustees: formData.trustees || [],

    ...formData,
  };

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(lazyRootSchema),
    mode: "onSubmit",
  });

  const selectedType = watch("natureOfConcern");
  const hasGst = watch("hasGst");

  const [fileInfo, setFileInfo] = useState({
    gstFile: null,
    businessLicense: null,
    taxCertificate: null,
    govtIdProof: null,
  });

  const formatFileSize = (bytes) => {
    if (!bytes) return "";
    return bytes < 1024 * 1024
      ? `${(bytes / 1024).toFixed(1)} KB`
      : `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const handleFileSelect = (e, name, onChange) => {
    const file = e.target.files?.[0] || null;
    onChange(file);

    setFileInfo((prev) => ({
      ...prev,
      [name]: file ? { name: file.name, size: file.size } : null,
    }));
  };

  /* Manual GST + FILE Validations */
  const validateFiles = (data) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    const checkFile = (file, name) => {
      if (!file) {
        alert(`${name} is required.`);
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        alert(`${name} must be PDF, JPG, or PNG.`);
        return false;
      }
      if (file.size > maxSize) {
        alert(`${name} must not exceed 2MB.`);
        return false;
      }
      return true;
    };

    // GST Certificate (only if GST = Yes)
    if (data.hasGst === "Yes") {
      if (!checkFile(data.gstFile, "GST Certificate")) return false;
    }

    // New Required Documents
    if (!checkFile(data.businessLicense, "Business License")) return false;
    if (!checkFile(data.taxCertificate, "Tax Certificate")) return false;
    if (!checkFile(data.govtIdProof, "Government ID Proof")) return false;

    return true;
  };

  const onSubmit = (data) => {
    if (!validateFiles(data)) return;

    Object.entries(data).forEach(([k, v]) => update(k, v));
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <h2 className="text-xl font-semibold mb-3">Business Information</h2>

      {/* ---------------------- ROW 1 ---------------------- */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Nature of Concern */}
        <div>
          <label className="block mb-2 font-medium">Nature of Concern *</label>
          <select
            {...register("natureOfConcern")}
            className={`w-full p-2 border rounded ${
              errors.natureOfConcern ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">SELECT</option>
            <option value="Proprietorship">Proprietorship</option>
            <option value="Partnership">Partnership</option>
            <option value="Limited Liability Partnership">
              Limited Liability Partnership
            </option>
            <option value="Private Limited">Private Limited</option>
            <option value="Public Limited">Public Limited</option>
            <option value="Trust">Trust</option>
          </select>
          {errors.natureOfConcern && (
            <p className="text-red-500 text-sm">
              {errors.natureOfConcern.message}
            </p>
          )}
        </div>

        {/* Business Name */}
        <div>
          <label className="block mb-2 font-medium">
            Business / Firm Name *
          </label>
          <input
            {...register("firmName")}
            className={`w-full p-2 border rounded ${
              errors.firmName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.firmName && (
            <p className="text-red-500 text-sm">{errors.firmName.message}</p>
          )}
        </div>
      </div>

      {/* ---------------------- ROW 2 ---------------------- */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Name as per PAN */}
        <div>
          <label className="block mb-2 font-medium">Name as per PAN *</label>
          <input
            {...register("nameAsPerPan")}
            className={`w-full p-2 border rounded ${
              errors.nameAsPerPan ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nameAsPerPan && (
            <p className="text-red-500 text-sm">
              {errors.nameAsPerPan.message}
            </p>
          )}
        </div>

        {/* GST Yes/No */}
        <div>
          <label className="block mb-2 font-medium">Do you have GST? *</label>
          <select
            {...register("hasGst")}
            className={`w-full p-2 border rounded ${
              errors.hasGst ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">SELECT</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
          {errors.hasGst && (
            <p className="text-red-500 text-sm">{errors.hasGst.message}</p>
          )}
        </div>
      </div>

      {/* ---------------------- ROW 3 (GST SECTION) ---------------------- */}
      {hasGst === "Yes" && (
        <div className="grid md:grid-cols-2 gap-4">
          {/* GST Number */}
          <div>
            <label className="block mb-1 font-medium">GST Number *</label>
            <input
              {...register("gstNumber")}
              maxLength={15}
              className={`w-full p-2 border rounded uppercase ${
                errors.gstNumber ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.gstNumber && (
              <p className="text-red-500 text-sm">{errors.gstNumber.message}</p>
            )}
          </div>

          {/* GST Certificate */}
          <div>
            <label className="block mb-1 font-medium">
              Upload GST Certificate *
            </label>
            <Controller
              name="gstFile"
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) =>
                      handleFileSelect(e, "gstFile", field.onChange)
                    }
                    className="w-full p-2 border rounded bg-white cursor-pointer"
                  />
                </>
              )}
            />
          </div>
        </div>
      )}

      {/* ---------------------- ROW 4 NEW DOCUMENTS ---------------------- */}
      <div className="grid md:grid-cols-3 gap-4">
        {/* Business License */}
        <div>
          <label className="block mb-1 font-medium">Business License *</label>
          <Controller
            name="businessLicense"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    handleFileSelect(e, "businessLicense", field.onChange);

                    if (file && file.size > 2 * 1024 * 1024) {
                      setFileInfo((prev) => ({
                        ...prev,
                        businessLicense: {
                          ...prev.businessLicense,
                          error: "File size must not exceed 2MB",
                        },
                      }));
                    } else {
                      setFileInfo((prev) => ({
                        ...prev,
                        businessLicense: {
                          ...prev.businessLicense,
                          error: null,
                        },
                      }));
                    }
                  }}
                  className="w-full p-2 border rounded bg-white cursor-pointer"
                />

                {fileInfo.businessLicense?.error && (
                  <p className="text-red-600 text-sm">
                    {fileInfo.businessLicense.error}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Tax Certificate */}
        <div>
          <label className="block mb-1 font-medium">Tax Certificate *</label>
          <Controller
            name="taxCertificate"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    handleFileSelect(e, "taxCertificate", field.onChange);

                    if (file && file.size > 2 * 1024 * 1024) {
                      setFileInfo((prev) => ({
                        ...prev,
                        taxCertificate: {
                          ...prev.taxCertificate,
                          error: "File size must not exceed 2MB",
                        },
                      }));
                    } else {
                      setFileInfo((prev) => ({
                        ...prev,
                        taxCertificate: { ...prev.taxCertificate, error: null },
                      }));
                    }
                  }}
                  className="w-full p-2 border rounded bg-white cursor-pointer"
                />

                {fileInfo.taxCertificate?.error && (
                  <p className="text-red-600 text-sm">
                    {fileInfo.taxCertificate.error}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Government ID Proof */}
        <div>
          <label className="block mb-1 font-medium">
            Govt ID Proof (DL / Passport) *
          </label>
          <Controller
            name="govtIdProof"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    field.onChange(file);
                    handleFileSelect(e, "govtIdProof", field.onChange);

                    if (file && file.size > 2 * 1024 * 1024) {
                      setFileInfo((prev) => ({
                        ...prev,
                        govtIdProof: {
                          ...prev.govtIdProof,
                          error: "File size must not exceed 2MB",
                        },
                      }));
                    } else {
                      setFileInfo((prev) => ({
                        ...prev,
                        govtIdProof: { ...prev.govtIdProof, error: null },
                      }));
                    }
                  }}
                  className="w-full p-2 border rounded bg-white cursor-pointer"
                />

                {/* {fileInfo.govtIdProof && (
                  <p className="text-sm mt-1">
                    <span className="font-medium">
                      {fileInfo.govtIdProof.name}
                    </span>
                    {" • "}
                    {formatFileSize(fileInfo.govtIdProof.size)}
                  </p>
                )} */}

                {fileInfo.govtIdProof?.error && (
                  <p className="text-red-600 text-sm">
                    {fileInfo.govtIdProof.error}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>

      {/* ---------------------- DYNAMIC BUSINESS FIELDS ---------------------- */}
      {selectedType === "Proprietorship" && (
        <ProprietorshipFields
          register={register}
          errors={errors}
          control={control}
        />
      )}
      {selectedType === "Partnership" && (
        <PartnershipFields
          register={register}
          errors={errors}
          control={control}
        />
      )}
      {selectedType === "Limited Liability Partnership" && (
        <LLPFields register={register} errors={errors} control={control} />
      )}
      {selectedType === "Private Limited" && (
        <PvtLtdFields register={register} errors={errors} control={control} />
      )}
      {selectedType === "Public Limited" && (
        <PublicLtdFields
          register={register}
          errors={errors}
          control={control}
        />
      )}
      {selectedType === "Trust" && (
        <TrustFields register={register} errors={errors} control={control} />
      )}

      {/* Buttons */}
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={prev}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60"
        >
          {isSubmitting ? "Validating..." : "Next"}
        </button>
      </div>
    </form>
  );
}
