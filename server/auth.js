const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

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
            res.status(200).json(token);
          } catch (error) {
            res.status(500).json(error);
          }
        }
      }
    }
  );
});

router.post("/logout", (req, res) => {
  try {
    res.cookie("token", "");
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
});

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

  const regexId = /^[A-za-z0-9]{4,12}$/;
  const regexName = /^[가-힣]{2,15}$/;
  const regexPw =
    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
  const regexEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

  db.query(
    `SELECT userID FROM sys.USER WHERE userID="${userID}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
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

  const regexId = /^[A-za-z0-9]{4,12}$/;
  const regexName = /^[가-힣]{2,15}$/;
  const regexPw =
    /^[A-Za-z0-9`~!@#\$%\^&\*\(\)\{\}\[\]\-_=\+\\|;:'"<>,\./\?]{8,20}$/;
  const regexEmail =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

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

router.get("/mypage/list/lent", (req, res) => {
  const { userID } = req.query;
  db.query(
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

module.exports = router;
