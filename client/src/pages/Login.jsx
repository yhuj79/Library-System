import React from "react";
import { motion } from "framer-motion";
import LoginForm from "../components/LoginForm";
import Title from "../components/Title";
import { Helmet } from "react-helmet-async";

function Login() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Helmet>
          <title>로그인 | 종합도서관리시스템</title>
        </Helmet>
        <Title
          title={"종합도서관리시스템에 오신 것을 환영합니다."}
          subTitle={
            "이용자 로그인을 하시면 보다 많은 서비스를 이용하실 수 있습니다."
          }
        />
        <LoginForm />
      </div>
    </motion.div>
  );
}

export default Login;
