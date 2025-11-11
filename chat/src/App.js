// ...existing code...
import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup";
import VerifyOTP from "./pages/VerifyOtp";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
// ...existing code...

const HomeRedirect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;
  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomeRedirect />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/verify-otp" element={<VerifyOTP />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<div>Page not found</div>} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
// ...existing code...