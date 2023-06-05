import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Input, Item, Tab } from "semantic-ui-react";
import Title from "../components/Title";
import BookCard from "../components/BookCard";
import { Helmet } from "react-helmet-async";
import Loading from "../components/Loading";

function BookList() {
  const navigate = useNavigate();
  const [dataAll, setDataAll] = useState([]);
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/book/list/new`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setDataAll(res.data);
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

  useEffect(() => {
    if (searchValue.length > 0) {
      setData(dataAll.filter((item) => item.title.includes(searchValue)));
    } else {
      setData(dataAll);
    }
  }, [dataAll, searchValue]);

  const panes = [
    {
      menuItem: "최근 출판 순",
      render: () => (
        <Tab.Pane>
          <Item.Group divided>
            <Input
              icon="search"
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              placeholder="도서명을 입력하세요"
            />
            <br />
            <br />
            {JSON.stringify(data) !== "[]" &&
              data.map((data, index) => {
                return <BookCard data={data} key={index} />;
              })}
            <br />
          </Item.Group>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "인기 많은 순",
      render: () => navigate("/book/list/popular"),
    },
  ];

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
            <title>도서 목록 | 종합도서관리시스템</title>
          </Helmet>
          <Title title={"도서 목록"} />
          <Tab panes={panes} defaultActiveIndex={0} />
        </Container>
      </motion.div>
    );
  }
}

export default BookList;
