import React from "react";
import { useState } from "react";
import axios from "axios";
import { Button, Input } from "semantic-ui-react";
import styles from "../style/Input.module.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userID, setUserID] = useState("");
  const [passwd, setPasswd] = useState("");
  const [err, setErr] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["userID"]);

  async function Login() {
    setErr("");
    setLoading(true);
    await axios({
      url: `${process.env.REACT_APP_HOST}/auth/login`,
      method: "POST",
      withCredentials: true,
      data: {
        userID: userID,
        passwd: passwd,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          setCookie("token", result.data);
          window.open("/", "_self");
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 403) {
          setErr("아이디 또는 비밀번호가 올바르지 않습니다.");
          setLoading(false);
        } else {
          console.log("Error");
          setLoading(false);
        }
      });
  }

  // Enter 입력이 되면 클릭 이벤트 실행하는 함수
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      Login();
    }
  };

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
            onKeyPress={handleOnKeyPress}
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
            onKeyPress={handleOnKeyPress}
          />
        </div>
        <div className={styles.errDiv}>
          {err && <p className={styles.errText}>{err}</p>}
        </div>
        <div className={styles.buttonBox}>
          {!loading ? (
            <Button onClick={Login} positive>
              로그인
            </Button>
          ) : (
            <Button positive loading>
              로그인
            </Button>
          )}
          {!loading ? (
            <Button onClick={() => navigate("/register")} secondary>
              회원가입
            </Button>
          ) : (
            <Button secondary disabled>
              회원가입
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
