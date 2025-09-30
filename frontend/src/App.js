import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";

import { AuthProvider } from "./contexts/AuthContext";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DreamEntry from "./pages/DreamEntry";
import DreamDetails from "./pages/DreamDetails";

import ProtectedRoute from "./components/ProtectedRoute";

//! To run the backend for DEVELOPMENT -> npm start
//! To run the backend for PRODUCTION -> npm run build

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dream/new"
            element={
              <ProtectedRoute>
                <DreamEntry />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dream/:id"
            element={
              <ProtectedRoute>
                <DreamDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
      <ToastContainer />
      <Toaster />
    </AuthProvider>
  );
}

export default App;
