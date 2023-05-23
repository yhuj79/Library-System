import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { storage } from "../hooks/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { Button, Input, Modal } from "semantic-ui-react";
import styles from "../style/Input.module.css";
import profileDefault from "../assets/user/profile-default.jpg";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

export default function MyInfoUpdate() {
  const [userID, setUserID] = useState("");
  const [passwd, setPasswd] = useState("");
  const [passwdValidation, setPasswdValidation] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAffiliation, setUserAffiliation] = useState("");
  const [profileImg, setProfileImg] = useState("profileDefault");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [cookies, setCookie] = useCookies(["userID"]);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/auth/authentication`,
        params: { userID: jwtDecode(cookies.token).userID },
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setUserID(res.data[0].userID);
          setEmail(res.data[0].email);
          setUserName(res.data[0].userName);
          setUserAffiliation(res.data[0].userAffiliation);
          setProfileImg(res.data[0].profileImg);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  function Logout() {
    axios({
      url: `${process.env.REACT_APP_HOST}/auth/logout`,
      method: "POST",
      withCredentials: true,
    }).then((res) => {
      if (res.status === 200) {
        setOpen(true);
        setLoading(false);
      }
    });
  }

  async function Update() {
    setErr("");
    setLoading(true);
    await axios({
      url: `${process.env.REACT_APP_HOST}/auth/mypage/update`,
      method: "POST",
      withCredentials: true,
      data: {
        userID: userID,
        passwd: passwd,
        passwdValidation: passwdValidation,
        email: email,
        userName: userName,
        userAffiliation: userAffiliation,
        profileImg: profileImg,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Update Complete!");
          Logout();
        }
      })
      .catch((err) => {
        if (err.response.data === "userID Validate Failed") {
          setErr("아이디 형식은 4~12자리 영문, 숫자입니다.");
          setLoading(false);
        } else if (err.response.data === "userName Validate Failed") {
          setErr("이름 형식이 올바르지 않습니다.");
          setLoading(false);
        } else if (err.response.data === "passwd Discrepancy") {
          setErr("비밀번호가 일치하지 않습니다. (비밀번호 확인)");
          setLoading(false);
        } else if (err.response.data === "passwd Validate Failed") {
          setErr("비밀번호 형식은 8~20자리 문자,숫자,특수문자입니다.");
          setLoading(false);
        } else if (err.response.data === "email Validate Failed") {
          setErr("이메일 형식이 올바르지 않습니다.");
          setLoading(false);
        } else if (err.response.data === "userAffiliation Validate Failed") {
          setErr("소속명 형식은 2~15자리 한글입니다.");
          setLoading(false);
        } else {
          setErr("수정 실패. 잠시 후 다시 시도해 주세요.");
          setLoading(false);
        }
      });
  }

  async function ImageHandler(e) {
    setLoading(true);
    const file = e.target.files[0];

    try {
      const storageRef = ref(storage, `user/profile/${Date.now()}`);
      await uploadBytes(storageRef, file).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setProfileImg(url);
          setLoading(false);
        });
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className={styles.updateInput}>
      <h1>정보 수정</h1>
      <div className={styles.wrap}>
        <div className={styles.inputBox}>
          <p className={styles.label}>아이디</p>
          <Input
            className={styles.inputText}
            type="id"
            placeholder="ID"
            onChange={(e) => setUserID(e.target.value)}
            value={userID}
            readOnly
            label={{ icon: "ban" }}
            labelPosition="right corner"
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>비밀번호</p>
          <Input
            className={styles.inputText}
            type="password"
            placeholder="PASSWORD"
            onChange={(e) => setPasswd(e.target.value)}
            value={passwd}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>비밀번호 확인</p>
          <Input
            className={styles.inputText}
            type="password"
            placeholder="VALIDATION"
            onChange={(e) => setPasswdValidation(e.target.value)}
            value={passwdValidation}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>이메일</p>
          <Input
            className={styles.inputText}
            type="email"
            placeholder="E-MAIL"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>이름</p>
          <Input
            className={styles.inputText}
            type="name"
            placeholder="NAME"
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>소속</p>
          <Input
            className={styles.inputText}
            type="affiliation"
            placeholder="AFFILIATION"
            onChange={(e) => setUserAffiliation(e.target.value)}
            value={userAffiliation}
          />
        </div>
        <div className={styles.inputBox}>
          <p className={styles.label}>프로필 사진</p>
          {profileImg === "profileDefault" ? (
            <img className={styles.profile} alt="" src={profileDefault} />
          ) : (
            <img className={styles.profile} alt="" src={profileImg} />
          )}
          <br />
          {!loading ? (
            <Button size="small">
              <label htmlFor="input-profile">이미지 선택</label>
            </Button>
          ) : (
            <Button size="small" loading>
              <label>이미지 선택</label>
            </Button>
          )}
          <input
            id="input-profile"
            style={{ display: "none" }}
            type="file"
            onChange={(e) => ImageHandler(e)}
            accept="image/*"
          />
        </div>
        <div className={styles.errDiv}>
          {err && <p className={styles.errText}>{err}</p>}
        </div>
        <div className={styles.buttonBox}>
          {!loading ? (
            <Button onClick={Update} positive>
              수정
            </Button>
          ) : (
            <Button positive loading>
              수정
            </Button>
          )}
        </div>
      </div>
      <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        closeOnDimmerClick={false}
      >
        <Modal.Header>수정 완료</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>다시 로그인 후 이용해 주세요.</p>
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button onClick={() => window.open("/login", "_self")} positive>
            로그인
          </Button>
          <Button onClick={() => window.open("/", "_self")} secondary>
            메인 화면으로
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
