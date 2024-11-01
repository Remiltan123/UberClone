

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import '../CSS/FormStyle.css';
import { jwtDecode } from 'jwt-decode';
import login from '../Images/login.webp';
 // Importing correctly

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  // Handle change in input fields
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Making request to the login endpoint
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token} = response.data;

      if (!token) {
        throw new Error('Token not received');
      }

      // Store the token
      localStorage.setItem('token', token);
      console.log('Token stored:', token);

      // Decode the token
      const decodedToken = jwtDecode(token);
      const role = decodedToken.user?.role;  // Adjust this based on token payload

      if (!role) {
        throw new Error('Role not found in token');
      }

      // Store the role
      localStorage.setItem('role', role);


      // Store user details in localStorage
      localStorage.setItem('email', formData.email);

      setSuccessMessage('Login successful!');
      setFormData({ email: '', password: '' });
      setErrors({});
      setServerError('');

      // Redirect based on role
      if (role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }

    } catch (error) {
      console.error('Login Error:', error);

      if (error.response) {
        setServerError(error.response.data?.msg || 'Server error occurred');
      } else if (error.request) {
        setServerError('Network error');
      } else {
        setServerError(error.message || 'Request error');
      }

      setSuccessMessage('');
    }
  };

return (
  <div
    className="container-fluid d-flex justify-content-start align-items-center min-vh-100"
    style={{
      backgroundImage: `url(${login})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    }}
  >
    {/* Left Side with Login Form */}
    <div
      className="col-md-4 d-flex justify-content-center align-items-center"
      style={{
        // backgroundColor: 'rgba(255, 255, 255, 0.85)', // Semi-transparent white background
        height: '100vh',
        padding: '20px',
      }}
    >
      <div className="form-container w-100 p-4 shadow-lg rounded">
        <h2 className="h1 text-center mb-4">Welcome Back!</h2>
        {serverError && <p className="text-danger text-center">{serverError}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <button type="submit" className="btn btn-dark-red w-100 mt-3">Login</button>
          <p className="text-center mt-3">
            <Link to="/register" className="text-orange">Don't have an account? Register</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
);
}

export default LoginForm;
