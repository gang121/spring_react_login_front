# Frontend - React SPA

이 프로젝트는 Spring Boot 백엔드와 통신하는 React 기반의 Single Page Application(SPA) 프론트엔드입니다.  
회원가입, 로그인/로그아웃, OAuth, 사용자 정보, 게시글 작성/목록, 알림 등 서비스를 제공합니다.

## 주요 기능

- **회원 가입 / 로그인 / 로그아웃**
- **OAuth2.0 로그인(Google 등)**
- **아이디 중복 검사 및 실시간 검증**
- **게시글 작성, 목록, 상세보기 등**
- **마이페이지(내 정보 확인)**
- **알림(Notification) 시스템**
- **JWT 기반 인증/인가**
- **환경변수로 API Endpoint 설정**

## 프로젝트 구조

```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── util/
│   └── App.jsx
├── .env
└── README.md
```

## 환경 변수

- `.env` 파일에 `VITE_BACKEND_API_BASE_URL`을 설정하여 백엔드 서버 주소를 지정할 수 있습니다.

```
VITE_BACKEND_API_BASE_URL=https://your-backend-api-url
```

## 설치 및 실행

```bash
npm install
npm run dev
```

## 프론트엔드와 백엔드 구조 모식도

아래 다이어그램은 프론트엔드와 백엔드 간 상호작용 구조를 단순화한 예시입니다.

```
┌───────────────┐        HTTP/HTTPS         ┌────────────────┐
│   React SPA   │  <-------------------->  │  Spring Boot   │
│ (frontend)    │    RESTful API 호출      │   (backend)    │
└───────────────┘                          └────────────────┘
         │                                         │
   로그인, 회원가입, 게시글 등                DB, 인증, 비즈니스 로직
         │                                         │
```

또는 상세 프로세스 예시:
```
[사용자]
   │
   ▼
[React 프론트엔드]────[API 요청]────→[스프링 부트 백엔드]──→[DB]
   │                     │                                │
   │                     ▼                                │
   ◄─────────────[API 응답]─────────────◄───────────────────┘
```

## 기타 참고

- 인증(로그인/회원가입/정보확인 등) 시 JWT 토큰과 쿠키를 사용합니다.
- API 요청 시 CORS, 인증 등 백엔드 설정이 필요합니다.

자세한 구조나 확장 요청이 있으면 언제든 README를 업데이트 해주세요.