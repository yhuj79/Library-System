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
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAffiliation, setUserAffiliation] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [err, setErr] = useState("");

  function Register() {
    setErr("");
    axios({
      url: "http://localhost:8000/auth/register",
      method: "POST",
      withCredentials: true,
      data: {
        userID: userID,
        passwd: passwd,
        email: email,
        userName: userName,
        userAffiliation: userAffiliation,
        profileImg: profileImg,
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
  };

  return (
    <div className={styles.registerInput}>
      <h1>회원가입</h1>
      <div className={styles.wrap}>
        <div className={styles.inputBox}>
          <p className={styles.label}>아이디</p>
          <Input
            type="id"
            placeholder="ID"
            onChange={(e) => setUserID(e.target.value)}
            value={userID}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>비밀번호</p>
          <Input
            type="password"
            placeholder="PASSWORD"
            onChange={(e) => setPasswd(e.target.value)}
            value={passwd}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>이메일</p>
          <Input
            type="email"
            placeholder="E-MAIL"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>이름</p>
          <Input
            type="name"
            placeholder="NAME"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>소속</p>
          <Input
            type="affiliation"
            placeholder="Affiliation"
            onChange={(e) => setUserAffiliation(e.target.value)}
            value={userAffiliation}
          />
        </div>
        <div className={styles.errDiv}>
          {err && <p className={styles.errText}>{err}</p>}
        </div>
        <div className={styles.buttonBox}>
          <Button onClick={() => navigate("/register")} positive>
            회원가입
          </Button>
        </div>
      </div>
    </div>
  );
}
