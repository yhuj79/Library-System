import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Button, Container } from "semantic-ui-react";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import BoardList from "../components/BoardList";
import axios from "axios";
import Loading from "../components/Loading";

function Board() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/board/list`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setData(res.data);
          setLoad(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }, []);

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
            <title>도서 신청 게시판 | 종합도서관리시스템</title>
          </Helmet>
          <Title title={"이용자 서비스"} subTitle={"도서 신청 게시판"} />
          <Button
            floated="right"
            onClick={() => navigate(`/board/new`)}
            content="신청"
            icon="plus"
            labelPosition="right"
            positive
          />
          <br />
          <br />
          {data && <BoardList data={data} />}
        </Container>
      </motion.div>
    );
  }
}

export default Board;
