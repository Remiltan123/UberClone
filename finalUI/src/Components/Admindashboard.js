import React from 'react';
import Sidebar from './Sidebar';
import DashboardContent from './DashboardContent';
import '../CSS/Admindashboard.css'; 

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <DashboardContent />
      </div>
    </div>
  );
};

export default AdminDashboard;
