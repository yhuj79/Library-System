import React from "react";
import { useNavigate } from "react-router-dom";
import { Item } from "semantic-ui-react";
import imgDefault from "../assets/book/imgDefault.png";
import styles from "../style/List.module.css";

function BookCard({ data }) {
  const navigate = useNavigate();

  return (
    <Item
      style={{ padding: "15px" }}
      className={styles.list}
      onClick={() => navigate(`/book/${data.title}`)}
    >
      {data.bookImg === "imgDefault" ? (
        <Item.Image src={imgDefault} />
      ) : (
        <Item.Image src={data.bookImg} />
      )}
      <Item.Content>
        <Item.Header style={{ marginBottom: "7px" }} as="h1">
          {data.title}
        </Item.Header>
        <Item.Meta>{data.author}</Item.Meta>
        <Item.Description>
          {data.publisher} / {data.year}
        </Item.Description>
        <Item.Description>{data.genre}</Item.Description>
      </Item.Content>
    </Item>
  );
}

export default BookCard;
