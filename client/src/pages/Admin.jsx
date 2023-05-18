import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import UserChart from "../components/UserChart";
import BookChart from "../components/BookChart";
import { Button, Container, Input, Tab } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";
import styles from "../style/Chart.module.css";

function Admin() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8000/admin/access",
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            setAdmin(true);
          }
        })
        .catch((err) => {
          console.err(err);
        });
    } catch (err) {
      console.err(err);
    }
  }, []);

  const panes = [
    {
      menuItem: "유저 정보",
      render: () => (
        <Tab.Pane>
          <UserChart />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "도서 정보",
      render: () => (
        <Tab.Pane>
          <Input
            icon="search"
            type="number"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="식별번호를 입력하세요"
          />
          <Button
            className={styles.chartButtonPC}
            floated="right"
            onClick={() => navigate(`/admin/book/new`)}
            content="도서 추가"
            icon="plus"
            labelPosition="right"
            positive
          />
          <Button
            className={styles.chartButtonMobile}
            floated="right"
            onClick={() => navigate(`/admin/book/new`)}
            icon="plus"
            positive
          />
          <BookChart searchValue={searchValue} />
        </Tab.Pane>
      ),
    },
  ];

  if (admin) {
    return (
      <Container style={{ paddingBottom: "50px" }}>
        <Helmet>
          <title>관리자 페이지 | 종합도서관리시스템</title>
        </Helmet>
        <Title title={"관리자 페이지"} />
        <Tab panes={panes} />
      </Container>
    );
  } else {
    navigate("/");
  }
}

export default Admin;
