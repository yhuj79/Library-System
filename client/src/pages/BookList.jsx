import { useState, useEffect } from "react";
import axios from "axios";
import { Container, Item } from "semantic-ui-react";
import Title from "../components/Title";
import BookCard from "../components/BookCard";
import { Helmet } from "react-helmet-async";

function BookList() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8000/book/list",
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
  }, []);

  return (
    <Container style={{ paddingBottom: "50px" }}>
      <Helmet>
        <title>도서 목록 | 종합도서관리시스템</title>
      </Helmet>
      <Title title={"도서 목록"} />
      <Item.Group divided>
        {JSON.stringify(data) !== "[]" &&
          data.map((data, index) => {
            return <BookCard data={data} key={index} />;
          })}
      </Item.Group>
    </Container>
  );
}

export default BookList;
