import React from "react";
import { Image, List, Segment } from "semantic-ui-react";
import imgDefault from "../assets/book/imgDefault.png";
import styles from "../style/List.module.css";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function BoardList({ data }) {
  const navigate = useNavigate();
  const handleLinkClick = (event) => {
    event.stopPropagation();
  };

  return (
    <Segment>
      <List divided verticalAlign="middle">
        {JSON.stringify(data) !== "[]" &&
          data.map((data, index) => {
            return (
              <List.Item
                onClick={() => navigate(`/board/${data.postID}`)}
                className={styles.list}
                key={index}
              >
                <List.Content floated="right">
                  <List.Description style={{ margin: "10px 0" }}>
                    {moment(data.createdAt).format("YYYY.MM.DD HH:mm")}
                  </List.Description>
                </List.Content>
                {data.postImg === "imgDefault" ? (
                  <Image
                    style={{ margin: "5px" }}
                    rounded
                    size="mini"
                    src={imgDefault}
                  />
                ) : (
                  <Image
                    style={{ margin: "5px" }}
                    rounded
                    size="mini"
                    src={data.postImg}
                  />
                )}
                <List.Content>
                  <List.Header as="h4">
                    <a
                      target="_blank"
                      href={`https://www.nl.go.kr/kolisnet/search/searchResultAllList.do?tab=ALL&historyYn=Y&keywordType1=total&keyword1=${data.bookName}`}
                      rel="noreferrer"
                      onClick={handleLinkClick}
                    >
                      [{data.bookName}]
                    </a>{" "}
                    {data.title}
                  </List.Header>
                  <List.Description style={{ margin: "5px 0" }}>
                    {data.userName} / {data.affiliation}
                  </List.Description>
                </List.Content>
              </List.Item>
            );
          })}
      </List>
    </Segment>
  );
}

export default BoardList;
