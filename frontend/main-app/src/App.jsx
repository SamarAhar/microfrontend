import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';
import ProductCard from './Components/ProductCard/ProductCard';
import OrderCard from './Components/OrderCard/OrderCard';
import UserCard from './Components/UserCard/UserCard';

const RemoteApp = React.lazy(() => import('productApp/App'));
const OrderApp = React.lazy(() => import('ordersApp/App'));
const UserApp = React.lazy(() => import('usersApp/App'));


export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow flex">
          {/* <Button /> */}
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<div>Loading...</div>}>
                <UserCard />
                <ProductCard />
                <OrderCard />
              </Suspense>
            } />
            <Route path="/product-manager" element={
              <Suspense fallback={<div>Loading Product Manager...</div>}>
                <RemoteApp />
              </Suspense>
            } />
            <Route path="/order-manager" element={
              <Suspense fallback={<div>Loading Order Manager...</div>}>
                <OrderApp />
              </Suspense>
            } />
            <Route path="/user-manager" element={
              <Suspense fallback={<div>Loading User Manager...</div>}>
                <UserApp />
              </Suspense>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}