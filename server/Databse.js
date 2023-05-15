const fs = require("fs");
const mysql = require("mysql");

const data = fs.readFileSync("./Database.json");
const rds = JSON.parse(data);
const db = mysql.createConnection({
  host: rds.host,
  user: rds.user,
  password: rds.password,
  port: rds.port,
  database: rds.database,
});
db.connect();

module.exports = db;