import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Input } from "semantic-ui-react";
import styles from "../style/Input.module.css";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [passwd, setPasswd] = useState("");
  const [err, setErr] = useState("");

  function Login() {
    setErr("");
    axios({
      url: "http://localhost:8000/auth/login",
      method: "POST",
      withCredentials: true,
      data: {
        userID: userID,
        passwd: passwd,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          window.open("/", "_self");
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setErr("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
      });
  }

  return (
    <div className={styles.loginInput}>
      <div className={styles.wrap}>
        <div className={styles.inputBox}>
          <p className={styles.label}>아이디</p>
          <Input
            className={styles.inputText}
            type="id"
            placeholder="ID"
            onChange={(e) => setUserID(e.target.value)}
            value={userID}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>비밀번호</p>
          <Input
            className={styles.inputText}
            type="password"
            placeholder="PASSWORD"
            onChange={(e) => setPasswd(e.target.value)}
            value={passwd}
          />
        </div>
        <div className={styles.errDiv}>
          {err && <p className={styles.errText}>{err}</p>}
        </div>
        <div className={styles.buttonBox}>
          <Button onClick={Login} positive>
            로그인
          </Button>
          <Button onClick={() => navigate("/register")} secondary>
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
