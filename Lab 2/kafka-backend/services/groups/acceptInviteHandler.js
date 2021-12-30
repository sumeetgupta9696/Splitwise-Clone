const Group = require('../../models/GroupModel');
const User = require('../../models/UserModel');

const handle_request = async (msg, callback) => {
  const res = {};
  await Group.findOneAndUpdate(
    { groupName: msg.groupName },
    { $push: { members: msg.userId } },
  ).then(async (group) => {
    await User.findByIdAndUpdate(msg.userId,
      {
        $pull: { invitations: group._id },
        $push: { memberships: group._id },
      })
      .then((result) => {
        if (result) {
          res.status = 200;
          res.data = 'INVITE_ACCEPTED';
          callback(null, res);
        }
      })
      .catch((e) => {
        console.log(e);
        res.status = 400;
        callback(null, res);
      });
  }).catch((e) => {
    console.log(e);
    res.status = 400;
    callback(null, res);
  });
};

exports.handle_request = handle_request;
