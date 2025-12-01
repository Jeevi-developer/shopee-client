import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const location = useLocation();

  // get ?q=shirt or ?q=mobile etc.
  const query = new URLSearchParams(location.search).get("q");

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/search?q=${query}`
        );
        setResults(res.data);
      } catch (err) {
        console.log("Search error:", err);
      }
    };

    fetchResults();
  }, [query]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold">
        Showing results for: <span className="text-blue-600">{query}</span>
      </h1>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {results.length === 0 && (
          <p className="text-gray-600 text-lg">No products found.</p>
        )}

        {results.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="border p-3 rounded shadow hover:shadow-lg transition block"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-32 mx-auto object-contain"
            />
            <h2 className="font-bold text-lg mt-2">{product.name}</h2>
            <p className="text-sm">{product.description}</p>
            <p className="text-green-600 font-bold mt-1">₹{product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
