import React from "react";
import { motion } from "framer-motion";
import { Button, Container, Header, Image } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";

function Information() {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container style={{ paddingBottom: "50px" }}>
        <Helmet>
          <title>시스템안내 | 종합도서관리시스템</title>
        </Helmet>
        <Title title={"시스템 안내"} />

        <Header as="h2">1️⃣ 내 정보 관리</Header>
        <Image.Group style={{ width: "49.6%", display: "flex" }}>
          <Image
            style={{
              border: "1px solid rgba(34, 36, 38, .15)",
              borderRadius: "5px",
            }}
            src={require("../assets/information/1.png")}
          />
          <Image
            style={{
              border: "1px solid rgba(34, 36, 38, .15)",
              borderRadius: "5px",
            }}
            src={require("../assets/information/2.png")}
          />
        </Image.Group>
        <Container style={{ marginTop: "10px" }}>
          <Header as="h3">
            로그인 완료 후 내 정보를 클릭하면 개인정보, 대출내역, 도서신청글
            목록을 확인할 수 있습니다.
          </Header>
          <Header as="h3">
            개인정보를 수정하거나 회원 탈퇴 또한 가능합니다.
          </Header>
          <Button onClick={() => navigate("/mypage")} floated="right" positive>
            내 정보
          </Button>
          <br />
          <br />
        </Container>

        <Header as="h2">2️⃣ 도서 목록</Header>
        <Image.Group style={{ width: "49.6%", display: "flex" }}>
          <Image
            style={{
              border: "1px solid rgba(34, 36, 38, .15)",
              borderRadius: "5px",
            }}
            src={require("../assets/information/3.png")}
          />
          <Image
            style={{
              border: "1px solid rgba(34, 36, 38, .15)",
              borderRadius: "5px",
            }}
            src={require("../assets/information/4.png")}
          />
        </Image.Group>
        <Container style={{ marginTop: "10px" }}>
          <Header as="h3">
            도서 목록에서 최근 출판순, 인기 많은순으로 보유 서적을 확인할 수
            있습니다.
          </Header>
          <Header as="h3">
            책을 클릭하고 해당하는 책에 대한 정보를 얻어보세요.
          </Header>
          <Button
            onClick={() => navigate("/book/list/new")}
            floated="right"
            positive
          >
            도서목록
          </Button>
          <br />
          <br />
        </Container>

        <Header as="h2">3️⃣ 도서 신청</Header>
        <Image.Group style={{ width: "49.6%", display: "flex" }}>
          <Image
            style={{
              border: "1px solid rgba(34, 36, 38, .15)",
              borderRadius: "5px",
            }}
            src={require("../assets/information/5.png")}
          />
          <Image
            style={{
              border: "1px solid rgba(34, 36, 38, .15)",
              borderRadius: "5px",
            }}
            src={require("../assets/information/6.png")}
          />
        </Image.Group>
        <Container style={{ marginTop: "10px" }}>
          <Header as="h3">
            재고 부족으로 대출이 어렵거나, 목록에 없는 도서를 신청할 수
            있습니다.
          </Header>
          <Button onClick={() => navigate("/board")} floated="right" positive>
            도서신청게시판
          </Button>
          <br />
          <br />
        </Container>

        <Header as="h2">4️⃣ 자료 찾기</Header>
        <Image.Group>
          <Image
            style={{
              border: "1px solid rgba(34, 36, 38, .15)",
              borderRadius: "5px",
            }}
            src={require("../assets/information/7.png")}
          />
        </Image.Group>
        <Container style={{ marginTop: "10px" }}>
          <Header as="h3">
            온라인으로 국내·외 다양한 도서 자료 검색이 가능한 사이트 목록입니다.
          </Header>
          <Button onClick={() => navigate("/libsite")} floated="right" positive>
            자료찾기
          </Button>
          <br />
          <br />
        </Container>
      </Container>
    </motion.div>
  );
}

export default Information;
