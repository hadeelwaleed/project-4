const express = require("express");
const mainRouter = express.Router();
const {
  getAllArticles,
  createNewArticle,
  changeArticleTitleById,
  changeArticleAuthorById,
  deleteArticleById,
  deleteArticleByAuthor,
} = require("../controllers/main-controller");

mainRouter.get("/articles", getAllArticles);
mainRouter.post("/articles", createNewArticle);
mainRouter.put("/articles/:id/:newTitle", changeArticleTitleById);
mainRouter.put("/articles/:id", changeArticleAuthorById);
mainRouter.delete("/articles/:id", deleteArticleById);
mainRouter.delete("/articles", deleteArticleByAuthor);
module.exports = mainRouter;
