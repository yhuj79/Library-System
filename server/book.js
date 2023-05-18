const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

router.get("/list", (req, res) => {
  db.query(
    `SELECT title, bookImg, author, publisher, year, genre fROM sys.BOOK WHERE bookID in (SELECT MAX(bookID) FROM sys.BOOK GROUP BY title)`,
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
    `SELECT * fROM sys.BOOK WHERE title="${title}"`,
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
