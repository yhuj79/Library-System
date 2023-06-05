import React from "react";
import { motion } from "framer-motion";
import { Container, Icon, List, Segment } from "semantic-ui-react";
import { Helmet } from "react-helmet-async";
import Title from "../components/Title";

function LibSite() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container style={{ paddingBottom: "50px" }}>
        <Helmet>
          <title>자료 찾기 | 종합도서관리시스템</title>
        </Helmet>
        <Title title={"자료 찾기"} />
        <Segment>
          <List divided>
            <List.Item style={{ padding: "3px 0 10px" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="https://www.nl.go.kr/kolisnet/index.do"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  국가자료종합목록
                </List.Header>
                <List.Description>
                  국가자료종합목록(KOLIS-NET)은 국립중앙도서관을 비롯한 전국
                  1,900여 개 공공·전문도서관과 정부부처 자료실이 공동으로
                  구축하는 통합 목록 데이터베이스입니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="https://www.nl.go.kr/"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  국립중앙도서관
                </List.Header>
                <List.Description>
                  국립중앙도서관에서 소장하고 있는 국내외 자료를 통합검색할 수
                  있습니다. 검색 대상 항목은 도서, 고서/고문서, 학위논문,
                  잡지/학술지, 신문 기사, 멀티미디어, 장애인자료, 외부연계자료,
                  웹사이트 수집, 기타, 해외한국관련기록물 등이 있습니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="https://www.libsta.go.kr/"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  국가도서관통계시스템
                </List.Header>
                <List.Description>
                  국가도서관통계시스템은 국가승인통계인 “전국도서관통계”의
                  작성과 결과를 서비스하기 위해 구축된 시스템입니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="http://www.reading.or.kr/_new/index.php"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  한국작은도서관협회
                </List.Header>
                <List.Description>
                  풀뿌리독서운동의 일환으로 시작된 독서운동 단체로, 현재는
                  「도서관법」 제 2조 2항에 의거하여 공공성을 띤 1,500여개의
                  작은도서관 지역문고와 함께 활동하는 단체입니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="https://www.nlcy.go.kr/NLCY/main/index.do"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  국립어린이청소년도서관
                </List.Header>
                <List.Description>
                  국립어린이청소년도서관은 어린이, 청소년이 도서관을 통해 꿈과
                  상상력, 미래를 향한 희망을 키울 수 있도록 기회를 제공하고,
                  어린이 도서관 관련 업무자와 연구자들의 연구 활동을 지원하기
                  위해 다양한 활동과 유용한 정보를 제공합니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="http://bookdb.co.kr/bdb/Main.do?_method=initial"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  BOOK DB
                </List.Header>
                <List.Description>
                  국내외 작가, 출판사 관련 자료 포털로 작가랭킹, 베스트셀러,
                  작가 만남, 도서 정보 제공, 다양한 시의적 주제의 컬렉션 등의
                  콘텐츠가 매일 업데이트 됩니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="https://books.google.com/"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  Google Books
                </List.Header>
                <List.Description>
                  구글에서 제공하는 도서검색페이지입니다.구글플레이와 연동이
                  되도록 하여 구입한 도서와 검색한 도서들을 알수 있도록 한 것이
                  특징입니다. 역시 ISBN과 도서의 제목으로 검색을 할 수 있도록
                  하였으며 도서 검색엔진을 이용하여 세부적으로 검색이
                  가능합니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="http://ypbooks.co.kr/kor_index.yp"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  영풍문고
                </List.Header>
                <List.Description>
                  국내 오프라인 대형 서점 중 하나인 영풍문고에서 운영 중인
                  온라인샵입니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="https://www.kyobobook.co.kr/"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  교보문고
                </List.Header>
                <List.Description>
                  국내 오프라인 대형 서점 중 하나인 교보문고에서 운영 중인
                  온라인샵입니다.
                </List.Description>
              </List.Content>
            </List.Item>
            <List.Item style={{ padding: "10px 0 3px" }}>
              <List.Content>
                <List.Header
                  as="a"
                  href="http://www.gogobook.net/"
                  target="_blank"
                  style={{ marginBottom: "5px" }}
                >
                  <Icon name="bookmark" />
                  고고북
                </List.Header>
                <List.Description>
                  중고서적 도서 검색 사이트입니다. 대략 50여곳의 중고서점을 이
                  곳을 통하여 방문할 수 있습니다.
                </List.Description>
              </List.Content>
            </List.Item>
          </List>
        </Segment>
      </Container>
    </motion.div>
  );
}

export default LibSite;
