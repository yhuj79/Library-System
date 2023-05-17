import React from "react";
import styles from "../style/Title.module.css";

function Title({ title, subTitle }) {
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
      <h3>{subTitle}</h3>
    </div>
  );
}

export default Title;
