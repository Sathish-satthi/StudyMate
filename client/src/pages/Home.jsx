import { Link } from "react-router-dom";

function Home() {
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");
  const userEmail = localStorage.getItem("userEmail");

  return (
    <div className="home fade-in">
      <div className="container">
        <header style={{ marginBottom: '60px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3.5rem', marginBottom: '16px' }}>Welcome back, {userName}! 👋</h1>
          <p style={{ fontSize: '1.25rem' }}>Academic Year: 2025-2026 (Even Semester)</p>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', textAlign: 'center' }}>
          <Link to="/notes" style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: 'white', 
              padding: '48px', 
              borderRadius: 'var(--radius-lg)', 
              border: '2px solid var(--border-color)', 
              boxShadow: 'var(--shadow-md)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'var(--primary-color)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📚</div>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '2rem' }}>Subject Notes</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Upload and view files for DAA, DT, LSS, FSD, and ATC.</p>
              <div style={{ background: 'var(--primary-color)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block' }}>
                Open Notes
              </div>
            </div>
          </Link>

          <Link to="/questions" style={{ textDecoration: 'none' }}>
            <div style={{ 
              padding: '48px', 
              borderRadius: 'var(--radius-lg)', 
              border: '2px solid var(--border-color)', 
              boxShadow: 'var(--shadow-md)',
              background: 'white',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = 'var(--secondary-color)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}>
              <div style={{ fontSize: '4rem', marginBottom: '24px' }}>💡</div>
              <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '2rem' }}>Important Questions</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Access critical questions for exam preparation.</p>
              <div style={{ background: 'var(--secondary-color)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block' }}>
                Open Questions
              </div>
            </div>
          </Link>

          {userEmail === "sathishsatthisatthi@gmail.com" && (
            <Link to="/admin" style={{ textDecoration: 'none' }}>
              <div style={{ 
                background: '#f8fafc', 
                padding: '48px', 
                borderRadius: 'var(--radius-lg)', 
                border: '2px dashed var(--primary-color)', 
                boxShadow: 'var(--shadow-md)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.background = '#eff6ff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.background = '#f8fafc';
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '24px' }}>🛠️</div>
                <h2 style={{ color: 'var(--text-primary)', marginBottom: '16px', fontSize: '2rem' }}>Admin Panel</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage users and view platform statistics.</p>
                <div style={{ background: 'var(--text-primary)', color: 'white', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block' }}>
                  Open Panel
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
