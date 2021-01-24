const express = require('express');
const { isEmpty } = require('lodash');
const queries = require('../database/queries');
const router = express.Router();

router.get('/', (req, res, next) => {
 res.send("Home page");
});

router.get('/afisha', async (req, res, next) => {
  try {
    const findFilms = await queries.getFilms();
    if(isEmpty(findFilms.films)) {
      return res.status(404).send("films not found");
     }
     return res.json(findFilms.films);
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

router.get('/film/:id', async (req, res, next) => {
  try {
    const findFilm = await queries.getFilm(req.params["id"]);
     if(isEmpty(findFilm.film)) {
      return res.status(404).send("Film not found");
     }
     return res.json(findFilm.film);
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

router.get('/cinema/news', async (req, res, next) => {
  try {
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

router.get('/cinema/news/:id', async (req, res, next) => {
  try {
    // find news by Id
    const findNews = await queries.getNewsId(req.params["id"]);
    if(isEmpty(findNews.news)) {
      return res.status(404).send("News not found");
     }
     return res.json(findNews.news);
  } catch (error) {
    console.error(`Error: `, error.message);
    next(error);
  }
});

module.exports = router;