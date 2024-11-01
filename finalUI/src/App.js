import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import LoginForm from './Components/LoginForm';
import RegisterForm from './Components/RegisterForm';
import LandingPage from './Components/LandingPage';
import DriverRegisterForm from './Components/DriverRegisterForm';
import DriverLoginForm from './Components/DriverLoginForm';
import UserDashboard from './Components/Userdashboard';
import AdminDashboard from './Components/Admindashboard';
import ManageUsers from './Components/ManageUsers'; 
import ManageDrivers from './Components/ManageDrivers';
import DriverDashboard from './Components/DriverDashboard';
import CompletedRides from './Components/CompletedRides';
import RideRequests from './Components/RideRequest';
import PaymentInfo from './Components/PaymentInfo';
import ManageRides from './Components/ManageRides';




function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/driver-register" element={<DriverRegisterForm />} />
          <Route path="/driver-login" element={<DriverLoginForm />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} /> {/* Add AdminDashboard route */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin-users" element={<ManageUsers />} /> {/* Add ManageUsers route */}
          <Route path="/admin-drivers" element={<ManageDrivers />} />
          <Route path="/driver-dashboard/:token" element={<DriverDashboard />} />
          <Route path="/completed-rides" element={<CompletedRides />} />
          <Route path="/ride-requests" element={<RideRequests />} />
          <Route path="/payment-info" element={<PaymentInfo />} />
          <Route path="/admin-rides" element={<ManageRides />} />
        

          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
