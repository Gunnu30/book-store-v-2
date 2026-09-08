import "./App.css";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthHydration from './services/authServices';

import { GlobalStyle } from "./GlobalStyle";
import './global.css';

// Route Guards
import ProtectedRoutes from "./services/ProtectedRoutes";
import PublicRoutes from "./services/PublicRoutes";

// Pages & Components
import AdminNavbar from './components/AdminNavbar';
import RegisterAdmin from "./pages/Register";
import LoginAdmin from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import Operations from "./pages/Operations";
import AdminAddBook from "./pages/AdminAddBook";

const AdminLayOut = () =>(
  <div className="main-container">
    <div className="nav-g-container">
      <AdminNavbar />
    </div>
    <div>
      <Outlet/>
    </div>
  </div>
)

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const bgTheme = theme === 'dark' ? '#0F1C3F' : '#ffffff';

  const {isLoading} = useAuthHydration();
  if(isLoading){
    return <div className="loading-screen">Check Authentication...</div>
  }
  return (
    <Router>
      <GlobalStyle bgTheme={bgTheme} />
      <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />

          <Route path="/admin/login" element={<LoginAdmin />} />
          <Route path="/admin/register" element={<RegisterAdmin />} />
          <Route element={<AdminLayOut/>}>
            <Route path="/admin/dashboard" element={<AdminDashboard/>}></Route>
            <Route path="/admin/operations" element={<Operations/>}></Route>
            <Route path="/admin/add-book" element={<AdminAddBook/>}></Route>
          </Route>

      
      </Routes>
    </Router>
  );
}

export default App;
