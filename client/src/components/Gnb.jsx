import React, { useState } from "react";
import styles from "../style/Gnb.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Button, Icon, Modal } from "semantic-ui-react";

function Gnb() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.gnb}>
      <Link to={"/"}>
        <h1>종합도서관리시스템</h1>
      </Link>
      <div className={styles.link}>
        <Link to={"/information"}>
          <h2>시스템안내</h2>
        </Link>
        <Link to={"/book/list/new"}>
          <h2>도서목록</h2>
        </Link>
        <Link to={"/board"}>
          <h2>이용자서비스</h2>
        </Link>
        <Link to={"/libsite"}>
          <h2>자료찾기</h2>
        </Link>
      </div>
      <div className={styles.linkM}>
        <Icon
          onClick={() => setOpen(true)}
          name="bars"
          size="big"
          color="olive"
          link
        />
      </div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
      >
        <Modal.Header>메뉴</Modal.Header>
        <Modal.Content>
          <Button
            fluid
            color="green"
            onClick={() => {
              setOpen(false);
              navigate("/information");
            }}
          >
            시스템안내
          </Button>
        </Modal.Content>
        <Modal.Content>
          <Button
            fluid
            color="green"
            onClick={() => {
              setOpen(false);
              navigate("/book/list/new");
            }}
          >
            도서목록
          </Button>
        </Modal.Content>
        <Modal.Content>
          <Button
            fluid
            color="green"
            onClick={() => {
              setOpen(false);
              navigate("/board");
            }}
          >
            이용자서비스
          </Button>
        </Modal.Content>
        <Modal.Content>
          <Button
            fluid
            color="green"
            onClick={() => {
              setOpen(false);
              navigate("/libsite");
            }}
          >
            자료찾기
          </Button>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default Gnb;
