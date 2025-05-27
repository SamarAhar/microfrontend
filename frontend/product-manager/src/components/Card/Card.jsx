import { useQuery } from '@apollo/client';
import { GET_ALL_PRODUCTS } from '../../graphql/queries';

export default function Card() {
  const { data, loading, error } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <div className="p-4">Loading statistics...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading statistics: {error.message}</div>;

  const products = data?.getAllProduct || [];
  
  // Calculate statistics
  const totalProducts = products.length;
  const totalValue = products.reduce((sum, product) => sum + (product.price || 0), 0);
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];
  
  // Calculate category distribution
  const categoryDistribution = categories.reduce((acc, category) => {
    acc[category] = products.filter(p => p.category === category).length;
    return acc;
  }, {});

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {/* Total Products Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Products</h3>
        <p className="text-3xl font-bold text-red-600">{totalProducts}</p>
      </div>

      {/* Total Value Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Value</h3>
        <p className="text-3xl font-bold text-red-600">₹{totalValue.toFixed(2)}</p>
      </div>

      {/* Categories Card */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2">
          {Object.entries(categoryDistribution).map(([category, count]) => (
            <div key={category} className="flex justify-between items-center">
              <span className="text-gray-600">{category}</span>
              <span className="font-semibold text-red-600">{count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}