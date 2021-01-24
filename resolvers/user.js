const express = require('express');
const { isEmpty, last } = require('lodash');
const router = express.Router();
const queries = require('../database/queries');
const { generateHashPassword } = require('../helpers/user');
const { ROLE } = require('../helpers/constants')
const bodyParser = require("body-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const { WORLDS_SECRET } = process.env;

const urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/register', async (req, res, next) => {
  try {
    res.send("Registration page");
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

router.post('/register', urlencodedParser, async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    const findUser =  await queries.getUserName(userName);

    if (!isEmpty(findUser.user)) {
       return res.status(400).send(`Error: User with name ${userName} already used`);
    }

    const hashPassword = await generateHashPassword(password);

    const roleUser = ROLE.USER;

    const dataCreateUser = {
      userName,
      role: roleUser,
      password: hashPassword
    }

    res.json(await queries.createUser(dataCreateUser));

  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

router.post('/login', urlencodedParser, async (req, res, next) => {
  try {
    const userName = req.body.userName;
    const password = req.body.password;

    // get data current user
    const currentUser = await queries.getUserName(userName);

    if (isEmpty(currentUser.user)) {
      res.send(`Not found user with name ${userName}`);
    }

    const dataUser = last(currentUser.user);

    // control valid password
    const valid = await bcrypt.compare(password, dataUser.password);
    if (!valid) {
      return res.status(401).send("UserName or password is not valid");
    }

    const userToken = jwt.sign({ userId: dataUser.id }, WORLDS_SECRET, { expiresIn: '5h' });

    // delete password
    delete dataUser.password;
    delete dataUser.id;

    const dataReturn = {
      token: userToken,
      user: dataUser,
    }

    res.json(dataReturn);

  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

router.get('/logout', async (req, res, next) => {
  try {
    res.send("Logs out current logged in user session");
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

module.exports = router;