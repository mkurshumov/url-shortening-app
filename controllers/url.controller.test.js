const urlController = require("./url.controller");
const { encodedUrls, urls } = require("../data/data");

describe("Successful generation of encoded url", () => {
  test("Generation and saving of encoded url", async () => {
    const getEncodedUrl = urlController.__get__("_getEncodedUrl");

    const encodedUrl = getEncodedUrl("http://youtube.com");

    expect(encodedUrl).toEqual(expect.stringContaining("https://tpx.com/"));
    expect(encodedUrls.has("http://youtube.com")).toEqual(true);
    expect(urls.has(encodedUrl)).toEqual(true);
  });
});
