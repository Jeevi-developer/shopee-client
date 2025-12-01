import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// ✅ Use environment variable or fallback to Render URL
const API_URL = import.meta.env.VITE_API_BASE_URL || 'https://shopee-server.onrender.com/api';
// const API_URL = 'http://localhost:5000/api'; 
// Fetch featured products
export const fetchFeaturedProducts = createAsyncThunk(
  'products/fetchFeatured',
  async () => {
    const response = await axios.get(`${API_URL}/products/featured`);
    return response.data;
  }
);

// Fetch single product
export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (id) => {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  }
);

// Fetch all products
export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    featured: [],
    allProducts: [],
    currentProduct: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentProduct: (state) => {
      state.currentProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Featured Products
      .addCase(fetchFeaturedProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchFeaturedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.featured = action.payload;
      })
      .addCase(fetchFeaturedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // Single Product
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      
      // All Products
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProducts = action.payload;
      })
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCurrentProduct } = productSlice.actions;
export default productSlice.reducer;