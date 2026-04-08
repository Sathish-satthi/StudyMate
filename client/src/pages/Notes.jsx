import { Link } from "react-router-dom";

function Notes() {
  const subjects = [
    { id: "daa", name: "DAA", fullName: "Design and Analysis of Algorithm" },
    { id: "dt", name: "DT", fullName: "Design Thinking for Software Engineering" },
    { id: "lss", name: "LSS", fullName: "Linux and Shell Scripting" },
    { id: "fsd", name: "FSD", fullName: "Full Stack Development" },
    { id: "atc", name: "ATC", fullName: "Automata Theory and Compiler Design" },
  ];

  return (
    <div className="container fade-in" style={{ padding: '60px 20px' }}>
      <header style={{ marginBottom: '48px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Subject Notes 📚</h1>
        <p style={{ color: 'var(--text-secondary)' }}>Select a subject to view or upload notes organzied by modules.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
        {subjects.map((sub) => (
          <Link key={sub.id} to={`/subject/${sub.id}`} style={{ textDecoration: 'none' }}>
            <div style={{ 
              background: 'white', 
              padding: '24px', 
              borderRadius: 'var(--radius-md)', 
              border: '1px solid var(--border-color)', 
              boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s ease',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--primary-color)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              e.currentTarget.style.borderColor = 'var(--border-color)';
            }}>
              <div>
                <h3 style={{ color: 'var(--primary-color)', marginBottom: '8px', fontSize: '1.5rem' }}>{sub.name}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{sub.fullName}</p>
              </div>
              <div style={{ marginTop: '16px', fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                4 Modules Available
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Notes;
