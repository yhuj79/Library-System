import { useState, useEffect } from "react";
import axios from "axios";
import { Icon, Table } from "semantic-ui-react";

function UserChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios({
        url: "http://localhost:8000/admin/user/all",
        method: "GET",
        withCredentials: true,
      })
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <Table celled textAlign="center">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>이름</Table.HeaderCell>
          <Table.HeaderCell>프로필</Table.HeaderCell>
          <Table.HeaderCell>아이디</Table.HeaderCell>
          <Table.HeaderCell>비밀번호</Table.HeaderCell>
          <Table.HeaderCell>이메일</Table.HeaderCell>
          <Table.HeaderCell>소속</Table.HeaderCell>
          <Table.HeaderCell>권한</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {JSON.stringify(data) !== "[]" &&
          data.map((data, index) => {
            return (
              <Table.Row key={index}>
                <Table.Cell>{data.userName}</Table.Cell>
                <Table.Cell>
                  {data.profileImg === "profileDefault" ? (
                    <Icon name="unlink" />
                  ) : (
                    <Icon
                      name="linkify"
                      color="green"
                      onClick={() => window.open(data.profileImg, "_blank")}
                      link
                    />
                  )}
                </Table.Cell>
                <Table.Cell>{data.userID}</Table.Cell>
                <Table.Cell>{data.passwd}</Table.Cell>
                <Table.Cell>{data.email}</Table.Cell>
                <Table.Cell>{data.userAffiliation}</Table.Cell>
                <Table.Cell>
                  {data.admin.data[0] === 1 ? (
                    <Icon name="circle" color="green" />
                  ) : (
                    <Icon name="x" />
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
}

export default UserChart;
