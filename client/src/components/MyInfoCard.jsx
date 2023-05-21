import React from "react";
import { Card, Button, Container } from "semantic-ui-react";
import profileDefault from "../assets/user/profile-default.jpg";
import { useNavigate } from "react-router-dom";

function MyInfoCard({ data }) {
  const navigate = useNavigate();

  return (
    <Container style={{ marginBottom: "30px" }}>
      <Card>
        {data.profileImg === "profileDefault" ? (
          <img alt="" style={{ aspectRatio: "1/1" }} src={profileDefault} />
        ) : (
          <img alt="" style={{ aspectRatio: "1/1" }} src={data.profileImg} />
        )}
        <Card.Content>
          <Card.Header>{data.userName}</Card.Header>
          <Card.Meta>아이디 : {data.userID}</Card.Meta>
          <Card.Meta>이메일 : {data.email}</Card.Meta>
          <Card.Description>{data.userAffiliation}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button positive onClick={() => navigate("/mypage/update")}>
            수정
          </Button>
          <Button secondary>탈퇴</Button>
        </Card.Content>
      </Card>
    </Container>
  );
}

export default MyInfoCard;
