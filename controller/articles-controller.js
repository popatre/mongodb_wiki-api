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

    const article = new Article({
        title: title,
        content: content,
    });
    article
        .save()
        .then((postedArticle) => {
            res.status(201).json(postedArticle);
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
