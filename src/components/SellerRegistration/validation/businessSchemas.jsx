/* ---- businessSchemas.jsx ---- */
import * as yup from "yup";

/* ---------------------------------------------
   COMMON REGEX VALIDATORS
---------------------------------------------- */
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{3}$/;
const aadhaarRegex = /^[0-9]{12}$/;
const phoneRegex = /^[0-9]{10}$/;
const mobileRegex = /^[6-9][0-9]{9}$/;
const cinRegex = /^[A-Z]{1}[0-9]{5}[A-Z0-9]{2}[0-9]{4}[A-Z]{3}[0-9]{6}$/;

/* ============================================================
   BASE SCHEMA — COMMON BUSINESS FIELDS
============================================================ */
export const baseBusinessSchemas = yup.object({
  natureOfConcern: yup.string().required("Select nature of concern"),
  firmName: yup.string().required("Business/Firm Name is required"),
  nameAsPerPan: yup.string().required("Name as per PAN is required"),
  hasGst: yup.string().required("Please select Yes or No"),
  gstNumber: yup.string().when("hasGst", {
    is: "Yes",
    then: (schema) =>
      schema
        .matches(gstRegex, "Invalid GST number")
        .required("GST number required"),
    otherwise: (schema) => schema.nullable(),
  }),
  gstFile: yup.mixed().when("hasGst", {
    is: "Yes",
    then: (schema) =>
      schema
        .required("Upload GST certificate")
        .test("fileRequired", "File is required", (value) => !!value)
        .test(
          "fileSize",
          "File size must be less than 2MB",
          (value) => !value || (value && value.size <= 2 * 1024 * 1024)
        ),
    otherwise: (schema) => schema.nullable(),
  }),
});

/* ============================================================
   PROPRIETORSHIP SCHEMA
============================================================ */
export const proprietorshipSchema = baseBusinessSchemas.concat(
  yup.object({
    proprietorName: yup.string().required("Proprietor name is required"),
    proprietorDob: yup
      .string()
      .required("Date of birth is required")
      .test(
        "dob-before-today",
        "Date of birth cannot be in the future",
        (value) => !!value && new Date(value) <= new Date()
      ),
    proprietorPan: yup
      .string()
      .matches(panRegex, "Invalid PAN")
      .required("PAN is required"),
    proprietorAadhaar: yup
      .string()
      .matches(aadhaarRegex, "Invalid Aadhaar")
      .required("Aadhaar is required"),
    proprietorMobile: yup
      .string()
      .matches(phoneRegex, "Invalid mobile number")
      .required("Mobile is required"),
    proprietorEmail: yup
      .string()
      .email("Invalid email")
      .required("Email is required"),
    proprietorAddress: yup.string().required("Address is required"),

    proprietorPanCard: yup
      .mixed()
      .required("Upload PAN card")
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
    proprietorAadhaarCard: yup
      .mixed()
      .required("Upload Aadhaar card")
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
    proprietorPhoto: yup
      .mixed()
      .required("Upload photo")
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
  })
);

/* ============================================================
   PARTNERSHIP SCHEMA
============================================================ */
export const partnershipSchema = baseBusinessSchemas.concat(
  yup.object({
    partnershipDeedDate: yup.string().required("Deed date required"),
    numberOfPartners: yup
      .number()
      .min(1, "At least one partner required")
      .required(),
    partnershipPan: yup
      .string()
      .matches(panRegex, "Invalid PAN")
      .required("Partnership PAN required"),
    partnershipDeed: yup
      .mixed()
      .required("Upload partnership deed")
      .test("fileRequired", "File required", (v) => !!v)
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),

    partners: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required("Partner name required"),
          panNo: yup
            .string()
            .matches(panRegex, "Invalid PAN")
            .required("PAN required"),
          share: yup.string().required("Share required"),
          mobile: yup
            .string()
            .matches(mobileRegex, "Invalid mobile")
            .required("Mobile required"),
          address: yup.string().required("Address required"),
        })
      )
      .min(1, "Add at least one partner")
      .required("Partner details required"),
  })
);

/* ============================================================
   LLP SCHEMA
============================================================ */
export const llpSchema = baseBusinessSchemas.concat(
  yup.object({
    llpName: yup.string().required("LLP name required"),
    llpRegistrationNo: yup.string().required("Registration number required"),
    llpPan: yup
      .string()
      .matches(panRegex, "Invalid PAN")
      .required("LLP PAN required"),
    llpIncorporationDate: yup.string().required("Incorporation date required"),
    numberOfDesignatedPartners: yup
      .number()
      .min(1, "At least one designated partner")
      .required(),

    llpCertificate: yup
      .mixed()
      .required("Upload incorporation certificate")
      .test("fileRequired", "File required", (v) => !!v)
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
    llpAgreement: yup
      .mixed()
      .required("Upload LLP agreement")
      .test("fileRequired", "File required", (v) => !!v)
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),

    designatedPartners: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required("Name required"),
          dinNo: yup.string().required("DIN number required"),
          panNo: yup
            .string()
            .matches(panRegex, "Invalid PAN")
            .required("PAN required"),
          address: yup.string().required("Address required"),
        })
      )
      .min(1, "Add at least one designated partner")
      .required("Designated partners required"),
  })
);

/* ============================================================
   PRIVATE LIMITED SCHEMA
============================================================ */
export const pvtLtdSchema = baseBusinessSchemas.concat(
  yup.object({
    pvtLtdName: yup.string().required("Company name required"),
    cinNumber: yup.string().required("CIN required"),
    pvtLtdPan: yup
      .string()
      .matches(panRegex, "Invalid PAN")
      .required("Company PAN required"),
    incorporationDate: yup.string().required("Incorporation date required"),

    authorizedCapital: yup.string().required("Required"),
    paidUpCapital: yup.string().required("Required"),
    numberOfDirectors: yup
      .number()
      .min(1, "At least one director required")
      .required(),

    incorporationCertificate: yup
      .mixed()
      .required("Upload certificate")
      .test("fileRequired", "File required", (v) => !!v)
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
    moaDocument: yup
      .mixed()
      .required("Upload MOA")
      .test("fileRequired", "File required", (v) => !!v)
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
    aoaDocument: yup
      .mixed()
      .required("Upload AOA")
      .test("fileRequired", "File required", (v) => !!v)
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),

    directors: yup
      .array()
      .of(
        yup.object({
          name: yup.string().required("Name required"),
          dinNo: yup.string().required("DIN required"),
          panNo: yup
            .string()
            .matches(panRegex, "Invalid PAN")
            .required("PAN required"),
          address: yup.string().required("Address required"),
        })
      )
      .min(1, "Add at least one director")
      .required("Directors required"),
  })
);

/* ============================================================
   PUBLIC LIMITED SCHEMA
============================================================ */
export const publicLtdSchema = baseBusinessSchemas.concat(
  yup.object({
    publicLtdName: yup.string().required("Company Name is required"),
    publicCinNumber: yup
      .string()
      .matches(cinRegex, "Invalid CIN number")
      .required("CIN is required"),
    publicLtdPan: yup
      .string()
      .matches(panRegex, "Invalid PAN number")
      .required("PAN is required"),
    publicIncorporationDate: yup
      .date()
      .required("Incorporation date is required"),
    listedStatus: yup.string().required("Listing status is required"),
    publicAuthorizedCapital: yup
      .string()
      .required("Authorized capital is required"),
    publicPaidUpCapital: yup.string().required("Paid-Up capital is required"),

    publicIncorporationCertificate: yup
      .mixed()
      .required("Incorporation certificate is required")
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
    publicMoaDocument: yup
      .mixed()
      .required("MOA document is required")
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
    publicAoaDocument: yup
      .mixed()
      .required("AOA document is required")
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),

    publicDirectors: yup
      .array()
      .of(
        yup.object().shape({
          name: yup.string().required("Director name is required"),
          dinNo: yup.string().required("DIN is required"),
          panNo: yup
            .string()
            .matches(panRegex, "Invalid PAN")
            .required("PAN is required"),
          address: yup.string().required("Address is required"),
        })
      )
      .min(1, "At least one director is required"),
  })
);

/* ============================================================
   TRUST SCHEMA
============================================================ */
export const trustSchema = baseBusinessSchemas.concat(
  yup.object({
    trustName: yup.string().required("Trust name is required"),
    trustPAN: yup
      .string()
      .matches(/^[A-Z]{5}[0-9]{4}[A-Z]$/, "Invalid PAN format")
      .required("Trust PAN is required"),
    trustCertificate: yup
      .mixed()
      .required("Trust certificate is required")
      .test(
        "fileSize",
        "File size must be less than 2MB",
        (v) => !v || (v && v.size <= 2 * 1024 * 1024)
      ),
    trustAddress: yup.string().required("Trust address is required"),
  })
);

export const bankSchema = yup.object().shape({
  accountNumber: yup.string().required("Account number is required"),
  ifscCode: yup.string().required("IFSC code is required"),
  bankName: yup.string().required("Bank name is required"),
  branchName: yup.string().required("Branch name is required"),
});
