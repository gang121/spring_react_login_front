import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  return (
    <div className="page page-center">
      <section className="hero-card">
        <h1 className="hero-title">간단하고 깔끔한 로그인 데모</h1>
        <p className="hero-subtitle">
          Spring Boot 백엔드와 React 프론트엔드로 구성된 로그인/회원가입 예제입니다.
        </p>

        <div className="hero-actions">
          {!isLoggedIn ? (
            <>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                지금 로그인하기
              </button>
              <button
                className="btn btn-outline"
                onClick={() => navigate("/join")}
              >
                회원가입 하러 가기
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/user")}
              >
                내 정보 보러가기
              </button>
            </>
          )}
        </div>

        <div className="hero-meta">
          <span>JWT · 소셜 로그인 · 토큰 리프레시</span>
        </div>
      </section>
    </div>
  );
}

export default HomePage;

