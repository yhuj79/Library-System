import React from "react";
import LoginInput from "../components/LoginInput";
import Title from "../components/Title";

function Login() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Title
        title={"종합도서관리시스템에 오신 것을 환영합니다."}
        subTitle={
          "이용자 로그인을 하시면 보다 많은 서비스를 이용하실 수 있습니다."
        }
      />
      <LoginInput />
    </div>
  );
}

export default Login;
