import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { CREATE_PRODUCT, UPDATE_PRODUCT } from '../../graphql/queries';
import { setEditingProduct } from '../../redux/slices/productSlice';

export default function TaskForm() {
  const [productName, setProductName] = useState(''); 
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [editingId, setEditingId] = useState(null);

  const dispatch = useDispatch();
  const { editingProduct } = useSelector((state) => state.products);

  // GraphQL mutations
  const [createProductMutation, { loading: createLoading }] = useMutation(CREATE_PRODUCT, {
    refetchQueries: ['GetAllProducts'] 
  });
  
  const [updateProductMutation, { loading: updateLoading }] = useMutation(UPDATE_PRODUCT, {
    refetchQueries: ['GetAllProducts'] 
  });

  const loading = createLoading || updateLoading;

  // Update form fields when editingProduct changes
  useEffect(() => {
    if (editingProduct) {
      setEditingId(editingProduct.id);
      setProductName(editingProduct.productName || ''); 
      setCategory(editingProduct.category || '');
      setPrice(editingProduct.price ? editingProduct.price.toString() : '');
    } else {
      setEditingId(null);
      setProductName(''); 
      setCategory('');
      setPrice('');
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      productName: productName.trim(), 
      category: category.trim() || null,
      price: parseFloat(price) || 0,
    };

    try {
      if (editingId) {
        // Update existing product
        await updateProductMutation({
          variables: {
            product: {
              id: editingId,
              ...productData
            }
          }
        });
        toast.success('Product updated successfully!');
      } else {
        // Add new product
        await createProductMutation({
          variables: {
            product: productData
          }
        });
        toast.success('Product added successfully!');
      }
      // Reset form
      handleCancel();
    } catch (err) {
      toast.error(err.message || (editingId ? 'Error updating product!' : 'Error adding product!'));
    }
  };

  const handleCancel = () => {
    dispatch(setEditingProduct(null));
    setEditingId(null);
    setProductName(''); 
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
            value={productName} // Changed to productName
            onChange={(e) => setProductName(e.target.value)} // Changed to setProductName
            placeholder="Enter your product name here"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category (Optional)</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Clothing">Clothing</option>
            <option value="Books">Books</option>
          </select>
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
            required
          />
        </div>
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            disabled={!productName.trim() || loading} // Changed to productName
            className={`flex-1 px-4 py-2 rounded-lg text-white font-medium transition ${
              productName.trim() && !loading // Changed to productName
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