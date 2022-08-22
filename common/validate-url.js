module.exports = isValidURL = (value) => {
  let url;

  try {
    url = new URL(value);
  } catch (e) {
    return false;
  }

  return url.protocol === "http:" || url.protocol === "https:";
};
