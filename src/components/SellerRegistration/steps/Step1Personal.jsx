import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axiosInstance from "../../../api/axios";
import { useSellerForm } from "../context/SellerFormContext";
import toast from "react-hot-toast";

export default function Step1Personal({ next }) {
  const { formData, update } = useSellerForm();
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [otpError, setOtpError] = useState("");

  const todayStr = new Date().toISOString().split("T")[0];

  const passwordRegex = {
    lower: /[a-z]/,
    upper: /[A-Z]/,
    number: /[0-9]/,
    special: /[!@#$%^&*(),.?":{}|<>]/,
    minLength: /.{6,}/,
  };

  const schema = yup.object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .required("Phone is required")
      .matches(/^[0-9]{7,15}$/, "Invalid phone number"),
    password: yup
      .string()
      .required("Password is required")
      .test("strong-password", "Password does not meet criteria", (value) => {
        if (!value) return false;
        return Object.values(passwordRegex).every((regex) => regex.test(value));
      }),
    dateOfBirth: yup
      .string()
      .required("Date of birth required")
      .test(
        "dob-before-today",
        "Date cannot be in future",
        (value) => value && new Date(value) <= new Date()
      ),
    referralCode: yup.string().optional(),
    signedAgreement: yup
      .mixed()
      .required("Signed agreement required")
      .test(
        "fileSize",
        "File too large (max 2MB)",
        (file) => file && file.size <= 2 * 1024 * 1024
      )
      .test("fileType", "Only PDF or image allowed", (file) => {
        if (!file) return false;
        const allowed = [
          "application/pdf",
          "image/png",
          "image/jpeg",
          "image/jpg",
        ];
        return allowed.includes(file.type);
      }),
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: formData.firstName || "",
      lastName: formData.lastName || "",
      email: formData.email || "",
      phone: formData.phone || "",
      password: formData.password || "",
      dateOfBirth: formData.dateOfBirth || "",
      referralCode: formData.referralCode || "",
      signedAgreement: formData.signedAgreement || null,
    },
    resolver: yupResolver(schema),
  });

  const passwordValue = watch("password");

  useEffect(() => {
    let timer;
    if (resendTimer > 0 && !otpVerified) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, otpVerified]);

  const sendOtp = async () => {
    const email = watch("email");
    if (!email) return alert("Enter email first");
    try {
      await axiosInstance.post("/send-otp", { email });
      setOtpSent(true);
      setResendTimer(30);
      toast.success("OTP sent to your email");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send OTP");
    }
  };

  const verifyOtp = async () => {
    if (!otpValue) return alert("Enter OTP");
    try {
      await axiosInstance.post("/verify-otp", {
        email: watch("email"),
        otp: otpValue,
      });
      setOtpVerified(true);
      setOtpSent(false);
      toast.success("OTP verified successfully ✅");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Invalid OTP ❌");
    }
  };

  const onSubmit = (values) => {
    if (!otpVerified) {
      setOtpError("Please verify your OTP before continuing");
      return;
    }
    setOtpError("");
    Object.keys(values).forEach((key) => update(key, values[key]));
    next();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
      <h2 className="text-2xl font-semibold">Personal Information</h2>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label>First Name *</label>
          <input
            {...register("firstName")}
            className={`w-full p-3 border rounded ${
              errors.firstName ? "border-red-500" : ""
            }`}
          />
          {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
        </div>

        <div>
          <label>Last Name *</label>
          <input
            {...register("lastName")}
            className={`w-full p-3 border rounded ${
              errors.lastName ? "border-red-500" : ""
            }`}
          />
          {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
        </div>

        <div className="md:col-span-2">
          <label>Email *</label>
          <input
            {...register("email")}
            type="email"
            className={`w-full p-3 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
            readOnly={otpVerified}
          />
          {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}

          {!otpVerified && (
            <>
              <button
                type="button"
                onClick={sendOtp}
                disabled={resendTimer > 0}
                className="mt-2 px-3 py-1 bg-blue-600 text-white rounded"
              >
                {resendTimer > 0 ? `Resend in ${resendTimer}s` : otpSent ? "Resend OTP" : "Send OTP"}
              </button>

              {otpSent && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={otpValue}
                    onChange={(e) => setOtpValue(e.target.value)}
                    className="w-full p-3 border rounded mb-1"
                    placeholder="Enter OTP"
                  />
                  <button
                    type="button"
                    onClick={verifyOtp}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                  >
                    Verify OTP
                  </button>
                </div>
              )}
            </>
          )}

          {otpVerified && (
            <span className="inline-block mt-2 px-3 py-1 bg-green-600 text-white rounded">
              OTP Verified ✅
            </span>
          )}
        </div>

        <div>
          <label>Phone *</label>
          <input
            {...register("phone")}
            className={`w-full p-3 border rounded ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
        </div>

        <div>
          <label>Password *</label>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <input
                  {...field}
                  type={passwordVisible ? "text" : "password"}
                  className={`w-full p-3 border rounded ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-2 top-2 text-gray-500"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
                <div className="w-full bg-gray-200 h-2 rounded mt-2">
                  <div
                    className="h-2 bg-green-500 rounded"
                    style={{
                      width: `${
                        Object.values(passwordRegex).filter((r) => r.test(passwordValue))
                          .length * 20
                      }%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-600 mt-1">
                  Must include uppercase, lowercase, number, special char, min 6 chars
                </p>
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password.message}</p>
                )}
              </div>
            )}
          />
        </div>

        <div>
          <label>Date of Birth *</label>
          <input
            {...register("dateOfBirth")}
            type="date"
            max={todayStr}
            className={`w-full p-3 border rounded ${
              errors.dateOfBirth ? "border-red-500" : ""
            }`}
          />
          {errors.dateOfBirth && <p className="text-red-600 text-sm">{errors.dateOfBirth.message}</p>}
        </div>

        <div>
          <label>Referral Code (Optional)</label>
          <input
            {...register("referralCode")}
            className="w-full p-3 border rounded"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="block font-medium">Signed Agreement *</label>
          <p className="text-gray-600">
            Please download, read, and sign the seller agreement.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="/assets/agreements/Seller-agreement.pdf"
              target="_blank"
              rel="noreferrer"
            >
              <button
                type="button"
                className="px-5 py-2 bg-blue-600 text-white rounded"
              >
                Download PDF
              </button>
            </a>

            <Controller
              name="signedAgreement"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  onChange={(e) => field.onChange(e.target.files[0])}
                  className={`flex-1 p-3 border rounded ${
                    errors.signedAgreement ? "border-red-500" : ""
                  }`}
                />
              )}
            />
          </div>

          {errors.signedAgreement && (
            <p className="text-red-600 text-sm">
              {errors.signedAgreement.message}
            </p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Accepted: PDF, PNG, JPG — max 2MB
          </p>
        </div>
      </div>

      {otpError && <p className="text-red-600 text-sm">{otpError}</p>}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting || !otpVerified}
          className={`px-6 py-3 rounded text-white ${
            otpVerified ? "bg-blue-600" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Validating..." : "Next"}
        </button>
      </div>
    </form>
  );
}
