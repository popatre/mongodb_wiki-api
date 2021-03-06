const { Article } = require("../model/db");

exports.getAllArticles = (req, res, next) => {
    Article.find().then((articles) => {
        res.status(200).send({ articles });
    });
};

exports.addInfo = (req, res, next) => {
    const { title, content } = req.body;

    if (typeof title !== "string" || typeof content !== "string") {
        return Promise.reject(res.status(400).send({ msg: "Bad request" }));
    }

    const article = new Article({
        title: title,
        content: content,
    });
    article
        .save()
        .then((postedArticle) => {
            console.log(postedArticle);
            res.status(201).send({ article: postedArticle });
        })
        .catch(next);
};

exports.deleteArticles = (req, res, next) => {
    Article.deleteMany((err) => {
        if (!err) {
            res.status(204).send("Successful deletion of all articles");
        } else {
            res.send(err);
        }
    });
};

exports.getSingleArticle = (req, res, next) => {
    const { article_title } = req.params;

    Article.findOne({ title: article_title }, (err, foundArticle) => {
        if (!err) {
            if (foundArticle) {
                res.status(200).send({ article: foundArticle });
            } else {
                res.status(404).send({ msg: "Article not found" });
            }
        } else {
            next(err);
        }
    });
};

exports.replaceArticle = (req, res, next) => {
    const { article_title } = req.params;

    Article.replaceOne(
        { title: article_title },
        { title: req.body.title, content: req.body.content },
        { overwrite: true }
    )
        .then((log) => {
            if (log.matchedCount === 0) {
                return Promise.reject({
                    status: 404,
                    msg: "Article not found",
                });
            }

            return Article.findOne({ title: req.body.title });
        })
        .then((article) => {
            res.status(201).send({ article });
        })
        .catch(next);
};

exports.patchArticle = (req, res, next) => {
    const { article_title } = req.params;

    Article.updateOne(
        { title: article_title },
        { $set: req.body },
        { upsert: false }
    )
        .then((log) => {
            if (log.matchedCount === 0) {
                return Promise.reject({
                    status: 404,
                    msg: "Article not found",
                });
            }
            if (!log.acknowledged) {
                return Promise.reject({
                    status: 400,
                    msg: "Bad request - title and content are only valid keys",
                });
            }
            return Article.findOne({ title: article_title });
        })
        .then((article) => {
            res.status(200).send({ article });
        })
        .catch(next);
};

exports.deleteOneArticle = (req, res, next) => {
    const { article_title } = req.params;

    Article.deleteOne({ title: article_title })
        .then((log) => {
            if (log.deletedCount === 0) {
                return Promise.reject({
                    status: 404,
                    msg: "Article not found",
                });
            }
            res.sendStatus(204);
        })
        .catch(next);
};
