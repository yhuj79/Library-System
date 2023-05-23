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