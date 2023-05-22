const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true, // 출처 허용
    credential: true, // 사용자 인증이 필요한 리소스 접근
  })
);

const auth = require("./auth");
app.use("/auth", auth);

const book = require("./book");
app.use("/book", book);

const admin = require("./admin");
app.use("/admin", admin);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
