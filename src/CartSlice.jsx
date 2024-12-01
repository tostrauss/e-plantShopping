import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Cart items array
  },
  reducers: {
    /**
     * Add a new item to the cart or increment its quantity if it already exists.
     */
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.name === action.payload.name);
      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item already exists
      } else {
        state.items.push({ ...action.payload, quantity: 1 }); // Add new item with quantity = 1
      }
    },

    /**
     * Remove an item from the cart by its name.
     */
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload.name);
    },

    /**
     * Update the quantity of an item in the cart.
     * If the new quantity is 0 or less, remove the item from the cart.
     */
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const item = state.items.find(item => item.name === name);
      if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.name !== name); // Remove item if quantity is zero
        }
      }
    },
  },
});

// Export actions for use in components
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// Export reducer for the Redux store
export default CartSlice.reducer;
