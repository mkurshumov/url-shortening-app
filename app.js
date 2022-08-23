const express = require("express");
const app = express();

const urlRouter = require("./routers/url.router");

app.use(express.json()); // for parsing application/json

app.use("/", urlRouter);

// general error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500).send({ error: err.message });
});

// 404 error handling, if no prior next is invoked
app.use((req, res, next) => {
  res.status(404).send({ error: "API endpoint not found" });
});

module.exports = app;
