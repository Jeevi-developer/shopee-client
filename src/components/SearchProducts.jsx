import { useState } from "react";
import axios from "axios";

export default function SearchBar({ setResults }) {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.trim() === "") {
      setResults([]);
      return;
    }

    const res = await axios.get(
      `http://localhost:5000/api/products/search?q=${value}`
    );

    setResults(res.data);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearch}
      placeholder="Search products..."
      className="border p-2 rounded w-full"
    />
  );
}
