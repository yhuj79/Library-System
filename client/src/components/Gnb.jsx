import React from "react";
import styles from "../style/Gnb.module.css";
import { Link } from "react-router-dom";
import { Icon } from "semantic-ui-react";

function Gnb() {
  return (
    <div className={styles.gnb}>
      <Link to={"/"}>
        <h1>종합도서관리시스템</h1>
      </Link>
      <div className={styles.link}>
        <h2>자료검색</h2>
        <Link to={"/book/list/new"}>
          <h2>도서목록</h2>
        </Link>
        <h2>내서재</h2>
        <h2>이용자서비스</h2>
        <h2>도서관안내</h2>
      </div>
      <div className={styles.linkM}>
        <Icon name="bars" size="big" color="olive" />
      </div>
    </div>
  );
}

export default Gnb;
