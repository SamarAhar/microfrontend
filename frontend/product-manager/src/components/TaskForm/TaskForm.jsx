import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  createProduct,
  updateProduct,
  setEditingProduct,
} from '../../store/productSlice';

export default function TaskForm() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();
  const { editingProduct, loading } = useSelector((state) => state.products);

  // Update form fields when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setEditingId(editingProduct.id);
      setName(editingProduct.productName);
      setCategory(editingProduct.category || '');
      setPrice(editingProduct.price ? editingProduct.price.toString() : '');
    } else {
      setEditingId(null);
      setName('');
      setCategory('');
      setPrice('');
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName: name.trim(),
      category: category.trim() || null,
      price: parseFloat(price) || 0,
    };

    try {
      if (editingId) {
        // Update existing product
        dispatch(updateProduct(editingId, productData));
        toast.success('Product updated successfully!');
      } else {
        // Add new product
        dispatch(createProduct(productData));
        toast.success('Product added successfully!');
      }
      // Reset form
      setEditingId(null);
      setName('');
      setCategory('');
      setPrice('');
    } catch (err) {
      toast.error(err.message || (editingId ? 'Error updating product!' : 'Error adding product!'));
    }
  };

  const handleCancel = () => {
    dispatch(setEditingProduct(null));
    setEditingId(null);
    setName('');
    setCategory('');
    setPrice('');
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mx-4 md:mx-8 h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {editingId ? 'Edit Product' : 'Add New Product'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name*</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name here"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category (Optional)</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Enter category here"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter product price"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
          />
        </div>
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={!name.trim() || loading}
            className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition ${
              name.trim() && !loading
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Processing...' : editingId ? 'Update Product' : 'Add Product'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className="px-4 py-2 rounded-lg text-gray-700 border border-gray-300 hover:bg-gray-100 transition font-medium"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}