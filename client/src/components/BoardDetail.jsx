import React from "react";
import { Button, Form, Item, TextArea } from "semantic-ui-react";
import imgDefault from "../assets/book/imgDefault.png";
import moment from "moment";

function BoardDetail({ data }) {
  return (
    <Item>
      {data.postImg === "imgDefault" ? (
        <img alt="" style={{ width: "200px" }} src={imgDefault} />
      ) : (
        <img alt="" style={{ width: "200px" }} src={data.postImg} />
      )}
      <Item.Content style={{ margin: "10px" }}>
        <Button basic floated="right" style={{ marginBottom: "12px" }}>
          {moment(data.createdAt).format("YYYY.MM.DD HH:mm")}
        </Button>
        <Item.Header as="h1">
          <a
            target="_blank"
            href={`https://www.nl.go.kr/kolisnet/search/searchResultAllList.do?tab=ALL&historyYn=Y&keywordType1=total&keyword1=${data.bookName}`}
            rel="noreferrer"
          >
            [{data.bookName}]
          </a>{" "}
          {data.title}
        </Item.Header>
        <Item.Meta>
          {data.userName} / {data.affiliation}
        </Item.Meta>
        <Form>
          <TextArea
            style={{ border: "none" }}
            rows={11}
            value={data.content}
            readOnly
          />
        </Form>
      </Item.Content>
    </Item>
  );
}

export default BoardDetail;
