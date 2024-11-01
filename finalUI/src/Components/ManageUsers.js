

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import '../CSS/ManageUsers.css'; // Create a CSS file for additional styles

// function ManageUsers() {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [successMessage, setSuccessMessage] = useState('');

//     useEffect(() => {
//         fetchUsers();
//     }, []);

//     const fetchUsers = async () => {
//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No token found, please log in.');
//             }

//             const response = await axios.get('http://localhost:5000/api/admin/users', {
//                 headers: { Authorization: `Bearer ${token}` }
//             });
//             setUsers(response.data);
//         } catch (err) {
//             console.error('Error fetching users:', err);
//             setError(err.response?.data?.msg || err.message || 'Error fetching users');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleAction = async (action, userId) => {
//         try {
//             setError(null);
//             setSuccessMessage('');
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No token found, please log in.');
//             }

//             const response = await axios.patch(
//                 `http://localhost:5000/api/admin/user/${userId}/${action}`,
//                 {},
//                 { headers: { Authorization: `Bearer ${token}` } }
//             );

//             setSuccessMessage(response.data.msg);
//             fetchUsers(); // Refresh user list
//         } catch (err) {
//             console.error(`Error performing ${action}:`, err);
//             setError(err.response?.data?.msg || err.message || `Error performing ${action}`);
//         }
//     };

//     if (loading) return <div className="loader">Loading...</div>;

//     return (
//         <div className="manage-users-container">
//             <h2>Manage Users</h2>
//             {error && <p className="error-message">{error}</p>}
//             {successMessage && <p className="success-message">{successMessage}</p>}

//             {users.length ? (
//                 <div className="table-container">
//                     <table className="users-table">
//                         <thead>
//                             <tr>
//                                 <th>Username</th>
//                                 <th>Email</th>
//                                 <th>Role</th>
//                                 <th>Status</th>
//                                 <th>Actions</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {users.map((user) => (
//                                 <tr key={user._id}>
//                                     <td>{user.username}</td>
//                                     <td>{user.email}</td>
//                                     <td>{user.role}</td>
//                                     <td>
//                                         <span className={`status ${user.isActive ? 'active' : 'inactive'}`}>
//                                             {user.isActive ? 'Active' : 'Inactive'}
//                                         </span>
//                                     </td>
//                                     <td className="action-buttons">
//                                         <button
//                                             onClick={() => handleAction(user.isActive ? 'deactivate' : 'activate', user._id)}
//                                             className={`btn ${user.isActive ? 'btn-deactivate' : 'btn-activate'}`}
//                                         >
//                                             {user.isActive ? 'Deactivate' : 'Activate'}
//                                         </button>
//                                         <button
//                                             onClick={() => handleAction(user.role === 'admin' ? 'demote' : 'promote', user._id)}
//                                             className={`btn ${user.role === 'admin' ? 'btn-demote' : 'btn-promote'}`}
//                                         >
//                                             {user.role === 'admin' ? 'Demote' : 'Promote'}
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p>No users found.</p>
//             )}
//         </div>
//     );
// }

// export default ManageUsers;

import React, { useEffect, useState } from 'react';

const styles = `
  .dashboard {
    --primary-color: #2563eb;
    --success-color: #16a34a;
    --danger-color: #dc2626;
    --text-primary: #1f2937;
    --text-secondary: #6b7280;
    --bg-hover: #f3f4f6;
    --transition-speed: 0.3s;
    
    max-width: 1200px;
    margin: 2rem auto;
    padding: 0 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  }

  .header {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .header h1 {
    font-size: 1.875rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .users-grid {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }

  .user-card {
    background: white;
    border-radius: 0.5rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    padding: 1.5rem;
    transition: transform var(--transition-speed), box-shadow var(--transition-speed);
  }

  .user-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .user-info {
    margin-bottom: 1rem;
  }

  .user-name {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .user-email {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin: 0.25rem 0 0.75rem 0;
  }

  .badges {
    display: flex;
    gap: 0.5rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }

  .badge {
    padding: 0.25rem 0.75rem;
    border-radius: 9999px;
    font-size: 0.75rem;
    font-weight: 500;
  }

  .badge-admin {
    background: var(--primary-color);
    color: white;
  }

  .badge-user {
    background: var(--text-secondary);
    color: white;
  }

  .badge-active {
    background: var(--success-color);
    color: white;
  }

  .badge-inactive {
    background: var(--danger-color);
    color: white;
  }

  .actions {
    display: flex;
    gap: 0.75rem;
  }

  .btn {
    flex: 1;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    border: none;
    font-weight: 500;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    transition: background-color var(--transition-speed);
    font-size: 0.875rem;
  }

  .btn svg {
    width: 16px;
    height: 16px;
  }

  .btn-activate {
    background: var(--success-color);
    color: white;
  }

  .btn-activate:hover {
    background: #15803d;
  }

  .btn-deactivate {
    background: var(--danger-color);
    color: white;
  }

  .btn-deactivate:hover {
    background: #b91c1c;
  }

  .btn-promote {
    background: var(--primary-color);
    color: white;
  }

  .btn-promote:hover {
    background: #1d4ed8;
  }

  .btn-demote {
    background: var(--text-secondary);
    color: white;
  }

  .btn-demote:hover {
    background: #4b5563;
  }

  .alert {
    padding: 1rem;
    border-radius: 0.375rem;
    margin-bottom: 1rem;
  }

  .alert-success {
    background: #dcfce7;
    color: var(--success-color);
    border: 1px solid #86efac;
  }

  .alert-error {
    background: #fee2e2;
    color: var(--danger-color);
    border: 1px solid #fca5a5;
  }

  .loading {
    display: flex;
    gap: 2rem;
    flex-direction: column;
  }

  .skeleton {
    background: #f3f4f6;
    border-radius: 0.5rem;
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: .5;
    }
  }

  @media (max-width: 768px) {
    .users-grid {
      grid-template-columns: 1fr;
    }

    .actions {
      flex-direction: column;
    }

    .header h1 {
      font-size: 1.5rem;
    }
  }
`;

// SVG Icons components
const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const ShieldIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
  </svg>
);

const ShieldOffIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19.69 14a6.9 6.9 0 0 0 .31-2V5l-8-3-3.16 1.18"></path>
    <path d="M4.73 4.73L4 5v7c0 6 8 10 8 10a20.29 20.29 0 0 0 5.62-4.38"></path>
    <line x1="1" y1="1" x2="23" y2="23"></line>
  </svg>
);

const UserPlusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="20" y1="8" x2="20" y2="14"></line>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
);

const UserMinusIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
    <circle cx="8.5" cy="7" r="4"></circle>
    <line x1="23" y1="11" x2="17" y2="11"></line>
  </svg>
);

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found, please log in.');
      
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (action, userId) => {
    try {
      setError(null);
      setSuccessMessage('');
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No token found, please log in.');

      const response = await fetch(
        `http://localhost:5000/api/admin/user/${userId}/${action}`,
        {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      const data = await response.json();
      setSuccessMessage(data.msg);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const UserCard = ({ user }) => (
    <div className="user-card">
      <div className="user-info">
        <h3 className="user-name">{user.username}</h3>
        <p className="user-email">{user.email}</p>
        <div className="badges">
          <span className={`badge ${user.role === 'admin' ? 'badge-admin' : 'badge-user'}`}>
            {user.role}
          </span>
          <span className={`badge ${user.isActive ? 'badge-active' : 'badge-inactive'}`}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      <div className="actions">
        <button
          onClick={() => handleAction(user.isActive ? 'deactivate' : 'activate', user._id)}
          className={`btn ${user.isActive ? 'btn-deactivate' : 'btn-activate'}`}
        >
          {user.isActive ? <UserMinusIcon /> : <UserPlusIcon />}
          {user.isActive ? 'Deactivate' : 'Activate'}
        </button>
        <button
          onClick={() => handleAction(user.role === 'admin' ? 'demote' : 'promote', user._id)}
          className={`btn ${user.role === 'admin' ? 'btn-demote' : 'btn-promote'}`}
        >
          {user.role === 'admin' ? <ShieldOffIcon /> : <ShieldIcon />}
          {user.role === 'admin' ? 'Demote' : 'Promote'}
        </button>
      </div>
    </div>
  );

  return (
    <>
      <style>{styles}</style>
      <div className="dashboard">
        <div className="header">
          <UsersIcon />
          <h1>Manage Users</h1>
        </div>

        {error && (
          <div className="alert alert-error">
            {error}
          </div>
        )}
        
        {successMessage && (
          <div className="alert alert-success">
            {successMessage}
          </div>
        )}

        {loading ? (
          <div className="loading">
            {[1, 2, 3].map((i) => (
              <div key={i} className="skeleton" style={{ height: '200px' }} />
            ))}
          </div>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <UserCard key={user._id} user={user} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageUsers;