import React from "react";
import { Container, Icon, Table } from "semantic-ui-react";
import moment from "moment";

function MyInfoChart({ data }) {
  const today = moment();

  function DateHandler(returnedAt) {
    if (returnedAt) {
      // 현재 시간과 returnedAt의 차이 계산
      const lentDuration = moment(returnedAt).diff(moment(today.format()));
      if (lentDuration > 0) {
        // 차이를 X일 Y시간 Z분 형식으로 표시
        const days = Math.floor(lentDuration / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (lentDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (lentDuration % (1000 * 60 * 60)) / (1000 * 60)
        );
        const formattedDuration = `${days}일 ${hours}시간 ${minutes}분`;
        return formattedDuration;
      } else {
        return "대출기간 초과";
      }
    }
  }

  return (
    <Container>
      <Table textAlign="center" compact size="small" singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>식별번호</Table.HeaderCell>
            <Table.HeaderCell>제목</Table.HeaderCell>
            <Table.HeaderCell>이미지</Table.HeaderCell>
            <Table.HeaderCell>저자</Table.HeaderCell>
            <Table.HeaderCell>출판사</Table.HeaderCell>
            <Table.HeaderCell>반납 남은 기간</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {JSON.stringify(data) !== "[]" &&
            data.map((data, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>{data.bookID}</Table.Cell>
                  <Table.Cell>{data.title}</Table.Cell>
                  <Table.Cell>
                    <Icon
                      name="linkify"
                      color="green"
                      onClick={() => window.open(data.bookImg, "_blank")}
                      link
                    />
                  </Table.Cell>
                  <Table.Cell>{data.author}</Table.Cell>
                  <Table.Cell>{data.publisher}</Table.Cell>
                  {String(DateHandler(data.returnedAt)).substring(0, 2) ===
                  "대출" ? (
                    <Table.Cell
                      style={{ color: "#FF0000", fontWeight: "bold" }}
                    >
                      {DateHandler(data.returnedAt)}
                    </Table.Cell>
                  ) : String(DateHandler(data.returnedAt)).substring(0, 2) ===
                      "0일" ||
                    String(DateHandler(data.returnedAt)).substring(0, 2) ===
                      "1일" ? (
                    <Table.Cell
                      style={{ color: "#FF5E00", fontWeight: "bold" }}
                    >
                      {DateHandler(data.returnedAt)}
                    </Table.Cell>
                  ) : (
                    <Table.Cell>{DateHandler(data.returnedAt)}</Table.Cell>
                  )}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </Container>
  );
}

export default MyInfoChart;
