import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Store,
  User,
  FileText,
  CreditCard,
  CheckCircle,
  AlertCircle,
  Upload,
  Plus,
  Trash2,
  Building,
  Users,
  Eye,
  EyeOff,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/categorySlice";
import axios from "axios";
import { toast } from "react-toastify";
import api from "../api/axios";

const SellerRegistration = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const [formData, setFormData] = useState({
    // Step 1: Personal Information
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    // address: "",
    // businessType: "",
    // Step 2
    businessName: "",
    businessType: "",
    businessRegNumber: "",
    taxId: "",
    hasGst: "", // ✅ ADD THIS
    gstNumber: "",
    gstFile: null, // ✅ ADD THIS
    natureOfConcern: "",
    firmName: "",
    nameAsPerPan: "",

    // Business Type Fields
    natureOfConcern: "",
    firmName: "",
    nameAsPerPan: "",
    gstNumber: "",

    // Proprietorship
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

    // Partnership
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

    // Store Setup
    gstin: "",
    pan: "",
    storeName: "",
    storeAddress: "",
    esignature: null,
    pickupAddress: "",
    pickupPincode: "",
    addressProof: null,
    photoId: null,

    // Step 3: Business Documents
    businessLicense: "",
    taxCertificate: "",
    identityProof: "",

    // Step 4: Bank Details
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "",

    // Step 5
    storeName: "",
    storeDescription: "",
    storeCategories: [{ category: "", customCategory: "" }],
    storeAddress: "",
    storeCity: "",
    storeState: "",
    storePincode: "",
    pickupContact: "",
    storeLogo: null,
    storeBanner: null,
    termsAccepted: false, // ✅ ADD THIS LINE
  });

  // ✅ useCallback prevents new function creation on every render
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  const validateStep5 = () => {
    const newErrors = {};

    // Store Logo
    if (!formData.storeLogo) {
      newErrors.storeLogo = "Store logo is required";
    }

    // Store Banner
    if (!formData.storeBanner) {
      newErrors.storeBanner = "Store banner is required";
    }

    // Store Name
    if (!formData.storeName?.trim()) {
      newErrors.storeName = "Store name is required";
    }

    // Store Description
    if (!formData.storeDescription?.trim()) {
      newErrors.storeDescription = "Store description is required";
    }

    // Store Categories
    const hasValidCategory = formData.storeCategories?.some((cat) =>
      cat.category === "Other"
        ? cat.customCategory?.trim()
        : cat.category?.trim()
    );
    if (!hasValidCategory) {
      newErrors.storeCategories = "At least one category is required";
    }

    // Store Address
    if (!formData.storeAddress?.trim()) {
      newErrors.storeAddress = "Store address is required";
    }

    // City
    if (!formData.storeCity?.trim()) {
      newErrors.storeCity = "City is required";
    }

    // State
    if (!formData.storeState?.trim()) {
      newErrors.storeState = "State is required";
    }

    // Pincode
    if (!formData.storePincode?.trim()) {
      newErrors.storePincode = "Pincode is required";
    }

    // Contact Number
    if (!formData.pickupContact?.trim()) {
      newErrors.pickupContact = "Contact number is required";
    }

    console.log("Step 5 errors:", newErrors);

    // CRITICAL: Always update errors state, even if empty
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };
  useEffect(() => {
    // Clear errors when moving to a new step
    setErrors({});
  }, [currentStep]);

  const handleCompleteRegistration = async () => {
    console.log("Starting registration validation...");

    // Validate step 5 one final time
    const stepErrors = validateStep(5, formData);

    if (Object.keys(stepErrors).length > 0) {
      console.log("Validation failed", stepErrors);
      setErrors(stepErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    console.log("Validation passed, submitting form...");
    setLoading(true);

    try {
      const submitData = new FormData();

      // Append all form fields
      Object.keys(formData).forEach((key) => {
        const value = formData[key];

        // Convert array-of-objects fields to JSON
        const jsonFields = [
          "partners",
          "designatedPartners",
          "directors",
          "publicDirectors",
          "storeCategories",
        ];

        if (jsonFields.includes(key)) {
          submitData.append(key, JSON.stringify(value));
        } else if (value !== null && value !== undefined) {
          submitData.append(key, value);
        }
      });

      // Replace axios.post with api.post
      const response = await api.post("/seller/register", submitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Registration successful:", response.data);
      toast.success("Registration completed successfully!");

      // ⭐ Save token and seller data in localStorage (dashboard reads from here)
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("userType", "seller");
      localStorage.setItem("sellerData", JSON.stringify(response.data.seller));

      navigate("/SellerLogin");

      // Redirect or next action
      // navigate('/seller/dashboard');
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const validateField = (name, value) => {
    let error = "";

    if (name === "proprietorName") {
      if (!value.trim()) {
        error = "Proprietor name is required.";
      } else if (value.length < 3) {
        error = "Name must be at least 3 characters.";
      } else if (!/^[A-Za-z ]+$/.test(value)) {
        error = "Name should contain only letters.";
      }
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;

    let errorMessage = "";
    if (!value.trim()) {
      errorMessage = "This field is required";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const handleFileUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Only PDF, JPG, PNG allowed",
      }));
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        [field]: "File size should not exceed 2MB",
      }));
      return;
    }

    // If valid → set file & clear error
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedImageTypes = ["image/jpeg", "image/png"];
    const maxSize = 2 * 1024 * 1024; // 2MB

    // Validate file type (only images)
    if (!allowedImageTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        [field]: "Only JPG and PNG images allowed",
      }));
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        [field]: "File size should not exceed 2MB",
      }));
      return;
    }

    // Valid → Save file + clear error
    setFormData((prev) => ({
      ...prev,
      [field]: file,
    }));

    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleArrayFieldChange = (array, idx, field, value) => {
    setFormData((prev) => ({
      ...prev,
      [array]: prev[array].map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayField = (array, template) => {
    setFormData((prev) => ({
      ...prev,
      [array]: [...prev[array], template],
    }));
  };

  const removeArrayField = (array, idx) => {
    setFormData((prev) => ({
      ...prev,
      [array]: prev[array].filter((_, i) => i !== idx),
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email: value });

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setErrors((prev) => ({ ...prev, email: "Invalid email format" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };
  // FILE UPLOAD HANDLER
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 2 * 1024 * 1024; // 2MB in bytes

    // Check file type
    if (!allowedTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        gstFile: "Only PDF, JPG, PNG allowed",
      }));
      return; // stop further processing
    }

    // Check file size
    if (file.size > maxSize) {
      setErrors((prev) => ({
        ...prev,
        gstFile: "File size should not exceed 2MB",
      }));
      return; // prevent setting file
    }

    // If valid → update formData + remove errors
    setFormData((prev) => ({
      ...prev,
      gstFile: file,
    }));

    setErrors((prev) => ({
      ...prev,
      gstFile: "",
    }));
  };

  const handlePhoneChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 12) value = value.slice(0, 12);

    setFormData({ ...formData, phone: value });

    if (!value.trim()) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
    } else if (!/^[6-9]\d{9}$/.test(value)) {
      setErrors((prev) => ({
        ...prev,
        phone: "Invalid Indian phone number (10 digits starting with 6-9)",
      }));
    } else {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const rules = {
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    length: password.length >= 8,
  };

  const validateStep = (step, formData) => {
    const errors = {};

    switch (step) {
      case 1: // Personal Information
        if (!formData.firstName?.trim())
          errors.firstName = "First name is required";
        if (!formData.lastName?.trim())
          errors.lastName = "Last name is required";
        if (!formData.email?.trim()) {
          errors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          errors.email = "Invalid email format";
        }
        if (!formData.password?.trim()) {
          errors.password = "Password is required";
        } else if (formData.password.length < 8) {
          errors.password = "Password must be at least 8 characters";
        }
        if (!formData.phone?.trim()) {
          errors.phone = "Phone number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
          errors.phone = "Invalid phone number";
        }
        if (!formData.dateOfBirth?.trim())
          errors.dateOfBirth = "Date of birth is required";
        break;

      case 2: // Business Information
        if (
          !formData.natureOfConcern ||
          formData.natureOfConcern === "SELECT"
        ) {
          errors.natureOfConcern = "Nature of concern is required";
        }
        if (!formData.firmName?.trim())
          errors.firmName = "Firm name is required";
        if (!formData.nameAsPerPan?.trim())
          errors.nameAsPerPan = "Name as per PAN is required";

        // GST validation
        if (!formData.hasGst) errors.hasGst = "Please select GST option";
        if (formData.hasGst === "Yes") {
          if (!formData.gstNumber?.trim()) {
            errors.gstNumber = "GST number is required";
          } else if (
            !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(
              formData.gstNumber
            )
          ) {
            errors.gstNumber = "Invalid GST format";
          }
          if (!formData.gstFile) errors.gstFile = "GST certificate is required";
        }
        break;

      case 3: // Business Documents
        if (!formData.businessLicense?.trim())
          errors.businessLicense = "Business license is required";
        if (!formData.taxCertificate?.trim())
          errors.taxCertificate = "Tax certificate is required";
        if (!formData.identityProof?.trim())
          errors.identityProof = "Identity proof is required";
        break;

      case 4: // Bank Details
        if (!formData.bankName?.trim())
          errors.bankName = "Bank name is required";
        if (!formData.accountHolderName?.trim())
          errors.accountHolderName = "Account holder name is required";
        if (!formData.accountNumber?.trim())
          errors.accountNumber = "Account number is required";
        if (!formData.routingNumber?.trim())
          errors.routingNumber = "IFSC code is required";
        if (!formData.accountType)
          errors.accountType = "Account type is required";
        break;

      case 5: // Store Setup
        if (!formData.storeName?.trim())
          errors.storeName = "Store name is required";
        if (!formData.storeDescription?.trim())
          errors.storeDescription = "Store description is required";

        if (
          !formData.storeCategories ||
          !Array.isArray(formData.storeCategories) ||
          !formData.storeCategories[0]?.category?.trim()
        ) {
          errors.storeCategories = "Store category is required";
        }

        if (!formData.storeAddress?.trim())
          errors.storeAddress = "Store address is required";
        if (!formData.storeCity?.trim()) errors.storeCity = "City is required";
        if (!formData.storeState?.trim())
          errors.storeState = "State is required";
        if (!formData.storePincode?.trim()) {
          errors.storePincode = "Pincode is required";
        } else if (!/^\d{6}$/.test(formData.storePincode)) {
          errors.storePincode = "Invalid pincode";
        }
        if (!formData.pickupContact?.trim()) {
          errors.pickupContact = "Contact number is required";
        } else if (!/^[6-9]\d{9}$/.test(formData.pickupContact)) {
          errors.pickupContact = "Invalid contact number";
        }

        if (!formData.termsAccepted)
          errors.termsAccepted = "You must accept terms and conditions";
        break;

      default:
        break;
    }

    return errors;
  };

  const handleNext = () => {
    // Validate current step
    const stepErrors = validateStep(currentStep, formData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setErrors({});

    if (currentStep === 5) {
      handleCompleteRegistration();
    } else {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevious = () => {
    setErrors({});
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    const errors = validateStep(5, formData);
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }

    setLoading(true);
    setSubmitStatus(null);

    try {
      // REQUIRED array fields
      const arrayFields = [
        "partners",
        "designatedPartners",
        "directors",
        "publicDirectors",
        "storeCategories",
      ];

      // REQUIRED file fields
      const fileFields = [
        "proprietorPanCard",
        "proprietorAadhaarCard",
        "proprietorPhoto",
        "partnershipDeed",
        "llpCertificate",
        "llpAgreement",
        "incorporationCertificate",
        "moaDocument",
        "aoaDocument",
        "publicIncorporationCertificate",
        "publicMoaDocument",
        "publicAoaDocument",
        "storeLogo",
        "storeBanner",
        "esignature",
        "addressProof",
        "photoId",
        "gstFile",
      ];

      const fd = new FormData();

      // LOOP THROUGH ALL formData KEYS
      Object.entries(formData).forEach(([key, value]) => {
        // 1️⃣ JSON ARRAY FIX
        if (arrayFields.includes(key)) {
          fd.append(key, JSON.stringify(value || []));
          return;
        }

        // 2️⃣ FILE FIX
        if (value instanceof File) {
          fd.append(key, value);
          return;
        }

        // 3️⃣ NULL FIX
        if (value === null || value === undefined) {
          fd.append(key, "");
          return;
        }

        // 4️⃣ NORMAL VALUE
        fd.append(key, value);
      });

      // SEND REQUEST
      const API_BASE_URL =
        import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

      const response = await fetch(`${API_BASE_URL}/seller/register`, {
        method: "POST",
        body: fd,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitStatus({
          type: "success",
          message: "Registration successful! Redirecting...",
        });

        if (data.token) {
          localStorage.setItem("sellerAuth", "true");
          localStorage.setItem("sellerToken", data.token); // <- rename to match AuthContext
        }

        if (data.seller) {
          localStorage.setItem("sellerAuthData", JSON.stringify(data.seller));
        }

        setTimeout(() => {
          window.location.href = "/SellerDashboard";
        }, 1500);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Registration failed.",
        });
      }
    } catch (err) {
      console.error("Submit error:", err);
      setSubmitStatus({
        type: "error",
        message: "Network error. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: "Personal Info", icon: User },
    { number: 2, title: "Business Info", icon: Store },
    { number: 3, title: "Additional Info", icon: FileText },
    { number: 4, title: "Bank Details", icon: CreditCard },
    { number: 5, title: "Store Setup", icon: CheckCircle },
  ];

  // Helper Components
  const InputField = ({
    label,
    name,
    value,
    onChange,
    type = "text",
    error,
    autoComplete = "off", // ✅ added
    required,
  }) => (
    <div>
      {/* ✅ label linked to input */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* ✅ added id, name, autocomplete */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={handleInputBlur} // Add this
        autoComplete={autoComplete}
        required={required}
        className={`w-full px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-blue-500`}
      />

      {/* ✅ error text below input */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const TextAreaField = ({
    label,
    name,
    value,
    onChange,
    error,
    autoComplete = "off", // ✅ added
    required,
  }) => (
    <div>
      <label
        htmlFor={name}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        required={required}
        className={`w-full px-4 py-3 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg focus:ring-2 focus:ring-blue-500`}
      />

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );

  const ArrayInputField = ({ label, value, onChange }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );

  const UploadInputField = ({
    inputId,
    label,
    file,
    onChange,
    color = "blue",
    error,
    required,
  }) => (
    <div>
      <label
        htmlFor={inputId}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <input
        id={inputId}
        name={inputId} // ✅ added name attribute
        type="file"
        onChange={onChange}
        required={required}
        className={`w-full border ${
          error ? "border-red-500" : `border-${color}-300`
        } rounded-lg p-2 focus:ring-2 focus:ring-${color}-500`}
      />

      {/* ✅ Show selected file name */}
      {file && (
        <p className="text-xs text-gray-600 mt-1">
          {file.name || "File selected"}
        </p>
      )}

      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
  // 2) handlers
  const handleCategoryChange = (e, index) => {
    const updated = [...formData.storeCategories];
    updated[index].category = e.target.value;
    setFormData({ ...formData, storeCategories: updated });
  };

  const handleCustomCategoryChange = (e, index) => {
    const updated = [...formData.storeCategories];
    updated[index].customCategory = e.target.value;
    setFormData({ ...formData, storeCategories: updated });
  };

  const addCategory = () => {
    setFormData((prev) => ({
      ...prev,
      storeCategories: [
        ...prev.storeCategories,
        { category: "", customCategory: "" },
      ],
    }));
  };

  const removeCategory = (index) => {
    setFormData((prev) => {
      const updated = prev.storeCategories.filter((_, i) => i !== index);
      return { ...prev, storeCategories: updated };
    });
  };

  // Business Type Sections
  const renderProprietorshipFields = () => {
    if (formData.natureOfConcern !== "Proprietorship") return null;
    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl">
        <h3 className="text-xl font-bold text-blue-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2" />
          Proprietor Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="proprietorName"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Authorised Proprietor Name
            </label>

            <input
              id="proprietorName"
              type="text"
              name="proprietorName"
              value={formData.proprietorName}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.proprietorName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
              required
            />

            {errors.proprietorName && (
              <p className="text-red-500 text-xs mt-1">
                {errors.proprietorName}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="proprietorDob"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Date of Birth
            </label>
            <input
              id="proprietorDob"
              type="date"
              name="proprietorDob"
              value={formData.proprietorDob}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.proprietorDob ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.proprietorDob && (
              <p className="text-red-500 text-xs mt-1">
                {errors.proprietorDob}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="proprietorPan"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              PAN Number
            </label>
            <input
              id="proprietorPan"
              type="text"
              name="proprietorPan"
              value={formData.proprietorPan}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.proprietorPan ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.proprietorPan && (
              <p className="text-red-500 text-xs mt-1">
                {errors.proprietorPan}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="proprietorAadhaar"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Aadhaar Number
            </label>
            <input
              id="proprietorAadhaar"
              type="text"
              name="proprietorAadhaar"
              value={formData.proprietorAadhaar}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.proprietorAadhaar ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.proprietorAadhaar && (
              <p className="text-red-500 text-xs mt-1">
                {errors.proprietorAadhaar}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="proprietorMobile"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Mobile Number
            </label>
            <input
              id="proprietorMobile"
              type="text"
              name="proprietorMobile"
              value={formData.proprietorMobile}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.proprietorMobile ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.proprietorMobile && (
              <p className="text-red-500 text-xs mt-1">
                {errors.proprietorMobile}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="proprietorEmail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email ID
            </label>
            <input
              id="proprietorEmail"
              type="email"
              name="proprietorEmail"
              value={formData.proprietorEmail}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.proprietorEmail ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.proprietorEmail && (
              <p className="text-red-500 text-xs mt-1">
                {errors.proprietorEmail}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label
              htmlFor="proprietorAddress"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Residential Address
            </label>
            <textarea
              id="proprietorAddress"
              name="proprietorAddress"
              value={formData.proprietorAddress}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border ${
                errors.proprietorAddress ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500`}
              required
            />
            {errors.proprietorAddress && (
              <p className="text-red-500 text-xs mt-1">
                {errors.proprietorAddress}
              </p>
            )}
          </div>

          <UploadInputField
            inputId="proprietorPanCard"
            label="PAN Card"
            file={formData.proprietorPanCard}
            onChange={(e) => handleFileUpload(e, "proprietorPanCard")}
            color="blue"
            error={errors.proprietorPanCard}
            required
          />

          <UploadInputField
            inputId="proprietorAadhaarCard"
            label="Aadhaar Card"
            file={formData.proprietorAadhaarCard}
            onChange={(e) => handleFileUpload(e, "proprietorAadhaarCard")}
            error={errors.proprietorAadhaarCard}
            color="blue"
            required
          />
          <UploadInputField
            inputId="proprietorPhoto"
            label="Photograph"
            file={formData.proprietorPhoto}
            onChange={(e) => handleFileUpload(e, "proprietorPhoto")}
            error={errors.proprietorPhoto}
            color="blue"
            required
          />
        </div>
      </div>
    );
  };

  const renderPartnershipFields = () => {
    if (formData.natureOfConcern !== "Partnership") return null;
    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl">
        <h3 className="text-xl font-bold text-purple-900 mb-6 flex items-center">
          <Users className="w-6 h-6 mr-2" />
          Partnership Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField
            label="Partnership Deed Date *"
            name="partnershipDeedDate"
            value={formData.partnershipDeedDate}
            onChange={handleInputChange}
            type="date"
          />
          <InputField
            label="Partnership PAN *"
            name="partnershipPan"
            value={formData.partnershipPan}
            onChange={handleInputChange}
          />
          <InputField
            label="Number of Partners *"
            name="numberOfPartners"
            value={formData.numberOfPartners}
            onChange={handleInputChange}
            type="number"
          />
          <UploadInputField
            inputId="partnershipDeed"
            label="Partnership Deed *"
            file={formData.partnershipDeed}
            onChange={(e) => handleFileUpload(e, "partnershipDeed")}
            color="purple"
          />
        </div>
        <div className="border-t-2 border-purple-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-purple-900">
              Partners Information
            </h4>
            <button
              type="button"
              onClick={() =>
                addArrayField("partners", {
                  name: "",
                  panNo: "",
                  share: "",
                  address: "",
                  mobile: "",
                })
              }
              className="px-4 py-2 bg-purple-600 text-white rounded-lg flex items-center text-sm hover:bg-purple-700"
            >
              <Plus className="w-4 h-4 mr-1" /> Add Partner
            </button>
          </div>
          {formData.partners.map((partner, idx) => (
            <div
              key={idx}
              className="mb-6 p-4 bg-white rounded-lg border border-purple-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-gray-700">
                  Partner {idx + 1}
                </h5>
                {formData.partners.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField("partners", idx)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ArrayInputField
                  label="Partner Name *"
                  value={partner.name}
                  onChange={(v) =>
                    handleArrayFieldChange("partners", idx, "name", v)
                  }
                />
                <ArrayInputField
                  label="PAN Number *"
                  value={partner.panNo}
                  onChange={(v) =>
                    handleArrayFieldChange("partners", idx, "panNo", v)
                  }
                />
                <ArrayInputField
                  label="Share %"
                  value={partner.share}
                  onChange={(v) =>
                    handleArrayFieldChange("partners", idx, "share", v)
                  }
                />
                <ArrayInputField
                  label="Mobile Number *"
                  value={partner.mobile}
                  onChange={(v) =>
                    handleArrayFieldChange("partners", idx, "mobile", v)
                  }
                />
                <ArrayInputField
                  label="Address *"
                  value={partner.address}
                  onChange={(v) =>
                    handleArrayFieldChange("partners", idx, "address", v)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderLLPFields = () => {
    if (formData.natureOfConcern !== "Limited Liability Partnership")
      return null;
    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-200 rounded-xl">
        <h3 className="text-xl font-bold text-green-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2" />
          LLP Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField
            label="LLP Name *"
            name="llpName"
            value={formData.llpName}
            onChange={handleInputChange}
          />
          <InputField
            label="LLP Registration No *"
            name="llpRegistrationNo"
            value={formData.llpRegistrationNo}
            onChange={handleInputChange}
          />
          <InputField
            label="LLP PAN *"
            name="llpPan"
            value={formData.llpPan}
            onChange={handleInputChange}
          />
          <InputField
            label="Incorporation Date *"
            name="llpIncorporationDate"
            value={formData.llpIncorporationDate}
            onChange={handleInputChange}
            type="date"
          />
          <InputField
            label="Number of Designated Partners *"
            name="numberOfDesignatedPartners"
            value={formData.numberOfDesignatedPartners}
            onChange={handleInputChange}
            type="number"
          />
          <UploadInputField
            inputId="llpCertificate"
            label="LLP Certificate *"
            file={formData.llpCertificate}
            onChange={(e) => handleFileUpload(e, "llpCertificate")}
            color="green"
          />
          <UploadInputField
            inputId="llpAgreement"
            label="LLP Agreement *"
            file={formData.llpAgreement}
            onChange={(e) => handleFileUpload(e, "llpAgreement")}
            color="green"
          />
        </div>
        <div className="border-t-2 border-green-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-green-900">
              Designated Partners
            </h4>
            <button
              type="button"
              onClick={() =>
                addArrayField("designatedPartners", {
                  name: "",
                  dinNo: "",
                  panNo: "",
                  address: "",
                })
              }
              className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center text-sm hover:bg-green-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Partner
            </button>
          </div>
          {formData.designatedPartners.map((partner, idx) => (
            <div
              key={idx}
              className="mb-6 p-4 bg-white rounded-lg border border-green-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-gray-700">
                  Partner {idx + 1}
                </h5>
                {formData.designatedPartners.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField("designatedPartners", idx)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ArrayInputField
                  label="Name *"
                  value={partner.name}
                  onChange={(v) =>
                    handleArrayFieldChange("designatedPartners", idx, "name", v)
                  }
                />
                <ArrayInputField
                  label="DIN Number *"
                  value={partner.dinNo}
                  onChange={(v) =>
                    handleArrayFieldChange(
                      "designatedPartners",
                      idx,
                      "dinNo",
                      v
                    )
                  }
                />
                <ArrayInputField
                  label="PAN Number *"
                  value={partner.panNo}
                  onChange={(v) =>
                    handleArrayFieldChange(
                      "designatedPartners",
                      idx,
                      "panNo",
                      v
                    )
                  }
                />
                <ArrayInputField
                  label="Address *"
                  value={partner.address}
                  onChange={(v) =>
                    handleArrayFieldChange(
                      "designatedPartners",
                      idx,
                      "address",
                      v
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPvtLtdFields = () => {
    if (formData.natureOfConcern !== "Private Limited") return null;
    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-100 border-2 border-indigo-200 rounded-xl">
        <h3 className="text-xl font-bold text-indigo-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2" />
          Private Limited Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField
            label="Company Name *"
            name="pvtLtdName"
            value={formData.pvtLtdName}
            onChange={handleInputChange}
          />
          <InputField
            label="CIN Number *"
            name="cinNumber"
            value={formData.cinNumber}
            onChange={handleInputChange}
          />
          <InputField
            label="Company PAN *"
            name="pvtLtdPan"
            value={formData.pvtLtdPan}
            onChange={handleInputChange}
          />
          <InputField
            label="Incorporation Date *"
            name="incorporationDate"
            value={formData.incorporationDate}
            onChange={handleInputChange}
            type="date"
          />
          <InputField
            label="Authorized Capital *"
            name="authorizedCapital"
            value={formData.authorizedCapital}
            onChange={handleInputChange}
          />
          <InputField
            label="Paid Up Capital *"
            name="paidUpCapital"
            value={formData.paidUpCapital}
            onChange={handleInputChange}
          />
          <InputField
            label="Number of Directors *"
            name="numberOfDirectors"
            value={formData.numberOfDirectors}
            onChange={handleInputChange}
            type="number"
          />
          <UploadInputField
            inputId="incorporationCertificate"
            label="Incorporation Certificate *"
            file={formData.incorporationCertificate}
            onChange={(e) => handleFileUpload(e, "incorporationCertificate")}
            color="indigo"
          />
          <UploadInputField
            inputId="moaDocument"
            label="MOA Document *"
            file={formData.moaDocument}
            onChange={(e) => handleFileUpload(e, "moaDocument")}
            color="indigo"
          />
          <UploadInputField
            inputId="aoaDocument"
            label="AOA Document *"
            file={formData.aoaDocument}
            onChange={(e) => handleFileUpload(e, "aoaDocument")}
            color="indigo"
          />
        </div>
        <div className="border-t-2 border-indigo-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-indigo-900">
              Directors Information
            </h4>
            <button
              type="button"
              onClick={() =>
                addArrayField("directors", {
                  name: "",
                  dinNo: "",
                  panNo: "",
                  address: "",
                })
              }
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center text-sm hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Director
            </button>
          </div>
          {formData.directors.map((director, idx) => (
            <div
              key={idx}
              className="mb-6 p-4 bg-white rounded-lg border border-indigo-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-gray-700">
                  Director {idx + 1}
                </h5>
                {formData.directors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField("directors", idx)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ArrayInputField
                  label="Name *"
                  value={director.name}
                  onChange={(v) =>
                    handleArrayFieldChange("directors", idx, "name", v)
                  }
                />
                <ArrayInputField
                  label="DIN Number *"
                  value={director.dinNo}
                  onChange={(v) =>
                    handleArrayFieldChange("directors", idx, "dinNo", v)
                  }
                />
                <ArrayInputField
                  label="PAN Number *"
                  value={director.panNo}
                  onChange={(v) =>
                    handleArrayFieldChange("directors", idx, "panNo", v)
                  }
                />
                <ArrayInputField
                  label="Address *"
                  value={director.address}
                  onChange={(v) =>
                    handleArrayFieldChange("directors", idx, "address", v)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPublicLtdFields = () => {
    if (formData.natureOfConcern !== "Public Limited") return null;
    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-200 rounded-xl">
        <h3 className="text-xl font-bold text-yellow-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2" />
          Public Limited Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField
            label="Company Name *"
            name="publicLtdName"
            value={formData.publicLtdName}
            onChange={handleInputChange}
          />
          <InputField
            label="CIN Number *"
            name="publicCinNumber"
            value={formData.publicCinNumber}
            onChange={handleInputChange}
          />
          <InputField
            label="Company PAN *"
            name="publicLtdPan"
            value={formData.publicLtdPan}
            onChange={handleInputChange}
          />
          <InputField
            label="Incorporation Date *"
            name="publicIncorporationDate"
            value={formData.publicIncorporationDate}
            onChange={handleInputChange}
            type="date"
          />
          <InputField
            label="Authorized Capital *"
            name="publicAuthorizedCapital"
            value={formData.publicAuthorizedCapital}
            onChange={handleInputChange}
          />
          <InputField
            label="Paid Up Capital *"
            name="publicPaidUpCapital"
            value={formData.publicPaidUpCapital}
            onChange={handleInputChange}
          />
          <InputField
            label="Number of Directors *"
            name="publicNumberOfDirectors"
            value={formData.publicNumberOfDirectors}
            onChange={handleInputChange}
            type="number"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listed Status *
            </label>
            <select
              name="listedStatus"
              value={formData.listedStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
          <InputField
            label="Stock Exchange"
            name="stockExchange"
            value={formData.stockExchange}
            onChange={handleInputChange}
          />
          <UploadInputField
            inputId="publicIncorporationCertificate"
            label="Incorporation Certificate *"
            file={formData.publicIncorporationCertificate}
            onChange={(e) =>
              handleFileUpload(e, "publicIncorporationCertificate")
            }
            color="yellow"
          />
          <UploadInputField
            inputId="publicMoaDocument"
            label="MOA Document *"
            file={formData.publicMoaDocument}
            onChange={(e) => handleFileUpload(e, "publicMoaDocument")}
            color="yellow"
          />
          <UploadInputField
            inputId="publicAoaDocument"
            label="AOA Document *"
            file={formData.publicAoaDocument}
            onChange={(e) => handleFileUpload(e, "publicAoaDocument")}
            color="yellow"
          />
        </div>
        <div className="border-t-2 border-yellow-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-yellow-900">
              Directors Information
            </h4>
            <button
              type="button"
              onClick={() =>
                addArrayField("publicDirectors", {
                  name: "",
                  dinNo: "",
                  panNo: "",
                  address: "",
                })
              }
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg flex items-center text-sm hover:bg-yellow-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Director
            </button>
          </div>
          {formData.publicDirectors.map((director, idx) => (
            <div
              key={idx}
              className="mb-6 p-4 bg-white rounded-lg border border-yellow-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-gray-700">
                  Director {idx + 1}
                </h5>
                {formData.publicDirectors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField("publicDirectors", idx)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ArrayInputField
                  label="Name *"
                  value={director.name}
                  onChange={(v) =>
                    handleArrayFieldChange("publicDirectors", idx, "name", v)
                  }
                />
                <ArrayInputField
                  label="DIN Number *"
                  value={director.dinNo}
                  onChange={(v) =>
                    handleArrayFieldChange("publicDirectors", idx, "dinNo", v)
                  }
                />
                <ArrayInputField
                  label="PAN Number *"
                  value={director.panNo}
                  onChange={(v) =>
                    handleArrayFieldChange("publicDirectors", idx, "panNo", v)
                  }
                />
                <ArrayInputField
                  label="Address *"
                  value={director.address}
                  onChange={(v) =>
                    handleArrayFieldChange("publicDirectors", idx, "address", v)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTrustFields = () => {
    if (formData.natureOfConcern !== "Public Limited") return null;
    return (
      <div className="mt-6 p-6 bg-gradient-to-br from-yellow-50 to-orange-100 border-2 border-yellow-200 rounded-xl">
        <h3 className="text-xl font-bold text-yellow-900 mb-6 flex items-center">
          <Building className="w-6 h-6 mr-2" />
          Public Limited Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <InputField
            label="Company Name *"
            name="publicLtdName"
            value={formData.publicLtdName}
            onChange={handleInputChange}
          />
          <InputField
            label="CIN Number *"
            name="publicCinNumber"
            value={formData.publicCinNumber}
            onChange={handleInputChange}
          />
          <InputField
            label="Company PAN *"
            name="publicLtdPan"
            value={formData.publicLtdPan}
            onChange={handleInputChange}
          />
          <InputField
            label="Incorporation Date *"
            name="publicIncorporationDate"
            value={formData.publicIncorporationDate}
            onChange={handleInputChange}
            type="date"
          />
          <InputField
            label="Authorized Capital *"
            name="publicAuthorizedCapital"
            value={formData.publicAuthorizedCapital}
            onChange={handleInputChange}
          />
          <InputField
            label="Paid Up Capital *"
            name="publicPaidUpCapital"
            value={formData.publicPaidUpCapital}
            onChange={handleInputChange}
          />
          <InputField
            label="Number of Directors *"
            name="publicNumberOfDirectors"
            value={formData.publicNumberOfDirectors}
            onChange={handleInputChange}
            type="number"
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Listed Status *
            </label>
            <select
              name="listedStatus"
              value={formData.listedStatus}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </select>
          </div>
          <InputField
            label="Stock Exchange"
            name="stockExchange"
            value={formData.stockExchange}
            onChange={handleInputChange}
          />
          <UploadInputField
            inputId="publicIncorporationCertificate"
            label="Incorporation Certificate *"
            file={formData.publicIncorporationCertificate}
            onChange={(e) =>
              handleFileUpload(e, "publicIncorporationCertificate")
            }
            color="yellow"
          />
          <UploadInputField
            inputId="publicMoaDocument"
            label="MOA Document *"
            file={formData.publicMoaDocument}
            onChange={(e) => handleFileUpload(e, "publicMoaDocument")}
            color="yellow"
          />
          <UploadInputField
            inputId="publicAoaDocument"
            label="AOA Document *"
            file={formData.publicAoaDocument}
            onChange={(e) => handleFileUpload(e, "publicAoaDocument")}
            color="yellow"
          />
        </div>
        <div className="border-t-2 border-yellow-200 pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-yellow-900">
              Directors Information
            </h4>
            <button
              type="button"
              onClick={() =>
                addArrayField("publicDirectors", {
                  name: "",
                  dinNo: "",
                  panNo: "",
                  address: "",
                })
              }
              className="px-4 py-2 bg-yellow-600 text-white rounded-lg flex items-center text-sm hover:bg-yellow-700"
            >
              <Plus className="w-4 h-4 mr-1" />
              Add Director
            </button>
          </div>
          {formData.publicDirectors.map((director, idx) => (
            <div
              key={idx}
              className="mb-6 p-4 bg-white rounded-lg border border-yellow-200"
            >
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-gray-700">
                  Director {idx + 1}
                </h5>
                {formData.publicDirectors.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeArrayField("publicDirectors", idx)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ArrayInputField
                  label="Name *"
                  value={director.name}
                  onChange={(v) =>
                    handleArrayFieldChange("publicDirectors", idx, "name", v)
                  }
                />
                <ArrayInputField
                  label="DIN Number *"
                  value={director.dinNo}
                  onChange={(v) =>
                    handleArrayFieldChange("publicDirectors", idx, "dinNo", v)
                  }
                />
                <ArrayInputField
                  label="PAN Number *"
                  value={director.panNo}
                  onChange={(v) =>
                    handleArrayFieldChange("publicDirectors", idx, "panNo", v)
                  }
                />
                <ArrayInputField
                  label="Address *"
                  value={director.address}
                  onChange={(v) =>
                    handleArrayFieldChange("publicDirectors", idx, "address", v)
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  const renderStepContent = () => {
    switch (currentStep) {
      // ---------------- STEP 1: Personal Information ----------------
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name *
                </label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  className={`w-full px-4 py-2 border ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name *
                </label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  className={`w-full px-4 py-2 border ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleEmailChange}
                autoComplete="email"
                className={`w-full px-4 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="your.email@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password *
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="new-password"
                  className="w-full border px-3 py-2 rounded pr-10"
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                    setFormData((prev) => ({ ...prev, password: value }));
                  }}
                  value={password}
                  placeholder="Enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>

              {password.length > 0 && (
                <div className="text-sm space-y-1 mt-2">
                  <p
                    className={rules.lower ? "text-green-600" : "text-red-600"}
                  >
                    {rules.lower ? "✓" : "✖"} Must include a lowercase letter
                  </p>
                  <p
                    className={rules.upper ? "text-green-600" : "text-red-600"}
                  >
                    {rules.upper ? "✓" : "✖"} Must include an uppercase letter
                  </p>
                  <p
                    className={rules.number ? "text-green-600" : "text-red-600"}
                  >
                    {rules.number ? "✓" : "✖"} Must include a number
                  </p>
                  <p
                    className={
                      rules.special ? "text-green-600" : "text-red-600"
                    }
                  >
                    {rules.special ? "✓" : "✖"} Must include a special character
                  </p>
                  <p
                    className={rules.length ? "text-green-600" : "text-red-600"}
                  >
                    {rules.length ? "✓" : "✖"} Minimum 8 characters
                  </p>
                </div>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number *
              </label>
              <input
                id="phone"
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                autoComplete="tel"
                className={`w-full px-4 py-2 border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="+91 00000 00000"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="dateOfBirth"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date of Birth *
              </label>
              <input
                id="dateOfBirth"
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                autoComplete="bday"
                className={`w-full px-4 py-2 border ${
                  errors.dateOfBirth ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.dateOfBirth && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="referralCode"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Referral Code (Optional)
              </label>
              <input
                id="referralCode"
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleInputChange}
                autoComplete="bday"
                className={`w-full px-4 py-2 border ${
                  errors.referralCode ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              />
              {errors.referralCode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.referralCode}
                </p>
              )}
            </div>
          </div>
        ); // ---------------- STEP 2: Business Information ----------------
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Business Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="natureOfConcern"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Nature of Concern *
                </label>
                <select
                  id="natureOfConcern"
                  name="natureOfConcern"
                  value={formData.natureOfConcern}
                  onChange={handleInputChange}
                  autoComplete="organization-title"
                  className={`w-full px-4 py-2 border ${
                    errors.natureOfConcern
                      ? "border-red-500"
                      : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                >
                  <option value="SELECT">SELECT</option>
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
                  <p className="text-red-500 text-xs mt-1">
                    {errors.natureOfConcern}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="firmName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Firm/Business Name *
                </label>
                <input
                  id="firmName"
                  type="text"
                  name="firmName"
                  value={formData.firmName}
                  onChange={handleInputChange}
                  autoComplete="organization"
                  className={`w-full px-4 py-2 border ${
                    errors.firmName ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Enter firm name"
                />
                {errors.firmName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firmName}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="nameAsPerPan"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name as per PAN *
                </label>
                <input
                  id="nameAsPerPan"
                  type="text"
                  name="nameAsPerPan"
                  value={formData.nameAsPerPan}
                  onChange={handleInputChange}
                  autoComplete="name"
                  className={`w-full px-4 py-2 border ${
                    errors.nameAsPerPan ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Name as per PAN"
                />
                {errors.nameAsPerPan && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.nameAsPerPan}
                  </p>
                )}
              </div>
            </div>

            {/* GST Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Do you have GST? */}
              <div>
                <label
                  htmlFor="hasGst"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Do you have a GST Number? *
                </label>

                <select
                  id="hasGst"
                  name="hasGst"
                  value={formData.hasGst}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border ${
                    errors.hasGst ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  required
                >
                  <option value="">SELECT</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>

                {errors.hasGst && (
                  <p className="text-red-500 text-xs mt-1">{errors.hasGst}</p>
                )}
              </div>

              {/* GST Number */}
              {formData.hasGst === "Yes" && (
                <div>
                  <label
                    htmlFor="gstNumber"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    GST Number *
                  </label>

                  <input
                    id="gstNumber"
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleInputChange}
                    maxLength={15}
                    placeholder="Enter 15-digit GST number"
                    className={`w-full px-4 py-2 border ${
                      errors.gstNumber ? "border-red-500" : "border-gray-300"
                    } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent uppercase`}
                  />

                  {errors.gstNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gstNumber}
                    </p>
                  )}
                </div>
              )}

              {/* GST Certificate Upload */}
              {formData.hasGst === "Yes" && (
                <div>
                  <label
                    htmlFor="gstFile"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Upload GST Certificate *
                  </label>

                  <input
                    id="gstFile"
                    type="file"
                    name="gstFile"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className={`w-full px-4 py-2 border ${
                      errors.gstFile ? "border-red-500" : "border-gray-300"
                    } rounded-lg bg-white cursor-pointer`}
                    required={formData.hasGst === "Yes"}
                  />

                  {errors.gstFile && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.gstFile}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Conditional business type sections */}
            {formData.natureOfConcern === "Proprietorship" &&
              renderProprietorshipFields()}
            {formData.natureOfConcern === "Partnership" &&
              renderPartnershipFields()}
            {formData.natureOfConcern === "Limited Liability Partnership" &&
              renderLLPFields()}
            {formData.natureOfConcern === "Private Limited" &&
              renderPvtLtdFields()}
            {formData.natureOfConcern === "Public Limited" &&
              renderPublicLtdFields()}
            {formData.natureOfConcern === "Trust" && renderTrustFields()}
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Business Documents
            </h2>
            <p className="text-gray-600 mb-4">
              Upload or provide document numbers for verification
            </p>

            <div>
              <label
                htmlFor="businessLicense"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Business License Number *
              </label>
              <input
                id="businessLicense"
                type="text"
                name="businessLicense"
                value={formData.businessLicense}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.businessLicense ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="License number or upload reference"
              />
              {errors.businessLicense && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.businessLicense}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="taxCertificate"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tax Certificate Number *
              </label>
              <input
                id="taxCertificate"
                type="text"
                name="taxCertificate"
                value={formData.taxCertificate}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.taxCertificate ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Certificate number or upload reference"
              />
              {errors.taxCertificate && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.taxCertificate}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="identityProof"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Identity Proof (Driver's License/Passport) *
              </label>
              <input
                id="identityProof"
                type="text"
                name="identityProof"
                value={formData.identityProof}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.identityProof ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="ID number or upload reference"
              />
              {errors.identityProof && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.identityProof}
                </p>
              )}
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> These documents will be verified by our
                team within 24-48 hours. You'll receive an email confirmation
                once approved.
              </p>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Bank Account Details
            </h2>
            <p className="text-gray-600 mb-4">
              For receiving payments from sales
            </p>

            <div>
              <label
                htmlFor="bankName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Bank Name *
              </label>
              <input
                id="bankName"
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.bankName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="State Bank of India"
              />
              {errors.bankName && (
                <p className="text-red-500 text-xs mt-1">{errors.bankName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="accountHolderName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Account Holder Name *
              </label>
              <input
                id="accountHolderName"
                type="text"
                name="accountHolderName"
                value={formData.accountHolderName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.accountHolderName
                    ? "border-red-500"
                    : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Full name as on account"
              />
              {errors.accountHolderName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountHolderName}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Account Number *
              </label>
              <input
                id="accountNumber"
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.accountNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="Account number"
              />
              {errors.accountNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountNumber}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="routingNumber"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                IFSC Code *
              </label>
              <input
                id="routingNumber"
                type="text"
                name="routingNumber"
                value={formData.routingNumber}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.routingNumber ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                placeholder="IFSC Code"
              />
              {errors.routingNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.routingNumber}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="accountType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Account Type *
              </label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.accountType ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              >
                <option value="">Select account type</option>
                <option value="savings">Savings</option>
                <option value="current">Current</option>
                <option value="business">Business</option>
              </select>
              {errors.accountType && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.accountType}
                </p>
              )}
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
              <p className="text-sm text-green-800">
                <strong>Secure:</strong> Your bank details are encrypted and
                stored securely. We never share your information with third
                parties.
              </p>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Store Setup
            </h2>

            {/* STORE LOGO UPLOAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Logo *
              </label>
              <input
                type="file"
                name="storeLogo"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "storeLogo")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
              />
              {errors.storeLogo && (
                <p className="text-red-500 text-xs mt-1">{errors.storeLogo}</p>
              )}
            </div>

            {/* STORE BANNER UPLOAD */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Banner *
              </label>
              <input
                type="file"
                name="storeBanner"
                accept="image/*"
                onChange={(e) => handleImageUpload(e, "storeBanner")}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white"
              />
              {errors.storeBanner && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.storeBanner}
                </p>
              )}
            </div>

            {/* STORE NAME */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Name *
              </label>
              <input
                type="text"
                name="storeName"
                value={formData.storeName}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.storeName ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                placeholder="Your Store Name"
              />
            </div>

            {/* STORE DESCRIPTION */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Description *
              </label>
              <textarea
                name="storeDescription"
                value={formData.storeDescription}
                onChange={handleInputChange}
                rows="4"
                className={`w-full px-4 py-2 border ${
                  errors.storeDescription ? "border-red-500" : "border-gray-300"
                } rounded-lg`}
                placeholder="Describe your store..."
              />
            </div>

            {/* STORE CATEGORIES */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Categories *
              </label>

              {formData.storeCategories.map((cat, index) => (
                <div key={index} className="flex items-center gap-3 mb-3">
                  <select
                    value={cat.category}
                    onChange={(e) => handleCategoryChange(e, index)}
                    className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="">Select category</option>
                    {categories?.map((item) => (
                      <option key={item._id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                    <option value="Other">Others</option>
                  </select>

                  {cat.category === "Other" && (
                    <input
                      type="text"
                      placeholder="Enter custom category"
                      value={cat.customCategory}
                      onChange={(e) => handleCustomCategoryChange(e, index)}
                      className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  )}

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeCategory(index)}
                      className="text-red-500 font-bold text-xl"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addCategory}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                + Add Another Category
              </button>
            </div>
            {/* STORE ADDRESS */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Store Address *
              </label>
              <input
                type="text"
                name="storeAddress"
                value={formData.storeAddress}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.storeAddress ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter store address"
              />
              {errors.storeAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.storeAddress}
                </p>
              )}
            </div>

            {/* CITY */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="storeCity"
                value={formData.storeCity}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.storeCity ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter city"
              />
              {errors.storeCity && (
                <p className="text-red-500 text-xs mt-1">{errors.storeCity}</p>
              )}
            </div>

            {/* STATE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                name="storeState"
                value={formData.storeState}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.storeState ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter state"
              />
              {errors.storeState && (
                <p className="text-red-500 text-xs mt-1">{errors.storeState}</p>
              )}
            </div>

            {/* PINCODE */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pincode *
              </label>
              <input
                type="text"
                name="storePincode"
                value={formData.storePincode}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.storePincode ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter pincode"
              />
              {errors.storePincode && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.storePincode}
                </p>
              )}
            </div>

            {/* PICKUP CONTACT NUMBER */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contact Number *
              </label>
              <input
                type="tel"
                name="pickupContact"
                value={formData.pickupContact}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border ${
                  errors.pickupContact ? "border-red-500" : "border-gray-300"
                } rounded-lg focus:ring-2 focus:ring-blue-500`}
                placeholder="Enter contact number"
              />
              {errors.pickupContact && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.pickupContact}
                </p>
              )}
            </div>

            {/* // After Pickup Contact input */}
            {errors.pickupContact && (
              <p className="text-red-500 text-xs mt-1">
                {errors.pickupContact}
              </p>
            )}

            {/* TERMS ACCEPTANCE */}
            <div className="border-t pt-4 mt-6">
              <div className="flex items-start">
                <input
                  id="termsAccepted"
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleInputChange}
                  className={`mt-1 mr-3 ${
                    errors.termsAccepted ? "border-red-500" : ""
                  }`}
                />

                <div className="flex-1">
                  <label
                    htmlFor="termsAccepted"
                    className="text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <button
                      type="button"
                      className="text-blue-600 underline"
                      onClick={() => setShowTermsModal(true)}
                    >
                      Terms & Conditions
                    </button>{" "}
                    and{" "}
                    <a className="text-blue-600 underline">Privacy Policy</a> *
                  </label>

                  {errors.termsAccepted && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.termsAccepted}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* TERMS & CONDITIONS MODAL */}
            {showTermsModal && (
              <div
                className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50"
                onClick={() => setShowTermsModal(false)} // click outside to close
              >
                <div
                  className="bg-white w-full max-w-lg p-6 rounded-lg shadow-xl relative"
                  onClick={(e) => e.stopPropagation()} // prevents closing when clicking inside
                >
                  {/* Close Button */}
                  <button
                    className="absolute top-2 right-3 text-gray-600 text-xl"
                    onClick={() => setShowTermsModal(false)}
                  >
                    ✕
                  </button>

                  <h2 className="text-xl font-bold mb-4">
                    Store Terms & Conditions
                  </h2>

                  <ul className="space-y-3 text-gray-700 text-sm">
                    <li>
                      ✅ You must provide correct and updated store details.
                    </li>
                    <li>
                      🪪 Your store name, logo, and images must not violate any
                      copyrights.
                    </li>
                    <li>
                      📦 All listed products must be genuine and follow legal
                      guidelines.
                    </li>
                    <li>
                      🔄 You must clearly mention your return and shipping
                      policies.
                    </li>
                    <li>🚫 You must not list banned or illegal items.</li>
                    <li>💰 Prices must be transparent with no hidden fees.</li>
                    <li>🚚 Orders must be shipped on time as mentioned.</li>
                    <li>
                      📊 Store details may be used for analytics and marketing.
                    </li>
                    <li>🧾 GST and other tax rules must be followed.</li>
                    <li>✔️ KYC & seller verification must be completed.</li>
                    <li>⚠️ Fake orders or misuse can result in suspension.</li>
                    <li>
                      🔄 Policy updates may occur; continued use means
                      acceptance.
                    </li>
                  </ul>

                  <button
                    className="mt-6 w-full bg-blue-600 text-white py-2 rounded-lg"
                    onClick={() => setShowTermsModal(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Seller Registration
          </h1>
          <p className="text-gray-600">
            Join our marketplace and start selling today
          </p>
        </div>
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;

              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? "bg-green-500 text-white"
                          : isActive
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                      ) : (
                        <Icon className="w-6 h-6" />
                      )}
                    </div>
                    <span
                      className={`text-xs mt-2 font-medium ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xxl mx-auto mt-10">
          {renderStepContent()}

          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" />
              Previous
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all"
              >
                Next
                <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleCompleteRegistration}
                disabled={loading}
                className={`flex items-center px-8 py-3 rounded-lg font-medium transition-all ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                } text-white`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete Registration
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Need help?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SellerRegistration;
