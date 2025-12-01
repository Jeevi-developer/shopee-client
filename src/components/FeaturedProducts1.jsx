import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { Star } from "lucide-react";

export default function FeaturedProducts({ products }) {
  const navigate = useNavigate();

 if (!products || products.length === 0) return null;


  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products.map((item) => {
          const discount =
            item.oldPrice && item.price
              ? Math.round(((item.oldPrice - item.price) / item.oldPrice) * 100)
              : 0;

          return (
            <div
              key={item._id}
              className="bg-white shadow rounded-2xl overflow-hidden transition hover:shadow-lg cursor-pointer"
              onClick={() => navigate(`/product/${item._id}`)}
            >
              {/* Product Image */}
              <img
                src={item.images?.[0] || "https://via.placeholder.com/400"}
                alt={item.name}
                className="w-full h-56 object-cover"
              />

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 text-base line-clamp-2">
                  {item.name}
                </h3>

                <div className="flex items-center gap-1 mt-2 text-yellow-500">
                  {[...Array(4)].map((_, i) => (
                    <Star key={i} size={16} fill="#facc15" color="#facc15" />
                  ))}
                  <Star size={16} color="#facc15" />
                  <span className="ml-1 text-gray-600 text-sm">
                    ({item.rating || "4.8"})
                  </span>
                </div>

                <div className="mt-3">
                  <span className="text-xl font-bold text-gray-900">
                    ₹{item.price?.toLocaleString()}
                  </span>
                  {item.oldPrice && (
                    <span className="text-gray-500 line-through ml-2">
                      ₹{item.oldPrice.toLocaleString()}
                    </span>
                  )}
                  {discount > 0 && (
                    <span className="ml-2 text-green-600 text-sm font-medium">
                      ({discount}% OFF)
                    </span>
                  )}
                </div>

                {/* ✅ View Details button */}
                <Link
                  to={`/product/${item._id}`}
                  onClick={(e) => e.stopPropagation()}
                  className="block mt-4 w-full py-2 text-center rounded-xl text-white font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-90 transition"
                >
                  View Details
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
