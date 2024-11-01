import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate
import '../CSS/FormStyle.css';
import login from '../Images/login.webp';

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Initialize the useNavigate hook

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', formData);
      console.log('Registration Successful:', response.data);

      // Store user details in localStorage
      localStorage.setItem('username', formData.username);
      localStorage.setItem('email', formData.email);
      // Set success message and clear the form
      setSuccessMessage('Registration successful! Redirecting to your dashboard...');
      setFormData({
        username: '',
        email: '',
        password: ''
      });
      setErrors({});
      setServerError('');

      // Redirect to user dashboard
      navigate('/user-dashboard'); // Navigate to the user dashboard after successful registration

    } catch (error) {
      if (error.response && error.response.data) {
        console.log('Detailed Error:', error.response.data); // Log detailed error response
        setServerError(error.response.data.message || 'Registration failed. Please try again.');
      } else {
        setServerError('An unexpected error occurred. Please try again.');
      }
      console.error('Registration Error:', error);
    }
  };


return (
  <div
    className="container-fluid d-flex justify-content-start align-items-center min-vh-100"
    style={{
      backgroundImage: `url(${login})`, // Set your background image here
      backgroundSize: 'cover',
      backgroundPosition: 'center left',
      backgroundRepeat: 'no-repeat',
      height: '100vh',
    }}
  >
    {/* Left Side with Signup Form */}
    <div
      className="col-md-4 d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        padding: '20px',
      }}
    >
      <div className="form-container w-100 p-5 rounded shadow">
        <h2 className="text-center mb-4">Join Us Today!</h2>
        {serverError && <p className="text-danger text-center">{serverError}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </div>
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
          <button type="submit" className="btn w-100 mt-3">Register</button>
          <p className="text-center mt-3">
            <Link to="/login" className="text-orange">Already have an account? Login</Link>
          </p>
        </form>
      </div>
    </div>
  </div>
);
};

export default RegisterForm;
