import { useQuery, useMutation } from '@apollo/client';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { DELETE_PRODUCT, GET_ALL_PRODUCTS } from '../../graphql/queries';
import { setEditingProduct, setFilter } from '../../redux/slices/productSlice';

export default function TaskList() {
  const dispatch = useDispatch();
  const { filter } = useSelector((state) => state.products);
  
  // GraphQL queries and mutations
  const { loading, error, data } = useQuery(GET_ALL_PRODUCTS);
  const [deleteProductMutation] = useMutation(DELETE_PRODUCT);

  // Transform and filter products
  const products = data?.getAllProduct || [];
  const filteredProducts = products.filter(product => 
    filter ? product.category === filter : true
  );

  const handleEdit = (product) => {
    dispatch(setEditingProduct(product));
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProductMutation({
        variables: { id: productId },
        refetchQueries: [{ query: GET_ALL_PRODUCTS }]
      });
      toast.success('Product deleted successfully!');
    } catch (err) {
      toast.error(err.message || 'Error deleting product!');
    }
  };

  // Handle loading and error states
  if (loading) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md mx-4 md:mx-8 h-full">
        <div className="p-4 border rounded-xl bg-gray-50 text-center text-gray-500">
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-md mx-4 md:mx-8 h-full">
        <div className="p-4 border rounded-xl bg-red-50 text-center text-red-500">
          Error: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md md:mx-8 ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Product List</h2>
        <select 
          className="p-2 border rounded-lg"
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
        </select>
      </div>  
      <div className="space-y-4">
        {filteredProducts.length === 0 ? (
          <div className="p-4 border rounded-xl bg-gray-50 text-center text-gray-500">
            No products found.
          </div>
        ) : (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-xl bg-gray-50 hover:shadow transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{product.productName}</h3> {/* Changed from name to productName */}
                  <p className="text-gray-600">Category: {product.category || 'N/A'}</p>
                  <p className="text-gray-600">Price: ₹{product.price.toFixed(2)}</p>
                  {/* Removed Stock field */}
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