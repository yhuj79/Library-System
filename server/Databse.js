// db connect
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

// // 로컬 테스트 때 사용하는 코드 (json에서 정보 전달)
// const fs = require("fs");
// const mysql = require("mysql");

// const data = fs.readFileSync("./Database.json");
// const rds = JSON.parse(data);
// const db = mysql.createConnection({
//   host: rds.host,
//   user: rds.user,
//   password: rds.password,
//   port: rds.port,
//   database: rds.database,
// });
// db.connect();

// module.exports = db;