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
      url: "http://localhost:8000/logout",
      method: "POST",
      withCredentials: true,
    }).then((result) => {
      if (result.status === 200) {
        window.open("/", "_self");
      }
    });
  };

  const test = () => {
    axios({
      url: "http://localhost:8000/test",
      method: "GET",
    }).then((res) => {
      console.log(res.data);
    });
  };

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8000/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((result) => {
          if (result.data) {
            setIsLogin(true);
            setUser(result.data);
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
            <h3>{user.username} 님이 로그인했습니다.</h3>
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
