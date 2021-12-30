var assert = require("assert");
var supertest = require("supertest");
var should = require("should");

var server = supertest.agent("http://localhost :3001");

//Unit Test begin
describe("MochaTest", function () {
  //User Login
  it("should login", function (done) {
    server
      .post("/api/get")
      .send({
        email: "admin@gmail.com",
        password: "admin",
      })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
    //user sign up
    it("Should sign up", function (done) {
        server
          .put("/api/insert")
          .send({
            username: "Chipotle",
            email: "chipotle@gmail.com",
            password: "chipotle"
          })
          .expect(200)
          .end(function (err, res) {
            console.log("Status: ", res.status);
            res.status.should.equal(200);
            done();
          });
      });
      //Add group page
      it("Should add group", function (done) {
        server
          .post("/api/insertgroup")
          .send({
            groupid: "9696",
            groupname: "roommates",
            id: "3",
            username: "admin"
          })
          .expect(200)
          .end(function (err, res) {
            console.log("Status: ", res.status);
            res.status.should.equal(200);
            done();
          });
      });
       //Get Single Event
  it("Should search the given user by username", function (done) {
    server
      .get("/users/searchbyname")
      .query({ username: "admin" })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
  it("Should search the given user by email", function (done) {
    server
      .get("/users/searchbyemail")
      .query({ email: "admin@gmail.com" })
      .expect(200)
      .end(function (err, res) {
        console.log("Status: ", res.status);
        res.status.should.equal(200);
        done();
      });
  });
});