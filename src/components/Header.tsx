import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#00aff0] text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Home size={24} />
            <h1 className="text-xl font-bold">VideoHub</h1>
          </Link>
          <nav className="hidden md:flex space-x-4">
            <Link to="/" className="hover:opacity-80 transition-opacity">Home</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;