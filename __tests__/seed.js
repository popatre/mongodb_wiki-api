const { Mongoose } = require("mongoose");
const { Article } = require("../model/db");

let done = 0;

exports.seed = (data, done) => {
    data.forEach((datum) => {
        const article = new Article({
            title: datum.title,
            content: datum.content,
        });
        article.save().then(() => {
            console.count("data seeded");
            done++;
            if (done === data.length) {
                exit();
            }
        });
    });
};

function exit() {
    Mongoose.disconnect();
}
