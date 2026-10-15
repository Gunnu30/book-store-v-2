import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";

const ProtectedRoutes = () =>{
  const location_Obj = useLocation();
  const navigate = useNavigate();
  const {user,role} = useSelector(state => state.user)

  if(!user || role == 'admin')return <Navigate to="/login" state={{from : location_Obj}} replace />
  
  
  return <Outlet/>

  
}


export default ProtectedRoutes;