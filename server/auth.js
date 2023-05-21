const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

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
            const accessToken = jwt.sign(
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
                expiresIn: "600m",
                issuer: "About Tech",
              }
            );

            const refreshToken = jwt.sign(
              {
                userID: result[0].userID,
                userName: result[0].userName,
                email: result[0].email,
                userAffiliation: result[0].userAffiliation,
                profileImg: result[0].profileImg,
                admin: result[0].admin,
              },
              process.env.REFRECH_SECRET,
              {
                expiresIn: "24h",
                issuer: "About Tech",
              }
            );

            res.cookie("accessToken", accessToken, {
              secure: false,
              httpOnly: true,
            });

            res.cookie("refreshToken", refreshToken, {
              secure: false,
              httpOnly: true,
            });

            res.status(200).json("login success");
          } catch (error) {
            res.status(500).json(error);
          }
        }
      }
    }
  );
});

router.get("/accesstoken", (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    db.query(
      `SELECT * FROM sys.USER WHERE userID="${data.userID}" AND passwd="${data.passwd}"`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const { passwd, ...others } = result[0];
          res.status(200).json(others);
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/refreshtoken", (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    const data = jwt.verify(token, process.env.REFRECH_SECRET);

    db.query(
      `SELECT * FROM sys.USER WHERE userID="${data.userID}" AND passwd="${data.passwd}"`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          const accessToken = jwt.sign(
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
              expiresIn: "1m",
              issuer: "About Tech",
            }
          );

          res.cookie("accessToken", accessToken, {
            secure: false,
            httpOnly: true,
          });

          res.status(200).json("Access Token Recreated");
        }
      }
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/login/success", (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, process.env.ACCESS_SECRET);

    db.query(
      `SELECT * FROM sys.USER WHERE userID="${data.userID}" AND passwd="${data.passwd}"`,
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json(data);
        }
      }
    );
  } catch (error) {
    // res.status(500).json(error);
  }
});

router.post("/logout", (req, res) => {
  try {
    res.cookie("accessToken", "");
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
