import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Container } from "semantic-ui-react";
import Title from "../components/Title";
import BoardForm from "../components/BoardForm";
import { useCookies } from "react-cookie";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Loading from "../components/Loading";

function BoardNew() {
  const [authData, setAuthData] = useState([]);
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
            <title>도서 신청 작성 | 종합도서관리시스템</title>
          </Helmet>
          <Title title={"이용자 서비스"} subTitle={"도서 신청 작성"} />
          <BoardForm data={authData} />
        </Container>
      </motion.div>
    );
  }
}

export default BoardNew;
