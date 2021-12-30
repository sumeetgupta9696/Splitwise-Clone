const User = require("../../models/UserModel");
const Group = require("../../models/GroupModel");
const Bill = require("../../models/BillModel");

const handle_request = (msg, callback) => {
  const res = {};
  console.log(msg);
  User.findById(msg.userId).then((user) => {
    Bill.findById(msg.billid).then((bill) => {
      if(bill){
        const newComment = {
          name: user.name,
          comment: msg.comment,
        };
        bill.comments.push(newComment);
        bill.save();
        res.status = 200;
        res.data = 'COMMENT_CREATED';
        callback(null, res);
        }
        else {
          console.log(err);
          res.status = 201;
          res.data = err;
          callback(null, res);
        }

    }).catch((e) => {
        console.log(e);
        res.status = 500;
        res.data = e;
        callback(null, res);
    });
  }).catch((e) => {
      console.log(e);
      res.status = 500;
      res.data = e;
      callback(null, res);
  })
};

exports.handle_request = handle_request;
