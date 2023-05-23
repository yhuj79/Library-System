import React, { useEffect, useState } from "react";
import MyInfoCard from "../components/MyInfoCard";
import Title from "../components/Title";
import { Container } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import MyInfoChart from "../components/MyInfoChart";
import styles from "../style/Mypage.module.css";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

function Mypage() {
  const [authData, setAuthData] = useState([]);
  const [lentListData, setLentListData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["userID"]);

  useEffect(() => {
    AuthHandler();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function AuthHandler() {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/auth/authentication`,
        params: { userID: jwtDecode(cookies.token).userID },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setAuthData(res.data[0]);
          LentListHandler(res.data[0].userID);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function LentListHandler(userID) {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/auth/mypage/list/lent`,
        params: { userID: userID },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setLentListData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

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
      <div className={styles.wrap}>
        <MyInfoCard data={authData} />
        {lentListData.length > 0 && <MyInfoChart data={lentListData} />}
      </div>
    </Container>
  );
}

export default Mypage;
