const express = require("express");
const mainRouter = express.Router();
const {
  getAllArticles,
  createNewArticle,
  changeArticleTitleById,
  changeArticleAuthor,
  deleteArticleById,
  deleteArticleByAuthor,
} = require("../controllers/main-controller");

mainRouter.get("/articles", getAllArticles);
mainRouter.post("/articles", createNewArticle);
mainRouter.put("/articles/:id/:newTitle", changeArticleTitleById);
mainRouter.put("/articles/:id", changeArticleAuthor);
mainRouter.delete("/articles/:id",deleteArticleById);
mainRouter.delete("/articles",deleteArticleByAuthor)
module.exports = mainRouter;
