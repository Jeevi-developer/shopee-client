import React from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "../../../api/axios";
import toast from "react-hot-toast";
import { useSellerForm } from "../context/SellerFormContext";

export default function Step4Bank({ next, back }) {
  const { formData, update } = useSellerForm();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData.step4,
  });

  // Convert object → append safely to FormData
  const appendObject = (fd, obj) => {
    Object.keys(obj).forEach((key) => {
      const value = obj[key];

      if (value === null || value === undefined) return;

      // Files
      if (value instanceof File) {
        fd.append(key, value);
      }
      // Arrays
      else if (Array.isArray(value)) {
        fd.append(key, JSON.stringify(value));
      }
      // Normal fields
      else {
        fd.append(key, value);
      }
    });
  };

  const onSubmit = async (data) => {
    try {
      // Save step4 data to context
      update("step4", "bankName", data.bankName);
      update("step4", "accountHolderName", data.accountHolderName);
      update("step4", "accountNumber", data.accountNumber);
      update("step4", "routingNumber", data.routingNumber);
      update("step4", "accountType", data.accountType);

      const finalForm = new FormData();

      // Merge all steps
      appendObject(finalForm, formData.step1);
      appendObject(finalForm, formData.step2);
      appendObject(finalForm, formData.step3);
      appendObject(finalForm, formData.step4);

      // Special: bankStatement File
      if (data.bankStatement && data.bankStatement[0]) {
        finalForm.append("bankStatement", data.bankStatement[0]);
      }

      const res = await axiosInstance.post("/seller/register", finalForm, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Seller registered successfully!");
      next();
    } catch (error) {
      console.error("❌ Registration Error:", error);
      toast.error(error?.response?.data?.message || "Server error");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <h2 className="text-xl font-semibold text-black">Bank Information</h2>

      <div>
        <label>Bank Name</label>
        <input
          type="text"
          {...register("bankName", { required: "Bank name required" })}
          className="input"
        />
        {errors.bankName && <p className="text-red-500">{errors.bankName.message}</p>}
      </div>

      <div>
        <label>Account Holder Name</label>
        <input
          type="text"
          {...register("accountHolderName", { required: "Account holder name required" })}
          className="input"
        />
      </div>

      <div>
        <label>Account Number</label>
        <input
          type="text"
          {...register("accountNumber", { required: "Account number required" })}
          className="input"
        />
      </div>

      <div>
        <label>Routing Number / IFSC</label>
        <input
          type="text"
          {...register("routingNumber", { required: "IFSC required" })}
          className="input"
        />
      </div>

      <div>
        <label>Account Type</label>
        <select
          {...register("accountType", { required: "Account type required" })}
          className="input"
        >
          <option value="">Select</option>
          <option value="Savings">Savings</option>
          <option value="Current">Current</option>
        </select>
      </div>

      <div>
        <label>Bank Statement (PDF/Image)</label>
        <input type="file" accept=".pdf,image/*" {...register("bankStatement")} />
      </div>

      <div className="flex justify-between mt-6">
        <button type="button" className="btn" onClick={back}>
          Back
        </button>
        <button type="submit" className="btn-primary">
          Submit Registration
        </button>
      </div>
    </form>
  );
}
