import { useState, useEffect } from "react";
import axios from "axios";
import { Icon, Table } from "semantic-ui-react";
import BookUpdateModal from "./BookUpdateModal";
import BookLentModal from "./BookLentModal";
import moment from "moment";

function BookChart({ searchValue }) {
  const [dataAll, setDataAll] = useState([]);
  const [data, setData] = useState([]);
  const [bookUpdateModalOpen, setBookUpdateModalOpen] = useState(false);
  const [bookLentModalOpen, setBookLentModalOpen] = useState(false);
  const [updData, setUpdData] = useState({});

  const today = moment();

  useEffect(() => {
    try {
      axios({
        url: `${process.env.REACT_APP_HOST}/admin/book/all`,
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

  function BookUpdateModalHandler(data) {
    setUpdData({
      bookID: data.bookID,
      title: data.title,
      author: data.author,
      publisher: data.publisher,
      year: data.year,
      genre: data.genre,
      address: data.address,
      bookImg: data.bookImg,
      page: data.page,
    });
    setBookUpdateModalOpen(true);
  }

  function BookLentModalHandler(data) {
    setUpdData({
      bookID: data.bookID,
      title: data.title,
      author: data.author,
      publisher: data.publisher,
      year: data.year,
      genre: data.genre,
      address: data.address,
      bookImg: data.bookImg,
      page: data.page,
    });
    setBookLentModalOpen(true);
  }

  function DateHandler(returnedAt) {
    if (returnedAt) {
      // 현재 시간과 returnedAt의 차이 계산
      const lentDuration = moment(returnedAt).diff(moment(today.format()));
      if (lentDuration > 0) {
        // 차이를 X일 Y시간 Z분 형식으로 표시
        const days = Math.floor(lentDuration / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (lentDuration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (lentDuration % (1000 * 60 * 60)) / (1000 * 60)
        );
        const formattedDuration = `${days}일 ${hours}시간 ${minutes}분`;
        return formattedDuration;
      } else {
        return "대출기간 초과";
      }
    }
  }

  async function ReturnedBook(bookID, userID) {
    await axios({
      url: `${process.env.REACT_APP_HOST}/admin/book/returned`,
      method: "POST",
      withCredentials: true,
      data: {
        bookID: bookID,
        userID: userID,
      },
    })
      .then((result) => {
        if (result.status === 200) {
          console.log("Returned Book Complete!");
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function ReturnedBookHandler(bookID, title, userID) {
    if (
      window.confirm(
        `(${bookID}) ${title} / ID : ${userID}\n반납 처리 하시겠습니까?`
      )
    ) {
      ReturnedBook(bookID, userID);
    }
  }

  return (
    <Table celled textAlign="center" compact size="small">
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
          <Table.HeaderCell>반납 남은 기간</Table.HeaderCell>
          <Table.HeaderCell>변경</Table.HeaderCell>
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
                {String(DateHandler(data.returnedAt)).substring(0, 2) ===
                "대출" ? (
                  <Table.Cell style={{ color: "#FF0000", fontWeight: "bold" }}>
                    {DateHandler(data.returnedAt)}
                  </Table.Cell>
                ) : String(DateHandler(data.returnedAt)).substring(0, 2) ===
                    "0일" ||
                  String(DateHandler(data.returnedAt)).substring(0, 2) ===
                    "1일" ? (
                  <Table.Cell style={{ color: "#FF5E00", fontWeight: "bold" }}>
                    {DateHandler(data.returnedAt)}
                  </Table.Cell>
                ) : (
                  <Table.Cell>{DateHandler(data.returnedAt)}</Table.Cell>
                )}
                <Table.Cell>
                  <Icon
                    name="edit"
                    circular
                    onClick={() => BookUpdateModalHandler(data)}
                  />
                  {data.returnedAt ? (
                    <Icon
                      name="sign-in"
                      circular
                      color="green"
                      onClick={() =>
                        ReturnedBookHandler(
                          data.bookID,
                          data.title,
                          data.userID
                        )
                      }
                    />
                  ) : (
                    <Icon
                      name="sign-out"
                      circular
                      color="blue"
                      onClick={() => BookLentModalHandler(data)}
                    />
                  )}
                </Table.Cell>
              </Table.Row>
            );
          })}
      </Table.Body>
      <BookUpdateModal
        open={bookUpdateModalOpen}
        setOpen={setBookUpdateModalOpen}
        data={updData}
      />
      <BookLentModal
        open={bookLentModalOpen}
        setOpen={setBookLentModalOpen}
        data={updData}
      />
    </Table>
  );
}

export default BookChart;
