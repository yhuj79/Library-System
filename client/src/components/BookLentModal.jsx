import React, { useState } from "react";
import { Button, Input, Modal, Header, Item } from "semantic-ui-react";
import BookDeatail from "./BookDetail";
import axios from "axios";
import styles from "../style/Input.module.css";
import UserChart from "./UserChart";
import Loading from "./Loading";

function BookLentModal({ open, setOpen, data }) {
  const [searchValue, setSearchValue] = useState("");
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState("");
  const [err, setErr] = useState("");
  const [load, setLoad] = useState(true);

  function LentBookHandler() {
    setErr("");
    setLoading(true);
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/admin/book/lent/validate`,
        params: { bookID: data.bookID },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          if (res.data.length > 0) {
            setErr("이미 대출 처리된 도서입니다.");
            setLoading(false);
          } else {
            console.log("Validate Book Complete!");
            LentBook();
            UpdateBookStat();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }

  async function LentBook() {
    await axios({
      url: `${process.env.REACT_APP_HOST}/admin/book/lent`,
      method: "POST",
      withCredentials: true,
      data: {
        userID: userID,
        bookID: data.bookID,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Save Book Complete!");
        }
      })
      .catch((err) => {
        setErr("대출 실패. 잠시 후 다시 시도해 주세요.");
        setLoading(false);
      });
  }

  async function UpdateBookStat() {
    await axios({
      url: `${process.env.REACT_APP_HOST}/admin/bookstat/update`,
      method: "POST",
      withCredentials: true,
      data: {
        title: data.title,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Update BookStat Complete!");
          setLoading(false);
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>대출 승인</Modal.Header>
      <Modal.Content>
        <Input
          icon="search"
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="대출자 이름을 입력하세요"
        />
        {!load ? (
          <UserChart
            searchValue={searchValue}
            setLoad={setLoad}
            select={true}
            userID={userID}
            setUserID={setUserID}
            setUserName={setUserName}
          />
        ) : (
          <Loading />
        )}
        <Item.Group divided>
          <BookDeatail data={data} />
        </Item.Group>
        <Header>도서 식별번호 : {data.bookID}</Header>
        {userName && userID && (
          <Header>
            {userName} ({userID}) 님께 대출 실행하시겠습니까?
          </Header>
        )}
        <div className={styles.errDiv}>
          {err && <p className={styles.errText}>{err}</p>}
        </div>
      </Modal.Content>
      {!loading ? (
        <Modal.Actions>
          <Button onClick={() => setOpen(false)}>닫기</Button>
          {userID ? (
            <Button onClick={LentBookHandler} positive>
              확인
            </Button>
          ) : (
            <Button disabled positive>
              확인
            </Button>
          )}
        </Modal.Actions>
      ) : (
        <Modal.Actions>
          <Button disabled>닫기</Button>
          <Button positive loading>
            확인
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  );
}

export default BookLentModal;
