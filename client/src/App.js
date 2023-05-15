import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Login from "./components/Login";
import { useEffect, useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState({});

  const logout = () => {
    axios({
      url: "http://localhost:8000/auth/logout",
      method: "POST",
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  const test = () => {
    axios({
      url: "http://localhost:8000/auth/test",
      method: "GET",
    }).then((res) => {
      console.log(res.data);
    });
  };

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
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {isLogin ? (
          <>
            <h3>{user.userName} 님 환영합니다.</h3>
            <button onClick={logout} className="loginButton">
              Logout
            </button>
          </>
        ) : (
          <Login setUser={setUser} setIsLogin={setIsLogin} />
        )}
        <br />
        <br />
        <button onClick={test}>TEST</button>
      </header>
    </div>
  );
}

export default App;
