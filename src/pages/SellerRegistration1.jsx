
import React, { useState, useEffect, useCallback } from "react";
import {
  ChevronRight,
  ChevronLeft,
  Store,
  User,
  FileText,
  CreditCard,
  CheckCircle,
  Upload,
  Plus,
  Trash2,
  Building,
  Users,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // make sure this points to your axios instance

// Clean, single-file SellerRegistration component (multi-step)
export default function SellerRegistration() {
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories || {});
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // single well-structured formData object
  const [formData, setFormData] = useState({
    // Step 1: Personal
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",

    // Step 2: Business
    businessName: "",
    firmName: "",
    businessType: "",
    businessRegNumber: "",
    taxId: "",
    natureOfConcern: "",
    nameAsPerPan: "",
    hasGst: "",
    gstNumber: "",
    gstFile: null,

    // Proprietor
    proprietorName: "",
    proprietorDob: "",
    proprietorPan: "",
    proprietorAadhaar: "",
    proprietorMobile: "",
    proprietorEmail: "",
    proprietorAddress: "",
    proprietorPanCard: null,
    proprietorAadhaarCard: null,
    proprietorPhoto: null,

    // Partnership / arrays
    partnershipDeedDate: "",
    numberOfPartners: "",
    partnershipPan: "",
    partnershipDeed: null,
    partners: [{ name: "", panNo: "", share: "", address: "", mobile: "" }],

    // LLP
    llpName: "",
    llpRegistrationNo: "",
    llpPan: "",
    llpIncorporationDate: "",
    numberOfDesignatedPartners: "",
    llpCertificate: null,
    llpAgreement: null,
    designatedPartners: [{ name: "", dinNo: "", panNo: "", address: "" }],

    // Pvt Ltd
    pvtLtdName: "",
    cinNumber: "",
    pvtLtdPan: "",
    incorporationDate: "",
    authorizedCapital: "",
    paidUpCapital: "",
    numberOfDirectors: "",
    incorporationCertificate: null,
    moaDocument: null,
    aoaDocument: null,
    directors: [{ name: "", dinNo: "", panNo: "", address: "" }],

    // Public Ltd
    publicLtdName: "",
    publicCinNumber: "",
    publicLtdPan: "",
    publicIncorporationDate: "",
    listedStatus: "NO",
    stockExchange: "",
    publicAuthorizedCapital: "",
    publicPaidUpCapital: "",
    publicNumberOfDirectors: "",
    publicIncorporationCertificate: null,
    publicMoaDocument: null,
    publicAoaDocument: null,
    publicDirectors: [{ name: "", dinNo: "", panNo: "", address: "" }],

    // Store Setup (Step 5)
    gstin: "",
    pan: "",
    storeName: "",
    storeDescription: "",
    storeAddress: "",
    storeCity: "",
    storeState: "",
    storePincode: "",
    storeCategories: [{ category: "", customCategory: "" }],
    pickupContact: "",
    pickupAddress: "",
    pickupPincode: "",
    storeLogo: null,
    storeBanner: null,
    esignature: null,
    addressProof: null,
    photoId: null,

    // Step 3 docs
    businessLicense: null,
    taxCertificate: null,
    identityProof: null,

    // Bank
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "",

    // Terms
    termsAccepted: false,
  });

  // Helpful utilities
  const cloneForm = (fn) => setFormData((prev) => fn(prev));

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files?.[0] ?? null;
    setFormData((prev) => ({ ...prev, [field]: file }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleArrayChange = (arrayName, index, key, value) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[arrayName]) ? [...prev[arrayName]] : [];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [arrayName]: arr };
    });
  };

  const addArrayItem = (arrayName, template) =>
    setFormData((prev) => ({ ...prev, [arrayName]: [...prev[arrayName], template] }));

  const removeArrayItem = (arrayName, index) =>
    setFormData((prev) => ({
      ...prev,
      [arrayName]: prev[arrayName].filter((_, i) => i !== index),
    }));

  // Validation helpers
  const validateStep = (step) => {
    const errs = {};
    switch (step) {
      case 1:
        if (!formData.firstName.trim()) errs.firstName = "First name is required";
        if (!formData.lastName.trim()) errs.lastName = "Last name is required";
        if (!formData.email.trim()) errs.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
          errs.email = "Invalid email";
        if (!formData.password.trim()) errs.password = "Password required";
        break;
      case 2:
        if (!formData.firmName.trim() && !formData.businessName.trim())
          errs.businessName = "Business/firm name required";
        break;
      case 3:
        // optional heavy validation can be added
        break;
      case 4:
        // bank validation
        break;
      case 5:
        if (!formData.storeName.trim()) errs.storeName = "Store name required";
        if (!formData.storeDescription.trim()) errs.storeDescription = "Store description required";
        if (!formData.storeCategories || !formData.storeCategories.length)
          errs.storeCategories = "At least one category required";
        if (!formData.storeAddress.trim()) errs.storeAddress = "Store address required";
        if (!formData.storeCity.trim()) errs.storeCity = "City required";
        if (!formData.storeState.trim()) errs.storeState = "State required";
        if (!formData.storePincode.trim()) errs.storePincode = "Pincode required";
        if (!formData.pickupContact.trim()) errs.pickupContact = "Contact required";
        if (!formData.termsAccepted) errs.termsAccepted = "Accept terms";
        break;
      default:
        break;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    const ok = validateStep(currentStep);
    if (!ok) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (currentStep < 5) setCurrentStep((s) => s + 1);
    else handleFinalSubmit();
  };

  const handlePrevious = () => {
    setErrors({});
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  // final submit
  const handleFinalSubmit = async () => {
    // validate final step again
    if (!validateStep(5)) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setLoading(true);
    try {
      const fd = new FormData();

      // Flatten and append fields. Files appended directly.
      Object.keys(formData).forEach((key) => {
        const val = formData[key];
        if (val === null || val === undefined) return;
        // arrays -> stringify
        if (Array.isArray(val)) {
          fd.append(key, JSON.stringify(val));
          return;
        }
        // File objects -> append directly
        if (val instanceof File) {
          fd.append(key, val);
          return;
        }
        // booleans and primitives
        fd.append(key, String(val));
      });

      const res = await api.post("/seller/register", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res?.data?.success) {
        toast.success(res.data.message || "Registration successful");

        // store token (if backend returns)
        if (res.data.token) {
          localStorage.setItem("authToken", res.data.token);
        }

        if (res.data.seller) {
          localStorage.setItem("sellerData", JSON.stringify(res.data.seller));
          localStorage.setItem("userType", "seller");
        }

        // navigate to dashboard
        navigate("/seller/dashboard");
      } else {
        toast.error(res?.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error(err?.response?.data?.message || err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // UI pieces
  const StepIndicator = () => {
    const steps = [
      { id: 1, title: "Personal", icon: User },
      { id: 2, title: "Business", icon: Store },
      { id: 3, title: "Docs", icon: FileText },
      { id: 4, title: "Bank", icon: CreditCard },
      { id: 5, title: "Store", icon: CheckCircle },
    ];
    return (
      <div className="flex items-center gap-4 mb-6">
        {steps.map((s) => {
          const Icon = s.icon;
          const active = s.id === currentStep;
          const done = currentStep > s.id;
          return (
            <div key={s.id} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${done ? "bg-green-500 text-white" : active ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"}`}>
                <Icon size={18} />
              </div>
              <div className="text-sm">{s.title}</div>
            </div>
          );
        })}
      </div>
    );
  };

  // Simple inputs for each step (kept concise)
  const PersonalStep = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">First name</label>
        <input name="firstName" value={formData.firstName} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded`} />
        {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Last name</label>
        <input name="lastName" value={formData.lastName} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded`} />
        {errors.lastName && <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Email</label>
        <input name="email" value={formData.email} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.email ? "border-red-500" : "border-gray-300"} rounded`} />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input name="password" type="password" value={formData.password} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.password ? "border-red-500" : "border-gray-300"} rounded`} />
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Phone</label>
        <input name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Date of Birth</label>
        <input name="dateOfBirth" type="date" value={formData.dateOfBirth} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
      </div>
    </div>
  );

  const BusinessStep = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Business / Firm Name</label>
        <input name="businessName" value={formData.businessName} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.businessName ? "border-red-500" : "border-gray-300"} rounded`} />
        {errors.businessName && <p className="text-xs text-red-500 mt-1">{errors.businessName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Nature of Concern</label>
        <select name="natureOfConcern" value={formData.natureOfConcern} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded">
          <option value="">Select</option>
          <option value="Proprietorship">Proprietorship</option>
          <option value="Partnership">Partnership</option>
          <option value="LLP">LLP</option>
          <option value="Pvt Ltd">Pvt Ltd</option>
          <option value="Public Ltd">Public Ltd</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium">GST Number</label>
        <input name="gstNumber" value={formData.gstNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">GST File (pdf/jpg/png)</label>
        <input type="file" accept=".pdf,image/*" onChange={(e) => handleFileChange(e, "gstFile")} className="w-full" />
        {errors.gstFile && <p className="text-xs text-red-500 mt-1">{errors.gstFile}</p>}
      </div>
      {/* Render proprietor fields if necessary */}
      {formData.natureOfConcern === "Proprietorship" && (
        <>
          <div>
            <label className="block text-sm font-medium">Proprietor Name</label>
            <input name="proprietorName" value={formData.proprietorName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium">Proprietor PAN</label>
            <input name="proprietorPan" value={formData.proprietorPan} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
          </div>
        </>
      )}
    </div>
  );

  const DocsStep = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Business License</label>
        <input type="file" onChange={(e) => handleFileChange(e, "businessLicense")} />
      </div>
      <div>
        <label className="block text-sm font-medium">Tax Certificate</label>
        <input type="file" onChange={(e) => handleFileChange(e, "taxCertificate")} />
      </div>
      <div>
        <label className="block text-sm font-medium">Identity Proof</label>
        <input type="file" onChange={(e) => handleFileChange(e, "identityProof")} />
      </div>
    </div>
  );

  const BankStep = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium">Bank Name</label>
        <input name="bankName" value={formData.bankName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Account Holder</label>
        <input name="accountHolderName" value={formData.accountHolderName} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">Account Number</label>
        <input name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
      </div>
      <div>
        <label className="block text-sm font-medium">IFSC / Routing</label>
        <input name="routingNumber" value={formData.routingNumber} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
      </div>
    </div>
  );

  const StoreStep = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Store Name</label>
        <input name="storeName" value={formData.storeName} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.storeName ? "border-red-500" : "border-gray-300"} rounded`} />
        {errors.storeName && <p className="text-xs text-red-500 mt-1">{errors.storeName}</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Store Description</label>
        <textarea name="storeDescription" value={formData.storeDescription} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.storeDescription ? "border-red-500" : "border-gray-300"} rounded`} />
        {errors.storeDescription && <p className="text-xs text-red-500 mt-1">{errors.storeDescription}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium">Store Categories</label>
        <div className="space-y-2">
          {formData.storeCategories.map((c, idx) => (
            <div key={idx} className="flex gap-2">
              <select value={c.category} onChange={(e) => handleArrayChange("storeCategories", idx, "category", e.target.value)} className="px-3 py-2 border border-gray-300 rounded">
                <option value="">Select</option>
                {(categories || []).map((cat) => <option key={cat._id || cat.id || cat} value={cat.name || cat}>{cat.name || cat}</option>)}
                <option value="Other">Other</option>
              </select>
              {c.category === "Other" && (
                <input placeholder="Custom category" value={c.customCategory} onChange={(e) => handleArrayChange("storeCategories", idx, "customCategory", e.target.value)} className="px-3 py-2 border border-gray-300 rounded" />
              )}
              <button type="button" onClick={() => removeArrayItem("storeCategories", idx)} className="px-3 py-2 bg-red-100 rounded"><Trash2 size={16} /></button>
            </div>
          ))}
          <button type="button" onClick={() => addArrayItem("storeCategories", { category: "", customCategory: "" })} className="mt-2 px-3 py-2 bg-green-100 rounded inline-flex items-center gap-2"><Plus size={14} /> Add Category</button>
        </div>
        {errors.storeCategories && <p className="text-xs text-red-500 mt-1">{errors.storeCategories}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Store Address</label>
          <input name="storeAddress" value={formData.storeAddress} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.storeAddress ? "border-red-500" : "border-gray-300"} rounded`} />
        </div>
        <div>
          <label className="block text-sm font-medium">City</label>
          <input name="storeCity" value={formData.storeCity} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.storeCity ? "border-red-500" : "border-gray-300"} rounded`} />
        </div>
        <div>
          <label className="block text-sm font-medium">State</label>
          <input name="storeState" value={formData.storeState} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.storeState ? "border-red-500" : "border-gray-300"} rounded`} />
        </div>
        <div>
          <label className="block text-sm font-medium">Pincode</label>
          <input name="storePincode" value={formData.storePincode} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.storePincode ? "border-red-500" : "border-gray-300"} rounded`} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Pickup Contact</label>
          <input name="pickupContact" value={formData.pickupContact} onChange={handleInputChange} className={`w-full px-3 py-2 border ${errors.pickupContact ? "border-red-500" : "border-gray-300"} rounded`} />
        </div>
        <div>
          <label className="block text-sm font-medium">Pickup Address</label>
          <input name="pickupAddress" value={formData.pickupAddress} onChange={handleInputChange} className="w-full px-3 py-2 border border-gray-300 rounded" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Store Logo</label>
          <input type="file" onChange={(e) => handleFileChange(e, "storeLogo")} />
        </div>
        <div>
          <label className="block text-sm font-medium">Store Banner</label>
          <input type="file" onChange={(e) => handleFileChange(e, "storeBanner")} />
        </div>
      </div>

      <div className="flex items-start gap-2">
        <input id="termsAccepted" name="termsAccepted" type="checkbox" checked={formData.termsAccepted} onChange={handleInputChange} />
        <label htmlFor="termsAccepted" className="text-sm">I agree to the terms and conditions</label>
      </div>
      {errors.termsAccepted && <p className="text-xs text-red-500 mt-1">{errors.termsAccepted}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white p-6 rounded-lg shadow mb-6">
          <h2 className="text-2xl font-bold">Seller Registration</h2>
          <p className="text-sm text-gray-600 mt-1">Complete your seller onboarding in a few steps.</p>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <StepIndicator />

          <div className="mt-6">
            {currentStep === 1 && <PersonalStep />}
            {currentStep === 2 && <BusinessStep />}
            {currentStep === 3 && <DocsStep />}
            {currentStep === 4 && <BankStep />}
            {currentStep === 5 && <StoreStep />}
          </div>

          <div className="flex justify-between items-center mt-8">
            <button onClick={handlePrevious} disabled={currentStep === 1} className={`px-4 py-2 rounded ${currentStep === 1 ? "bg-gray-200 text-gray-500" : "bg-white border"}`}>
              <ChevronLeft /> Previous
            </button>

            <div className="flex items-center gap-3">
              {currentStep < 5 ? (
                <button onClick={handleNext} className="px-4 py-2 bg-blue-600 text-white rounded flex items-center gap-2">
                  Next <ChevronRight />
                </button>
              ) : (
                <button onClick={handleFinalSubmit} disabled={loading} className={`px-6 py-3 rounded text-white ${loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"}`}>
                  {loading ? "Submitting..." : <><CheckCircle className="inline-block mr-2" /> Complete Registration</>}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
