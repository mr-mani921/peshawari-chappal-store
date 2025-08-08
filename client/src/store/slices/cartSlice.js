import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => 
        item.id === newItem.id && 
        JSON.stringify(item.selectedOptions) === JSON.stringify(newItem.selectedOptions)
      );

      if (existingItem) {
        existingItem.quantity += newItem.quantity || 1;
        existingItem.totalPrice = existingItem.quantity * existingItem.price;
      } else {
        state.items.push({
          ...newItem,
          quantity: newItem.quantity || 1,
          totalPrice: newItem.price * (newItem.quantity || 1),
          selectedOptions: newItem.selectedOptions || {},
        });
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },

    removeFromCart: (state, action) => {
      const { id, selectedOptions } = action.payload;
      state.items = state.items.filter(item => 
        !(item.id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      );
      
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },

    updateQuantity: (state, action) => {
      const { id, selectedOptions, quantity } = action.payload;
      const existingItem = state.items.find(item => 
        item.id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions)
      );

      if (existingItem) {
        if (quantity <= 0) {
          state.items = state.items.filter(item => 
            !(item.id === id && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
          );
        } else {
          existingItem.quantity = quantity;
          existingItem.totalPrice = existingItem.quantity * existingItem.price;
        }
      }

      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
      state.totalAmount = state.items.reduce((total, item) => total + item.totalPrice, 0);
    },

    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },

    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },

    openCart: (state) => {
      state.isOpen = true;
    },

    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  openCart,
  closeCart,
} = cartSlice.actions;

export default cartSlice.reducer;