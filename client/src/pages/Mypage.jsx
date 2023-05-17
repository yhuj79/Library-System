import React from "react";
import MyInfoCard from "../components/MyInfoCard";
import Title from "../components/Title";

function Mypage(props) {
  return (
    <div>
      <Title
        title={"내 정보"}
        subTitle={
          "개인정보보호를 위해 공유 PC에서는 반드시 사용 후 로그아웃을 확인하세요."
        }
      />
      <MyInfoCard />
    </div>
  );
}

export default Mypage;
