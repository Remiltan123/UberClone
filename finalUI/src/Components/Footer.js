import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 p-4">
      <div className="container mx-auto text-center text-white">
        <p>&copy; 2024 Tuk Tuk. All Rights Reserved.</p>
        <div className="mt-2">
          <a href="/about" className="text-gray-400 hover:text-white mx-2">About Us</a>
          <a href="/contact" className="text-gray-400 hover:text-white mx-2">Contact</a>
          <a href="/terms" className="text-gray-400 hover:text-white mx-2">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
