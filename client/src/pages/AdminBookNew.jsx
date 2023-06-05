import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import BookForm from "../components/BookForm";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import { Container } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import Loading from "../components/Loading";

function AdminBookNew() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["userID"]);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/admin/access`,
        params: { admin: jwtDecode(cookies.token).admin.data },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          if (res.status === 200) {
            setAdmin(true);
            setLoad(false);
          }
        })
        .catch((err) => {
          console.log(err);
          window.location.replace("/");
        });
    } catch (err) {
      console.log(err);
      setLoad(false);
    }
  }, [cookies.token]);

  if (admin) {
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
        </motion.div>
      );
    }
  } else {
    navigate("/");
  }
}

export default AdminBookNew;
