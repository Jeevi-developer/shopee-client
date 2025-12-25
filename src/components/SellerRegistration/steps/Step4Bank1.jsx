/* -----------------------------------------
   Step4Bank.jsx (Final Full Working Code)
------------------------------------------ */
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSellerForm } from "../context/SellerFormContext";
import { bankSchema } from "../validation/businessSchemas";

const Step4Bank = ({ onNext }) => {
  const { formData, setFormData } = useSellerForm();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(bankSchema),
    defaultValues: {
      accountHolderName: formData.accountHolderName || "",
      bankName: formData.bankName || "",
      branchName: formData.branchName || "",
      accountNumber: formData.accountNumber || "",
      confirmAccountNumber: formData.confirmAccountNumber || "",
      ifscCode: formData.ifscCode || "",
      accountType: formData.accountType || "",
      bankStatement: formData.bankStatement || null,
    },
  });

  /* Sync uploads with global state */
  const bankStatementFile = watch("bankStatement");

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      bankStatement: bankStatementFile,
    }));
  }, [bankStatementFile, setFormData]);

  /* Handle final form submission */
  const onSubmit = async (data) => {
    try {
      const finalData = { ...formData, ...data };

      const formPayload = new FormData();

      Object.keys(finalData).forEach((key) => {
        if (key === "bankStatement") {
          if (finalData.bankStatement instanceof FileList) {
            formPayload.append("bankStatement", finalData.bankStatement[0]);
          }
        } else {
          formPayload.append(key, finalData[key]);
        }
      });

      const res = await fetch("http://localhost:5000/api/seller/register", {
        method: "POST",
        body: formPayload,
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      alert("🎉 Registration Successful!");
      onNext(); // Go to Success Page

    } catch (err) {
      alert("Something went wrong. Try again!");
      console.log(err);
    }
  };

  return (
    <div className="space-y-6 text-black">
      <h2 className="text-xl font-semibold mb-4 text-black">Bank Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

        {/* Account Holder Name */}
        <div>
          <label className="block font-medium ">Account Holder Name</label>
          <input
            type="text"
            {...register("accountHolderName")}
            className="input"
          />
          {errors.accountHolderName && (
            <p className="text-red-500 text-sm">{errors.accountHolderName.message}</p>
          )}
        </div>

        {/* Bank Name */}
        <div>
          <label className="block font-medium">Bank Name</label>
          <input type="text" {...register("bankName")} className="input" />
          {errors.bankName && (
            <p className="text-red-500 text-sm">{errors.bankName.message}</p>
          )}
        </div>

        {/* Branch Name */}
        <div>
          <label className="block font-medium">Branch Name</label>
          <input type="text" {...register("branchName")} className="input" />
          {errors.branchName && (
            <p className="text-red-500 text-sm">{errors.branchName.message}</p>
          )}
        </div>

        {/* Account Number */}
        <div>
          <label className="block font-medium">Account Number</label>
          <input type="text" {...register("accountNumber")} className="input" />
          {errors.accountNumber && (
            <p className="text-red-500 text-sm">{errors.accountNumber.message}</p>
          )}
        </div>

        {/* Confirm Account Number */}
        <div>
          <label className="block font-medium">Confirm Account Number</label>
          <input
            type="text"
            {...register("confirmAccountNumber")}
            className="input"
          />
          {errors.confirmAccountNumber && (
            <p className="text-red-500 text-sm">
              {errors.confirmAccountNumber.message}
            </p>
          )}
        </div>

        {/* IFSC Code */}
        <div>
          <label className="block font-medium">IFSC Code</label>
          <input type="text" {...register("ifscCode")} className="input" />
          {errors.ifscCode && (
            <p className="text-red-500 text-sm">{errors.ifscCode.message}</p>
          )}
        </div>

        {/* Account Type */}
        <div>
          <label className="block font-medium">Account Type</label>
          <select {...register("accountType")} className="input">
            <option value="">Select Type</option>
            <option value="saving">Saving</option>
            <option value="current">Current</option>
          </select>
          {errors.accountType && (
            <p className="text-red-500 text-sm">{errors.accountType.message}</p>
          )}
        </div>

        {/* Bank Statement Upload */}
        <div>
          <label className="block font-medium">Bank Statement (PDF Only)</label>
          <input
            type="file"
            accept="application/pdf"
            {...register("bankStatement")}
            className="input"
          />
          {errors.bankStatement && (
            <p className="text-red-500 text-sm">{errors.bankStatement.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-5 py-2 rounded"
        >
          {isSubmitting ? "Submitting..." : "Finish Registration"}
        </button>
      </form>
    </div>
  );
};

export default Step4Bank;
