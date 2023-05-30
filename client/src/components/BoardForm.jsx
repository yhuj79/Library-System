import React, { useState } from "react";
import { Button, Container, Form, Modal, Segment } from "semantic-ui-react";
import { storage } from "../hooks/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import styles from "../style/Input.module.css";
import axios from "axios";

function BoardForm({ data }) {
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [bookName, setBookName] = useState("");
  const [postImg, setPostImg] = useState("imgDefault");
  const [content, setContent] = useState("");

  async function SaveBoard() {
    setErr("");
    setLoading(true);
    await axios({
      url: `${process.env.REACT_APP_HOST}/board/insert`,
      method: "POST",
      withCredentials: true,
      data: {
        userID: data.userID,
        userName: data.userName,
        affiliation: data.userAffiliation,
        title: title,
        bookName: bookName,
        postImg: postImg,
        content: content,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Save Post Complete!");
          setOpen(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data === "Value Not Found") {
          setErr("입력값이 올바르지 않습니다.");
          setLoading(false);
        } else {
          setErr("등록 실패. 잠시 후 다시 시도해 주세요.");
          setLoading(false);
        }
      });
  }

  async function ImageHandler(e) {
    setLoading(true);
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `board/${Date.now()}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setPostImg(url);
          setLoading(false);
        });
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  return (
    <Container>
      <Segment>
        <Form>
          <Form.Group widths={2}>
            <Form.Input
              label="이름"
              placeholder="NAME"
              value={data.userName || "NAME"}
              readOnly
            />
            <Form.Input
              label="소속"
              placeholder="AFFILIATION"
              value={data.userAffiliation || "AFFILIATION"}
              readOnly
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              label="글 제목"
              placeholder="TITLE"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Form.Input
              label="희망 도서명"
              placeholder="BOOK NAME"
              onChange={(e) => setBookName(e.target.value)}
              value={bookName}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input label="첨부 이미지">
              <Button>
                <label htmlFor="file">{postImg}</label>
              </Button>
            </Form.Input>
            <input
              id="file"
              style={{ display: "none" }}
              type="file"
              accept="image/*"
              placeholder="IMAGE"
              onChange={(e) => ImageHandler(e)}
            />
          </Form.Group>
          <Form.TextArea
            label="내용"
            placeholder="CONTENT"
            onChange={(e) => setContent(e.target.value)}
            value={content}
          />
          <div className={styles.errDiv}>
            {err && <p className={styles.errText}>{err}</p>}
          </div>
          <br />
          <br />
          {!loading ? (
            <Button
              style={{ marginTop: "-40px" }}
              floated="right"
              size="large"
              onClick={SaveBoard}
              positive
            >
              저장
            </Button>
          ) : (
            <Button
              style={{ marginTop: "-40px" }}
              floated="right"
              size="large"
              positive
              loading
            >
              저장
            </Button>
          )}
        </Form>
      </Segment>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeOnDimmerClick={false}
      >
        <Modal.Header>작성 완료 😄</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>도서 신청이 완료되었습니다.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => window.open("/board", "_self")} secondary>
            게시판으로
          </Button>
        </Modal.Actions>
      </Modal>
    </Container>
  );
}

export default BoardForm;
