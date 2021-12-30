const express = require('express');
const jwtDecode = require('jwt-decode');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

const {GETPROFILEHANDLER}=require('../kafka/topics');

router.get('/', checkAuth, (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwtDecode(token);

  req.body.path = 'user-get-profile';
  req.body.userId = decoded.id;

  kafka.make_request(GETPROFILEHANDLER, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        name: results.data.name,
        email: results.data.email,
        phone: results.data.phone,
        language: results.data.language,
        currency: results.data.currency,
        timezone: results.data.timezone,
        image: results.data.image,
        message: 'PROFILE_GET_SUCCESS',
      }));
    }
  });
});

const {UPDATEPROFILEHANDLER}=require('../kafka/topics');

router.put('/', checkAuth, (req, res) => {
  req.body.path = 'user-update-profile';

  kafka.make_request(UPDATEPROFILEHANDLER, req.body, (err, results) => {
    if (err) {
      res.json({
        status: 'error',
        msg: err,
      });
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        name: results.data.name,
        email: results.data.email,
        phone: results.data.phone,
        language: results.data.language,
        currency: results.data.currency,
        timezone: results.data.timezone,
        image: results.data.image,
        message: 'PROFILE_UPDATE_SUCCESS',
      }));
    }
  });
});

const {RECENTACTIVITYHANDLER}=require('../kafka/topics');

router.get('/recentactivity', checkAuth, (req, res) => {
  req.body.path = 'recent-activity';
  req.body.params = req.params.groupName;
  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;
  kafka.make_request(RECENTACTIVITYHANDLER, req.body, (err, results) => {
    console.log(results);
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: err }));
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify(results.data));
    }
  });
});

module.exports = router;
