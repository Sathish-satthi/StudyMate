import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  const handleLogout = () => {
    localStorage.clear();
    setIsMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        <Link to={userName ? "/home" : "/"} className="logo" onClick={closeMenu}>
          StudyMate <span>📚</span>
        </Link>

        {/* Hamburger Menu Icon */}
        {userName && (
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? "✕" : "☰"}
          </button>
        )}

        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          {userName && (
            <>
              <Link to="/home" onClick={closeMenu}>Dashboard</Link>
              <Link to="/notes" onClick={closeMenu}>Notes</Link>
              <Link to="/questions" onClick={closeMenu}>Questions</Link>
              <Link to="/timetable" onClick={closeMenu}>Timetable</Link>
              {userEmail === "sathishsatthisatthi@gmail.com" && (
                <Link to="/admin" onClick={closeMenu} style={{ color: 'var(--primary-color)' }}>
                  Admin Panel 🛠️
                </Link>
              )}
            </>
          )}

          {userName ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span className="desktop-hi" style={{ fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)' }}>
                Hi, {userName}
              </span>
              <button 
                onClick={handleLogout} 
                className="btn-login" 
                style={{ background: 'var(--text-secondary)', color: 'white', border: 'none', cursor: 'pointer' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/" className="btn-login" onClick={closeMenu}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
