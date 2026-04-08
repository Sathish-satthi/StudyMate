import { useState, useEffect } from "react";
import axios from "axios";

function Timetable() {
  const [timetable, setTimetable] = useState(null);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const userEmail = localStorage.getItem("userEmail");
  const token = localStorage.getItem("userToken");
  const isAdmin = userEmail === "sathishsatthisatthi@gmail.com";

  useEffect(() => {
    fetchTimetable();
  }, []);

  const fetchTimetable = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/notes/general/none/timetable");
      // Pick the latest one
      if (res.data.length > 0) {
        setTimetable(res.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch timetable");
    }
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", "4th Sem Timetable");
    formData.append("subject", "general");
    formData.append("module", "none");
    formData.append("type", "timetable");

    try {
      // If a timetable already exists, delete it first to ensure "Only one file enough"
      if (timetable) {
        await axios.delete(`http://localhost:5000/api/notes/${timetable._id}`, {
          headers: { "x-auth-token": token }
        });
      }

      await axios.post("http://localhost:5000/api/notes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-auth-token": token
        }
      });
      setFile(null);
      fetchTimetable();
      alert("Timetable uploaded successfully!");
    } catch (err) {
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete the current timetable?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/notes/${timetable._id}`, {
        headers: { "x-auth-token": token }
      });
      setTimetable(null);
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div className="container fade-in" style={{ padding: '60px 20px' }}>
      <header style={{ marginBottom: '48px', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '16px' }}>4th Sem Timetable 📅</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.25rem' }}>View the official exam schedule for the current semester.</p>
      </header>

      {isAdmin && (
        <div style={{ background: 'white', padding: '32px', borderRadius: '20px', border: '2px dashed var(--primary-color)', marginBottom: '48px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Update Timetable Document 🛠️</h2>
          <form onSubmit={handleUpload} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <input 
              type="file" 
              onChange={(e) => setFile(e.target.files[0])}
              style={{ padding: '10px', border: '1px solid var(--border-color)', borderRadius: '8px', maxWidth: '300px' }}
            />
            <button type="submit" disabled={uploading}>
              {uploading ? "Uploading..." : "Upload Timetable (Image/PDF)"}
            </button>
          </form>
        </div>
      )}

      <div style={{ 
        background: 'white', 
        padding: '24px', 
        borderRadius: '24px', 
        border: '1px solid var(--border-color)', 
        boxShadow: 'var(--shadow-lg)',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {timetable ? (
          <div style={{ width: '100%', textAlign: 'center' }}>
            <div style={{ marginBottom: '24px' }}>
              <a 
                href={`http://localhost:5000${timetable.fileUrl}`} 
                target="_blank" 
                rel="noreferrer"
                className="btn-login"
                style={{ display: 'inline-flex', padding: '12px 24px', textDecoration: 'none' }}
              >
                📥 Download Timetable
              </a>
              {isAdmin && (
                <button 
                  onClick={handleDelete}
                  style={{ marginLeft: '16px', background: '#fee2e2', color: '#ef4444', padding: '12px 24px' }}
                >
                  Delete Current
                </button>
              )}
            </div>
            
            {/* Display if image */}
            {timetable.fileUrl.match(/\.(jpeg|jpg|gif|png)$/) ? (
              <img 
                src={`http://localhost:5000${timetable.fileUrl}`} 
                alt="Timetable" 
                style={{ maxWidth: '100%', borderRadius: '12px', border: '2px solid #f1f5f9' }}
              />
            ) : (
              <div style={{ padding: '60px', background: '#f8fafc', borderRadius: '16px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📄</div>
                <h3 style={{ marginBottom: '8px' }}>Timetable Document (PDF)</h3>
                <p style={{ color: 'var(--text-secondary)' }}>Click the button above to view or download the file.</p>
              </div>
            )}
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>⏳</div>
            <p style={{ fontSize: '1.25rem' }}>No timetable has been uploaded yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Timetable;
