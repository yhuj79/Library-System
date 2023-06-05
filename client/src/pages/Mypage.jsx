import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import MyInfoCard from "../components/MyInfoCard";
import Title from "../components/Title";
import { Container, Header, Segment } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import MyInfoChart from "../components/MyInfoChart";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import BoardList from "../components/BoardList";
import Loading from "../components/Loading";

function Mypage() {
  const [authData, setAuthData] = useState([]);
  const [boardData, setBoardData] = useState([]);
  const [lentListData, setLentListData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["userID"]);
  const [load, setLoad] = useState(true);

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
          BoardListHandler(res.data[0].userID);
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

  function BoardListHandler(userID) {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/auth/mypage/list/board`,
        params: { userID: userID },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setBoardData(res.data);
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }

  if (load) {
    return <Loading />;
  } else {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
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
          <MyInfoCard data={authData} />
          <Header>대출 내역</Header>
          {lentListData.length > 0 ? (
            <MyInfoChart data={lentListData} />
          ) : (
            <Segment>대출 내역이 존재하지 않습니다.</Segment>
          )}
          <Header>도서 신청글 목록</Header>
          {boardData.length > 0 ? (
            <BoardList data={boardData} />
          ) : (
            <Segment>도서 신청글이 존재하지 않습니다.</Segment>
          )}
        </Container>
      </motion.div>
    );
  }
}

export default Mypage;
