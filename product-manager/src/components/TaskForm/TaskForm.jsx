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
    <div className="bg-[#f2cece] p-6 rounded-2xl mx-8 h-full">
      <div className="h-full flex flex-col">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
          {editingId ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 flex-1">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Product Name*
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your product name here"
              className="w-full p-2 bg-white rounded-full flex items-center justify-center focus:ring-[#d91717] focus:border-[#d91717]"
              required
            />
          </div>
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
              Product Category (Optional)
            </label>
            <textarea
              id="category"
              type="textarea"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Enter Category here"
              rows="1"
              className="w-full p-2 bg-white rounded-[2rem] flex items-center justify-center focus:ring-[#d91717] focus:border-[#d91717]"
            />
          </div>
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
              Product Price
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter your product price here"
              className="w-full p-2 rounded-full bg-white flex items-center justify-center focus:ring-[#d91717] focus:border-[#d91717]"
            />
          </div>
          <div className="flex gap-2 mt-auto">
            <button
              type="submit"
              disabled={!name.trim() || loading}
              className={`flex-1 px-4 py-2 rounded-full text-white font-medium transition-colors ${
                name.trim() && !loading
                  ? 'bg-[#d91717] hover:bg-[#b31414]'
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
                className="px-4 py-2 rounded-full text-gray-600 font-medium border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}