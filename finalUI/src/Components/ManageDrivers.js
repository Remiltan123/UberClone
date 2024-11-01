// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// function ManageDrivers() {
//   const [drivers, setDrivers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [successMessage, setSuccessMessage] = useState('');

//   useEffect(() => {
//     fetchDrivers();
//   }, []);

//   const fetchDrivers = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found, please log in.');
//       }

//       const response = await axios.get('http://localhost:5000/api/admin/driver', {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setDrivers(response.data);
//     } catch (err) {
//       console.error('Error fetching drivers:', err);
//       setError(err.response?.data?.msg || err.message || 'Error fetching drivers');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (action, driverId) => {
//     try {
//       setError(null);
//       setSuccessMessage('');
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('No token found, please log in.');
//       }

//       console.log(`Attempting ${action} for driver ${driverId}`);

//       let response;
//       if (action === 'delete') {
//         response = await axios.delete(
//           `http://localhost:5000/api/admin/driver/${driverId}`,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       } else {
//         response = await axios.patch(
//           `http://localhost:5000/api/admin/driver/${driverId}/${action}`,
//           {},
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//       }

//       console.log('Action response:', response.data);
//       setSuccessMessage(response.data.msg);
//       fetchDrivers(); // Refresh driver list
//     } catch (err) {
//       console.error(`Error performing ${action}:`, err);
//       setError(err.response?.data?.msg || err.message || `Error performing ${action}`);
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div style={{padding: '1rem'}}>
//       <h2 style={{fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem'}}>Manage Drivers</h2>
//       {error && <p style={{color: 'red', marginBottom: '1rem'}}>{error}</p>}
//       {successMessage && (
//         <p style={{backgroundColor: '#d4edda', border: '1px solid #c3e6cb', color: '#155724', padding: '0.75rem', borderRadius: '0.25rem', marginBottom: '1rem'}}>
//           {successMessage}
//         </p>
//       )}
//       <ul style={{listStyleType: 'none', padding: 0}}>
//         {drivers.length ? (
//           drivers.map((driver) => (
//             <li key={driver._id} style={{border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem', borderRadius: '0.25rem'}}>
//               <p style={{fontWeight: 'bold'}}>{driver.username} ({driver.email})</p>
//               <p>Vehicle Type: {driver.vehicleType || 'N/A'}</p>
//               <p>License Number: {driver.licenseNumber || 'N/A'}</p>
//               <p>Documents: {Array.isArray(driver.documents) ? driver.documents.join(', ') : 'None'}</p>
//               <p>Status: {driver.isApproved ? 'Approved' : 'Pending'}</p>
//               <p>Created At: {new Date(driver.createdAt).toLocaleString()}</p>
//               <div style={{marginTop: '0.5rem'}}>
//                 <button onClick={() => handleAction(driver.isApproved ? 'reject' : 'approve', driver._id)} style={{marginRight: '0.5rem'}}>
//                   {driver.isApproved ? 'Reject' : 'Approve'}
//                 </button>
//                 <button onClick={() => handleAction('delete', driver._id)} style={{backgroundColor: '#dc3545', color: 'white'}}>
//                   Delete
//                 </button>
//               </div>
//             </li>
//           ))
//         ) : (
//           <p>No drivers found.</p>
//         )}
//       </ul>
//     </div>
//   );
// }

// export default ManageDrivers;



import React, { useState, useEffect } from 'react';

function ManageDrivers() {
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await fetch('http://localhost:5000/api/admin/driver', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setDrivers(data);
    } catch (err) {
      console.error('Error fetching drivers:', err);
      setError(err.response?.data?.msg || err.message || 'Error fetching drivers');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  const handleAction = async (action, driverId) => {
    try {
      setError(null);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const url = action === 'delete'
        ? `http://localhost:5000/api/admin/driver/${driverId}`
        : `http://localhost:5000/api/admin/driver/${driverId}/${action}`;

      const response = await fetch(url, {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      showNotification(data.msg);
      fetchDrivers();
    } catch (err) {
      console.error(`Error performing ${action}:`, err);
      showNotification(err.response?.data?.msg || err.message || `Error performing ${action}`, 'error');
    }
  };

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  return (
    <div className="dashboard">
      <style>
        {`
          :root {
            --primary-color: #2563eb;
            --success-color: #059669;
            --danger-color: #dc2626;
            --warning-color: #d97706;
            --background-color: #f3f4f6;
            --card-background: #ffffff;
            --text-primary: #111827;
            --text-secondary: #6b7280;
            --border-color: #e5e7eb;
            --hover-background: #f9fafb;
          }

          .dashboard {
            padding: 24px;
            background: var(--background-color);
            min-height: 100vh;
          }

          .card {
            background: var(--card-background);
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            max-width: 1200px;
            margin: 0 auto;
          }

          .card-header {
            padding: 20px 24px;
            border-bottom: 1px solid var(--border-color);
          }

          .card-header h2 {
            font-size: 24px;
            color: var(--text-primary);
            font-weight: 600;
            margin: 0;
          }

          .notification {
            margin: 16px 24px;
            padding: 12px 16px;
            border-radius: 8px;
            animation: slideIn 0.3s ease;
          }

          .notification.success {
            background: #ecfdf5;
            color: var(--success-color);
          }

          .notification.error {
            background: #fef2f2;
            color: var(--danger-color);
          }

          .table-container {
            overflow-x: auto;
            padding: 16px 24px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            font-size: 14px;
          }

          th {
            text-align: left;
            padding: 12px 16px;
            color: var(--text-secondary);
            font-weight: 600;
            background: var(--background-color);
            white-space: nowrap;
          }

          td {
            padding: 16px;
            border-bottom: 1px solid var(--border-color);
            vertical-align: top;
          }

          tr:hover {
            background: var(--hover-background);
          }

          .driver-info {
            display: flex;
            flex-direction: column;
            gap: 4px;
          }

          .driver-name {
            color: var(--text-primary);
            font-weight: 500;
          }

          .driver-email {
            color: var(--text-secondary);
            font-size: 13px;
          }

          .status-badge {
            display: inline-block;
            padding: 4px 12px;
            border-radius: 9999px;
            font-size: 12px;
            font-weight: 500;
          }

          .status-badge.approved {
            background: #ecfdf5;
            color: var(--success-color);
          }

          .status-badge.pending {
            background: #fffbeb;
            color: var(--warning-color);
          }

          .document-tag {
            display: inline-block;
            padding: 4px 8px;
            background: var(--background-color);
            border-radius: 4px;
            font-size: 12px;
            margin: 2px;
            color: var(--text-secondary);
          }

          .actions {
            display: flex;
            gap: 8px;
            justify-content: flex-end;
          }

          button {
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 13px;
            font-weight: 500;
            cursor: pointer;
            border: none;
            transition: all 0.2s;
          }

          .btn-approve {
            background: #ecfdf5;
            color: var(--success-color);
          }

          .btn-approve:hover {
            background: #d1fae5;
          }

          .btn-reject {
            background: #fffbeb;
            color: var(--warning-color);
          }

          .btn-reject:hover {
            background: #fef3c7;
          }

          .btn-delete {
            background: #fef2f2;
            color: var(--danger-color);
          }

          .btn-delete:hover {
            background: #fee2e2;
          }

          .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: var(--primary-color);
            font-size: 18px;
          }

          @keyframes slideIn {
            from {
              transform: translateY(-20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }

          @media (max-width: 768px) {
            .hide-mobile {
              display: none;
            }
            
            .card {
              margin: 0;
              border-radius: 0;
            }

            td, th {
              padding: 12px;
            }

            .actions {
              flex-direction: column;
            }

            button {
              width: 100%;
            }
          }
        `}
      </style>

      <div className="card">
        <div className="card-header">
          <h2>Manage Drivers</h2>
        </div>

        {notification.show && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        {error && (
          <div className="notification error">
            {error}
          </div>
        )}

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Driver Info</th>
                <th className="hide-mobile">Vehicle Details</th>
                <th className="hide-mobile">Documents</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.length > 0 ? (
                drivers.map((driver) => (
                  <tr key={driver._id}>
                    <td>
                      <div className="driver-info">
                        <span className="driver-name">{driver.username}</span>
                        <span className="driver-email">{driver.email}</span>
                      </div>
                    </td>
                    <td className="hide-mobile">
                      <div className="driver-info">
                        <span>Type: {driver.vehicleType || 'N/A'}</span>
                        <span>License: {driver.licenseNumber || 'N/A'}</span>
                      </div>
                    </td>
                    <td className="hide-mobile">
                      {Array.isArray(driver.documents) && driver.documents.length > 0 ? (
                        <div>
                          {driver.documents.map((doc, index) => (
                            <span key={index} className="document-tag">{doc}</span>
                          ))}
                        </div>
                      ) : (
                        <span>No documents</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-badge ${driver.isApproved ? 'approved' : 'pending'}`}>
                        {driver.isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </td>
                    <td>
                      <div className="actions">
                        <button
                          className={driver.isApproved ? 'btn-reject' : 'btn-approve'}
                          onClick={() => handleAction(driver.isApproved ? 'reject' : 'approve', driver._id)}
                        >
                          {driver.isApproved ? 'Reject' : 'Approve'}
                        </button>
                        <button
                          className="btn-delete"
                          onClick={() => handleAction('delete', driver._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                    No drivers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ManageDrivers;
