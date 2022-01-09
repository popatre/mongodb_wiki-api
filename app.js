const express = require("express");
const { rmSync } = require("fs");
const app = express();
const path = require("path");

app.use(express.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

const apiRouter = require("./routers/api-router");

app.set("port", process.env.port || 3000);

app.get("/", (req, res, next) => {
    res.send("<h1>Hello world<h1>");
});

app.use("/api", apiRouter);

app.listen(app.get("port"), (server) => {
    console.info(`Server listen on port ${app.get("port")}`);
});