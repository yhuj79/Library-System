const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

router.get("/list/new", (req, res) => {
  db.query(
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

router.get("/list/popular", (req, res) => {
  db.query(
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

router.get("/title", (req, res) => {
  const { title } = req.query;
  db.query(
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
