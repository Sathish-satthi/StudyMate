import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Questions from "./pages/Questions";
import QuestionDetail from "./pages/QuestionDetail";
import SubjectDetail from "./pages/SubjectDetail";
import AdminPanel from "./pages/AdminPanel";
import Timetable from "./pages/Timetable";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
        <Route path="/questions" element={<ProtectedRoute><Questions /></ProtectedRoute>} />
        <Route path="/questions/:id" element={<ProtectedRoute><QuestionDetail /></ProtectedRoute>} />
        <Route path="/subject/:id" element={<ProtectedRoute><SubjectDetail /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPanel /></ProtectedRoute>} />
        <Route path="/timetable" element={<ProtectedRoute><Timetable /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
