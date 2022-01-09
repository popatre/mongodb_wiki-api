const express = require("express");
const {
    getAllArticles,
    addInfo,
    deleteArticles,
    getSingleArticle,
    replaceArticle,
} = require("../controller/articles-controller");
const articlesRouter = express.Router();

articlesRouter
    .route("/")
    .get(getAllArticles)
    .post(addInfo)
    .delete(deleteArticles);

articlesRouter
    .route("/:article_title")
    .get(getSingleArticle)
    .put(replaceArticle);

module.exports = articlesRouter;
