import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/products';

export const productService = {
    
    getAllProducts: async () => {
        try {
            const response = await axios.get(API_BASE_URL);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    getProductById: async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    createProduct: async (product) => {
        try {
            const response = await axios.post(API_BASE_URL, product);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    updateProduct: async (id, product) => {
        try {
            const response = await axios.put(`${API_BASE_URL}/${id}`, product);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            await axios.delete(`${API_BASE_URL}/${id}`);
        } catch (error) {
            throw error;
        }
    }
}; 