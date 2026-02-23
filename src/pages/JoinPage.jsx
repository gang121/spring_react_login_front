import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// .env로 부터 백엔드 URL 받아오기
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function JoinPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(null); // null: 검사 전, true: 사용 가능, false: 중복
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  // username 입력창 변경 이벤트
  useEffect(() => {
    const checkUsername = async () => {
      if (username.length < 4) {
        setIsUsernameValid(false);
        return;
      }

      try {
        const res = await fetch(`${BACKEND_API_BASE_URL}/user/exist`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ username }),
        });

        if (!res.ok) throw new Error("username 중복 확인 실패");
        const exists = await res.json();
        setIsUsernameValid(!exists);
      } catch {
        setIsUsernameValid(null);
      }
    };

    const delay = setTimeout(checkUsername, 300);
    return () => clearTimeout(delay);
  }, [username]);

  const handleSingUp = async (e) => {
    e.preventDefault();
    setError("");

    if (
      username.length < 4 ||
      password.length < 4 ||
      nickname.trim() === "" ||
      email.trim() === ""
    ) {
      setError("입력값을 다시 확인해주세요.");
      return;
    }

    try {
      const res = await fetch(`${BACKEND_API_BASE_URL}/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password, nickname, email }),
      });

      if (!res.ok) throw new Error("회원가입 실패");
      navigate("/login");
    } catch {
      setError("회원가입 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="card-title">회원 가입</h1>
        <p className="card-subtitle">새 계정을 만들고 서비스를 시작해 보세요.</p>

        <form className="form" onSubmit={handleSingUp}>
          <div className="form-group">
            <label className="form-label">아이디</label>
            <input
              className="form-input"
              type="text"
              placeholder="아이디 (4자 이상)"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={4}
            />
            {username.length >= 4 && isUsernameValid === false && (
              <p className="helper-text error">이미 존재하는 아이디입니다.</p>
            )}
            {username.length >= 4 && isUsernameValid === true && (
              <p className="helper-text success">사용 가능한 아이디입니다.</p>
            )}
          </div>

          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              className="form-input"
              type="password"
              placeholder="비밀번호 (4자 이상)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={4}
            />
          </div>

          <div className="form-group">
            <label className="form-label">닉네임</label>
            <input
              className="form-input"
              type="text"
              placeholder="닉네임"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">이메일</label>
            <input
              className="form-input"
              type="email"
              placeholder="이메일 주소"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-text">{error}</p>}

          <button
            className="btn btn-primary"
            type="submit"
            disabled={isUsernameValid !== true}
          >
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default JoinPage;