const isValidURL = require("./validate-url");
const error = require("./error");

module.exports = validateBody = (req, res, next) => {
  const { url } = req.body;

  if (!url) return next(error(400, "Body must have 'url' property."));

  if (typeof url !== "string" && !Array.isArray(url))
    return next(error(400, "URL type must be array of strings or string."));

  if (Array.isArray(url)) {
    if (!url.length) return next(error(400, "URL array is empty."));

    const areUrlsValid = url.every((u) => isValidURL(u));
    if (!areUrlsValid) return next(error(400, "All URLs must be valid."));
  }

  if (!isValidURL(url)) return next(error(400, "URL is invalid."));

  next();
};
