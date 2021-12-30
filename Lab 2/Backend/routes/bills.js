const express = require('express');
const jwtDecode = require('jwt-decode');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

const { ADDEXPENSEHANDLER } = require("../kafka/topics");

router.post('', checkAuth, (req, res) => {
  req.body.path = 'add-expense';
  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.make_request(ADDEXPENSEHANDLER, req.body, (err, results) => {
    if (err) {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        message: results.data,
      }));
    }
  });
});

const { ADDCOMMENTHANDLER } = require("../kafka/topics");

router.post('/addcomment', checkAuth, (req, res) => {
  req.body.path = 'add-comment';
  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;
  console.log("testing add comment inside backend ",req.body);
  kafka.make_request(ADDCOMMENTHANDLER, req.body, (err, results) => {
    if (err) {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        message: results.data,
      }));
    }
  });
});



module.exports = router;
