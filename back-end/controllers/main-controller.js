// عشان اعمل تيبل بال cp
// CREATE TABLE articles (
//   id int  AUTO_INCREMENT NOT NULL,
//   title varchar(100),
//   description varchar(255),
//   author varchar(50),
//   is_deleted TINYINT DEFAULT 0,
//   PRIMARY KEY (id)
// );

const connection = require("../db");

let articles = [
  {
    id: 1,
    title: "eat fried chicken",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    author: "jouza",
  },
  {
    id: 4,
    title: "how to studey react",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit.",
    author: "abd",
  },
  {
    id: 8,
    title: "how to vote",
    description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit",
    author: "amr",
  },
];
let last_ID = 7;
// 1
const getAllArticles = (req, res) => {
  console.log("getAllArticles done");
  const sqlCommand = `SELECT * FROM articles WHERE is_deleted = 0`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};
// 2
const createNewArticle = (req, res) => {
  console.log("CALLED createNewArticle");
  const { title, description, author } = req.body;
  // const sqlCommand = `INSERT INTO articles (title, description, author) VALUES ("${req.body.title}","${req.body.description}","${req.body.author}");;`        هاي نفس يلي تحت بس بطريقة تانية
  const sqlCommand = `INSERT INTO articles (title,  description, author)
   VALUES ("${title}","${description}","${author}");`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json("createNewArticle done");
  });
};
// 3
const changeArticleTitleById = (req, res) => {
  console.log("changeArticleTitleById done");
  // عشان اعمل ابديت للتيبل يلي عندي
  //  UPDATE table_name
  //  SET column1 = value1, column2 = value2, ...
  // WHERE condition;
  // حطيت الكومن هون لانه ما بزبط احط كومنت بالباك تك
  // الدولار ساين عشان اعملها قيمة وليس سترينغ
  // لازم لما احط الدولار ساين احطها جوا سترينغ
  const sqlCommand = `
  UPDATE articles
SET title = "${req.params.newTitle}"
WHERE id = "${req.params.id}"
`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    //ما بزبط ارجع رس  جيسون الا وحدة
    res.json(result);
  });
};
// 4
const changeArticleAuthorById = (req, res) => {
  console.log(" changeArticleAuthorById done");
  const sqlCommand = `UPDATE articles
  SET author = "${req.body.newAuthor}"
  WHERE id = "${req.params.id}"`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};
/*5 hard delete
const deleteArticleById = (req, res) => {
  console.log(" done");
  const sqlCommand = `DELETE FROM articles WHERE 
id = "${req.params.id}";`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};*/

/*6 hard delet
const deleteArticleByAuthor = (req, res) => {
  console.log(" deleteArticleByAuthor done");
  const sqlCommand = `DELETE FROM articles 
  WHERE author = "${req.body.author}"`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};*/

// 5 soft delet (we do update)
const deleteArticleById = (req, res) => {
  console.log(" deleteArticleById done");
  const sqlCommand = `UPDATE articles
  SET is_deleted = 1
  WHERE id = "${req.params.id}"`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};
//  6 soft delete (we do update)
const deleteArticleByAuthor = (req, res) => {
  console.log(" deleteArticleByAuthor done");
  const sqlCommand =`UPDATE articles SET is_deleted = 1 WHERE author = "${req.body.author}"`;
  connection.query(sqlCommand, (err, result) => {
    if (err) throw err;
    console.log("RESULT: ", result);
    res.json(result);
  });
};

// غيرنا اسم الفنكشن عشان بدنا نشتغل mysql
// 1
const getAllArticles_express = (req, res) => {
  console.log("getAllArticles");
  res.json(articles);
};
// 2
const createNewArticle_express = (req, res) => {
  console.log("createNewArticle");
  console.log("REQ.BODY", req.body);
  req.body.id = ++last_ID;
  articles.push(req.body);
  res.json(articles);
};
// 3
const changeArticleTitleById_express = (req, res) => {
  console.log("changeArticleTitleById");
  console.log("REQ.PARAMS", req.params);
  console.log("ID:", req.params.id);
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == req.params.id) {
      articles[i].title = req.params.newTitle;
    }
  }
  res.json(articles);
};
// 4
const changeArticleAuthorById_express = (req, res) => {
  console.log("changeArticleAuthor");
  console.log("REQ.PARAMS", req.params);
  console.log("ID:", req.params.id);
  console.log("REQ.BODY", req.body.newAuthor);
  for (let i = 0; i < articles.length; i++) {
    if (articles[i].id == req.params.id) {
      articles[i].author = req.body.newAuthor;
    }
  }
  res.json(articles);
};
// 5
const deleteArticleById_express = (req, res) => {
  console.log("deleteArticleById");
  console.log("ID:", req.params.id);
  // الاندكس تاع المستخدم يلي بفلتر عليه ............... الاليمنت يلي بفلتره
  articles = articles.filter((elem, index) => {
    //هون انا بدي اخلي ال اي دي يلي ما بتساوي ال اي دي يلي دخلها المستخدم وبضيفهم على الاري يلي كانت عندي
    return req.params.id != elem.id;
  });
  console.log(articles);
  res.json(articles);
};
// 6
const deleteArticleByAuthor_express = (req, res) => {
  console.log("deleteArticleByAuthor");
  console.log("REQ.BODY", req.body);

  articles = articles.filter((elem, index) => {
    return req.body.author != elem.author;
  });
  console.log(articles);
  res.json(articles);
};

module.exports = {
  getAllArticles,
  createNewArticle,
  changeArticleAuthorById,
  changeArticleTitleById,
  deleteArticleById,
  deleteArticleByAuthor,
};
