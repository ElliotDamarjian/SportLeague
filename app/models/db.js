const mysql = require("mysql2");
const dbConfig = require("../config/db.config.js");

const pool = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB
});

const promisePool = pool.promise();

let db = {
  query: async (sql, params) => {
    [result,] = await promisePool.query(sql, params);
    return result;
  }
};

module.exports = db;