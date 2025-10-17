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
import DreamDashboard from "./pages/DreamDashboard.jsx";
import UserProfile from "./pages/UserProfile";
import FriendsPage from "./pages/FriendsPage";

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

          <Route
            path="/dream-dashboard/analytics"
            element={
              <ProtectedRoute>
                <DreamDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/friends"
            element={
              <ProtectedRoute>
                <FriendsPage />
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
