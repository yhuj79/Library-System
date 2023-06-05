import React from "react";
import { motion } from "framer-motion";
import RegisterForm from "../components/RegisterForm";
import { Helmet } from "react-helmet-async";

function Register() {
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
          <title>회원가입 | 종합도서관리시스템</title>
        </Helmet>
        <RegisterForm />
      </div>
    </motion.div>
  );
}

export default Register;
