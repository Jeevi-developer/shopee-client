import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProductById } from "../redux/productSlice";
import { addToCart } from "../redux/cartSlice";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentProduct, loading } = useSelector((state) => state.products);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (loading || !currentProduct) {
    return (
      <div className="text-center py-20 text-xl font-semibold">
        Loading Product...
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id: currentProduct._id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        quantity,
      })
    );
    alert("Added to cart!");
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        id: currentProduct._id,
        name: currentProduct.name,
        price: currentProduct.price,
        image: currentProduct.image,
        quantity,
      })
    );

    navigate("/checkout");
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* PRODUCT IMAGE */}
      <div>
        <img
          src={currentProduct.image}
          alt={currentProduct.name}
          className="rounded-xl shadow-md w-full object-cover"
        />
      </div>

      {/* PRODUCT INFO */}
      <div>
        <h1 className="text-3xl font-bold">{currentProduct.name}</h1>

        <p className="text-gray-600 mt-3">{currentProduct.description}</p>

        <div className="text-3xl font-bold text-blue-600 mt-5">
          ₹{currentProduct.price}
        </div>

        {/* QUANTITY */}
        <div className="mt-6 flex items-center gap-3">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1 bg-gray-200 rounded"
          >
            +
          </button>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 mt-8">
          <button
            onClick={handleAddToCart}
            className="bg-yellow-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-yellow-600"
          >
            Add to Cart
          </button>

          <button
            onClick={handleBuyNow}
            className="bg-orange-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-orange-700"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
