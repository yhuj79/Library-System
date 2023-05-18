import React from "react";
import MyInfoCard from "../components/MyInfoCard";
import Title from "../components/Title";
import { Container } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";

function Mypage(props) {
  return (
    <Container style={{ paddingBottom: "50px" }}>
      <Helmet>
        <title>내 정보 | 종합도서관리시스템</title>
      </Helmet>
      <Title
        title={"내 정보"}
        subTitle={
          "개인정보보호를 위해 공유 PC에서는 반드시 사용 후 로그아웃을 확인하세요."
        }
      />
      <MyInfoCard />
    </Container>
  );
}

export default Mypage;
