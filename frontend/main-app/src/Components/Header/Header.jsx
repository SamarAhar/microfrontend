import { FaTasks } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'text-white font-bold' : 'text-gray-200 hover:text-white';
  };

  return (
    <header className='w-full bg-[#d91717] p-4 text-white'>
      <div className='container mx-auto flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <FaTasks className='text-xl'/>
          <h1 className='text-xl font-bold'>Micro Manager</h1>
        </div>
        <nav>
          <ul className='flex items-center gap-6'>
            <li>
              <Link to="/" className={`${isActive('/')} `}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/user-manager" className={`${isActive('/user-manager')}`}>
                Users
              </Link>
            </li>
            <li>
              <Link to="/product-manager" className={`${isActive('/product-manager')}`}>
                Products
              </Link>
            </li>
            <li>
              <Link to="/order-manager" className={`${isActive('/order-manager')}`}>
                Orders
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 