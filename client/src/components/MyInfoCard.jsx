import React from "react";
import { Card, Button, Image } from "semantic-ui-react";
import profileDefault from "../assets/user/profile-default.jpg";
import { useNavigate } from "react-router-dom";

function MyInfoCard({ data }) {
  const navigate = useNavigate();

  return (
    <Card.Group>
      <Card>
        <Card.Content>
          {data.profileImg === "profileDefault" ? (
            <Image floated="right" size="mini" src={profileDefault} />
          ) : (
            <Image floated="right" size="mini" src={data.profileImg} />
          )}
          <Card.Header>{data.userName}</Card.Header>
          <Card.Meta>아이디 : {data.userID}</Card.Meta>
          <Card.Meta>이메일 : {data.email}</Card.Meta>
          <Card.Description>{data.userAffiliation}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <div className="ui two buttons">
            <Button positive onClick={() => navigate("/mypage/update")}>
              수정
            </Button>
            <Button secondary>탈퇴</Button>
          </div>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

export default MyInfoCard;
