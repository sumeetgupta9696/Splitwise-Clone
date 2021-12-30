const mongoose = require('mongoose');

const { Schema } = mongoose;

const groupsSchema = new Schema({
  groupName: {
    type: String,
    required: true,
  },
  groupImage: {
    type: String,
    default: 'https://testbucket9696.s3.us-east-2.amazonaws.com/groupImages/default-pic.png',
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'user',
  }],
  bills: [{
    type: Schema.Types.ObjectId,
    ref: 'bill',
  }],
},
{
  versionKey: false,
});

module.exports = mongoose.model('group', groupsSchema);
