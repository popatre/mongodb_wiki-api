const express = require("express");
const articlesRouter = require("./articles-router");
const apiRouter = express.Router();

apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
