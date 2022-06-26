const { seed } = require("../__tests__/seed");
const { devData } = require("./devData");
const mongoose = require("mongoose");

const runSeed = (seedData) => {
    mongoose.connection.collections.articles.drop(() => {
        seed(seedData);
    });
};

runSeed(devData, null);
