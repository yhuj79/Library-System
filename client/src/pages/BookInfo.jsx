import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Container, Item } from "semantic-ui-react";
import Title from "../components/Title";
import BookDetail from "../components/BookDetail";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BookStock from "../components/BookStock";
import Loading from "../components/Loading";

function BookInfo() {
  const { title } = useParams();
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/book/title`,
        params: { title: title },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <title>
              {data[0] ? data[0].title : "도서 정보"} | 종합도서관리시스템
            </title>
          </Helmet>
          <Title title={"도서 정보"} />
          {JSON.stringify(data) !== "[]" && (
            <Item.Group divided>
              <BookDetail data={data[0]} />
              <BookStock data={data} />
            </Item.Group>
          )}
        </Container>
      </motion.div>
    );
  }
}

export default BookInfo;
