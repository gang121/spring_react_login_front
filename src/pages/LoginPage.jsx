import { useState } from "react";
import { useNavigate } from "react-router-dom";

// .env로 부터 백엔드 URL 받아오기
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function LoginPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (username === "" || password === "") {
      setError("아이디와 비밀번호를 입력하세요.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) throw new Error("로그인 실패");

      const data = await res.json();
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken);

      navigate("/user");
    } catch {
      setError("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  const handleSocialLogin = (provider) => {
    window.location.href = `${BACKEND_API_BASE_URL}/oauth2/authorization/${provider}`;
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="card-title">로그인</h1>
        <p className="card-subtitle">계정으로 로그인하고 내 정보를 확인해 보세요.</p>

        <form className="form" onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input
              className="form-input"
              type="text"
              placeholder="아이디를 입력하세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              className="form-input"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button className="btn btn-primary" type="submit">
            로그인
          </button>
        </form>

        <div style={{ marginTop: 18, display: "flex", flexDirection: "column", gap: 8 }}>
          <button
            type="button"
            className="btn-social"
            onClick={() => handleSocialLogin("google")}
          >
            <span className="btn-social-label">
              <span>Google로 계속하기</span>
            </span>
            <span className="btn-social-badge">OAuth2</span>
          </button>
          <button
            type="button"
            className="btn-social"
            onClick={() => handleSocialLogin("naver")}
          >
            <span className="btn-social-label">
              <span>Naver로 계속하기</span>
            </span>
            <span className="btn-social-badge">OAuth2</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;