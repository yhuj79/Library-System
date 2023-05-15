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
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const auth = require("./auth");
app.use("/auth", auth);

app.listen(process.env.PORT, () => {
  console.log(`server is on ${process.env.PORT}`);
});
