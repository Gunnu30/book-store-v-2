import "./App.css";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components"; // 1. Added ThemeProvider import
import useAuthHydration from './services/authServices';

import { GlobalStyle } from "./GlobalStyle";
import Navbar from "./components/Navbar";
import './global.css';

// Route Guards
import ProtectedRoutes from "./services/ProtectedRoutes";
import PublicRoutes from "./services/PublicRoutes";

// Pages
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Category from "./pages/Category";
import Books from './pages/Books';
import BookItems from "./pages/BookItems";
import Cart from './pages/Cart';
import CheckOut from "./pages/CheckOut";

// 2. Added the theme definitions
const darkTheme = {
  background: "#0F1C3F",
  text: "#ffffff",
  textSecondary: "#E0E0E0"
};

const lightTheme = {
  background: "#ffffff",
  text: "#000000",
  textSecondary: "#373737"
};

const NavbarLayout = () => (
  <div className="main-container ">
    <div className="nav-container w-full"> {/* Fixed the 'nav-g-container' typo */}
      <Navbar />
    </div>
    <div className="w-[100vw]">
      <Outlet />
    </div>
  </div>
);

function App() {
  // 3. Get theme state from Redux
  const themeMode = useSelector((state) => state.theme?.theme);
  const currentTheme = themeMode === 'dark' ? darkTheme : lightTheme;

  const { isLoading } = useAuthHydration();

  if (isLoading) {
    return <div className="loading-screen">Check Authentication...</div>
  }

  return (
    // 4. Wrapped EVERYTHING inside ThemeProvider so GlobalStyle can see the variables
    <ThemeProvider theme={currentTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route element={<NavbarLayout />}>
            <Route element={<ProtectedRoutes />}>
              <Route path="/" element={<Home />} />
              <Route path="/category" element={<Category />} />
              <Route path="/books" element={<Books />} />
              <Route path="/:title" element={<BookItems />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckOut />} />
            </Route>
          </Route>

          <Route element={<PublicRoutes />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;