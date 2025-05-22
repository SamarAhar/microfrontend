import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { 
  fetchProducts, 
  deleteProduct, 
  setEditingProduct 
} from '../../store/productSlice';

export default function TaskList() {
  const dispatch = useDispatch();
  const { products, error, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleEdit = (product) => {
    dispatch(setEditingProduct(product));
  };

  const handleDelete = async (productId) => {
    try {
      dispatch(deleteProduct(productId));
      toast.success('Product deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Error deleting product!');
    }
  };

  if (loading && products.length === 0) return <p>Loading products...</p>;
  if (error) {
    toast.error(error);
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bg-white p-6 h-full">
      <h2 className="text-2xl font-semibold mb-4">Product List</h2>
      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="p-4 border rounded-3xl bg-[#f2cece] text-center">
            <p className="text-gray-600">No products yet. Add a product to get started!</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-3xl bg-[#f2cece] hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{product.productName}</h3>
                  <p className="text-gray-600 mt-1">{product.category || 'No category'}</p>
                  <div className="mt-2 text-sm text-gray-500">
                    <span>Price: ₹{product.price.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}