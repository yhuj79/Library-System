import React from "react";
import { Item } from "semantic-ui-react";
import imgDefault from "../assets/book/imgDefault.png";

function BookDeatail({ data }) {
  return (
    <Item>
      {data.bookImg === "imgDefault" ? (
        <img alt="" style={{ width: "200px" }} src={imgDefault} />
      ) : (
        <img alt="" style={{ width: "200px" }} src={data.bookImg} />
      )}
      <Item.Content style={{ margin: "10px" }}>
        <Item.Header as="h1">{data.title}</Item.Header>
        <Item.Description>저자 : {data.author}</Item.Description>
        <Item.Description>
          발행사항 : {data.publisher} / {data.year}
        </Item.Description>
        <Item.Description>장르 : {data.genre}</Item.Description>
        <Item.Description>페이지 수 : {data.page} P</Item.Description>
      </Item.Content>
    </Item>
  );
}

export default BookDeatail;
