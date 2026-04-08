import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        data,
      );
      localStorage.setItem("userToken", res.data.token);
      localStorage.setItem("userRole", res.data.user.role);
      localStorage.setItem("userName", res.data.user.name);
      localStorage.setItem("userEmail", res.data.user.email);
      
      alert(`Welcome back, ${res.data.user.name}!`);
      navigate("/home");
    } catch (err) {
      alert("Login Failed: " + (err.response?.data?.message || "Invalid credentials"));
    }
  };

  return (
    <div className="form-container fade-in">
      <div className="form">
        <h2>Welcome Back</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '-16px', marginBottom: '8px' }}>
          Sign in to access your study materials
        </p>
        
        <div className="field-group">
          <label>Email Address</label>
          <input
            type="email"
            placeholder="name@example.com"
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
        </div>

        <div className="field-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            onChange={(e) => setData({ ...data, password: e.target.value })}
          />
        </div>

        <button onClick={handleSubmit}>Sign In</button>

        <p className="auth-link">
          Don't have an account? <a href="/register">Create one</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
