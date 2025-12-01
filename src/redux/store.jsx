import { configureStore } from '@reduxjs/toolkit';
import categoryReducer from './categorySlice';
import cartReducer from './cartSlice';
import productReducer from './productSlice';

const store = configureStore({
  reducer: {
    categories: categoryReducer,
    cart: cartReducer,
    products: productReducer,
  },
});

export default store;