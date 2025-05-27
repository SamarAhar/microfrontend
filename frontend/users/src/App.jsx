import { useState } from 'react';
import UserForm from './components/UserForm';
import UserList from './components/UserList';
import { ToastContainer } from 'react-toastify';
import './index.css'
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';

export default function App() {
  
  const [editingUser, setEditingUser] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const refreshUsers = () => setRefreshFlag(!refreshFlag);

  return (
    <ApolloProvider client={client}>
    <div className="min-h-screen bg-white flex flex-col w-full">
          <div className="flex-1 py-8 px-4 md:px-8 w-full">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              <div className="w-full lg:w-[30%] order-1 lg:order-2">
                <UserForm
              editingUser={editingUser}
              setEditingUser={setEditingUser}
              refreshUsers={refreshUsers}
            />
              </div>
              <div className="w-full lg:w-[70%] order-2 lg:order-1">
            <UserList setEditingUser={setEditingUser} refreshTrigger={refreshFlag}  />
              </div>
            </div>
          </div>   
      <ToastContainer />
    </div>
    </ApolloProvider>
  );
}
