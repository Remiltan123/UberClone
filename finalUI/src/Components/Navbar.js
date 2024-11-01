import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data and navigate to login page
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-[#530C0C] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold">
          <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
        </Link>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="text-white bg-[#FA7E0A] hover:bg-[#8F0E0E] font-semibold py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
