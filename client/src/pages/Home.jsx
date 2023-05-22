import React, { useEffect, useState } from "react";
import Slide from "../components/Slide";
import { Container } from "semantic-ui-react";
import axios from "axios";
import BookThumb from "../components/BookThumb";
import Title from "../components/Title";

function Home() {
  const [popularData, setPopularData] = useState([]);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    PopularDataHandler();
    NewDataHandler();
  }, []);

  function PopularDataHandler() {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/book/list/popular`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setPopularData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  function NewDataHandler() {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/book/list/new`,
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setNewData(res.data);
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
      <Slide />
      <Title title={"인기 도서"} button={"popular"} />
      {popularData && <BookThumb data={popularData} />}
      <Title title={"신규 도서"} button={"new"} />
      {newData && <BookThumb data={newData} />}
    </Container>
  );
}

export default Home;
