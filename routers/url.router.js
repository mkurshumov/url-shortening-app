const urlRouter = require("express").Router();

const { encode, decode } = require("../controllers/url.controller");

urlRouter.post("/encode", encode, (req, res) => {
  res.json({ url: req.data });
});

urlRouter.post("/decode", decode, (req, res) => {
  res.json({ url: req.data });
});

module.exports = urlRouter;
