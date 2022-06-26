const mongoose = require("mongoose");

const ENV = process.env.NODE_ENV || "development";

require("dotenv").config({
    path: `${__dirname}/../.env.${ENV}`,
});

if (!ENV) {
    throw new Error("Database URI not set");
}

mongoose
    .connect(process.env.MONGODB_URI)
    .then((res) => {
        const connectedDB = res.connections[0].name;
        console.log(`Connection successful to DB - ${connectedDB}`);
    })
    .catch((err) => console.log(err));

// mongoose.connect("mongodb://localhost:27017/wikiDB");

const { Schema } = mongoose;

const articleSchema = new Schema({
    title: String,
    content: String,
});

exports.Article = mongoose.model("Article", articleSchema);
