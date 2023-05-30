// 필요한 모듈을 가져옵니다.
const express = require("express"); // Express 웹 프레임워크
const dotenv = require("dotenv"); // 환경 변수를 로드하기 위한 모듈
const cookieParser = require("cookie-parser"); // 쿠키 파싱을 위한 모듈
const cors = require("cors"); // CORS 관련 처리를 위한 모듈

// .env 파일에서 환경 변수를 로드합니다.
dotenv.config();

// Express 애플리케이션을 생성합니다.
const app = express();

// JSON 데이터 파싱을 위한 미들웨어를 사용합니다.
app.use(express.json());

// 쿠키 파싱을 위한 미들웨어를 사용합니다.
app.use(cookieParser());

// CORS 설정을 위한 미들웨어를 사용합니다.
app.use(
  cors({
    // 요청을 허용할 도메인
    // origin: "http://localhost:3000", // 로컬 테스트 때 사용
    origin: "https://libsystem.vercel.app", // Vercel 배포한 도메인
    methods: ["GET", "POST"], // 허용할 HTTP 메서드
    credentials: true, // 쿠키를 주고받을 수 있도록 허용
  })
);

// "/auth" 경로에 대한 라우팅을 처리하는 모듈을 가져옵니다.
const auth = require("./auth");
// "/auth" 경로로 요청이 들어오면 auth 모듈을 사용합니다.
// 사용자 정보의 검증, mypage 정보 관련 API
app.use("/auth", auth);

// 도서 정보 API
const book = require("./book");
app.use("/book", book);

// 관리자 페이지에서 사용되는 API
const admin = require("./admin");
app.use("/admin", admin);

// 도서 신청 페이지에서 사용되는 API
const board = require("./board");
app.use("/board", board);

// 서버를 지정된 포트에서 실행하고 대기합니다.
app.listen(process.env.PORT, () => {
  console.log(`Server is on ${process.env.PORT}`);
});
