import React, { useRef } from "react";
import { Button, Modal, Table } from "semantic-ui-react";
import QR from "./QRCode";
import ReactToPrint from "react-to-print";

function BookStockModal({ data, open, setOpen }) {
  const ref = useRef();
  return (
    <Modal
      ref={ref}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
    >
      <Modal.Header>위치 정보</Modal.Header>
      <Modal.Content>
        <Modal.Description>
          <QR url={window.location.href} />
          <Table basic="very">
            <Table.Body>
              <Table.Row>
                <Table.Cell>제목</Table.Cell>
                <Table.Cell>{data.title}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>저자</Table.Cell>
                <Table.Cell>{data.author}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>발행사항</Table.Cell>
                <Table.Cell>
                  {data.publisher} / {data.year}
                </Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>장르</Table.Cell>
                <Table.Cell>{data.genre}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>페이지 수</Table.Cell>
                <Table.Cell>{data.page}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>식별번호</Table.Cell>
                <Table.Cell>{data.bookID}</Table.Cell>
              </Table.Row>
              <Table.Row>
                <Table.Cell>도서 위치</Table.Cell>
                <Table.Cell>{data.address}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)} secondary>
          닫기
        </Button>
        <ReactToPrint
          trigger={() => <Button positive>인쇄</Button>}
          content={() => ref.current}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default BookStockModal;
