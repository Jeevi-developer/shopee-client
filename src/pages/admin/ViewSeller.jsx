import React from "react";

export default function ViewSeller({ seller }) {
  if (!seller) return <p>Loading...</p>;

  return (
    <div className="p-6 space-y-8 text-black">
      {/* =============================
          PERSONAL INFORMATION
      ============================== */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Personal Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Full Name:</strong> {seller.firstName} {seller.lastName}</p>
          <p><strong>Email:</strong> {seller.email}</p>
          <p><strong>Phone:</strong> {seller.phone}</p>
          <p><strong>Date of Birth:</strong> {seller.dateOfBirth}</p>
        </div>
      </section>

      {/* =============================
          BUSINESS INFORMATION
      ============================== */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Business Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Business Name:</strong> {seller.businessName}</p>
          <p><strong>Business Type:</strong> {seller.businessType}</p>
          <p><strong>Business Reg No:</strong> {seller.businessRegNumber}</p>
          <p><strong>Nature of Concern:</strong> {seller.natureOfConcern}</p>
          <p><strong>Firm Name:</strong> {seller.firmName}</p>
          <p><strong>Name as per PAN:</strong> {seller.nameAsPerPan}</p>
          <p><strong>Business Address:</strong> {seller.businessAddress}</p>
          <p><strong>City:</strong> {seller.city}</p>
          <p><strong>State:</strong> {seller.state}</p>
          <p><strong>Pincode:</strong> {seller.zipCode}</p>
          <p><strong>Country:</strong> {seller.country}</p>
        </div>
      </section>

      {/* =============================
          GST DETAILS
      ============================== */}
      <section>
        <h2 className="text-2xl font-bold mb-3">GST / Tax Information</h2>
        <p><strong>Has GST:</strong> {seller.hasGst}</p>
        {seller.hasGst === "YES" && (
          <>
            <p><strong>GST Number:</strong> {seller.gstNumber}</p>
            <p><strong>GST File:</strong></p>
            {seller.gstFile && <img src={seller.gstFile} className="w-40" />}
          </>
        )}
        <p><strong>Tax ID:</strong> {seller.taxId}</p>
      </section>

      {/* ============================================================
           BUSINESS TYPE – AUTOMATICALLY RENDER DETAILS
      ============================================================ */}

      {/* PROPRIETORSHIP */}
      {seller.businessType === "Proprietorship" && (
        <section>
          <h2 className="text-2xl font-bold mb-3">Proprietorship Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> {seller.proprietorName}</p>
            <p><strong>DOB:</strong> {seller.proprietorDob}</p>
            <p><strong>PAN:</strong> {seller.proprietorPan}</p>
            <p><strong>Aadhaar:</strong> {seller.proprietorAadhaar}</p>
            <p><strong>Mobile:</strong> {seller.proprietorMobile}</p>
            <p><strong>Email:</strong> {seller.proprietorEmail}</p>
            <p><strong>Address:</strong> {seller.proprietorAddress}</p>
          </div>

          <div className="flex gap-5 mt-3">
            {seller.proprietorPanCard && (
              <img src={seller.proprietorPanCard} className="w-40" />
            )}
            {seller.proprietorAadhaarCard && (
              <img src={seller.proprietorAadhaarCard} className="w-40" />
            )}
            {seller.proprietorPhoto && (
              <img src={seller.proprietorPhoto} className="w-40 rounded" />
            )}
          </div>
        </section>
      )}

      {/* PARTNERSHIP */}
      {seller.businessType === "Partnership" && (
        <section>
          <h2 className="text-2xl font-bold mb-3">Partnership Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Deed Date:</strong> {seller.partnershipDeedDate}</p>
            <p><strong>Total Partners:</strong> {seller.numberOfPartners}</p>
            <p><strong>PAN:</strong> {seller.partnershipPan}</p>
          </div>

          {seller.partnershipDeed && (
            <a href={seller.partnershipDeed} className="text-blue-600 underline">
              View Partnership Deed
            </a>
          )}

          <h3 className="text-xl font-semibold mt-4">Partners</h3>
          {seller.partners?.map((p, i) => (
            <div key={i} className="border p-3 rounded my-2">
              <p><strong>Name:</strong> {p.name}</p>
              <p><strong>PAN:</strong> {p.panNo}</p>
              <p><strong>Share:</strong> {p.share}</p>
              <p><strong>Mobile:</strong> {p.mobile}</p>
              <p><strong>Address:</strong> {p.address}</p>
            </div>
          ))}
        </section>
      )}

      {/* LLP */}
      {seller.businessType === "LLP" && (
        <section>
          <h2 className="text-2xl font-bold mb-3">LLP Details</h2>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>LLP Name:</strong> {seller.llpName}</p>
            <p><strong>Registration No:</strong> {seller.llpRegistrationNo}</p>
            <p><strong>PAN:</strong> {seller.llpPan}</p>
            <p><strong>Incorporation Date:</strong> {seller.llpIncorporationDate}</p>
            <p><strong>No. of Designated Partners:</strong> {seller.numberOfDesignatedPartners}</p>
          </div>

          <h3 className="text-xl font-semibold mt-4">Designated Partners</h3>
          {seller.designatedPartners?.map((dp, i) => (
            <div key={i} className="border p-3 rounded my-2">
              <p><strong>Name:</strong> {dp.name}</p>
              <p><strong>DIN:</strong> {dp.dinNo}</p>
              <p><strong>PAN:</strong> {dp.panNo}</p>
              <p><strong>Address:</strong> {dp.address}</p>
            </div>
          ))}
        </section>
      )}

      {/* PVT LTD */}
      {seller.businessType === "Pvt Ltd" && (
        <section>
          <h2 className="text-2xl font-bold mb-3">Private Limited Company</h2>

          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> {seller.pvtLtdName}</p>
            <p><strong>CIN Number:</strong> {seller.cinNumber}</p>
            <p><strong>PAN:</strong> {seller.pvtLtdPan}</p>
            <p><strong>Incorporation Date:</strong> {seller.incorporationDate}</p>
            <p><strong>Authorized Capital:</strong> {seller.authorizedCapital}</p>
            <p><strong>Paid Up Capital:</strong> {seller.paidUpCapital}</p>
            <p><strong>Directors:</strong> {seller.numberOfDirectors}</p>
          </div>

          <h3 className="text-xl font-semibold mt-4">Directors</h3>
          {seller.directors?.map((d, i) => (
            <div key={i} className="border p-3 rounded my-2">
              <p><strong>Name:</strong> {d.name}</p>
              <p><strong>DIN:</strong> {d.dinNo}</p>
              <p><strong>PAN:</strong> {d.panNo}</p>
              <p><strong>Address:</strong> {d.address}</p>
            </div>
          ))}
        </section>
      )}

      {/* PUBLIC LTD */}
      {seller.businessType === "Public Ltd" && (
        <section>
          <h2 className="text-2xl font-bold mb-3">Public Limited Company</h2>

          <div className="grid grid-cols-2 gap-4">
            <p><strong>Name:</strong> {seller.publicLtdName}</p>
            <p><strong>CIN Number:</strong> {seller.publicCinNumber}</p>
            <p><strong>PAN:</strong> {seller.publicLtdPan}</p>
            <p><strong>Incorporation Date:</strong> {seller.publicIncorporationDate}</p>
            <p><strong>Authorized Capital:</strong> {seller.publicAuthorizedCapital}</p>
            <p><strong>Paid Up Capital:</strong> {seller.publicPaidUpCapital}</p>
            <p><strong>Directors:</strong> {seller.publicNumberOfDirectors}</p>
            <p><strong>Listed Status:</strong> {seller.listedStatus}</p>
            <p><strong>Stock Exchange:</strong> {seller.stockExchange}</p>
          </div>

          <h3 className="text-xl font-semibold mt-4">Directors</h3>
          {seller.publicDirectors?.map((d, i) => (
            <div key={i} className="border p-3 rounded my-2">
              <p><strong>Name:</strong> {d.name}</p>
              <p><strong>DIN:</strong> {d.dinNo}</p>
              <p><strong>PAN:</strong> {d.panNo}</p>
              <p><strong>Address:</strong> {d.address}</p>
            </div>
          ))}
        </section>
      )}

      {/* =============================
          STORE INFORMATION
      ============================== */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Store Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <p><strong>Name:</strong> {seller.storeName}</p>
          <p><strong>Description:</strong> {seller.storeDescription}</p>
          <p><strong>Address:</strong> {seller.storeAddress}</p>
          <p><strong>City:</strong> {seller.storeCity}</p>
          <p><strong>State:</strong> {seller.storeState}</p>
          <p><strong>Pincode:</strong> {seller.storePincode}</p>
          <p><strong>Pickup Address:</strong> {seller.pickupAddress}</p>
          <p><strong>Pickup Pincode:</strong> {seller.pickupPincode}</p>
          <p><strong>Pickup Contact:</strong> {seller.pickupContact}</p>
        </div>

        <h3 className="text-xl mt-3 font-semibold">Store Categories</h3>
        {seller.storeCategories?.map((cat, i) => (
          <p key={i}>• {cat.category} {cat.customCategory && `(${cat.customCategory})`}</p>
        ))}

        <div className="flex gap-5 mt-4">
          {seller.storeLogo && <img src={seller.storeLogo} className="w-40" />}
          {seller.storeBanner && <img src={seller.storeBanner} className="w-60" />}
        </div>
      </section>

      {/* =============================
          BANK DETAILS
      ============================== */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Bank Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <p><strong>Bank Name:</strong> {seller.bankName}</p>
          <p><strong>Account Holder:</strong> {seller.accountHolderName}</p>
          <p><strong>Account Number:</strong> {seller.accountNumber}</p>
          <p><strong>IFSC / Routing No:</strong> {seller.routingNumber}</p>
          <p><strong>Account Type:</strong> {seller.accountType}</p>
        </div>
      </section>

      {/* =============================
          DOCUMENTS
      ============================== */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Uploaded Documents</h2>

        <div className="flex flex-col gap-4">
          {seller.identityProof && <a className="underline text-blue-600" href={seller.identityProof}>Identity Proof</a>}
          {seller.taxCertificate && <a className="underline text-blue-600" href={seller.taxCertificate}>Tax Certificate</a>}
          {seller.businessLicense && <a className="underline text-blue-600" href={seller.businessLicense}>Business License</a>}
          {seller.addressProof && <img src={seller.addressProof} className="w-40" />}
          {seller.photoId && <img src={seller.photoId} className="w-40" />}
          {seller.esignature && <img src={seller.esignature} className="w-40" />}
        </div>
      </section>

      {/* =============================
          ACCOUNT STATUS
      ============================== */}
      <section>
        <h2 className="text-2xl font-bold mb-3">Account Status</h2>
        <p><strong>Status:</strong> {seller.status}</p>
        {seller.statusReason && <p><strong>Reason:</strong> {seller.statusReason}</p>}
        {seller.approvedAt && <p><strong>Approved At:</strong> {new Date(seller.approvedAt).toLocaleString()}</p>}
        {seller.suspendedAt && <p><strong>Suspended At:</strong> {new Date(seller.suspendedAt).toLocaleString()}</p>}
      </section>

    </div>
  );
}
