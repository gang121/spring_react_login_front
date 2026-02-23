import { useEffect, useState } from "react";
import { fetchWithAccess } from "../util/fetchUtil";

// .env로 부터 백엔드 URL 받아오기
const BACKEND_API_BASE_URL = import.meta.env.VITE_BACKEND_API_BASE_URL;

function UserPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState("");

  // 페이지 방문시 유저 정보 요청
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const res = await fetchWithAccess(`${BACKEND_API_BASE_URL}/user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("유저 정보 불러오기 실패");

        const data = await res.json();
        setUserInfo(data);
      } catch {
        setError("유저 정보를 불러오지 못했습니다.");
      }
    };

    loadUserInfo();
  }, []);

  return (
    <div className="page">
      <div className="card">
        <h1 className="card-title">내 정보</h1>
        <p className="card-subtitle">로그인된 사용자의 기본 정보를 확인합니다.</p>

        {error && <p className="error-text">{error}</p>}

        {!userInfo && !error && <p className="loading-text">내 정보를 불러오는 중입니다...</p>}

        {userInfo && (
          <div className="user-info">
            <span>
              <strong>아이디</strong> : {userInfo.username}
            </span>
            <span>
              <strong>닉네임</strong> : {userInfo.nickname}
            </span>
            <span>
              <strong>이메일</strong> : {userInfo.email}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserPage;