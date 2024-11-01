
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../Images/logo.png';
import heroimg from '../Images/hero.png';
import driver from '../Images/driver.jpg';
import Contact from './Contact';
import About from './About';
import '../Styles.css'

const LandingPage = () => {
  const navigate = useNavigate();

  const handlePublishRide = () => {
    const isDriverRegistered = localStorage.getItem('userRole') === 'driver';
    navigate(isDriverRegistered ? '/go-ride' : '/driver-register');
  };

  const handleGetStartedClick = () => {
    navigate('/register');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
    <nav className="bg-[#3B3B3B] fixed w-full shadow-lg z-10">
      <div className="container mx-auto flex justify-between items-center p-4">
        <a href="/">
          <img src={logo} alt="Logo" className="h-10" />
        </a>
        <ul className="flex space-x-6 text-white">
          <li><a href="#about" className="hover:text-[#110D00] transition">About</a></li>
          <li><a href="#services" className="hover:text-[#110D00] transition">Services</a></li>
          <li><a href="#contact" className="hover:text-[#110D00] transition">Contact</a></li>
          <li><a href="/login" className="bg-[#110D00] py-2 px-4 rounded hover:bg-[#000000] transition">Login</a></li>
        </ul>
      </div>
    </nav> 

    <header className="flex flex-col lg:flex-row items-center justify-center bg-white p-8 pt-20">
        <div className="max-w-md text-center lg:text-left">
          <h1 className="text-4xl font-bold mb-4 text-[#530C0C]">"Your Next Ride is Just a Tap Away – Let’s Get Going!"</h1>
          <p className="mb-6 text-gray-700">Find a ride or publish one. It's easy and quick! Join us and make your commute hassle-free.</p>
          <button onClick={handleGetStartedClick} className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition">
            Get Started
          </button>
        </div>
        <div className="mt-6 lg:mt-0 lg:flex-1 flex justify-center">
          <img src={heroimg} alt="Hero" className="w-full h-auto rounded max-w-lg" />
        </div>
      </header>

      <section className="relative bg-red-100 py-12">
  {/* Background overlay design */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#F7F6DE] to-[#FA7E0A] opacity-20"></div>

  <div className="container mx-auto text-center relative z-0">
    {/* Decorative line below the heading */}
    <h2 className="text-2xl font-bold mb-4 text-[#530C0C] relative">
      For Drivers
      <div className="w-16 h-1 bg-[#530C0C] mx-auto mt-2 rounded-full"></div>
    </h2>

    <div className="flex justify-center items-center space-x-8">
      {/* Image section with hover effect */}
      <img
        src={driver}
        alt="Driver"
        className="w-48 h-60 rounded-full shadow-lg transform hover:scale-105 transition-transform duration-300"
      />
      <div className="max-w-md text-left">
        {/* Icons added next to text */}
        <div className="mb-4 text-gray-700 flex items-center space-x-2">
          <i className="fas fa-car text-orange-500"></i>
          <p>Become a driver and start earning money by sharing rides. It's simple and rewarding!</p>
        </div>

        {/* Enhanced button with hover effect */}
        <button
          onClick={handlePublishRide}
          className="bg-orange-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-orange-600 hover:shadow-xl transition-all duration-300"
        >
          Publish Ride
        </button>
      </div>
    </div>
  </div>
</section>

      <section id="contact" className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-[#530C0C]">Contact Us</h2>
          <p className="mb-6 text-gray-700">If you have any questions or need assistance, feel free to reach out to us.</p>
          <Contact />
        </div>
      </section>

      <section id="about" className="py-12">
        <About />
      </section>

      <footer className="bg-[#530C0C] py-4">
        <div className="container mx-auto text-center">
          <p className="text-white">&copy; 2024 wayX. All rights reserved.</p>
          <a href="#contact" className="text-orange-400 hover:underline">Contact Us</a>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
