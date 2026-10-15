import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoutes = () => {
    const location = useLocation();
   const {user , role} = useSelector(state => state.user);
   


   if(user && role === 'user')return  <Navigate to ="/" replace />


   return <Outlet/>
};

export default PublicRoutes;