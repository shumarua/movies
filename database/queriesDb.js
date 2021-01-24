const mysql = require('mysql2/promise');
const config = require('../config');
const pool = mysql.createPool(config.db);

async function query(sql, params) {
  const [rows, fields] = await pool.execute(sql, params);
  return rows;
  // const data = await pool.execute(sql, params);
  // return data;
}

module.exports = {
  query
}