const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/wikiDB");

const { Schema } = mongoose;

const articleSchema = new Schema({
    title: String,
    content: String,
});

exports.Article = mongoose.model("Article", articleSchema);
