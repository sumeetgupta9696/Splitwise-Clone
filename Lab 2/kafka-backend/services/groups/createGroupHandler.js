const Group = require('../../models/GroupModel');
const User = require('../../models/UserModel');

const handle_request = async (msg, callback) => {
  const res = {};
  const groupExists = await Group.findOne({ groupName: msg.groupName });
  if (groupExists) {
    res.status = 400;
    callback(null, res);
  } else {
    await Group.create({ groupName: msg.groupName, members: [msg.userId] }, (groupErr, group) => {
      if (groupErr) {
        res.status = 404;
        callback(null, res);
      }
      User.findById(msg.userId)
        .then(async (user) => {
          await user.memberships.push(group._id);
          await user.save();
        });
      msg.invitedMembers.map((invitedMemberEmail) => {
        User.findOneAndUpdate(
          { email: invitedMemberEmail },
          { $push: { invitations: group._id } },
          async (err) => {
            if (err) {
              console.log(err);
            }
          },
        );
      });
      res.data = JSON.stringify(group);
      res.status = 201;
      callback(null, res);
    });
  }
};

exports.handle_request = handle_request;
