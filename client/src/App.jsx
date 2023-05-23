import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Helmet } from "react-helmet-async";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Gnb from "./components/Gnb";
import Register from "./pages/Register";
import Mypage from "./pages/Mypage";
import MypageUpdate from "./pages/MypageUpdate";
import BookListNew from "./pages/BookListNew";
import BookListPopular from "./pages/BookListPopular";
import BookInfo from "./pages/BookInfo";
import AdminBookNew from "./pages/AdminBookNew";
import ApiTest from "./pages/ApiTest";
import AdminUser from "./pages/AdminUser";
import AdminBook from "./pages/AdminBook";
import NotFound from "./pages/NotFound";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["userID"]);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/auth/authentication`,
        params: { userID: jwtDecode(cookies.token).userID },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          if (res) {
            setIsLogin(true);
            setUser(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [cookies.token]);

  return (
    <Router>
      <Helmet>
        <title>종합도서관리시스템</title>
      </Helmet>
      <Header isLogin={isLogin} user={user[0]} />
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/apitest" element={<ApiTest />} />
        <Route
          path="/login"
          element={!isLogin ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/register"
          element={!isLogin ? <Register /> : <Navigate replace to="/" />}
        />
        <Route
          path="/mypage"
          element={isLogin ? <Mypage /> : <Navigate replace to="/" />}
        />
        <Route
          path="/mypage/update"
          element={isLogin ? <MypageUpdate /> : <Navigate replace to="/" />}
        />
        <Route path="/book/list/new" element={<BookListNew />} />
        <Route path="/book/list/popular" element={<BookListPopular />} />
        <Route path="/book/:title" element={<BookInfo />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/book" element={<AdminBook />} />
        <Route path="/admin/book/new" element={<AdminBookNew />} />

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
