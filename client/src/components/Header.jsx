import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "../style/Header.module.css";
import { useCookies } from "react-cookie";
import { Icon } from "semantic-ui-react";

function Header({ isLogin, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);

  async function Logout() {
    await axios({
      url: `${process.env.REACT_APP_HOST}/auth/logout`,
      method: "POST",
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        CookieHandler();
      }
    });
  }

  function CookieHandler() {
    setLoading(true);

    removeCookie("token", { path: "/" });
    removeCookie("token", { path: "/" });
    removeCookie("token", { path: "/" });
    removeCookie("token", { path: "/" });
    removeCookie("token", { path: "/" });

    setTimeout(function () {
      window.location.replace("/");
    }, 1000);
  }

  return (
    <div className={styles.header}>
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
            {!loading ? (
              <li onClick={Logout}>로그아웃</li>
            ) : (
              <li>
                <Icon loading name="spinner" style={{ margin: "0 20px" }} />
              </li>
            )}
          </div>
        ) : (
          <div className={styles.box}>
            <li onClick={() => navigate("/login")}>로그인</li>
            <li onClick={() => navigate("/register")}>회원가입</li>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
