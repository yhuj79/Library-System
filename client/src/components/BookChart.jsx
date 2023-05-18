import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Icon, Table } from "semantic-ui-react";

function UserChart({ searchValue }) {
  const [dataAll, setDataAll] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8000/admin/book/all",
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setDataAll(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (searchValue.length > 0) {
      setData(dataAll.filter((item) => item.bookID === Number(searchValue)));
    } else {
      setData(dataAll);
    }
  }, [dataAll, searchValue]);

  return (
    <Table celled textAlign="center" compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>식별번호</Table.HeaderCell>
          <Table.HeaderCell>제목</Table.HeaderCell>
          <Table.HeaderCell>이미지</Table.HeaderCell>
          <Table.HeaderCell>저자</Table.HeaderCell>
          <Table.HeaderCell>출판사</Table.HeaderCell>
          <Table.HeaderCell>출판 년도</Table.HeaderCell>
          <Table.HeaderCell>장르</Table.HeaderCell>
          <Table.HeaderCell>페이지</Table.HeaderCell>
          <Table.HeaderCell>위치</Table.HeaderCell>
          <Table.HeaderCell>수정</Table.HeaderCell>
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
                <Table.Cell>{data.year}</Table.Cell>
                <Table.Cell>{data.genre}</Table.Cell>
                <Table.Cell>{data.page}</Table.Cell>
                <Table.Cell>{data.address}</Table.Cell>
                <Table.Cell>
                  <Button style={{ margin: "3px" }}>수정</Button>
                  <Button style={{ margin: "3px" }} primary>
                    대출
                  </Button>
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
}

export default UserChart;
