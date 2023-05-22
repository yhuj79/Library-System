import { useState } from "react";
import axios from "axios";
import { storage } from "../hooks/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import {
  Form,
  Button,
  Segment,
  Modal,
  Icon,
  Image,
  Container,
} from "semantic-ui-react";
import styles from "../style/Input.module.css";
import imgDefault from "../assets/book/imgDefault.png";
import BookDeatail from "./BookDetail";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [address, setAddress] = useState("");
  const [bookImg, setBookImg] = useState("imgDefault");
  const [page, setPage] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState({});
  const [previewOpen, setPreviewOpen] = useState(false);

  async function SaveBook() {
    setErr("");
    setLoading(true);
    await axios({
      url: `${process.env.REACT_APP_HOST}/admin/book/insert`,
      method: "POST",
      withCredentials: true,
      data: {
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
          try {
            axios({
              url: `${process.env.REACT_APP_HOST}/admin/bookstat/validate`,
              params: { title: title },
              method: "GET",
              withCredentials: true,
            })
              .then((res) => {
                if (res.data.length > 0) {
                  setOpen(true);
                  setLoading(false);
                } else {
                  SaveBookStat();
                  setOpen(true);
                  setLoading(false);
                }
              })
              .catch((err) => {
                console.log(err);
              });
          } catch (err) {
            console.log(err);
          }
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

  async function SaveBookStat() {
    await axios({
      url: `${process.env.REACT_APP_HOST}/admin/bookstat/insert`,
      method: "POST",
      withCredentials: true,
      data: {
        title: title,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Save BookStat Complete!");
        }
      })
      .catch((err) => {
        console.log(err);
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

  function PreviewHandler() {
    setPreview({
      title: title,
      author: author,
      publisher: publisher,
      year: year,
      genre: genre,
      address: address,
      page: page,
    });
    setPreviewOpen(true);
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

  return (
    <Container>
      <Segment>
        <Form>
        <Form.Group widths={2}>
            <Form.Input
              label="식별번호"
              placeholder="BOOK ID"
              value={"BOOK ID"}
              readOnly
            />
            <Form.Input
              label="도서 위치"
              placeholder="ADDRESS"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              label="도서명 (등록 후 수정 불가)"
              placeholder="TITLE"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <Form.Input
              label="저자"
              placeholder="AUTHOR"
              onChange={(e) => setAuthor(e.target.value)}
              value={author}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Input
              label="출판사"
              placeholder="PUBLISHER"
              onChange={(e) => setPublisher(e.target.value)}
              value={publisher}
            />
            <Form.Input
              label="페이지 수"
              placeholder="PAGE"
              onChange={(e) => setPage(e.target.value)}
              value={page}
            />
          </Form.Group>
          <Form.Group widths={2}>
            <Form.Select
              label="출판 연도"
              placeholder="YEAR"
              onChange={(e, result) => setYear(result.value)}
              value={year}
              options={yearOptions}
            />
            <Form.Select
              label="장르"
              placeholder="GENRE"
              onChange={(e, result) => setGenre(result.value)}
              value={genre}
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
          <br />
          <br />
          {!loading ? (
            <Button
              style={{ marginTop: "-40px" }}
              floated="right"
              size="large"
              onClick={SaveBook}
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
          {!loading ? (
            <Button
              style={{ marginTop: "-40px" }}
              floated="right"
              size="large"
              onClick={PreviewHandler}
              primary
            >
              미리보기
            </Button>
          ) : (
            <Button
              style={{ marginTop: "-40px" }}
              floated="right"
              size="large"
              onClick={PreviewHandler}
              primary
              loading
            >
              미리보기
            </Button>
          )}
        </Form>
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          closeOnDimmerClick={false}
        >
          <Modal.Header>도서 추가 완료</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <p>성공적으로 등록되었습니다.</p>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => window.open("/admin/book", "_self")} positive>
              관리자 페이지
              <Icon name="right chevron" />
            </Button>
          </Modal.Actions>
        </Modal>
        <Modal
          onClose={() => setPreviewOpen(false)}
          onOpen={() => setPreviewOpen(true)}
          open={previewOpen}
        >
          <Modal.Header>미리보기</Modal.Header>
          <Modal.Content>
            {bookImg === "imgDefault" ? (
              <Image
                style={{ width: "132px", height: "200px" }}
                src={imgDefault}
              />
            ) : (
              <Image
                style={{ width: "132px", height: "200px" }}
                src={bookImg}
              />
            )}
            <BookDeatail data={preview} />
          </Modal.Content>
          <Modal.Content>도서위치 : {address}</Modal.Content>
          <Modal.Actions>
            <Button onClick={() => setPreviewOpen(false)}>
              닫기
            </Button>
          </Modal.Actions>
        </Modal>
      </Segment>
    </Container>
  );
}

export default BookForm;
