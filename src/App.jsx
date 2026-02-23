import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import JoinPage from "./pages/JoinPage";
import LoginPage from "./pages/LoginPage";
import CookiePage from "./pages/CookiePage";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";

import "./App.css";

const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function Layout({ children, theme, toggleTheme, onLogout }) {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <div className="logo" onClick={handleLogoClick}>
          <span className="logo-mark">SR</span>
          <span className="logo-text">Spring React Login</span>
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-link">
            메인
          </Link>
          {!isLoggedIn && (
            <>
              <Link to="/login" className="nav-link">
                로그인
              </Link>
              <Link to="/join" className="nav-link">
                회원가입
              </Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <Link to="/user" className="nav-link">
                내 정보
              </Link>
              <button className="nav-button" onClick={onLogout}>
                로그아웃
              </button>
            </>
          )}
        </nav>

        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? "🌙 다크" : "☀️ 라이트"}
        </button>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <span>© {new Date().getFullYear()} Spring React Login</span>
      </footer>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved === "dark" ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleLogout = async () => {
    try {
      await fetch(`${BACKEND_API_BASE_URL}/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch {
      // ignore backend error
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }
  };

  return (
    <BrowserRouter>
      <Layout theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/join" element={<JoinPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/cookie" element={<CookiePage />} />
          <Route path="/user" element={<UserPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
