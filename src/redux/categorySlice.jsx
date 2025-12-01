// src/redux/categorySlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// ✅ Updated for Render backend
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://shopee-server-2.onrender.com/api";

// ✅ Fetch categories dynamically
export const fetchCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    // const res = await axios.get("http://localhost:5000/api/categories");
    const res = await axios.get(`${API_BASE_URL}/categories`);
    return res.data;
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default categorySlice.reducer;
