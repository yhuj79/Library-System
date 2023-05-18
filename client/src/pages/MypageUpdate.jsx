import React from "react";
import MyInfoUpdate from "../components/MyInfoUpdate";
import { Helmet } from "react-helmet-async";

function MypageUpdate() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Helmet>
        <title>정보 수정 | 종합도서관리시스템</title>
      </Helmet>
      <MyInfoUpdate />
    </div>
  );
}

export default MypageUpdate;
