import { Navigate, Outlet } from "react-router-dom";


export default function ProtectedRoute({ adminOnly = false }) {
  const user = JSON.parse(localStorage.getItem("user")) || null;

  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

 
  return <Outlet />;
}
