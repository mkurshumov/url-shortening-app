const request = require("supertest");
const app = require("../app");

const { encodedUrls, urls } = require("../data/data");

// mock data
encodedUrls.set("http://google.com", "https://tpx.com/abcdefgh");
urls.set("https://tpx.com/abcdefgh", "http://google.com");

encodedUrls.set("http://facebook.com", "https://tpx.com/ijklmnop");
urls.set("https://tpx.com/ijklmnop", "http://facebook.com");

describe("POST /encode", () => {
  test("Successful encoding - one url", async () => {
    const response = await request(app)
      .post("/encode")
      .send({ url: "http://google.com" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ url: "https://tpx.com/abcdefgh" });
  });

  test("Successful encoding - list of urls", async () => {
    const response = await request(app)
      .post("/encode")
      .send({ url: ["http://google.com", "http://facebook.com"] });

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      url: ["https://tpx.com/abcdefgh", "https://tpx.com/ijklmnop"],
    });
  });

  test("Failed encoding - no body", async () => {
    const response = await request(app).post("/encode").send();

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "Body must have 'url' property.",
    });
  });

  test("Failed encoding - invalid url type", async () => {
    const response = await request(app).post("/encode").send({ url: 1 });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "URL type must be array of strings or string.",
    });
  });

  test("Failed encoding - invalid URL format - single", async () => {
    const response = await request(app)
      .post("/encode")
      .send({ url: "www.google.com" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "URL is invalid.",
    });
  });

  test("Failed encoding - invalid URL format - list", async () => {
    const response = await request(app)
      .post("/encode")
      .send({ url: ["www.google.com"] });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "All URLs must be valid.",
    });
  });

  test("Failed encoding - empty URL list", async () => {
    const response = await request(app).post("/encode").send({ url: [] });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "URL array is empty.",
    });
  });
});

describe("POST /decode", () => {
  test("Successful decoding - one url", async () => {
    const response = await request(app)
      .post("/decode")
      .send({ url: "https://tpx.com/abcdefgh" });

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({ url: "http://google.com" });
  });

  test("Successful decoding - list of valid urls", async () => {
    const response = await request(app)
      .post("/decode")
      .send({ url: ["https://tpx.com/abcdefgh", "https://tpx.com/ijklmnop"] });

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      url: ["http://google.com", "http://facebook.com"],
    });
  });

  test("Successful decoding - list of at least one valid url", async () => {
    const response = await request(app)
      .post("/decode")
      .send({ url: ["https://tpx.com/qweqwe", "https://tpx.com/ijklmnop"] });

    expect(response.statusCode).toBe(200);
    expect(response.body).toStrictEqual({
      url: ["Encoded URL not found", "http://facebook.com"],
    });
  });

  test("Failed decoding - encoded url not found", async () => {
    const response = await request(app).post("/decode").send({
      url: "http://twitter.com",
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      error: "Encoded URL not found",
    });
  });

  test("Failed decoding - no body", async () => {
    const response = await request(app).post("/decode").send();

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "Body must have 'url' property.",
    });
  });

  test("Failed decoding - invalid url type", async () => {
    const response = await request(app).post("/decode").send({ url: 1 });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "URL type must be array of strings or string.",
    });
  });

  test("Failed decoding - invalid URL format - single", async () => {
    const response = await request(app)
      .post("/decode")
      .send({ url: "www.google.com" });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "URL is invalid.",
    });
  });

  test("Failed decoding - invalid URL format - list", async () => {
    const response = await request(app)
      .post("/decode")
      .send({ url: ["www.google.com"] });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "All URLs must be valid.",
    });
  });

  test("Failed decoding - empty URL list", async () => {
    const response = await request(app).post("/decode").send({ url: [] });

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      error: "URL array is empty.",
    });
  });
});

describe("GET PUT POST DELETE /", () => {
  test("GET - API endpoint not found", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      error: "API endpoint not found",
    });
  });

  test("PUT - API endpoint not found", async () => {
    const response = await request(app).put("/");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      error: "API endpoint not found",
    });
  });

  test("POST - API endpoint not found", async () => {
    const response = await request(app).post("/");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      error: "API endpoint not found",
    });
  });

  test("DELETE - API endpoint not found", async () => {
    const response = await request(app).delete("/");

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      error: "API endpoint not found",
    });
  });
});
