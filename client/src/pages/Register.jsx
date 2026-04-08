import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

function Register() {
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await API.post("/auth/register", data);
      alert("Registered Successfully");
      navigate("/");
    } catch (err) {
      alert("Registration failed");
    }
  };

  return (
    <div className="form-container fade-in">
      <div className="form">
        <h2>Join StudyMate</h2>
        <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginTop: '-16px', marginBottom: '8px' }}>
          Create an account to start sharing notes
        </p>

        <div className="field-group">
          <label>Full Name</label>
          <input
            placeholder="John Doe"
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
        </div>

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

        <button onClick={handleSubmit}>Create Account</button>

        <p className="auth-link">
          Already have an account? <a href="/">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default Register;
