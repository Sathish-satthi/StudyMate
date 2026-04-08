import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import API from "../api";

function SubjectDetail() {
  const { id } = useParams();
  const [notes, setNotes] = useState({}); // { "Module 1": [...notes] }
  const fileInputRef = useRef(null);
  const [activeModule, setActiveModule] = useState(null);
  const userRole = localStorage.getItem("userRole") || "user"; 

  console.log("SubjectDetail rendering. Current User Role:", userRole);
  
  const subjects = {
    daa: { name: "DAA", fullName: "Design and Analysis of Algorithm" },
    dt: { name: "DT", fullName: "Design Thinking for Software Engineering" },
    lss: { name: "LSS", fullName: "Linux and Shell Scripting" },
    fsd: { name: "FSD", fullName: "Full Stack Development" },
    atc: { name: "ATC", fullName: "Automata Theory and Compiler Design" },
  };

  const subject = subjects[id] || { name: "Unknown", fullName: "Subject Not Found" };
  const modules = ["Module 1", "Module 2", "Module 3", "Module 4"];

  useEffect(() => {
    modules.forEach(mod => fetchNotes(mod));
  }, [id]);

  const fetchNotes = async (mod) => {
    try {
      const res = await API.get(`/notes/${id}/${mod}/note`);
      setNotes(prev => ({ ...prev, [mod]: res.data }));
    } catch (err) {
      console.error("Failed to fetch notes for", mod);
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0 || !activeModule) return;

    const token = localStorage.getItem("userToken");
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      formData.append("subject", id);
      formData.append("module", activeModule);
      formData.append("type", "note");

      return API.post("/notes/upload", formData, {
        headers: { "x-auth-token": token }
      });
    });

    try {
      await Promise.all(uploadPromises);
      alert(`${files.length} note(s) uploaded successfully!`);
      fetchNotes(activeModule);
    } catch (err) {
      console.error("Upload error details:", err.response?.data || err.message);
      alert("Upload failed. Make sure you are logged in as admin.");
    }
  };

  const handleDelete = async (noteId, mod) => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    const token = localStorage.getItem("userToken");
    try {
      await API.delete(`/notes/${noteId}`, {
        headers: { "x-auth-token": token }
      });
      fetchNotes(mod);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container fade-in" style={{ padding: '60px 20px' }}>
      <header style={{ marginBottom: '48px' }}>
        <Link to="/home" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
          ← Back to Dashboard
        </Link>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>{subject.name}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>{subject.fullName}</p>
      </header>

      <input 
        type="file" 
        multiple 
        ref={fileInputRef} 
        style={{ display: 'none' }} 
        onChange={handleFileChange}
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
        {modules.map((mod, index) => (
          <div key={index} style={{ 
            background: 'white', 
            padding: '32px', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border-color)', 
            boxShadow: 'var(--shadow-md)',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px'
          }}>
            <h3 style={{ fontSize: '1.25rem' }}>{mod}</h3>
            
            <div style={{ minHeight: '120px', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '16px' }}>
              {notes[mod] && notes[mod].length > 0 ? (
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {notes[mod].map((note, idx) => (
                    <li key={idx} style={{ 
                      marginBottom: '10px', 
                      fontSize: '0.875rem', 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'var(--bg-primary)',
                      padding: '8px 12px',
                      borderRadius: '8px'
                    }}>
                      <a href={`http://localhost:5000/${note.fileUrl.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" style={{ 
                        color: 'var(--text-primary)', 
                        textDecoration: 'none',
                        flex: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        marginRight: '10px'
                      }}>
                        📄 {note.title}
                      </a>
                      <button 
                        onClick={() => handleDelete(note._id, mod)}
                        style={{ 
                          background: 'none', 
                          border: 'none', 
                          color: '#ef4444', 
                          cursor: 'pointer',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          padding: '4px'
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <p style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '24px' }}>No notes uploaded yet.</p>
              )}
            </div>

            <button 
              onClick={() => {
                setActiveModule(mod);
                fileInputRef.current.click();
              }}
              style={{ 
                width: '100%', 
                background: '#eef2ff', 
                color: 'var(--primary-color)',
                border: 'none',
                padding: '12px',
                borderRadius: 'var(--radius-md)',
                fontWeight: '600',
                cursor: 'pointer'
              }}
            >
              + Upload Notes
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SubjectDetail;
