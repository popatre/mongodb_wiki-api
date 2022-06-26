const app = require("./app");

app.listen(app.get("port"), (server) => {
    console.info(`Server listen on port ${app.get("port")}`);
});
