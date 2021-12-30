const User = require('../models/UserModel');

const passportHandler = async (msg, callback) => {
  const res = {};
  try {
    const { userId } = msg;
    console.log(`User Id : ${userId}`);
    const user = await User.findById(userId);
    if (!user) {
      res.status = 404;
      callback(null, res);
    } else {
      res.status = 200;
      res.data = JSON.stringify(user);
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

function handle_request(msg, callback) {
  passportHandler(msg, callback);
}
exports.handle_request = handle_request;
