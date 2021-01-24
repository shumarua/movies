const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isEmpty, last } = require('lodash');
const queries = require('../database/queries');

require('dotenv').config();

const { WORLDS_SECRET } = process.env;

const getAuthorization = async (req, res, next) => {
  const Authorization = req.header('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, WORLDS_SECRET);
    if (!userId) {
      return res.status(401).send("Not Authorization");
    }
    const currentUser = await queries.getUserId(userId);
    if (isEmpty(currentUser.user)) {
      return res.status(401).send("Not Authorization");
    }

    const dataUser = last(currentUser.user);
     return dataUser.role;
  }
  res.status(401).send("Not Authorization");
}

const generateHashPassword = async (data) => {
  const rawPassword = data;
  const saltRounds = 15;
  const salt = await bcrypt.genSalt(saltRounds);
  const password = await bcrypt.hash(rawPassword, salt);
  return password;
};

module.exports = {
  generateHashPassword,
  getAuthorization
}