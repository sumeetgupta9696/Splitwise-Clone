const Group = require('../../models/GroupModel');

const handle_request = async (msg, callback) => {
  const res = {};
  try {
    // console.log(`msg GroupName : ${msg.groupName}`);
    const group = await Group.findOne({ name: msg.groupName });
    if (!group) {
      res.status = 404;
      callback(null, res);
    } else {
      group.image = msg.fileUrl;
      group.save((saveError) => {
        if (saveError) {
          res.status = 500;
          res.message = 'Error in Data';
        } else {
          const userObject = {
            groupImageURL: group.image,
          };
          res.status = 200;
          res.message = userObject;
        }
        callback(null, res);
      });
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

exports.handle_request = handle_request;
