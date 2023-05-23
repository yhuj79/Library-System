import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../style/Header.module.css";
import { useCookies } from "react-cookie";

function Header({ isLogin, loading, user }) {
  const navigate = useNavigate();
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);

  function Logout() {
    axios({
      url: `${process.env.REACT_APP_HOST}/auth/logout`,
      method: "POST",
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        removeCookie("token");
        window.open("/", "_self");
      }
    });
  }

  return (
    <div className={styles.header}>
      {!loading ? (
        <div className={styles.wrap}>
          {isLogin ? (
            <div className={styles.box}>
              <li>
                <strong>{user.userName}</strong>님 반갑습니다.
              </li>
              {user.admin.data[0] === 1 && (
                <li onClick={() => navigate("/admin/user")}>관리자</li>
              )}
              <li onClick={() => navigate("/mypage")}>내 정보</li>
              <li onClick={Logout}>로그아웃</li>
            </div>
          ) : (
            <div className={styles.box}>
              <li onClick={() => navigate("/login")}>로그인</li>
              <li onClick={() => navigate("/register")}>회원가입</li>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.wrap}>
          <li>&emsp;&emsp;Loading...&emsp;&emsp;</li>
        </div>
      )}
    </div>
  );
}

export default Header;
