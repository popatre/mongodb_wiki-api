const { assert, expect } = require("chai");
const request = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const { seed } = require("./seed");
const { testData } = require("./testData");

beforeEach((done) => {
    mongoose.connection.collections.articles.drop(() => {
        seed(testData, done);

        // done();
    });
});

after(function () {
    mongoose.disconnect();
});

describe("GET /api/articles", () => {
    it("status 200 - returns all articles in the db", () => {
        return request(app)
            .get("/api/articles")
            .expect(200)
            .then(({ body }) => {
                assert.isArray(body.articles);
                expect(body.articles).to.have.lengthOf(10);
            });
    });
    it("status 404 - route not found", () => {
        return request(app)
            .get("/api/notARoute")
            .expect(404)
            .then(({ body }) => {
                expect(body.msg).to.eql("Route not found");
            });
    });
});

describe("POST /api/articles", () => {
    it("Status 201 - should return posted articles", () => {
        const testPost = { title: "Tester", content: "Hello world" };
        return request(app)
            .post("/api/articles")
            .send(testPost)
            .expect(201)
            .then(({ body }) => {
                expect(body.article).to.have.keys(
                    "content",
                    "_id",
                    "title",
                    "__v"
                );
                expect(body.article.title).to.eql("Tester");
                expect(body.article.content).to.eql("Hello world");
            });
    });
    it("status 400 - missing keys on post body", () => {
        const testPost = {};
        return request(app)
            .post("/api/articles")
            .send(testPost)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).to.eql("Bad request");
            });
    });
    it("status 400 - invalid data type on post body", () => {
        const testPost = { title: "Tester", content: 9999999 };
        return request(app)
            .post("/api/articles")
            .send(testPost)
            .expect(400)
            .then(({ body }) => {
                expect(body.msg).to.eql("Bad request");
            });
    });
});

describe.only("DELETE /api/articles", () => {
    it("status 204 - deletes all articles", () => {
        return request(app)
            .delete("/api/articles")
            .expect(204)
            .then(() => {
                return request(app).get("/api/articles").expect(200);
            })
            .then(({ body }) => {
                expect(body.articles).to.have.lengthOf(0);
            });
    });
});
