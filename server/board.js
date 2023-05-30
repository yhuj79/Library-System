const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

// 도서 신청글 목록 조회
router.get("/list", (req, res) => {
  db.query(
    // BOARD 테이블 내용을 content 제외한 값들만 최신 ID값 순으로 정렬
    `SELECT postID, userID, userName, affiliation, title, bookName, postImg, createdAt FROM sys.BOARD ORDER BY postID DESC`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// 도서 신청글 조회
router.get("/id", (req, res) => {
  const { postID } = req.query;
  db.query(
    // 해당 postID의 글 정보를 반환
    `SELECT * FROM sys.BOARD WHERE postID="${postID}"`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// 도서 신청글 추가 요청 처리
router.post("/insert", (req, res) => {
  const { userID, userName, affiliation, title, bookName, postImg, content } =
    req.body;

  // 값의 길이로 검증
  if (
    userID.length > 0 &&
    userName.length > 0 &&
    affiliation.length > 0 &&
    title.length > 0 &&
    bookName.length > 0 &&
    postImg.length > 0 &&
    content.length > 0
  ) {
    // 검증이 완료되면 새로운 도서 신청 글 INSERT
    const sql = "INSERT INTO sys.BOARD VALUES (?, ?, ?, ?, ?, ?, ?, ?, now())";
    const params = [
      userID,
      userID,
      userName,
      affiliation,
      title,
      bookName,
      postImg,
      content,
    ];

    db.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
  } else {
    // 오류 메시지 전송
    res.status(403).json("Value Not Found");
  }
});

// 도서 신청글 수정
router.post("/update", (req, res) => {
  const {
    postID,
    userID,
    userName,
    affiliation,
    title,
    bookName,
    postImg,
    content,
  } = req.body;

  // 값의 길이로 검증
  if (
    userID.length > 0 &&
    userName.length > 0 &&
    affiliation.length > 0 &&
    title.length > 0 &&
    bookName.length > 0 &&
    postImg.length > 0 &&
    content.length > 0
  ) {
    // 검증이 완료되면 수정된 글 UPDATE
    const sql =
      "UPDATE sys.BOARD SET userID= ?, userName= ?, affiliation= ?, title= ?, bookName= ?, postImg= ?, content= ? WHERE postID= ?";
    const params = [
      userID,
      userName,
      affiliation,
      title,
      bookName,
      postImg,
      content,
      postID,
    ];

    db.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
  } else {
    // 오류 메시지 전송
    res.status(403).json("Value Not Found");
  }
});

// 도서 신청글 삭제 요청 처리
router.post("/delete", (req, res) => {
    const { postID } = req.body;
    // '?' 파라미터에 글 id값을 받아 DELETE
    const sql = "DELETE FROM sys.BOARD WHERE postID=?";
    const params = [postID];
    db.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
  });

module.exports = router;
