// src/api/productsApi.js
import axios from "axios";

/**
 * Replace baseURL with your real product API when ready.
 * For demo, we're using fakestoreapi.com
 */
const BASE_URL = "https://fakestoreapi.com";

export async function fetchProducts({ limit = 12, category } = {}) {
  try {
    let url = `${BASE_URL}/products`;
    if (category) url = `${BASE_URL}/products/category/${encodeURIComponent(category)}`;
    if (limit) url += `?limit=${limit}`;
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("fetchProducts error", err);
    throw err;
  }
}
