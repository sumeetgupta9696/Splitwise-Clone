const Group = require('../../models/GroupModel');
const User = require('../../models/UserModel');

const handle_request = async (msg, callback) => {
  const res = {};

  await Group.findOne({ groupName: msg.groupName })
    .then((group) => {
      User.findByIdAndUpdate(msg.userId,
        { $pull: { invitations: group._id } })
        .then((result) => {
          if (result) {
            res.status = 200;
            res.data = 'INVITE_REJECTED';
            callback(null, res);
          } else {
            res.status = 404;
            res.data = 'NO_INVITATIONS';
            callback(null, res);
          }
        })
        .catch((e) => {
          res.status = 400;
          res.data = e;
          callback(null, res);
        });
    }).catch((e) => {
      res.status = 400;
      res.data = e;
      callback(null, res);
    });
};

exports.handle_request = handle_request;
