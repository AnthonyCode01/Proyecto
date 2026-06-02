import { useAdmin } from "../Context/AdminContext.jsx";
import { Navigate } from "react-router-dom";

function AdminGuard({ children }) {
  const { adminLogueado } = useAdmin();
  return adminLogueado ? children : <Navigate to="/admin" replace />;
}

export default AdminGuard;
