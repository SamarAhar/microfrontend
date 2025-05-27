import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filter: '',
  editingProduct: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setEditingProduct: (state, action) => {
      state.editingProduct = action.payload;
    },
  }
});

export const { 
  setFilter, 
  setEditingProduct, 
} = productSlice.actions;

export default productSlice.reducer; 