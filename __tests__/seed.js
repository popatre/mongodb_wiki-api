const mongoose = require("mongoose");
const { Article } = require("../model/db");

exports.seed = (data, done) => {
    let seedCount = 0;
    data.forEach((datum) => {
        const article = new Article({
            title: datum.title,
            content: datum.content,
        });
        article.save().then(() => {
            seedCount++;
            console.log("seed data", seedCount);
            if (seedCount === data.length) {
                if (done) {
                    done();
                }
                exit();
            }
        });
    });
};

function exit() {
    mongoose.disconnect();
}
