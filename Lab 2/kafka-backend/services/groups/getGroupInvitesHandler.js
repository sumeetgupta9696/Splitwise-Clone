const User = require('../../models/UserModel');
const Group = require('../../models/GroupModel');

const handle_request = (msg, callback) => {
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      Group.find({ _id: { $in: user.invitations } })
        .then((groups) => {
          if (groups.length > 0) {
            res.data = groups.map((group) => group.groupName);
            res.status = 200;
            callback(null, res);
          } else {
            res.status = 404;
            callback(null, res);
          }
        })
        .catch((e) => {
          res.status = 404;
          callback(null, e);
        });
    })
    .catch((e) => {
      res.status = 404;
      callback(null, e);
    });
};

exports.handle_request = handle_request;
