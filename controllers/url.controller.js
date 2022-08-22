const crypto = require("crypto");

const { encodedUrls, decodedUrls } = require("../data/data");

const BASE_DOMAIN = "https://tpx.com/";

const _getEncodedUrl = (url) => {
  const savedDecodedUrl = decodedUrls.get(url);

  if (!savedDecodedUrl) {
    let encodedUrl = BASE_DOMAIN + crypto.randomBytes(4).toString("hex"); // generate random string

    // handler for when crypto.randomBytes generates already existing id
    // highly unlikely
    while (encodedUrls.has(encodedUrl)) {
      encodedUrl = BASE_DOMAIN + crypto.randomBytes(4).toString("hex"); // generate new random string
    }

    // save in 2 structures for faster lookup
    encodedUrls.set(encodedUrl, url);
    decodedUrls.set(url, encodedUrl);

    return encodedUrl;
  }

  return savedDecodedUrl;
};

const _getDecodedUrl = (url) => {
  const savedEncodedUrl = encodedUrls.get(url);

  return savedEncodedUrl || "Encoded URL not found";
};

const encodeUrl = (req, res, next) => {
  const { url } = req.body;

  req.data = Array.isArray(url)
    ? url.map((u) => _getEncodedUrl(u))
    : _getEncodedUrl(url);

  next();
};

const decodeUrl = (req, res, next) => {
  const { url } = req.body;

  req.data = Array.isArray(url)
    ? url.map((u) => _getDecodedUrl(u))
    : _getDecodedUrl(url);

  next();
};

module.exports = { encodeUrl, decodeUrl };
