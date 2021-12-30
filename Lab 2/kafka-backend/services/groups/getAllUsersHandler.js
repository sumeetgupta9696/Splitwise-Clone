/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
const User = require('../../models/UserModel');

const handle_request = async (msg, callback) => {
  const res = {};
  await User
    .find({ _id: { $ne: msg.userId } }, { _id: 0, name: 1, email: 1 })
    .then((result) => {
      if (result.length > 0) {
        console.log(result);
        res.status = 200;
        res.data = [...result];
        callback(null, res);
      } else {
        res.status = 404;
        callback(null, res);
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

exports.handle_request = handle_request;
