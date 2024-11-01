// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../CSS/Sidebar.css'; 

// const Sidebar = () => {
//   return (
//     <div className="sidebar bg-dark">
//       <h2 className="text-white p-3">Admin Panel</h2>
//       <ul className="nav flex-column">
//         <li className="nav-item">
//           <Link to="/admin" className="nav-link text-white"> {/* Updated to "/admin" */}
//             Dashboard
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/admin-users" className="nav-link text-white">
//             Manage Users
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/admin-drivers" className="nav-link text-white">
//             Manage Drivers
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/admin-rides" className="nav-link text-white">
//             Manage Rides
//           </Link>
//         </li>
//         <li className="nav-item">
//           <Link to="/admin/settings" className="nav-link text-white">
//             Settings
//           </Link>
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;
import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles.css'

const Sidebar = () => {
  return (
    <div className="h-screen px-4 py-6 flex flex-col justify-between" style={{ backgroundColor: '#530c0c' }}>
    <div>
      <h2 className="text-xl font-bold mb-6" style={{ color: '#FA7E0A' }}>Admin Panel</h2>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/admin" 
              className="block px-3 py-2 transition-colors rounded-md hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#FA7E0A' }}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin-users" 
              className="block px-3 py-2 transition-colors rounded-md hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#FA7E0A' }}
            >
              Manage Users
            </Link>
          </li>
          <li>
            <Link 
              to="/admin-drivers" 
              className="block px-3 py-2 transition-colors rounded-md hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#FA7E0A' }}
            >
              Manage Drivers
            </Link>
          </li>
          <li>
            <Link 
              to="/admin-rides" 
              className="block px-3 py-2 transition-colors rounded-md hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#FA7E0A' }}
            >
              Manage Rides
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/settings" 
              className="block px-3 py-2 transition-colors rounded-md hover:bg-opacity-10 hover:bg-white"
              style={{ color: '#FA7E0A' }}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <button 
      className="px-3 py-2 rounded-md transition-colors hover:bg-opacity-90"
      style={{ backgroundColor: '#FA7E0A', color: 'white' }}
    >
      Logout
    </button>
  </div>
);
};


export default Sidebar;