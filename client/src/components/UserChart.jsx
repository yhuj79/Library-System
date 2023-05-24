import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Icon, Table } from "semantic-ui-react";

function UserChart({ searchValue, select, userID, setUserID, setUserName }) {
  const [dataAll, setDataAll] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/admin/user/all`,
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
      setData(dataAll.filter((item) => item.userName.includes(searchValue)));
    } else {
      setData(dataAll);
    }
  }, [dataAll, searchValue]);

  function SelectHandler(userID, userName) {
    setUserID(userID);
    setUserName(userName);
  }

  return (
    <Table celled textAlign="center" compact size="small">
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>이름</Table.HeaderCell>
          <Table.HeaderCell>프로필</Table.HeaderCell>
          <Table.HeaderCell>아이디</Table.HeaderCell>
          <Table.HeaderCell>비밀번호</Table.HeaderCell>
          <Table.HeaderCell>이메일</Table.HeaderCell>
          <Table.HeaderCell>소속</Table.HeaderCell>
          {select ? (
            <Table.HeaderCell>선택</Table.HeaderCell>
          ) : (
            <Table.HeaderCell>권한</Table.HeaderCell>
          )}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {JSON.stringify(data) !== "[]" &&
          data.map((data, index) => {
            return data.userID === userID ? (
              <Table.Row key={index} positive style={{ fontWeight: "bold" }}>
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
                {select ? (
                  <Table.Cell>
                    <Button
                      onClick={() => SelectHandler(data.userID, data.userName)}
                      primary
                    >
                      선택
                    </Button>
                  </Table.Cell>
                ) : (
                  <Table.Cell>
                    {data.admin.data[0] === 1 ? (
                      <Icon name="circle" color="green" />
                    ) : (
                      <Icon name="x" />
                    )}
                  </Table.Cell>
                )}
              </Table.Row>
            ) : (
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
                {select ? (
                  <Table.Cell>
                    <Button onClick={() => setUserID(data.userID)} primary>
                      선택
                    </Button>
                  </Table.Cell>
                ) : (
                  <Table.Cell>
                    {data.admin.data[0] === 1 ? (
                      <Icon name="circle" color="green" />
                    ) : (
                      <Icon name="x" />
                    )}
                  </Table.Cell>
                )}
              </Table.Row>
            );
          })}
      </Table.Body>
    </Table>
  );
}

export default UserChart;
