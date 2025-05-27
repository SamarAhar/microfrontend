import { useState, useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER, UPDATE_USER, GET_USERS } from '../queries/graphql';
import { toast } from 'react-toastify';

export default function UserForm({ editingUser, setEditingUser, refreshUsers }) {
  const [name, setName] = useState('');
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setPhoneNo(editingUser.phoneNo);
      setEmail(editingUser.email);
      setAddress(editingUser.address);
    } else {
      setName('');
      setPhoneNo('');
      setEmail('');
      setAddress('');
    }
  }, [editingUser]);

   const [addUser] = useMutation(ADD_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    refetchQueries: [{ query: GET_USERS }],
  });

 const handleSubmit = async (e) => {
    e.preventDefault();
    const input = { name, phoneNo, email, address };

    try {
      if (editingUser) {
        await updateUser({ variables: { user: { ...input, id: editingUser.id } } });
        toast.success('User updated successfully!', { position: 'top-center' });
      } else {
        await addUser({ variables: { user:input } });
        toast.success('User added successfully!', { position: 'top-center' });
      }
      refreshUsers();
    } catch {
      toast.error(`Error ${editingUser ? 'updating' : 'adding'} user`, { position: 'top-center' });
    }

    setName('');
    setPhoneNo('');
    setEmail('');
    setAddress('');
    setEditingUser(null);
  };

  const fields = [
    { label: 'Name', value: name, setter: setName },
    { label: 'Phone No', value: phoneNo, setter: setPhoneNo },
    { label: 'Email', value: email, setter: setEmail },
    { label: 'Address', value: address, setter: setAddress },
  ];

  return (
    <div className="bg-white p-6 rounded-2xl shadow-md mx-4 md:mx-8 h-full">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        {editingUser ? 'Edit User' : 'Add New User'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {fields.map((field, idx) => (
          <div key={idx}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.setter(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              required
            />
          </div>
        ))}
        <div className="flex gap-3 mt-6">
          <button
            type="submit"
            className="flex-1 px-4 py-2 rounded-lg text-white bg-red-600 hover:bg-red-700 transition font-medium"
          >
            {editingUser ? 'Update User' : 'Add User'}
          </button>
          {editingUser && (
            <button
              type="button"
              onClick={() => setEditingUser(null)}
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
