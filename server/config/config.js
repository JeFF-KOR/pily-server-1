require("dotenv").config();

let { name = 'root', password, database = 'pily', host = 'localhost', database_port = '3306' } = process.env

module.exports = {
  username: name,
  password,
  database,
  host,
  port: database_port,
  "dialect": "mysql"
}