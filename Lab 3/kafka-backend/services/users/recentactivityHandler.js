const User = require('../../models/UserModel');

const handle_request = (msg, callback) => {
    const res = {};
    User.findById(msg.userId)
      .populate('bills')
      .exec((err, user) => {
        if (user) {
          res.data = {
            name: user.name,
            bills: user.bills
          };
          res.status = 200;
          callback(null, res);
        } else if (err) {
            res.status = 201;
            res.data = err;
            callback(null, res);
          }
      });
  };
  
  exports.handle_request = handle_request;
  