const express = require('express');
const router = express.Router();
const { isEmpty } = require('lodash');
const queries = require('../database/queries');
const { ROLE } = require('../helpers/constants');
const { getAuthorization } = require('../helpers/user');

router.get('/films', async (req, res, next) => {
  try {
     // control auth user
    const roleUser = await getAuthorization(req, res, next);
    if (roleUser !== ROLE.ADMIN) {
      return res.status(403).send("Error: Access Denied");
    }
    const findFilms = await queries.getFilms()
    if( isEmpty(findFilms.films)) {
      return res.status(404).send("films not found");
     }
     return res.json(findFilms.films);
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

router.get('/films/:id', async (req, res, next) => {
  try {
     // control auth user
    const roleUser = await getAuthorization(req, res, next);
    if (roleUser !== ROLE.ADMIN) {
      res.status(403).send("Error: Access Denied");
    }
    const findFilm = await queries.getFilm(req.params["id"]);
    if( isEmpty(findFilm.film)) {
      return res.status(404).send("Error: film not found");
     }
     return res.json(findFilm.film);
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

router.get('/news', async (req, res, next) => {
  try {
    // control auth user
    const roleUser = await getAuthorization(req, res, next);
    // if not admin - Error
    if (roleUser !== ROLE.ADMIN) {
      return res.status(403).send("Error: Access Denied");
    }
    // find all news
    const findNews = await queries.getNews();
    if( isEmpty(findNews.news)) {
      return res.status(404).send("News not found");
     }
     return res.json(findNews.news);
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

router.get('/news/:id', async (req, res, next) => {
  try {
    const roleUser = await getAuthorization(req, res, next);
    if (roleUser !== ROLE.ADMIN) {
      res.status(403).send("Error: Access Denied");
    }

    // find news by Id
    const findNews = await queries.getNewsId(req.params["id"]);
    if( isEmpty(findNews.news)) {
      return res.status(404).send("News not found");
     }

    return res.json(findNews.news);
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

module.exports = router;