exports.handleBadRoute = (req, res) => {
    res.status(404).send({ msg: "Route not found" });
};

exports.handleCustomErrors = (err, req, res, next) => {
    res.status(err.status).send({ msg: err.msg });
};
