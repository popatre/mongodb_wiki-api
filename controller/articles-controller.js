const { red } = require("color-name");
const { Article } = require("../model/db");

exports.getAllArticles = (req, res, next) => {
    Article.find((err, foundArticles) => {
        if (err) {
            res.send(err);
        } else {
            res.send(foundArticles);
        }
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
                res.status(200).send(foundArticle);
            } else {
                res.status(404).send("Article not found");
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
        { overwrite: true },
        (err) => {
            if (!err) {
                res.status(201).send("successful update");
            } else {
                next(err);
            }
        }
    );
};

exports.patchArticle = (req, res, next) => {
    const { article_title } = req.params;

    Article.updateOne(
        { title: article_title },
        { $set: req.body },
        { upsert: false },
        (err) => {
            if (!err) {
                res.status(201).send("success on update");
            } else {
                res.send("error");
            }
        }
    );
};

exports.deleteOneArticle = (req, res, next) => {
    const { article_title } = req.params;

    Article.deleteOne({ title: article_title }, (err) => {
        if (!err) {
            res.sendStatus(204);
        } else {
            res.send(err);
        }
    });
};
