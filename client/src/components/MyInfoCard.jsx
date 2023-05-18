import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Image } from "semantic-ui-react";
import profileDefault from "../assets/user/profile-default.jpg";
import { useNavigate } from "react-router-dom";

function MyInfoCard() {
  const navigate = useNavigate();
  const [userID, setUserID] = useState("");
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userAffiliation, setUserAffiliation] = useState("");
  const [profileImg, setProfileImg] = useState("profileDefault");

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8000/auth/login/success",
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setUserID(res.data.userID);
          setEmail(res.data.email);
          setUserName(res.data.userName);
          setUserAffiliation(res.data.userAffiliation);
          setProfileImg(res.data.profileImg);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Card>
      {profileImg === "profileDefault" ? (
        <Image src={profileDefault} wrapped ui={false} />
      ) : (
        <Image src={profileImg} wrapped ui={false} />
      )}
      <Card.Content>
        <Card.Header>{userName}</Card.Header>
        <Card.Meta>아이디 : {userID}</Card.Meta>
        <Card.Meta>이메일 : {email}</Card.Meta>
        <Card.Description>{userAffiliation}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button positive onClick={() => navigate("/mypage/update")}>
          수정
        </Button>
        <Button secondary>탈퇴</Button>
      </Card.Content>
    </Card>
  );
}

export default MyInfoCard;
