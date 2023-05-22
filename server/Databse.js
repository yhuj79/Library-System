const fs = require("fs");
const mysql = require("mysql");

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWD,
  port: process.env.COPORT,
  database: process.env.DB,
});
db.connect();

module.exports = db;