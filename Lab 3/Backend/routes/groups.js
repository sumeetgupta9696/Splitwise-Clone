const express = require('express');
const jwtDecode = require('jwt-decode');
const { checkAuth } = require('../config/passport');
const kafka = require('../kafka/client');

const router = express.Router();

const {GETGROUPINVITESHANDLER}=require('../kafka/topics');

router.get('/invites', checkAuth, (req, res) => {
  req.body.path = 'get-groups-invites';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.make_request(GETGROUPINVITESHANDLER, req.body, (err, results) => {
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
      // return res.status(201).json({ errors: [{ message: 'System Error' }] });
    } else {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        groupInvites: results.data,
      }));
      // res.status(200).send(JSON.parse(results.data));
    }
  });
});

const {GETGROUPMEMBERSHIPSHANDLER}=require('../kafka/topics');

router.get('/memberships', checkAuth, (req, res) => {
  req.body.path = 'get-groups-memberships';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.make_request(GETGROUPMEMBERSHIPSHANDLER, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      res.writeHead(404, {
        'Content-Type': 'application/json',
      });
      console.log(`member: ${JSON.stringify(results)}`);
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
      // return res.status(201).json({ errors: [{ message: 'System Error' }] });
    } else {
      console.log(`member: ${JSON.stringify(results)}`);
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({
        groupMemberships: results.data,
      }));
      // res.status(200).send(JSON.parse(results.data));
    }
  });
});

const {GETALLUSERSHANDLER}=require('../kafka/topics');

router.get('/users', checkAuth, (req, res) => {
  req.body.path = 'get-all-users';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.make_request(GETALLUSERSHANDLER, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 404) {
      res.writeHead(201, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'NO_USERS' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ users: results.data }));
    }
  });
});

const {GETGROUPDETAILSHANDLER}=require('../kafka/topics');

router.get('/:groupName', checkAuth, (req, res) => {
  req.body.path = 'get-group-details';
  req.body.params = req.params.groupName;
  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;
  kafka.make_request(GETGROUPDETAILSHANDLER, req.body, (err, results) => {
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
      res.end(JSON.stringify({
        groupDetails: results.data,
      }));
    }
  });
});

const {CREATEGROUPHANDLER}=require('../kafka/topics');

router.post('/', checkAuth, (req, res) => {
  req.body.path = 'create-new-group';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.make_request(CREATEGROUPHANDLER, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'DUPLICATE_GROUP' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'GROUP_CREATED' }));
    }
  });
});

const {ACCEPTINVITEHANDLER}=require('../kafka/topics');

router.post('/accept', checkAuth, (req, res) => {
  req.body.path = 'group-accept-invite';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.make_request(ACCEPTINVITEHANDLER, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'INVITE_ACCEPTED' }));
    }
  });
});

const {REJECTINVITEHANDLER}=require('../kafka/topics');

router.post('/reject', checkAuth, (req, res) => {
  req.body.path = 'group-reject-invite';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.make_request(REJECTINVITEHANDLER, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'INVITE_REJECTED' }));
    }
  });
});

const {LEAVEGROUPHANDLER}=require('../kafka/topics');

router.post('/leave', checkAuth, (req, res) => {
  console.log("testing insdie leave-------- ", typeof req.body);
  console.log(req.body);
  // const temp = JSON.stringify(res.body);
  let temp = Object.keys((req.body))[0];
  console.log("---------temp-----", temp);
  req.body.groupName = temp;
  req.body.path = 'group-leave';

  const decodedToken = jwtDecode(req.headers.authorization);
  req.body.userId = decodedToken.id;

  kafka.make_request(LEAVEGROUPHANDLER, req.body, (err, results) => {
    if (err) {
      res.writeHead(500, {
        'Content-Type': 'application/json',
      });
      res.end({ message: err });
    } else if (results.status === 400) {
      res.writeHead(results.status, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'SOMETHING_WENT_WRONG' }));
    } else {
      res.writeHead(200, {
        'Content-Type': 'application/json',
      });
      res.end(JSON.stringify({ message: 'INVITE_REJECTED' }));
    }
  });
});

module.exports = router;
