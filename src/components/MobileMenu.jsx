// src/components/MobileMenu.jsx
import React from "react";
import { Icons } from "./navbar/icons";

export default function MobileMenu({ open, onClose, categories = [] }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-auto md:hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg">Menu</h2>
          <button onClick={onClose}><Icons.X size={20} /></button>
        </div>

        <div className="mb-4">
          <input placeholder="Search products..." className="w-full px-4 py-2 border rounded-lg" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {categories.map((c) => (
            <a key={c.id} href={c.sub?.[0]?.href || "#"} className="p-3 rounded bg-gray-50">
              {c.name}
            </a>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          <a className="block py-3 px-4 rounded bg-gradient-to-r from-orange-500 to-orange-600 text-white">Become a Seller</a>
          <a className="block py-3 px-4 rounded bg-gray-100">My Account</a>
          <a className="block py-3 px-4 rounded bg-gray-100">Wishlist</a>
        </div>
      </div>
    </div>
  );
}
