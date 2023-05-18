import React from "react";
import { Item, Icon } from "semantic-ui-react";
import imgDefault from "../assets/book/imgDefault.png";

function BookDeatail({ data }) {
  return (
    <Item>
      {data.bookImg === "imgDefault" ? (
        <Item.Image src={imgDefault} />
      ) : (
        <Item.Image src={data.bookImg} />
      )}
      <Item.Content>
        <Item.Header style={{ marginBottom: "7px" }} as="h1">
          {data.title}
        </Item.Header>
        <Item.Description>저자 : {data.author}</Item.Description>
        <Item.Description>
          발행사항 : {data.publisher} / {data.year}
        </Item.Description>
        <Item.Description>장르 : {data.genre}</Item.Description>
        <Item.Description>페이지 수 : {data.page} P</Item.Description>
        <Item.Extra>
          <Icon color="green" name="check" /> 재고 있음
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}

export default BookDeatail;
