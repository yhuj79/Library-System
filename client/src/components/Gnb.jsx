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
        <h2>자료검색</h2>
        <Link to={"/book/list/new"}>
          <h2>도서목록</h2>
        </Link>
        <h2>내서재</h2>
        <Link to={"/board"}>
          <h2>이용자서비스</h2>
        </Link>
        <h2>도서관안내</h2>
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
          <Button fluid color="green">
            자료검색
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
          <Button fluid color="green">
            내서재
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
          <Button fluid color="green">
            도서관안내
          </Button>
        </Modal.Content>
      </Modal>
    </div>
  );
}

export default Gnb;
