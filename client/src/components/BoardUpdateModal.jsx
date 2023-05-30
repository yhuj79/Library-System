import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "semantic-ui-react";
import { storage } from "../hooks/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import styles from "../style/Input.module.css";
import axios from "axios";

function BoardUpdateModal({ open, setOpen, data }) {
  useEffect(() => {
    if (data) {
      setPostID(data.postID);
      setUserID(data.userID);
      setUserName(data.userName);
      setAffiliation(data.affiliation);
      setTitle(data.title);
      setBookName(data.bookName);
      setPostImg(data.postImg);
      setContent(data.content);
    }
  }, [data]);

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [postID, setPostID] = useState("");
  const [userID, setUserID] = useState("");
  const [userName, setUserName] = useState("");
  const [affiliation, setAffiliation] = useState("");
  const [title, setTitle] = useState("");
  const [bookName, setBookName] = useState("");
  const [postImg, setPostImg] = useState("imgDefault");
  const [content, setContent] = useState("");

  async function UpdateBoard() {
    setErr("");
    setLoading(true);
    await axios({
      url: `${process.env.REACT_APP_HOST}/board/update`,
      method: "POST",
      withCredentials: true,
      data: {
        postID: postID,
        userID: userID,
        userName: userName,
        affiliation: affiliation,
        title: title,
        bookName: bookName,
        postImg: postImg,
        content: content,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Update Post Complete!");
          window.location.reload();
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
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>글 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths={2}>
            <Form.Input
              label="이름"
              placeholder="NAME"
              value={userName || "NAME"}
              readOnly
            />
            <Form.Input
              label="소속"
              placeholder="AFFILIATION"
              value={affiliation || "AFFILIATION"}
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
              onClick={UpdateBoard}
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
      </Modal.Content>
    </Modal>
  );
}

export default BoardUpdateModal;
