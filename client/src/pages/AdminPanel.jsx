import { useState, useEffect } from "react";
import API from "../api";
import { Link } from "react-router-dom";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({ userCount: 0, noteCount: 0, questionCount: 0 });
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await API.get("/users/all", {
        headers: { "x-auth-token": token }
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users");
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/users/stats", {
        headers: { "x-auth-token": token }
      });
      setStats(res.data);
    } catch (err) {
      console.error("Failed to fetch stats");
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to remove this user?")) return;
    try {
      await API.delete(`/users/${id}`, {
        headers: { "x-auth-token": token }
      });
      fetchUsers();
      fetchStats();
    } catch (err) {
      alert("Failed to delete user");
    }
  };

  return (
    <div className="container fade-in" style={{ padding: '60px 20px' }}>
      <header style={{ marginBottom: '48px' }}>
        <Link to="/home" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          ← Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Admin Dashboard 🛠️</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Manage your classmates and monitor platform activity.</p>
      </header>

      {/* Stats Section */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', marginBottom: '48px' }}>
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '8px' }}>Total Students</h3>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--primary-color)' }}>{stats.userCount}</p>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '8px' }}>Notes Uploaded</h3>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--secondary-color)' }}>{stats.noteCount}</p>
        </div>
        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'center' }}>
          <h3 style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', textTransform: 'uppercase', marginBottom: '8px' }}>Questions Shared</h3>
          <p style={{ fontSize: '2rem', fontWeight: '800', color: '#10b981' }}>{stats.questionCount}</p>
        </div>
      </div>

      {/* User Management Section */}
      <div style={{ background: 'white', borderRadius: '20px', border: '1px solid var(--border-color)', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', background: '#f8fafc' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '700' }}>Student Management</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#f8fafc', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '16px 24px', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Name</th>
                <th style={{ padding: '16px 24px', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Email</th>
                <th style={{ padding: '16px 24px', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Joined</th>
                <th style={{ padding: '16px 24px', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Role</th>
                <th style={{ padding: '16px 24px', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-secondary)' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '16px 24px', fontWeight: '500' }}>{u.name}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)' }}>{u.email}</td>
                  <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', fontSize: '0.8125rem' }}>
                    {new Date(u.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '6px', 
                      fontSize: '0.75rem', 
                      fontWeight: '700',
                      background: u.role === 'admin' ? '#eef2ff' : '#f1f5f9',
                      color: u.role === 'admin' ? 'var(--primary-color)' : 'var(--text-secondary)'
                    }}>
                      {u.role.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    {u.role !== 'admin' && (
                      <button 
                        onClick={() => deleteUser(u._id)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#ef4444', 
                          cursor: 'pointer',
                          fontWeight: '600',
                          fontSize: '0.875rem',
                          padding: '0'
                        }}
                      >
                        Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
