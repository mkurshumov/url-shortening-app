const urlRouter = require("express").Router();

const validateBody = require("../common/validate-body");

const { encode, decode } = require("../controllers/url.controller");

urlRouter.post("/encode", validateBody, encode, (req, res) => {
  res.json({ url: req.data });
});

urlRouter.post("/decode", validateBody, decode, (req, res) => {
  res.json({ url: req.data });
});

module.exports = urlRouter;
