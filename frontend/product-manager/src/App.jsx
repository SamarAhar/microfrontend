import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import Card from './components/Card/Card';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import './index.css';

export default function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={client}>
        <div className="min-h-screen bg-white flex flex-col w-full">
          <div className="flex-1 py-8 px-4 md:px-8 w-full">
            <div className="flex flex-col lg:flex-row gap-8 w-full">
              <div className="w-full lg:w-[30%] order-1 lg:order-2">
                <TaskForm />
              </div>
              <div className="w-full lg:w-[70%] order-2 lg:order-1">
                <TaskList />
                <Card />
              </div>
            </div>
          </div>
          <ToastContainer
            position="top-center"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </ApolloProvider>
    </Provider>
  );
}