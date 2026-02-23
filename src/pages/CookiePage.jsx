import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

// .env로 부터 백엔드 URL 받아오기
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function CookiePage() {
  const navigate = useNavigate();

  // 페이지 접근시 (백엔드에서 리디렉션으로 여기로 보내면, 실행)
  useEffect(() => {
    const cookieToBody = async () => {
      try {
        const res = await fetch(`${BACKEND_API_BASE_URL}/jwt/exchange`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!res.ok) throw new Error("인증 실패");

        const data = await res.json();
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        navigate("/");
      } catch {
        alert("소셜 로그인 실패");
        navigate("/login");
      }
    };

    cookieToBody();
  }, [navigate]);

  return (
    <div className="page">
      <div className="card">
        <h1 className="card-title">소셜 로그인 처리중</h1>
        <p className="card-subtitle">
          잠시만 기다려 주세요. 인증 정보를 확인하고 토큰을 발급받는 중입니다.
        </p>
      </div>
    </div>
  );
}

export default CookiePage;