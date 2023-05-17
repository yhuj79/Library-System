import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "semantic-ui-css/semantic.min.css";
import axios from "axios";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Gnb from "./components/Gnb";
import Register from "./pages/Register";

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
            console.log(res.data);
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
      <Header isLogin={isLogin} user={user} />
      <Gnb />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isLogin ? <Login /> : <Navigate replace to="/" />}
        />
        <Route
          path="/register"
          element={!isLogin ? <Register /> : <Navigate replace to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
