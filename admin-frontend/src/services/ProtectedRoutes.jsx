import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = () => {
  const { user, role } = useSelector((state) => state.user);
  
  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }


  return <Outlet />;
};

export default ProtectedRoutes;