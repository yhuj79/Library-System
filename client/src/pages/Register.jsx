import React from "react";
import RegisterForm from "../components/RegisterForm";
import { Helmet } from "react-helmet-async";

function Register() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Helmet>
        <title>회원가입 | 종합도서관리시스템</title>
      </Helmet>
      <RegisterForm />
    </div>
  );
}

export default Register;
