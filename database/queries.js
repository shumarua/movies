const db = require('./queriesDb');

const getFilms = async () => {
  const films = await db.query('SELECT id, name, discription FROM movie');
  return {
    films
  }
}

const getFilm = async (id) => {
  const film = await db.query(`SELECT id, name, discription FROM movie WHERE id="${id}"`);
  return {
    film
  }
}

const createUser = async (data) => {
  const {
    userName,
    password,
    role,
  } = data;
  // const user = await db.query(`INSERT INTO users (name, role, password) VALUES (${userName}, ${role}, ${password})`);
  const user = await db.query(
    'INSERT INTO users (name, role, password) VALUES (?, ?, ?)', 
    [userName, role, password]
  );
  let message = 'Error in creating user';

  if (user.affectedRows) {
    message = 'User created';
  }
  return {
    message
  };
}

const getUserName = async (name) => {
  const user = await db.query(`SELECT id, name, role, password FROM users WHERE name="${name}"`);
  return {
    user
  }
}

const getUserId = async (id) => {
  const user = await db.query(`SELECT id, name, role, password FROM users WHERE id="${id}"`);
  return {
    user
  }
}
const getNewsId = async (id) => {
  const news = await db.query(`SELECT id, name, text FROM news WHERE id="${id}"`);
  return {
    news
  }
}

const getNews = async () => {
  const news = await db.query('SELECT id, name, text FROM news');
  return {
    news
  }
}

module.exports = {
  getFilms,
  getFilm,
  createUser,
  getUserName,
  getUserId,
  getNewsId,
  getNews
}