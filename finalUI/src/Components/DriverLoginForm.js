

// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { jwtDecode } from 'jwt-decode';
// import '../CSS/FormStyle.css';

// function DriverLoginForm() {
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });

//   const [errors, setErrors] = useState({});
//   const [serverError, setServerError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');
//   const navigate = useNavigate();

//   // Validate form inputs
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email.trim()) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     return newErrors;
//   };

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const response = await axios.post('http://localhost:5000/api/driver/login', formData);
//       const { token } = response.data;

//       if (!token) {
//         throw new Error('Token not received');
//       }

//       // Store the token
//       localStorage.setItem('token', token);
//       console.log('Token stored:', token);

//       // Decode the token
//       const decodedToken = jwtDecode(token);
//       const role = decodedToken.driver?.role;  // Adjust this based on your token payload structure

//       if (!role) {
//         throw new Error('Role not found in token');
//       }

//       // Store the role
//       localStorage.setItem('role', role);

//       // Set success message and clear the form
//       setSuccessMessage('Login successful!');
//       setFormData({ email: '', password: '' });
//       setErrors({});
//       setServerError('');

//       // Navigate to the Driver Dashboard after successful login
//       navigate('/driver-dashboard');
//     } catch (error) {
//       console.error('Login Error:', error);

//       if (error.response?.status === 403) {
//         setServerError('Your account is not approved yet.');
//       } else if (error.response) {
//         setServerError(error.response.data?.msg || 'Server error occurred');
//       } else if (error.request) {
//         setServerError('Network error');
//       } else {
//         setServerError(error.message || 'Request error');
//       }
//       setSuccessMessage('');
//     }
//   };

//   return (
//     <div className="container d-flex justify-content-center align-items-center min-vh-100">
//       <div className="form-container bg-white p-5 rounded shadow">
//         <h2 className="text-center mb-4 text-dark-red">Driver Login</h2>
//         {serverError && <p className="text-danger text-center">{serverError}</p>}
//         {successMessage && <p className="text-success text-center">{successMessage}</p>}
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <input
//               type="email"
//               name="email"
//               className="form-control"
//               placeholder="Email"
//               value={formData.email}
//               onChange={handleChange}
//               required
//             />
//             {errors.email && <p className="text-danger">{errors.email}</p>}
//           </div>
//           <div className="form-group">
//             <input
//               type="password"
//               name="password"
//               className="form-control"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//             />
//             {errors.password && <p className="text-danger">{errors.password}</p>}
//           </div>
//           <button type="submit" className="btn w-100 mt-3">Login as Driver</button>
//           <p className="text-center mt-3">
//             <Link to="/driver-register" className="text-orange">Don't have an account? Register</Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default DriverLoginForm;


import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import for jwtDecode
import '../CSS/FormStyle.css';

function DriverLoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Validate form inputs
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

  // Handle input changes
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
      const response = await axios.post('http://localhost:5000/api/driver/login', formData);
      const { token } = response.data;

      if (!token) {
        throw new Error('Token not received');
      }

      // Store the token
      localStorage.setItem('token', token);
      console.log('Token stored:', token);

      // Decode the token
      const decodedToken = jwtDecode(token);
      const { role, id: driverId } = decodedToken.driver || {}; // Adjust if structure differs

      if (!role || !driverId) {
        throw new Error('Role or driver ID not found in token');
      }

      // Store the role and driverId
      localStorage.setItem('role', role);
      localStorage.setItem('driverId', driverId);

      // Set success message and clear the form
      setSuccessMessage('Login successful!');
      setFormData({ email: '', password: '' });
      setErrors({});
      setServerError('');

      // Navigate to the Driver Dashboard after successful login
      navigate(`/driver-dashboard/${token}`);
    } catch (error) {
      console.error('Login Error:', error);

      if (error.response?.status === 403) {
        setServerError('Your account is not approved yet.');
      } else if (error.response) {
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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="form-container bg-white p-5 rounded shadow">
        <h2 className="text-center mb-4 text-dark-red">Driver Login</h2>
        {serverError && <p className="text-danger text-center">{serverError}</p>}
        {successMessage && <p className="text-success text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
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
          <div className="form-group">
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
          <button type="submit" className="btn w-100 mt-3">Login as Driver</button>
          <p className="text-center mt-3">
            <Link to="/driver-register" className="text-orange">Don't have an account? Register</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default DriverLoginForm;
