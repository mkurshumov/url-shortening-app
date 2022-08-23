const crypto = require("crypto");

const { encodedUrls, urls } = require("../data/data");

const BASE_DOMAIN = "https://tpx.com/";

// returns "https://tpx.com/abcdefgh"
const _getEncodedUrl = (url) => {
  let encodedUrl = encodedUrls.get(url);

  if (!encodedUrl) {
    encodedUrl = BASE_DOMAIN + crypto.randomBytes(4).toString("hex"); // generate random string

    // handler for when crypto.randomBytes generates already existing id
    // highly unlikely
    while (urls.has(encodedUrl)) {
      encodedUrl = BASE_DOMAIN + crypto.randomBytes(4).toString("hex"); // generate new random string
    }

    // save in 2 structures for faster lookup
    encodedUrls.set(url, encodedUrl);
    urls.set(encodedUrl, url);
  }

  return encodedUrl;
};

// returns "https://google.com"
const _getUrl = (encodedUrl) => {
  return urls.get(encodedUrl) || "Encoded URL not found";
};

const encode = (req, res, next) => {
  const { url } = req.body;

  req.data = Array.isArray(url)
    ? url.map((u) => _getEncodedUrl(u))
    : _getEncodedUrl(url);

  next();
};

const decode = (req, res, next) => {
  const { url } = req.body;

  const result = Array.isArray(url) ? url.map((u) => _getUrl(u)) : _getUrl(url);

  if (result === "Encoded URL not found") {
    return next(error(404, "Encoded URL not found"));
  }

  req.data = result;
  next();
};

module.exports = { encode, decode };
