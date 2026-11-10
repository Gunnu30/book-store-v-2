import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuthHydration from './services/authServices';

import { GlobalStyle } from "./GlobalStyle";
import './global.css';

// Route Guards
import ProtectedRoutes from "./services/ProtectedRoutes";
import PublicRoutes from "./services/PublicRoutes";

// Non-lazy components needed immediately or for layout shells
import AdminNavbar from './components/AdminNavbar';

// Lazy-loaded Pages
const LoginAdmin = lazy(() => import("./pages/Login"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const Operations = lazy(() => import("./pages/Operations"));
const AdminAddBook = lazy(() => import("./pages/AdminAddBook"));
const AdminBooks = lazy(() => import("./pages/AdminBooks"));

const AdminLayOut = () => (
  <div className="main-container">
    <div className="nav-g-container">
      <AdminNavbar />
    </div>
    <div>
      <Outlet />
    </div>
  </div>
);

function App() {
  const theme = useSelector((state) => state.theme.theme);
  const bgTheme = theme === 'dark' ? '#0F1C3F' : '#ffffff';

  const { isLoading } = useAuthHydration();
  if (isLoading) {
    return <div className="loading-screen">Check Authentication...</div>;
  }

  return (
    <Router>
      <GlobalStyle bgTheme={bgTheme} />
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
        <Routes>
          <Route path="/admin/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<Navigate to="/admin/login" />} />
          <Route path="/" element={<Navigate to="/admin/login" />} />
          
          <Route element={<PublicRoutes />}>
            <Route path="/admin/login" element={<LoginAdmin />} />
            <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          </Route>
          
          <Route element={<ProtectedRoutes />}>
            <Route element={<AdminLayOut />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/operations" element={<Operations />} />
              <Route path="/admin/add-book" element={<AdminAddBook />} />
              <Route path="/admin/books" element={<AdminBooks />} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;