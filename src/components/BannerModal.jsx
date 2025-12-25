import React from "react";

export default function BannerModal({ isOpen, onClose, imageSrc }) {
  if (!isOpen) return null; // ✅ Only render when open

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg overflow-hidden max-w-3xl w-full">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white bg-gray-800 hover:bg-gray-900 rounded-full p-1"
        >
          ✕
        </button>
        <img src={imageSrc} alt="Banner" className="w-full h-auto" />
      </div>
    </div>
  );
}
