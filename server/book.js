const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

// 신규 도서 목록 조회
router.get("/list/new", (req, res) => {
  db.query(
    // 각 책 제목별로 가장 큰 bookID를 가진 책의 정보를 반환, 그 결과를 출판 연도(year)와 bookID의 역순으로 정렬하여 반환
    // 기본적으로 출판 연도 순으로 정렬되고, 연도가 같을 경우 등록이 늦게 된 순으로 위에 정렬
    `SELECT B.bookID, B.title, B.bookImg, B.author, B.publisher, B.year, B.genre
    FROM sys.BOOK AS B
    INNER JOIN (
        SELECT MAX(bookID) AS maxBookID
        FROM sys.BOOK
        GROUP BY title
    ) AS MaxID ON B.bookID = MaxID.maxBookID
    ORDER BY B.year DESC, B.bookID DESC`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// 인기 도서 목록 조회
router.get("/list/popular", (req, res) => {
  db.query(
    // 책의 정보와 해당 책의 대여 상태를 반환
    // 조인 조건에 따라 BOOK 테이블과 BOOKSTAT 테이블이 조인되며,
    // 책 제목별로 가장 큰 bookID를 가진 행들만 선택 후 lentStat을 내림차순으로 정렬하여 반환
    `SELECT B.title, B.bookImg, B.author, B.publisher, B.year, B.genre, S.lentStat
    FROM sys.BOOK as B
    INNER JOIN sys.BOOKSTAT as S
    ON B.title = S.title
    WHERE B.bookID IN (SELECT MAX(bookID) FROM sys.BOOK GROUP BY title)
    ORDER BY lentStat DESC`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// 도서 상세 정보 조회
router.get("/title", (req, res) => {
  const { title } = req.query;
  db.query(
    // 책의 정보와 해당 책의 대여 정보를 반환
    // 왼쪽 조인을 사용하여 모든 책의 정보를 선택하고, 대여 정보가 있는 경우 해당 정보를 포함
    // 조건에 따라 책의 제목이 title인 행들만 선택되며, 필요한 열들이 선택되고 반환
    `SELECT B.bookID, B.title, B.bookImg, B.author, B.publisher, B.year, B.genre, B.address, B.page, L.userID, L.lentAt, L.returnedAt
    FROM sys.BOOK as B
    LEFT OUTER JOIN sys.LENT as L
    ON B.bookID=L.bookID
    WHERE B.title="${title}"`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

module.exports = router;
