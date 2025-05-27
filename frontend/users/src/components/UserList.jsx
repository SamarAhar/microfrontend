import { useQuery, useMutation } from '@apollo/client';
import { GET_USERS, DELETE_USER } from '../queries/graphql';
import { toast } from 'react-toastify';
import { FaEdit, FaTrash } from 'react-icons/fa';

export default function UserList({ setEditingUser, refreshTrigger }) {
  const { data, loading, error, refetch } = useQuery(GET_USERS);
  const [deleteUser] = useMutation(DELETE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser({ variables: { id } });
      toast.success('User deleted successfully!', { position: 'top-center' });
    } catch {
      toast.error('Error deleting user', { position: 'top-center' });
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error loading users.</p>;

  const users = data?.getAllUser || [];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mx-4 md:mx-8 h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">User List</h2>
      <div className="space-y-4">
        {users.length === 0 ? (
          <div className="p-4 border rounded-xl bg-gray-50 text-center">
            <p className="text-gray-500">No users found. Add one to get started!</p>
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="p-4 border rounded-xl bg-gray-50 hover:shadow transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-gray-800">{user.name}</h3>
                  <p className="text-gray-600">Phone: {user.phoneNo}</p>
                  <p className="text-gray-600">Email: {user.email}</p>
                  <p className="text-gray-600">Address: {user.address}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <button
                    onClick={() => setEditingUser(user)}
                    className="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
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
