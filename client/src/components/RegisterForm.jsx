import React from "react";
import { useState } from "react";
import axios from "axios";
import { storage } from "../hooks/firebase";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { Button, Input, Modal } from "semantic-ui-react";
import styles from "../style/Input.module.css";
import profileDefault from "../assets/user/profile-default.jpg";

export default function RegisterForm() {
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
  const [checkedInputs, setCheckedInputs] = useState([]);

  async function Register() {
    setErr("");
    setLoading(true);
    await axios({
      url: "http://localhost:8000/auth/register",
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
          console.log("Register Complete!");
          setOpen(true);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.data === "userID Duplication") {
          setErr("중복된 아이디가 존재합니다.");
          setLoading(false);
        } else if (err.response.data === "userID Validate Failed") {
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
          setErr("회원가입 실패. 잠시 후 다시 시도해 주세요.");
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

  const changeHandler = (checked, id) => {
    if (checked) {
      setCheckedInputs([...checkedInputs, id]);
    } else {
      setCheckedInputs(checkedInputs.filter((el) => el !== id));
    }
  };
  const isChecked = checkedInputs.length === 1;

  return (
    <div className={styles.registerInput}>
      <h1>회원가입</h1>
      <div className={styles.wrap}>
        <div className={styles.inputBox}>
          <p className={styles.label}>아이디</p>
          <Input
            className={styles.inputText}
            type="id"
            placeholder="ID"
            onChange={(e) => setUserID(e.target.value)}
            value={userID}
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
        <p className={styles.clause}>
          이 사이트는 연습용 프로젝트 입니다.
          <br />
          사용하는 Access Token에 예상치 못한 보안 문제가 발생할 가능성이
          있습니다.
          <br />
          따라서 다른 웹사이트와 관련된 비밀번호를 입력하는 것은 권장하지
          않습니다.
        </p>
        <div style={{ textAlign: "center" }}>
          <input
            style={{ verticalAlign: "middle" }}
            type="checkbox"
            id="check"
            onChange={(e) => {
              changeHandler(e.currentTarget.checked, "check");
            }}
          />
          &emsp;약관을 모두 확인하였습니다.
        </div>
        <div className={styles.errDiv}>
          {err && <p className={styles.errText}>{err}</p>}
        </div>
        <div className={styles.buttonBox}>
          {!loading ? (
            isChecked ? (
              <Button onClick={Register} positive>
                회원가입
              </Button>
            ) : (
              <Button positive disabled>
                회원가입
              </Button>
            )
          ) : (
            <Button positive loading>
              회원가입
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
        <Modal.Header>회원가입 완료 😄</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <p>종합도서관리시스템에 오신 것을 환영합니다.</p>
            <p>로그인 후 다양한 서비스를 이용해 보세요.</p>
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
