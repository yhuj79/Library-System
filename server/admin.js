const router = require("express").Router();
const jwt = require("jsonwebtoken");
const db = require("./Databse");

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

router.get("/user/all", (req, res) => {
  db.query(`SELECT * FROM sys.USER ORDER BY admin DESC`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.get("/book/all", (req, res) => {
  db.query(
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

router.post("/book/insert", (req, res) => {
  const { title, bookImg, author, publisher, year, genre, address, page } =
    req.body;

  const regexPage = /^[0-9]+$/;

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
    res.status(403).json("Value Not Found");
  }
});

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
    res.status(403).json("Value Not Found");
  }
});

router.post("/book/delete", (req, res) => {
  const { bookID } = req.body;
  const sql = "DELETE FROM sys.BOOK WHERE bookID=?";
  const params = [bookID];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

router.get("/bookstat/validate", (req, res) => {
  const { title } = req.query;
  db.query(`SELECT * fROM sys.BOOKSTAT WHERE title="${title}"`, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json(data);
    }
  });
});

router.post("/bookstat/insert", (req, res) => {
  const { title } = req.body;
  const sql = "INSERT INTO sys.BOOKSTAT VALUES (?, '0')";
  const params = [title];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

router.post("/bookstat/update", (req, res) => {
  const { title } = req.body;
  const sql = "UPDATE sys.BOOKSTAT SET lentStat = lentStat + 1 WHERE title = ?";
  const params = [title];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

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

router.post("/book/lent", (req, res) => {
  const { userID, bookID } = req.body;
  const sql =
    "INSERT INTO sys.LENT VALUES (?, ?, now(), DATE_ADD(NOW(), INTERVAL 15 DAY))";
  const params = [userID, bookID];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

router.post("/book/returned", (req, res) => {
  const { bookID, userID } = req.body;
  const sql = "DELETE FROM sys.LENT WHERE userID=? AND bookID=?";
  const params = [userID, bookID];
  db.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

module.exports = router;
