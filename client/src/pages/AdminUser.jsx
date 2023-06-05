import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import UserChart from "../components/UserChart";
import { Container, Input, Tab } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import Loading from "../components/Loading";

function AdminUser() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(false);
  const [searchValue, setSearchValue] = useState("");
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
          }
        })
        .catch((err) => {
          console.log(err);
          window.location.replace("/");
        });
    } catch (err) {
      console.log(err);
    }
  }, [cookies.token]);

  const panes = [
    {
      menuItem: "유저 정보",
      render: () => (
        <Tab.Pane>
          <Input
            icon="search"
            type="text"
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            placeholder="이름을 입력하세요"
          />
          <UserChart searchValue={searchValue} setLoad={setLoad} />
        </Tab.Pane>
      ),
    },
    {
      menuItem: "도서 정보",
      render: () => navigate("/admin/book"),
    },
  ];

  if (load) {
    return <Loading />;
  } else {
    if (admin) {
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Container style={{ paddingBottom: "50px" }}>
            <Helmet>
              <title>관리자 페이지 | 종합도서관리시스템</title>
            </Helmet>
            <Title title={"관리자 페이지"} />
            <Tab panes={panes} defaultActiveIndex={0} />
          </Container>
        </motion.div>
      );
    } else {
      navigate("/");
    }
  }
}

export default AdminUser;
