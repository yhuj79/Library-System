import React from "react";
import { Table } from "semantic-ui-react";

function BookStock({ data }) {
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
                <Table.Cell>No</Table.Cell>
                <Table.Cell>No</Table.Cell>
              </Table.Row>
            </Table.Body>
          );
        })}
    </Table>
  );
}

export default BookStock;
