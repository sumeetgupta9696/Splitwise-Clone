const User = require('../../models/UserModel');
const Group = require('../../models/GroupModel');
const Bill = require('../../models/BillModel');

const handle_request = (msg, callback) => {
  const res = {};
  User.findById(msg.userId)
    .then((user) => {
      Group.findOne({ groupName: msg.groupName })
        .then((group) => {
          Bill.create({
            description: msg.description,
            billAmount: msg.billAmount,
            paidby: user.name,
            group: group.groupName,
            participants: {
              users: group.members,
              splitAmount: msg.billAmount / group.members.length,
            },
          }, async (err, bill) => {
            if (bill) {
              console.log(bill);
              await group.bills.push(bill._id);
              await group.save();
              await user.bills.push(bill._id);
              await user.save();
              res.status = 200;
              res.data = 'BILL_CREATED';
              callback(null, res);
            } else {
              console.log(err);
              res.status = 201;
              res.data = err;
              callback(null, res);
            }
          });
        }).catch((e) => {
          console.log(e);
          res.status = 500;
          res.data = e;
          callback(null, res);
        });
    })
    .catch((e) => {
      console.log(e);
      res.status = 500;
      res.data = e;
      callback(null, res);
    });
};

exports.handle_request = handle_request;
