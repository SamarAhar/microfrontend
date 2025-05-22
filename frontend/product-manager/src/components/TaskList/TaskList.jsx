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
   <div className="bg-white p-6 rounded-2xl shadow-md mx-4 md:mx-8 h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Product List</h2>
      <div className="space-y-4">
        {loading && products.length === 0 ? (
          <div className="p-4 border rounded-xl bg-gray-50 text-center text-gray-500">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="p-4 border rounded-xl bg-gray-50 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-xl bg-gray-50 hover:shadow transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{product.productName}</h3>
                  <p className="text-gray-600">Category: {product.category || 'N/A'}</p>
                  <p className="text-gray-600">Price: ₹{product.price.toFixed(2)}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(product)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="p-2 text-red-600 hover:bg-red-100 rounded-full"
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