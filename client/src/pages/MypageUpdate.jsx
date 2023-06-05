import React from "react";
import { motion } from "framer-motion";
import MyInfoUpdate from "../components/MyInfoUpdate";
import { Helmet } from "react-helmet-async";

function MypageUpdate() {
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
          <title>정보 수정 | 종합도서관리시스템</title>
        </Helmet>
        <MyInfoUpdate />
      </div>
    </motion.div>
  );
}

export default MypageUpdate;
