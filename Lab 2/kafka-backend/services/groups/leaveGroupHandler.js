const Group = require('../../models/GroupModel');
const User = require('../../models/UserModel');

const handle_request = async (msg, callback) => {
  const res = {};
  console.log("inside leave group services");
  console.log(msg);
  console.log(msg.groupName);
  console.log(msg.userId);
  await Group.findOneAndUpdate({ groupName: msg.groupName },
    { $pull: { members: msg.userId } },)
    .then((group) => {
      console.log(group._id);
      User.findByIdAndUpdate(msg.userId,
        { $pull: { memberships: group._id } })
        .then((result) => {
          if (result) {
            console.log("leave group successful");
            res.status = 200;
            res.data = 'LEAVEGROUP_SUCCESSFUL';
            callback(null, res);
          } else {
            res.status = 404;
            res.data = 'LEAVEGROUP_UNSUCCESSFUL';
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
