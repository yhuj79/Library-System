import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Item } from "semantic-ui-react";
import Title from "../components/Title";
import BookDetail from "../components/BookDetail";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BookStock from "../components/BookStock";

function BookInfo() {
  const { title } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios({
        url: `http://localhost:8000/book/title`,
        params: { title: title },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
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
  );
}

export default BookInfo;
