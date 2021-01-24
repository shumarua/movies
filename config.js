require('dotenv').config();

const { 
  DB_NAME,
  DB_USER,
  DB_HOST,
  DB_PASSWORD
} = process.env;

const config = {
  db: {
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME
  }
}

module.exports = config;