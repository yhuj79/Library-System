const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

// 권리자 권한 확인
router.get("/access", (req, res) => {
  const { admin } = req.query;
  try {
    if (admin == 1) {
      res.status(200).json(admin);
    } else {
      res.status(403).json("Not Accessed");
    }
  } catch (error) {
    res.status(444).json(error);
  }
});

// 전체 사용자 정보 조회
router.get("/user/all", (req, res) => {
  db.query(`SELECT * FROM sys.USER ORDER BY admin DESC`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});

// 전체 도서 정보 조회
router.get("/book/all", (req, res) => {
  db.query(
    // BOOK 테이블과 LENT 테이블을 조인하여 책의 정보와 대출 정보를 함께 조회하는 쿼리
    // 제목 열을 기준으로 오름차순 정렬
    `SELECT B.bookID, B.title, B.bookImg, B.author, B.publisher, B.year, B.genre, B.address, B.page, L.userID, L.lentAt, L.returnedAt
    FROM sys.BOOK as B
    LEFT OUTER JOIN sys.LENT as L
    ON B.bookID=L.bookID
    ORDER BY title`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// 도서 추가 요청 처리
router.post("/book/insert", (req, res) => {
  const { title, bookImg, author, publisher, year, genre, address, page } =
    req.body;

  // 입력값에 대한 정규 표현식(페이지 수)
  const regexPage = /^[0-9]+$/;

  // 회원가입 요청에 비해 검증이 관대함
  // 값의 길이, 페이지 수 정규식으로 검증
  if (
    title.length > 0 &&
    bookImg.length > 0 &&
    author.length > 0 &&
    publisher.length > 0 &&
    year.length > 0 &&
    genre.length > 0 &&
    address.length > 0 &&
    page.length > 0 &&
    regexPage.test(page)
  ) {
    // 검증이 완료되면 새로운 도서 정보 INSERT
    const sql = "INSERT INTO sys.BOOK VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [
      title,
      title,
      bookImg,
      author,
      publisher,
      year,
      genre,
      address,
      page,
    ];
    db.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
  } else {
    // 오류 메시지 전송
    res.status(403).json("Value Not Found");
  }
});

// 도서 정보 수정
router.post("/book/update", (req, res) => {
  const {
    bookID,
    title,
    author,
    publisher,
    year,
    genre,
    address,
    bookImg,
    page,
  } = req.body;

  // 입력값에 대한 정규 표현식(페이지 수)
  const regexPage = /^[0-9]+$/;

  if (
    String(title).length > 0 &&
    String(bookImg).length > 0 &&
    String(author).length > 0 &&
    String(publisher).length > 0 &&
    String(year).length > 0 &&
    String(genre).length > 0 &&
    String(address).length > 0 &&
    String(page).length > 0 &&
    regexPage.test(page)
  ) {
    // 검증이 완료되면 수정된 도서 정보 INSERT
    const sql =
      "UPDATE sys.BOOK SET title= ?, bookImg= ?, author= ?, publisher= ?, year= ?, genre= ?, address= ?, page= ? WHERE bookID= ?";
    const params = [
      title,
      bookImg,
      author,
      publisher,
      year,
      genre,
      address,
      page,
      bookID,
    ];
    db.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
  } else {
     // 오류 메시지 전송
    res.status(403).json("Value Not Found");
  }
});

// 도서 삭제 요청 처리
router.post("/book/delete", (req, res) => {
  const { bookID } = req.body;
  // '?' 파라미터에 도서 id값을 받아 DELETE
  const sql = "DELETE FROM sys.BOOK WHERE bookID=?";
  const params = [bookID];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// BOOKSTAT 테이블 검증
router.get("/bookstat/validate", (req, res) => {
  const { title } = req.query;
  // 테이블에 요청 쿼리의 이름을 가진 도서가 이미 등록이 되있는가 확인
  db.query(`SELECT * FROM sys.BOOKSTAT WHERE title="${title}"`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});

// BOOKSTAT 테이블 INSERT
router.post("/bookstat/insert", (req, res) => {
  const { title } = req.body;
  const sql = "INSERT INTO sys.BOOKSTAT VALUES (?, '0')";
  const params = [title];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 대출 시 대출횟수 증가 요청 처리
router.post("/bookstat/update", (req, res) => {
  const { title } = req.body;
  // lentStat 열의 값을 1 증가
  const sql = "UPDATE sys.BOOKSTAT SET lentStat = lentStat + ? WHERE title = ?";
  const params = [1, title];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 대출 전 검증
// 여러 명의 관리자가 같은 id값의 도서를 동시에 대출 처리할 경우 발생할 수 있는 문제를 방지
router.get("/book/lent/validate", (req, res) => {
  const { bookID } = req.query;
  db.query(`SELECT * FROM sys.LENT WHERE bookID="${bookID}"`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});

// 대출 요청 처리
router.post("/book/lent", (req, res) => {
  const { userID, bookID } = req.body;
  // LENT 테이블에 사용자와 도서 id, 현재 시간, 15일 후 시간을 추가
  const sql =
    "INSERT INTO sys.LENT VALUES (?, ?, now(), DATE_ADD(NOW(), INTERVAL 15 DAY))";
  const params = [userID, bookID];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

// 반납 요청 처리
// 반납 시에는 id가 없을 경우 요청이 발생하지 않기 때문에 검증 필요 없음
router.post("/book/returned", (req, res) => {
  const { bookID, userID } = req.body;
  // LENT 테이블에서 삭제
  const sql = "DELETE FROM sys.LENT WHERE userID=? AND bookID=?";
  const params = [userID, bookID];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = router;
