import React from "react";
import { Icon, Item, Table } from "semantic-ui-react";
import imgDefault from "../assets/book/imgDefault.png";
import styles from "../style/Image.module.css";

function BookDeatail({ data }) {
  return (
    <Item>
      {data.bookImg === "imgDefault" ? (
        <img alt="" className={styles.bookImg} src={imgDefault} />
      ) : (
        <img alt="" className={styles.bookImg} src={data.bookImg} />
      )}
      <Item.Content style={{ margin: "3px" }}>
        <Table
          style={{ height: "100%" }}
          striped
          collapsing
          singleLine
          color="green"
        >
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell colSpan="2" style={{ fontSize: "22px" }}>
                {data.title}
              </Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell collapsing>
                &emsp;
                <Icon name="pencil alternate" />
                &nbsp;저자&emsp;
              </Table.Cell>
              <Table.Cell>&emsp;{data.author}&emsp;</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &emsp;
                <Icon name="bookmark" />
                &nbsp;출판사&emsp;
              </Table.Cell>
              <Table.Cell>&emsp;{data.publisher}&emsp;</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &emsp;
                <Icon name="time" />
                &nbsp;출판 연도&emsp;
              </Table.Cell>
              <Table.Cell>&emsp;{data.year}&emsp;</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &emsp;
                <Icon name="sitemap" />
                &nbsp;장르&emsp;
              </Table.Cell>
              <Table.Cell>&emsp;{data.genre}&emsp;</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                &emsp;
                <Icon name="file outline" />
                &nbsp;페이지 수&emsp;
              </Table.Cell>
              <Table.Cell>&emsp;{data.page} P&emsp;</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Item.Content>
    </Item>
  );
}

export default BookDeatail;
