import moment from "moment";
import React from "react";
import { Icon, Table } from "semantic-ui-react";

function BookStock({ data }) {
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
        const formattedDuration = `${days}일 ${hours}시간 ${minutes}분 남음`;
        return formattedDuration;
      } else {
        return "대출기간 초과";
      }
    }
  }

  return (
    <Table singleLine>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>식별번호</Table.HeaderCell>
          <Table.HeaderCell>도서 위치</Table.HeaderCell>
          <Table.HeaderCell>상태</Table.HeaderCell>
          <Table.HeaderCell>서비스</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      {JSON.stringify(data) !== "[]" &&
        data.map((data, index) => {
          return (
            <Table.Body key={index}>
              <Table.Row>
                <Table.Cell>{data.bookID}</Table.Cell>
                <Table.Cell>{data.address}</Table.Cell>
                {data.returnedAt ? (
                  <Table.Cell style={{ fontWeight: "bold" }}>
                    <Icon color="red" name="exclamation circle" />
                    <span style={{ color: "#FF0000" }}>대출중</span> (
                    {String(DateHandler(data.returnedAt)).substring(0, 2) ===
                    "대출" ? (
                      <span style={{ color: "#FF0000" }}>
                        {DateHandler(data.returnedAt)}
                      </span>
                    ) : String(DateHandler(data.returnedAt)).substring(0, 2) ===
                        "0일" ||
                      String(DateHandler(data.returnedAt)).substring(0, 2) ===
                        "1일" ? (
                      <span style={{ color: "#FF5E00" }}>
                        {DateHandler(data.returnedAt)}
                      </span>
                    ) : (
                      <span>{DateHandler(data.returnedAt)}</span>
                    )}
                    )
                  </Table.Cell>
                ) : (
                  <Table.Cell style={{ fontWeight: "bold", color: "#0BC904" }}>
                    <Icon color="green" name="check circle" />
                    대출 가능
                  </Table.Cell>
                )}
                <Table.Cell>No</Table.Cell>
              </Table.Row>
            </Table.Body>
          );
        })}
    </Table>
  );
}

export default BookStock;
