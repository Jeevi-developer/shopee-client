import React, { createContext, useContext, useState } from "react";

/**
 * SellerFormContext
 * - Full context that mirrors the Seller mongoose model
 * - Option A1: includes system fields as well (status, approvalReason, timestamps placeholders, etc.)
 *
 * Usage:
 *  const { formData, update, updateMultiple, setFile, pushArrayItem, removeArrayItem, resetForm } = useSellerForm();
 */

const SellerFormContext = createContext(null);

export function SellerFormProvider({ children }) {
  const [formData, setFormData] = useState({
    // ----------------- STEP 1: Personal Info -----------------
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phone: "",
    dateOfBirth: "",
    referralCode: "",
    referredBy: "",

    agreementVersion: "v1.0",
    signedAgreementURL: "", // backend file path
    isAgreementUploaded: false,
    adminAgreementApproval: {
      status: "pending", // pending | approved | rejected
      reviewedBy: "",
      reviewedAt: null,
      remarks: "",
    },
    agreementUploadedAt: null,

    // ----------------- STEP 2: Business Info -----------------
    businessName: "",
    businessType: "",
    businessRegNumber: "",
    taxId: "",
    businessAddress: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",

    natureOfConcern: "",
    firmName: "",
    nameAsPerPan: "",
    hasGst: "", // "Yes" | "No" or boolean (string because form inputs use strings)
    gstNumber: "",
    gstFile: null, // file

    // ----------------- Proprietorship -----------------
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

    // ----------------- Partnership -----------------
    partnershipDeedDate: "",
    numberOfPartners: 0,
    partnershipPan: "",
    partnershipDeed: null, // file
    partners: [], // array of PartnerSchema objects: { name, panNo, share, address, mobile }

    // ----------------- LLP -----------------
    llpName: "",
    llpRegistrationNo: "",
    llpPan: "",
    llpIncorporationDate: "",
    numberOfDesignatedPartners: 0,
    llpCertificate: null,
    llpAgreement: null,
    designatedPartners: [], // array of DirectorSchema

    // ----------------- Pvt Ltd -----------------
    pvtLtdName: "",
    cinNumber: "",
    pvtLtdPan: "",
    incorporationDate: "",
    authorizedCapital: "",
    paidUpCapital: "",
    numberOfDirectors: 0,
    incorporationCertificate: null,
    moaDocument: null,
    aoaDocument: null,
    directors: [], // array of DirectorSchema

    // ----------------- Public Ltd -----------------
    publicLtdName: "",
    publicCinNumber: "",
    publicLtdPan: "",
    publicIncorporationDate: "",
    listedStatus: "NO",
    stockExchange: "",
    publicAuthorizedCapital: "",
    publicPaidUpCapital: "",
    publicNumberOfDirectors: 0,
    publicIncorporationCertificate: null,
    publicMoaDocument: null,
    publicAoaDocument: null,
    publicDirectors: [],

    // ----------------- Store Setup -----------------
    gstin: "",
    pan: "",
    storeName: "",
    storeDescription: "",
    storeAddress: "",
    storeCity: "",
    storeState: "",
    storePincode: "",
    storeCategories: [], // array of { category, customCategory }
    storeLogo: null,
    storeBanner: null,

    pickupAddress: "",
    pickupPincode: "",
    pickupContact: "",
    esignature: null,
    addressProof: null,
    photoId: null,

    // ----------------- Business Documents -----------------
    businessLicense: null,
    taxCertificate: null,
    identityProof: null,

    // ----------------- Bank Details -----------------
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    routingNumber: "",
    accountType: "",

    // ----------------- Terms -----------------
    termsAccepted: false,

    // ----------------- Status & admin fields (system) -----------------
    status: "pending", // pending | approved | rejected | suspended
    approvalReason: "",
    statusReason: "",
    approvedAt: null,
    suspendedAt: null,

    // ----------------- Password reset (system) -----------------
    resetPasswordToken: "",
    resetPasswordExpire: null,

    // ----------------- Additional arrays/objects to match schema -----------------
    partnersBackup: [], // optional extras if you need temp storage
    trustees: [],

    // Keep this to track current step in UI if you want:
    currentStep: 1,
  });

  // ---- single-key update ----
  const update = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  // ---- update multiple keys at once ----
  const updateMultiple = (obj) => {
    if (!obj || typeof obj !== "object") return;
    setFormData((prev) => ({ ...prev, ...obj }));
  };

  // ---- set file for a specific key (keeps API consistent) ----
  const setFile = (key, file) => {
    setFormData((prev) => ({ ...prev, [key]: file }));
  };

  // ---- push item to an array field (e.g., partners, directors, storeCategories) ----
  const pushArrayItem = (arrayKey, item = {}) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[arrayKey]) ? prev[arrayKey] : [];
      return { ...prev, [arrayKey]: [...arr, item] };
    });
  };

  // ---- remove array item by index ----
  const removeArrayItem = (arrayKey, index) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[arrayKey]) ? [...prev[arrayKey]] : [];
      if (index < 0 || index >= arr.length) return prev;
      arr.splice(index, 1);
      return { ...prev, [arrayKey]: arr };
    });
  };

  // ---- replace array item by index ----
  const replaceArrayItem = (arrayKey, index, newItem) => {
    setFormData((prev) => {
      const arr = Array.isArray(prev[arrayKey]) ? [...prev[arrayKey]] : [];
      arr[index] = newItem;
      return { ...prev, [arrayKey]: arr };
    });
  };

  // ---- reset to default initial state (keeps same defaults) ----
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      dateOfBirth: "",
      referralCode: "",
      referredBy: "",
      agreementVersion: "v1.0",
      signedAgreementURL: "",
      isAgreementUploaded: false,
      adminAgreementApproval: {
        status: "pending",
        reviewedBy: "",
        reviewedAt: null,
        remarks: "",
      },
      agreementUploadedAt: null,

      businessName: "",
      businessType: "",
      businessRegNumber: "",
      taxId: "",
      businessAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",

      natureOfConcern: "",
      firmName: "",
      nameAsPerPan: "",
      hasGst: "",
      gstNumber: "",
      gstFile: null,

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

      partnershipDeedDate: "",
      numberOfPartners: 0,
      partnershipPan: "",
      partnershipDeed: null,
      partners: [],

      llpName: "",
      llpRegistrationNo: "",
      llpPan: "",
      llpIncorporationDate: "",
      numberOfDesignatedPartners: 0,
      llpCertificate: null,
      llpAgreement: null,
      designatedPartners: [],

      pvtLtdName: "",
      cinNumber: "",
      pvtLtdPan: "",
      incorporationDate: "",
      authorizedCapital: "",
      paidUpCapital: "",
      numberOfDirectors: 0,
      incorporationCertificate: null,
      moaDocument: null,
      aoaDocument: null,
      directors: [],

      publicLtdName: "",
      publicCinNumber: "",
      publicLtdPan: "",
      publicIncorporationDate: "",
      listedStatus: "NO",
      stockExchange: "",
      publicAuthorizedCapital: "",
      publicPaidUpCapital: "",
      publicNumberOfDirectors: 0,
      publicIncorporationCertificate: null,
      publicMoaDocument: null,
      publicAoaDocument: null,
      publicDirectors: [],

      gstin: "",
      pan: "",
      storeName: "",
      storeDescription: "",
      storeAddress: "",
      storeCity: "",
      storeState: "",
      storePincode: "",
      storeCategories: [],
      storeLogo: null,
      storeBanner: null,

      pickupAddress: "",
      pickupPincode: "",
      pickupContact: "",
      esignature: null,
      addressProof: null,
      photoId: null,

      businessLicense: null,
      taxCertificate: null,
      identityProof: null,

      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
      accountType: "",

      termsAccepted: false,

      status: "pending",
      approvalReason: "",
      statusReason: "",
      approvedAt: null,
      suspendedAt: null,

      resetPasswordToken: "",
      resetPasswordExpire: null,

      partnersBackup: [],
      trustees: [],

      currentStep: 1,
    });
  };

  return (
    <SellerFormContext.Provider
      value={{
        formData,
        setFormData,
        update,
        updateMultiple,
        setFile,
        pushArrayItem,
        removeArrayItem,
        replaceArrayItem,
        resetForm,
      }}
    >
      {children}
    </SellerFormContext.Provider>
  );
}

export function useSellerForm() {
  const ctx = useContext(SellerFormContext);
  if (!ctx) throw new Error("useSellerForm must be used inside SellerFormProvider");
  return ctx;
}
