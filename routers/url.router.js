const urlRouter = require("express").Router();

const validateBody = require("../common/validate-body");

const { encodeUrl, decodeUrl } = require("../controllers/url.controller");

urlRouter.post("/encode", validateBody, encodeUrl, (req, res) => {
  res.json({ url: req.data });
});

urlRouter.post("/decode", validateBody, decodeUrl, (req, res) => {
  res.json({ url: req.data });
});

module.exports = urlRouter;
