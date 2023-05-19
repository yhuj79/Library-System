import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Modal } from "semantic-ui-react";
import { storage } from "../hooks/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import styles from "../style/Input.module.css";

function BookUpdateModal({ open, setOpen, data }) {
  useEffect(() => {
    setBookID(data.bookID);
    setTitle(data.title);
    setAuthor(data.author);
    setPublisher(data.publisher);
    setYear(data.year);
    setGenre(data.genre);
    setAddress(data.address);
    setBookImg(data.bookImg);
    setPage(data.page);
  }, [data]);

  const [bookID, setBookID] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [address, setAddress] = useState("");
  const [bookImg, setBookImg] = useState("");
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState("");
  const [err, setErr] = useState("");

  async function UpdateBook() {
    setErr("");
    setLoading(true);
    await axios({
      url: "http://localhost:8000/admin/book/update",
      method: "POST",
      withCredentials: true,
      data: {
        bookID: bookID,
        title: title,
        author: author,
        publisher: publisher,
        year: year,
        genre: genre,
        address: address,
        bookImg: bookImg,
        page: page,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Save Book Complete!");
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
      const storageRef = ref(storage, `book/${genre}/${Date.now()}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setBookImg(url);
          setLoading(false);
        });
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const yearOptions = [];

  for (let year = 1990; year <= 2023; year++) {
    yearOptions.push({
      key: String(year),
      value: String(year),
      text: String(year),
    });
  }

  const genreOptions = [
    { key: "IT", value: "IT", text: "IT" },
    { key: "인문", value: "인문", text: "인문" },
    { key: "외국어", value: "외국어", text: "외국어" },
    { key: "역사", value: "역사", text: "역사" },
    { key: "문화", value: "문화", text: "문화" },
    { key: "소설", value: "소설", text: "소설" },
    { key: "참고서", value: "참고서", text: "참고서" },
    { key: "요리", value: "요리", text: "요리" },
    { key: "건강", value: "건강", text: "건강" },
    { key: "경영", value: "경영", text: "경영" },
    { key: "경제", value: "경제", text: "경제" },
    { key: "과학", value: "과학", text: "과학" },
    { key: "공학", value: "공학", text: "공학" },
    { key: "수험서", value: "수험서", text: "수험서" },
    { key: "여행", value: "여행", text: "여행" },
    { key: "자기계발", value: "자기계발", text: "자기계발" },
    { key: "사회", value: "사회", text: "사회" },
    { key: "잡지", value: "잡지", text: "잡지" },
    { key: "종교", value: "종교", text: "종교" },
    { key: "스포츠", value: "스포츠", text: "스포츠" },
  ];

  async function DeleteBook(id) {
    setErr("");
    setLoading(true);
    await axios({
      url: "http://localhost:8000/admin/book/delete",
      method: "POST",
      withCredentials: true,
      data: {
        bookID: id,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Delete Book Complete!");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  function DeleteBookHandler() {
    if (window.confirm(`(${bookID}) ${title}\n정말 삭제하시겠습니까?`)) {
      DeleteBook(bookID);
    }
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>도서 정보 수정</Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Group widths={2}>
            <Form.Input
              label="식별번호 (수정 불가)"
              placeholder="BOOK ID"
              value={bookID || ""}
              readOnly
            />
            <Form.Input
              label="도서 위치"
              placeholder="ADDRESS"
              onChange={(e) => setAddress(e.target.value)}
              value={address || ""}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              label="도서명 (수정 불가)"
              placeholder="TITLE"
              onChange={(e) => setTitle(e.target.value)}
              value={title || ""}
              readOnly
            />
            <Form.Input
              label="저자"
              placeholder="AUTHOR"
              onChange={(e) => setAuthor(e.target.value)}
              value={author || ""}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              label="출판사"
              placeholder="PUBLISHER"
              onChange={(e) => setPublisher(e.target.value)}
              value={publisher || ""}
            />
            <Form.Input
              label="페이지 수"
              placeholder="PAGE"
              onChange={(e) => setPage(e.target.value)}
              value={page || ""}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Select
              label="출판 연도"
              placeholder="YEAR"
              onChange={(e, result) => setYear(result.value)}
              value={year || ""}
              options={yearOptions}
            />
            <Form.Select
              label="장르"
              placeholder="GENRE"
              onChange={(e, result) => setGenre(result.value)}
              value={genre || ""}
              options={genreOptions}
            />
          </Form.Group>
          <Form.Group>
            <Form.Input label="이미지">
              <Button>
                <label htmlFor="file" className={styles.labelBookImg}>
                  {bookImg}
                </label>
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
          <div className={styles.errDiv}>
            {err && <p className={styles.errText}>{err}</p>}
          </div>
        </Form>
      </Modal.Content>
      {!loading ? (
        <Modal.Actions>
          <Button onClick={DeleteBookHandler} negative floated="left">
            삭제
          </Button>
          <Button onClick={() => setOpen(false)}>닫기</Button>
          <Button onClick={UpdateBook} positive>
            저장
          </Button>
        </Modal.Actions>
      ) : (
        <Modal.Actions>
          <Button negative floated="left" loading>
            삭제
          </Button>
          <Button loading>닫기</Button>
          <Button positive loading>
            저장
          </Button>
        </Modal.Actions>
      )}
    </Modal>
  );
}

export default BookUpdateModal;
