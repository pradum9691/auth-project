import { Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Verify from "./pages/Verify";
import Profile from "./pages/Profile";

const PrivateRoute = ({ children }) => {
  return localStorage.getItem("token") ? children : <Navigate to="/" />;
};
const PublicRoute = ({ children }) => {
  return localStorage.getItem("token") ? <Navigate to="/profile" /> : children;
};

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="/verify/:token" element={<Verify />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
      <Route
        path="*"
        element={
          localStorage.getItem("token") ? (
            <Navigate to="/profile" />
          ) : (
            <Navigate to="/" />
          )
        }
      />
    </Routes>
  );
}
