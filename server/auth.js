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
                expiresIn: "5m",
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
    res.status(500).json(error);
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

router.get("/test", (req, res) => {
  const userID = "admin";
  const passwd = "admin";

  db.query(
    `SELECT * FROM sys.USER WHERE userID="${userID}" AND passwd="${passwd}"`,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result[0]);
      }
    }
  );
});

module.exports = router;
