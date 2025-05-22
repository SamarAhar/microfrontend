import { createSlice } from '@reduxjs/toolkit';
import { productService } from '../services/productService';

const initialState = {
  products: [],
  editingProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setEditingProduct: (state, action) => {
      state.editingProduct = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setProducts, setEditingProduct, setLoading, setError } = productSlice.actions;

export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const products = await productService.getAllProducts();
    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError(error.message));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createProduct = (product) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const newProduct = await productService.createProduct(product);
    const products = await productService.getAllProducts();
    dispatch(setProducts(products));
    return newProduct;
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const updateProduct = (id, product) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await productService.updateProduct(id, product);
    const products = await productService.getAllProducts();
    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    await productService.deleteProduct(id);
    const products = await productService.getAllProducts();
    dispatch(setProducts(products));
  } catch (error) {
    dispatch(setError(error.message));
    throw error;
  } finally {
    dispatch(setLoading(false));
  }
};

export default productSlice.reducer;