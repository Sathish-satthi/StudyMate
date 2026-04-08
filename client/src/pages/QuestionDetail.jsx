import { useParams, Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function QuestionDetail() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]); 
  const fileInputRef = useRef(null);
  
  const subjects = {
    daa: { name: "DAA", fullName: "Design and Analysis of Algorithm" },
    dt: { name: "DT", fullName: "Design Thinking for Software Engineering" },
    lss: { name: "LSS", fullName: "Linux and Shell Scripting" },
    fsd: { name: "FSD", fullName: "Full Stack Development" },
    atc: { name: "ATC", fullName: "Automata Theory and Compiler Design" },
  };

  const subject = subjects[id] || { name: "Unknown", fullName: "Subject Not Found" };

  useEffect(() => {
    fetchQuestions();
  }, [id]);

  const fetchQuestions = async () => {
    try {
      // Using 'All' as a placeholder module for unified questions
      const res = await axios.get(`http://localhost:5000/api/notes/${id}/All/question`);
      setQuestions(res.data);
    } catch (err) {
      console.error("Failed to fetch questions");
    }
  };

  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    const token = localStorage.getItem("userToken");
    const uploadPromises = files.map(async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", file.name);
      formData.append("subject", id);
      formData.append("module", "All"); // Unified category
      formData.append("type", "question");

      return axios.post("http://localhost:5000/api/notes/upload", formData, {
        headers: { "x-auth-token": token }
      });
    });

    try {
      await Promise.all(uploadPromises);
      alert(`${files.length} question(s) uploaded successfully!`);
      fetchQuestions();
    } catch (err) {
      alert("Upload failed. Make sure you are logged in as admin.");
    }
  };

  const handleDelete = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    const token = localStorage.getItem("userToken");
    try {
      await axios.delete(`http://localhost:5000/api/notes/${itemId}`, {
        headers: { "x-auth-token": token }
      });
      fetchQuestions();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container fade-in" style={{ padding: '60px 20px', maxWidth: '800px' }}>
      <header style={{ marginBottom: '48px', textAlign: 'center' }}>
        <Link to="/questions" style={{ color: 'var(--secondary-color)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center', marginBottom: '16px' }}>
          ← Back to Questions Hub
        </Link>
        <h1 style={{ fontSize: '3rem', marginBottom: '8px' }}>{subject.name}</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>Essential Exam Questions</p>
      </header>

      <div style={{ background: 'white', padding: '40px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.5rem' }}>Question Bank</h2>
          <button 
            onClick={() => fileInputRef.current.click()}
            style={{ 
              background: 'var(--secondary-color)', 
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: 'var(--radius-md)',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            + Upload Questions
          </button>
        </div>

        <input 
          type="file" 
          multiple 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileChange}
        />

        <div style={{ minHeight: '200px', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '24px' }}>
          {questions.length > 0 ? (
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {questions.map((item, idx) => (
                <li key={idx} style={{ 
                  marginBottom: '12px', 
                  fontSize: '1rem', 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-primary)',
                  padding: '16px 20px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)'
                }}>
                  <a href={`http://localhost:5000/${item.fileUrl.replace(/\\/g, '/')}`} target="_blank" rel="noreferrer" style={{ 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none',
                    flex: 1,
                    fontWeight: '500',
                    marginRight: '15px'
                  }}>
                    📝 {item.title}
                  </a>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    style={{ 
                      background: '#fee2e2', 
                      border: 'none', 
                      color: '#ef4444', 
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      padding: '8px 16px',
                      borderRadius: '6px'
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px opacity: 0.5' }}>📄</div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem' }}>No questions have been uploaded for this subject yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;
