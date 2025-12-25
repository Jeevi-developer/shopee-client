import React from "react";

export default function Loader() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <img
        src="/assets/images/shopzy-logo.png" // Your logo path
        alt="Loading..."
        className="w-20 h-20 animate-spin-slow"
      />
    </div>
  );
}
