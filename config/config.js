require("dotenv").config();

let { name = 'root', password, database = 'pily', host = '127.0.0.1', database_port = '3306' } = process.env

module.exports = {
  username: name,
  password,
  database,
  host,
  port: database_port,
  "dialect": "mysql"
}

require("dotenv").config();
