const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

// 사용자 id 검증
router.get("/authentication", (req, res) => {
  const { userID } = req.query;

  db.query(`SELECT * FROM sys.USER WHERE userID="${userID}"`, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      try {
        res.status(200).json(result);
      } catch (error) {
        res.status(500).json(error);
      }
    }
  });
});

// 로그인 요청 처리
router.post("/login", (req, res) => {
  const { userID, passwd } = req.body;

  db.query(
    `SELECT * FROM sys.USER WHERE userID="${userID}" AND passwd="${passwd}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        if (!result[0]) {
          res.status(403).json("Not Authorized");
        } else {
          try {
            // JWT 토큰 생성
            const token = jwt.sign(
              {
                userID: result[0].userID,
                userName: result[0].userName,
                email: result[0].email,
                userAffiliation: result[0].userAffiliation,
                profileImg: result[0].profileImg,
                admin: result[0].admin,
              },
              process.env.ACCESS_SECRET,
              {
                expiresIn: "60m",
                issuer: "About Tech",
              }
            );
            // JWT 토큰 전송
            res.status(200).json(token);
          } catch (error) {
            res.status(500).json(error);
          }
        }
      }
    }
  );
});

// 로그아웃 요청 처리
router.post("/logout", (req, res) => {
  try {
    // 쿠키 삭제
    res.cookie("token", "");
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
});

// 회원가입 요청 처리
router.post("/register", (req, res) => {
  const {
    userID,
    passwd,
    passwdValidation,
    email,
    userName,
    userAffiliation,
    profileImg,
  } = req.body;

  // 입력값에 대한 정규 표현식(아이디, 이름, 비밀번호, 이메일)
  const regexId = /^[A-za-z0-9]{4,12}$/;
  const regexName = /^[가-힣]{2,15}$/;
  const regexPw =
    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
  const regexEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  db.query(
    // 중복되지 않은 아이디인가를 시작으로 입력들에 대한 검증 진행
    `SELECT userID FROM sys.USER WHERE userID="${userID}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        // 각 오류에 맞는 메시지 전송
        if (result.length > 0) {
          res.status(403).json("userID Duplication");
        } else if (!regexId.test(userID)) {
          res.status(403).json("userID Validate Failed");
        } else if (!regexName.test(userName)) {
          res.status(403).json("userName Validate Failed");
        } else if (!regexPw.test(passwd)) {
          res.status(403).json("passwd Validate Failed");
        } else if (passwd != passwdValidation) {
          res.status(403).json("passwd Discrepancy");
        } else if (!regexEmail.test(email)) {
          res.status(403).json("email Validate Failed");
        } else if (!regexName.test(userAffiliation)) {
          res.status(403).json("userAffiliation Validate Failed");
        } else {
          // 검증이 완료되면 새로운 사용자 정보 INSERT
          const sql = "INSERT INTO sys.USER VALUES (?, ?, ?, ?, ?, ?, b'0')";
          const params = [
            userID,
            email,
            userName,
            passwd,
            userAffiliation,
            profileImg,
          ];
          db.query(sql, params, (err, rows, fields) => {
            res.send(rows);
          });
        }
      }
    }
  );
});

// 사용자 정보 수정
router.post("/mypage/update", (req, res) => {
  const {
    userID,
    passwd,
    passwdValidation,
    email,
    userName,
    userAffiliation,
    profileImg,
  } = req.body;

  // 입력값에 대한 정규 표현식(아이디, 이름, 비밀번호, 이메일)
  const regexId = /^[A-za-z0-9]{4,12}$/;
  const regexName = /^[가-힣]{2,15}$/;
  const regexPw =
    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
  const regexEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  // 각 오류에 맞는 메시지 전송
  if (!regexId.test(userID)) {
    res.status(403).json("userID Validate Failed");
  } else if (!regexName.test(userName)) {
    res.status(403).json("userName Validate Failed");
  } else if (!regexPw.test(passwd)) {
    res.status(403).json("passwd Validate Failed");
  } else if (passwd != passwdValidation) {
    res.status(403).json("passwd Discrepancy");
  } else if (!regexEmail.test(email)) {
    res.status(403).json("email Validate Failed");
  } else if (!regexName.test(userAffiliation)) {
    res.status(403).json("userAffiliation Validate Failed");
  } else {
    // 검증이 완료되면 수정된 사용자 정보 INSERT
    const sql =
      "UPDATE sys.USER SET userID= ?, email= ?, userName= ?, passwd= ?, userAffiliation= ?, profileImg= ? WHERE userID= ?";

    const params = [
      userID,
      email,
      userName,
      passwd,
      userAffiliation,
      profileImg,
      userID,
    ];
    db.query(sql, params, (err, rows, fields) => {
      res.send(rows);
    });
  }
});

// 사용자 대출 목록 조회
router.get("/mypage/list/lent", (req, res) => {
  const { userID } = req.query;
  db.query(
    // BOOK 테이블과 LENT 테이블을 조인하여 사용자의 대출 목록을 조회하는 쿼리
    `SELECT B.bookID, B.title, B.bookImg, B.author, B.publisher, B.year, B.genre, B.address, B.page, L.userID, L.lentAt, L.returnedAt
    FROM sys.BOOK as B
    LEFT OUTER JOIN sys.LENT as L
    ON B.bookID=L.bookID
    WHERE L.userID="${userID}"`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// 사용자 도서 신청글 목록 조회
router.get("/mypage/list/board", (req, res) => {
  const { userID } = req.query;
  db.query(
    // BOOK 테이블과 LENT 테이블을 조인하여 사용자의 대출 목록을 조회하는 쿼리
    `SELECT * FROM sys.BOARD WHERE userID="${userID}"`,
    (err, data) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(data);
      }
    }
  );
});

// 사용자 탈퇴 처리
router.post("/delete", (req, res) => {
  const { userID } = req.body;
  // '?' 파라미터에 user id값을 받아 DELETE
  const sql = "DELETE FROM sys.USER WHERE userID=?";
  const params = [userID];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = router;
