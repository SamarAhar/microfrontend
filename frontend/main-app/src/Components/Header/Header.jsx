import { FaTasks } from "react-icons/fa";

export default function Header() {
  return (
    <header className='w-full bg-[#d91717] p-4 text-white'>
      <div className='container mx-auto flex items-center gap-2'>
        <FaTasks className='text-xl'/>
        <h1 className='text-xl font-bold'>Micro Manager</h1>
      </div>
    </header>
  );
} 