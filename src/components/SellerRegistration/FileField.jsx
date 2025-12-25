import React from "react";

export function FileField({ label, accept, valuePreview, onFileChange }) {
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <div className="flex items-center gap-3">
        {valuePreview ? (
          <img
            src={valuePreview}
            alt="preview"
            className="w-20 h-20 object-cover rounded"
          />
        ) : null}
        <input
          type="file"
          accept={accept}
          onChange={(e) => onFileChange(e.target.files?.[0] || null)}
        />
      </div>
    </div>
  );
}
