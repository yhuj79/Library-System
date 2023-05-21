import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/Title.module.css";
import { Button } from "semantic-ui-react";

function Title({ title, subTitle, button }) {
  const navigate = useNavigate();
  return (
    <div className={styles.title}>
      <h1>{title}</h1>
      {button && <Button onClick={()=> navigate(`/book/list/${button}`)} positive floated="right">more</Button>}
      <h3>{subTitle}</h3>
    </div>
  );
}

export default Title;
