// SellerFormContext.jsx
import React, { createContext, useContext, useState } from "react";

const SellerFormContext = createContext();

export function SellerFormProvider({ children }) {
  const [formData, setFormData] = useState({
    step1: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      dateOfBirth: "",
      referralCode: "",
      signedAgreement: null,
    },

    step2: {
      businessName: "",
      businessType: "",
      businessRegNumber: "",
      taxId: "",
      businessAddress: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
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
    },

    step3: {
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
    },

    step4: {
      bankName: "",
      accountHolderName: "",
      accountNumber: "",
      routingNumber: "",
      accountType: "",
      bankStatement: null,
      termsAccepted: false,
    },
  });

  const update = (step, key, value) => {
    setFormData(prev => ({
      ...prev,
      [step]: {
        ...prev[step],
        [key]: value,
      },
    }));
  };

  const updateMultiple = (step, obj) => {
    setFormData(prev => ({
      ...prev,
      [step]: { ...prev[step], ...obj },
    }));
  };

  return (
    <SellerFormContext.Provider value={{ formData, update, updateMultiple }}>
      {children}
    </SellerFormContext.Provider>
  );
}

export function useSellerForm() {
  return useContext(SellerFormContext);
}
