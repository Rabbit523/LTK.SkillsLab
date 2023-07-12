const request = require("supertest");
const app = require("./index.js");

describe("Test root path", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/");
    expect(res.statusCode).toEqual(200);
  });
});

describe("GET /loans", () => {
  it("should return all loans", async () => {
    const res = await request(app).get("/loans");
    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toEqual(2);
  });
});
