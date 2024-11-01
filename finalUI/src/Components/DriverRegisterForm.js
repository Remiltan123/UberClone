import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../CSS/Driverregister.css';

function DriverRegisterForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    vehicleType: '',
    licenseNumber: '',
    licenseImage: null,
    vehicleRegistration: null,
    insuranceDocument: null
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Validate the form fields
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

    if (!formData.vehicleType.trim()) {
      newErrors.vehicleType = 'Vehicle type is required';
    }

    if (!formData.licenseNumber.trim()) {
      newErrors.licenseNumber = 'License number is required';
    }

    if (!formData.licenseImage) {
      newErrors.licenseImage = 'License image is required';
    }

    if (!formData.vehicleRegistration) {
      newErrors.vehicleRegistration = 'Vehicle registration document is required';
    }

    if (!formData.insuranceDocument) {
      newErrors.insuranceDocument = 'Insurance document is required';
    }

    return newErrors;
  };

  // Handle form input changes
  const handleChange = (e) => {
    if (e.target.files) {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0]
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('vehicleType', formData.vehicleType);
    formDataToSend.append('licenseNumber', formData.licenseNumber);
    formDataToSend.append('licenseImage', formData.licenseImage);
    formDataToSend.append('vehicleRegistration', formData.vehicleRegistration);
    formDataToSend.append('insuranceDocument', formData.insuranceDocument);

    try {
      const response = await axios.post('http://localhost:5000/api/driver/register', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Driver Registration Successful:', response.data);

      // Set success message and clear the form
      setSuccessMessage('Registration successful! Your profile is under review.');
      setFormData({
        username: '',
        email: '',
        password: '',
        vehicleType: '',
        licenseNumber: '',
        licenseImage: null,
        vehicleRegistration: null,
        insuranceDocument: null
      });
      setErrors({});
      setServerError('');
    } catch (error) {
      setServerError(error.response?.data?.message || 'Registration failed. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container bg-light p-4 rounded shadow">
        <h2 className="text-center mb-4 text-dark">Driver Registration</h2>
        {serverError && <p className="text-danger text-center">{serverError}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              className="form-control"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {errors.username && <p className="text-danger">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            {errors.email && <p className="text-danger">{errors.email}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && <p className="text-danger">{errors.password}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="vehicleType">Vehicle Type</label>
            <input
              type="text"
              id="vehicleType"
              name="vehicleType"
              className="form-control"
              placeholder="Enter vehicle type"
              value={formData.vehicleType}
              onChange={handleChange}
              required
            />
            {errors.vehicleType && <p className="text-danger">{errors.vehicleType}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="licenseNumber">License Number</label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              className="form-control"
              placeholder="Enter license number"
              value={formData.licenseNumber}
              onChange={handleChange}
              required
            />
            {errors.licenseNumber && <p className="text-danger">{errors.licenseNumber}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="licenseImage">License Image</label>
            <input
              type="file"
              id="licenseImage"
              name="licenseImage"
              className="form-control-file"
              onChange={handleChange}
              required
            />
            {errors.licenseImage && <p className="text-danger">{errors.licenseImage}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="vehicleRegistration">Vehicle Registration Document</label>
            <input
              type="file"
              id="vehicleRegistration"
              name="vehicleRegistration"
              className="form-control-file"
              onChange={handleChange}
              required
            />
            {errors.vehicleRegistration && <p className="text-danger">{errors.vehicleRegistration}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="insuranceDocument">Insurance Document</label>
            <input
              type="file"
              id="insuranceDocument"
              name="insuranceDocument"
              className="form-control-file"
              onChange={handleChange}
              required
            />
            {errors.insuranceDocument && <p className="text-danger">{errors.insuranceDocument}</p>}
          </div>
          <button type="submit" className="btn btn-primary w-100 mt-3">Register as Driver</button>
          <p className="text-center mt-3">
            <Link to="/driver-login" className="text-primary">Already registered? Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default DriverRegisterForm;
