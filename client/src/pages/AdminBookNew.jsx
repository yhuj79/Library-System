import { useState, useEffect } from "react";
import axios from "axios";
import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { Container } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";

function AdminBookNew() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
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

  if (admin) {
    return (
      <Container style={{ paddingBottom: "50px" }}>
        <Helmet>
          <title>도서 추가 | 종합도서관리시스템</title>
        </Helmet>
        <Title
          title={"도서 추가"}
          subTitle={
            "저장하기 전에 입력한 값이 정확한지 다시 한번 확인해 주세요."
          }
        />
        <BookForm />
      </Container>
    );
  } else {
    navigate("/");
  }
}

export default AdminBookNew;
