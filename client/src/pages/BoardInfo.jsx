import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Item, Modal, Segment } from "semantic-ui-react";
import Title from "../components/Title";
import BoardUpdateModal from "../components/BoardUpdateModal";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BoardDetail from "../components/BoardDetail";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

function BoardInfo() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { postID } = useParams();
  const [data, setData] = useState([]);
  const [user, setUser] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["userID"]);
  const [open, setOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/auth/authentication`,
        params: { userID: jwtDecode(cookies.token).userID },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          if (res) {
            setUser(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, [cookies.token]);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/board/id`,
        params: { postID: postID },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function DeleteBoard(id) {
    setLoading(true);
    await axios({
      url: `${process.env.REACT_APP_HOST}/board/delete`,
      method: "POST",
      withCredentials: true,
      data: {
        postID: id,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Delete Post Complete!");
          window.open("/board", "_self");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }

  return (
    <Container style={{ paddingBottom: "50px" }}>
      <Helmet>
        <title>
          {data[0] ? data[0].title : "도서 정보"} | 종합도서관리시스템
        </title>
      </Helmet>
      <Title title={"이용자 서비스"} subTitle={"도서 신청 게시판"} />
      <Button
        onClick={() => navigate(-1)}
        content="뒤로"
        icon="reply"
        labelPosition="left"
      />
      {user[0] &&
        data[0] &&
        (user[0].userID === data[0].userID || user[0].admin.data[0] === 1) && (
          <Button
            onClick={() => setOpen(true)}
            floated="right"
            content="수정"
            positive
          />
        )}
      {user[0] &&
        data[0] &&
        (user[0].userID === data[0].userID || user[0].admin.data[0] === 1) && (
          <Button
            onClick={() => setDeleteModalOpen(true)}
            floated="right"
            content="삭제"
            color="red"
          />
        )}
      <Segment>
        {JSON.stringify(data) !== "[]" && (
          <Item.Group divided>
            <BoardDetail data={data[0]} />
          </Item.Group>
        )}
      </Segment>
      <BoardUpdateModal open={open} setOpen={setOpen} data={data[0]} />
      <Modal
        onClose={() => setDeleteModalOpen(false)}
        onOpen={() => setDeleteModalOpen(true)}
        open={deleteModalOpen}
      >
        <Modal.Header>글 삭제</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>해당 게시글을 삭제하시겠습니까?</p>
          </Modal.Description>
        </Modal.Content>
        {!loading ? (
          <Modal.Actions>
            <Button onClick={() => setDeleteModalOpen(false)} positive>
              취소
            </Button>
            <Button onClick={() => DeleteBoard(postID)} secondary>
              확인
            </Button>
          </Modal.Actions>
        ) : (
          <Modal.Actions>
            <Button positive disabled>
              취소
            </Button>
            <Button secondary loading>
              확인
            </Button>
          </Modal.Actions>
        )}
      </Modal>
    </Container>
  );
}

export default BoardInfo;
