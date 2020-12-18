const connection = require('../db');
const request = require('request')


const getAllArticles = (req, res) => {
  const sqlCommand = `SELECT * FROM articles `;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
};

const createNewArticle = (req, res) => {
  const sqlCommand = `INSERT INTO articles (title, description, author) VALUES (?,?,?)`;
  const data = [req.body.title, req.body.description, req.body.author];
  connection.query(sqlCommand, data, (err, result, field) => {
    if (err) throw err;
    res.json(result);
  });
};

const changeArticleTitleById = (req, res) => {
  const sqlCommand = `UPDATE articles SET title = ? WHERE id = ?`;
  const data = [req.params.newTitle, req.params.id];
  connection.query(sqlCommand, data, (err, result, field) => {
    if (err) throw err;
    res.json('Success change article title ');
  });
};

const changeArticleAuthorById = (req, res) => {
  const sqlCommand = `UPDATE articles SET author = ? WHERE id = ?`;
  const data = [req.body.newAuthor, req.params.id];
  connection.query(sqlCommand, data, (err, result, field) => {
    if (err) throw err;
    res.json('Success change article author name');
  });
};

const deleteArticleById = (req, res) => {
  const sqlCommand = `DELETE FROM articles where id=?`;
  const data = [req.params.id];
  connection.query(sqlCommand, data, (err, result, field) => {
    if (err) throw err;
    res.json('Success delete article by id');
  });
};

const deleteArticleByAuthor = (req, res) => {
  const sqlCommand = `UPDATE articles SET is_deleted = ? WHERE author = ?`;
  const data = [1, req.body.author];
  connection.query(sqlCommand, data, (err, result, field) => {
    if (err) throw err;
    res.json('Success delete articles by author name');
  });
};

const login = (req, res) => {
  const data = [req.body.userName, req.body.password];
  const sqlCommand = `SELECT * FROM user WHERE userName = '${data[0]}';`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    res.json(result[0] ? result[0].password === data[1] : false);
  });
};

const signUp = (req, res) => {
  const data = [req.body.userName, req.body.password, req.body.email];
  const sqlCommand = `INSERT INTO user (userName, password, email) VALUES ('${data[0]}','${data[1]}','${data[2]}')`;
  connection.query(sqlCommand, data, (err, result, field) => {
    if (err) throw err;
    res.json(result);
  });
};


const getWeather = (req, res) => {
  const website = 'https://home.openweathermap.org/';
  const api = 'http://api.openweathermap.org/data/2.5/weather?q=Amman&appid=73f1f2a6974aa0c8f4b1266f31da3248&units=metric';
  request(api, function (error, response, body) {
    console.error('error:', error); // Print the error if one occurred
    console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    console.log('body:', body); // Print the HTML for the Google homepage.
    res.send(body)
  });

};

module.exports = {
  getAllArticles,
  createNewArticle,
  changeArticleTitleById,
  changeArticleAuthorById,
  deleteArticleById,
  deleteArticleByAuthor,
  signUp,
  login,
  getWeather
};