import axios from "axios";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { Button, Header, Input, Modal } from "semantic-ui-react";

function MyInfoWithdrawalModal({ open, setOpen, data }) {
  const [loading, setLoading] = useState(false);
  const [confirm, setConfirm] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie, removeCookie] = useCookies(["userID"]);

  async function DeleteUser(id) {
    setLoading(true);
    await axios({
      url: `${process.env.REACT_APP_HOST}/auth/delete`,
      method: "POST",
      withCredentials: true,
      data: {
        userID: id,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Delete User Complete!");
          removeCookie("token");
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
    window.location.replace("/");
  }

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>회원 탈퇴</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <Header>종합도서관리시스템 사용자 탈퇴를 진행합니다.</Header>
          <p>작성하셨던 게시글 및 대출 정보는 자동으로 삭제되지 않습니다.</p>
          <p>
            탈퇴하시려면 아래에{" "}
            <b>
              "{data.userID}/{data.userName}/탈퇴"
            </b>{" "}
            를 입력하십시오.
          </p>
          <Input
            fluid
            placeholder={`탈퇴하시려면 ${data.userID}/${data.userName}/탈퇴 를 입력하십시오.`}
            onChange={(e) => setConfirm(e.target.value)}
            value={confirm}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        {!loading ? (
          <Button floated="left" onClick={() => setOpen(false)}>
            취소
          </Button>
        ) : (
          <Button disabled floated="left">
            취소
          </Button>
        )}
        {confirm === `${data.userID}/${data.userName}/탈퇴` ? (
          <Button negative onClick={() => DeleteUser(data.userID)}>
            탈퇴
          </Button>
        ) : (
          <Button disabled negative>
            탈퇴
          </Button>
        )}
      </Modal.Actions>
    </Modal>
  );
}

export default MyInfoWithdrawalModal;
