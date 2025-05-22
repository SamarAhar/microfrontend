import { useState, useEffect } from 'react';
import axios from 'axios';
import OrderForm from './components/OrderForm';
import OrderList from './components/OrderList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [orders, setOrders] = useState([]);

  const refreshOrders = async () => {
    try {
      const response = await axios.get('http://localhost:8080/orders');
      setOrders(response.data);
    } catch {
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col w-full">
      <div className="flex-1 py-8 px-4 md:px-8 w-full">
        <div className="flex flex-col lg:flex-row gap-8 w-full">
          <div className="w-full lg:w-[30%] order-1 lg:order-2">
            <OrderForm refreshOrders={refreshOrders} />
          </div>
          <div className="w-full lg:w-[70%] order-2 lg:order-1">
            <OrderList orders={orders} refreshOrders={refreshOrders} />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
