import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalItems: 0,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action) => {
      const newItem = action.payload;
      const exists = state.items.some(item => item.id === newItem.id);
      if (!exists) {
        state.items.push(newItem);
        state.totalItems = state.items.length;
      }
    },

    removeFromWishlist: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(item => item.id !== itemId);
      state.totalItems = state.items.length;
    },

    clearWishlist: (state) => {
      state.items = [];
      state.totalItems = 0;
    },

    toggleWishlistItem: (state, action) => {
      const item = action.payload;
      const index = state.items.findIndex(i => i.id === item.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(item);
      }
      state.totalItems = state.items.length;
    },
  },
});

export const {
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
  toggleWishlistItem,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
