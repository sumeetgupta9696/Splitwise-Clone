const User = require('../../models/UserModel');

const handle_request = async (msg, callback) => {
  const res = {};
  try {
    const user = await User.findById(msg.userId);
    if (!user) {
      res.status = 404;
      callback(null, res);
    } else {
      res.data = {
        name: user.name,
        email: user.email,
        phone: user.phone,
        language: user.language,
        currency: user.currency,
        timezone: user.timezone,
        image: user.image,
        _id: user._id,
      };
      res.status = 200;
      res.status = 200;
      callback(null, res);
    }
  } catch (e) {
    res.status = 500;
    callback(null, 'error');
  }
};

exports.handle_request = handle_request;
