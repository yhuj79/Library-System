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
import BookList from "./pages/BookList";
import BookInfo from "./pages/BookInfo";
import AdminBookNew from "./pages/AdminBookNew";
import ApiTest from "./pages/ApiTest";
import AdminUser from "./pages/AdminUser";
import AdminBook from "./pages/AdminBook";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8000/auth/login/success",
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
  }, []);

  return (
    <Router>
      <Helmet>
        <title>종합도서관리시스템</title>
      </Helmet>
      <Header isLogin={isLogin} user={user} />
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
        <Route path="/book/list" element={<BookList />} />
        <Route path="/book/:title" element={<BookInfo />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/admin/book" element={<AdminBook />} />
        <Route path="/admin/book/new" element={<AdminBookNew />} />
      </Routes>
    </Router>
  );
}

export default App;
