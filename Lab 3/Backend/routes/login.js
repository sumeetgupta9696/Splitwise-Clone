/* eslint-disable no-underscore-dangle */
const express = require("express");
const jwt = require("jsonwebtoken");
const kafka = require("../kafka/client");
const config = require("../config/config");
const { auth } = require("../config/passport");

const router = express.Router();

const { LOGINHANDLER } = require("../kafka/topics");

auth();

router.post("/", async (req, res) => {
  req.body.path = "user-login";
  kafka.make_request(LOGINHANDLER, req.body, (err, results) => {
    if (err) {
      res.json({
        status: "error",
        msg: err,
      });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "USER_DOES_NOT_EXIST" }));
    } else if (results.status === 403) {
      res.writeHead(results.status, {
        "Content-Type": "application/json",
      });
      res.end(JSON.stringify({ message: "INCORRECT_PASSWORD" }));
    } else {
      const token = jwt.sign(
        {
          id: results.data._id,
        },
        config.secret,
        {
          expiresIn: 1008000,
        }
      );
      const jwtToken = `JWT ${token}`;
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(
        JSON.stringify({
          name: results.data.name,
          email: results.data.email,
          phone: results.data.phone,
          language: results.data.language,
          currency: results.data.currency,
          timezone: results.data.timezone,
          image: results.data.image,
          message: "USER_LOGGED_IN",
          idToken: jwtToken,
        })
      );
    }
  });
});

module.exports = router;
