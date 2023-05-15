import React from "react";
import { useState } from "react";
import "./login.css";
import axios from "axios";

export default function Login({ setIsLogin, setUser }) {
  const [userID, setUserID] = useState('');
  const [passwd, setPasswd] = useState('');

  const login = () => {
    axios({
      url: "http://localhost:8000/auth/login",
      method: "POST",
      withCredentials: true,
      data: {
        userID: userID,
        passwd: passwd,
      },
    }).then((result) => {
      if (result.status === 200) {
        window.open('/', '_self')
      }
    });
  };

  return (
    <div>
      <div className="loginContainer">
        <div className="inputGroup">
          <label className="inputLabel">아이디</label>
          <input
            type="id"
            placeholder="userID"
            className="inputValue"
            onChange={(e) => setUserID(e.target.value)}
            value={userID}
          />
        </div>
        <div className="inputGroup">
          <label className="inputLabel">비밀번호</label>
          <input
            type="password"
            placeholder="password"
            className="inputValue"
            onChange={(e) => setPasswd(e.target.value)}
            value={passwd}
          />
        </div>
        <button onClick={login} className="loginButton">Login</button>
      </div>
    </div>
  );
}
