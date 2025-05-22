export default function Footer() {
  return (
    <footer className="bg-[#d91717] text-white py-4 w-full  ">
      <div className="container mx-auto px-4 m-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm">© 2025 Micro Manager. All rights reserved.</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="text-sm hover:text-gray-200">Privacy Policy</a>
            <a href="#" className="text-sm hover:text-gray-200">Terms of Service</a>
            <a href="#" className="text-sm hover:text-gray-200">Contact Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
} 