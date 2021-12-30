require('./config/mongoose');


var connection = require('./kafka/connection');

//Importing topics
const {LOGINHANDLER,SIGNUPHANDLER}=require('./kafka/topics');
const {ADDEXPENSEHANDLER}=require('./kafka/topics');
const {ADDCOMMENTHANDLER}=require('./kafka/topics');
const {PASSPORTHANDLER}=require('./kafka/topics');

const {ACCEPTINVITEHANDLER}=require('./kafka/topics');
const {CREATEGROUPHANDLER}=require('./kafka/topics');
const {GETALLUSERSHANDLER}=require('./kafka/topics');
const {GETGROUPDETAILSHANDLER}=require('./kafka/topics');
const {GETGROUPINVITESHANDLER}=require('./kafka/topics');
const {GETGROUPMEMBERSHIPSHANDLER}=require('./kafka/topics');
const {REJECTINVITEHANDLER}=require('./kafka/topics');
const {LEAVEGROUPHANDLER}=require('./kafka/topics');

const {USERUPDATEIMAGEHANDLER}=require('./kafka/topics');
const {GROUPUPDATEIMAGEHANDLER}=require('./kafka/topics');

const {GETPROFILEHANDLER}=require('./kafka/topics');
const {UPDATEPROFILEHANDLER}=require('./kafka/topics');
const {RECENTACTIVITYHANDLER}=require('./kafka/topics');

//import services
var loginHandler = require('./services/account/loginHandler');
var signUpHandler = require('./services/account/signUpHandler');

var addExpenseHandler = require('./services/bills/addExpenseHandler');
var addcommenthandler = require('./services/bills/addcommenthandler');

var passportHandler= require('./services/passport');

var acceptInviteHandler= require('./services/groups/acceptInviteHandler');
var createGroupHandler= require('./services/groups/createGroupHandler');
var getAllUsersHandler= require('./services/groups/getAllUsersHandler');
var getGroupDetailsHandler= require('./services/groups/getGroupDetailsHandler');
var getGroupInvitesHandler= require('./services/groups/getGroupInvitesHandler');
var getGroupMembershipsHandler= require('./services/groups/getGroupMembershipsHandler');
var rejectInviteHandler= require('./services/groups/rejectInviteHandler');
var leaveGroupHandler= require('./services/groups/leaveGroupHandler');

var userUpdateImageHandler= require('./services/images/userUpdateImageHandler');
var groupUpdateImageHandler= require('./services/images/groupUpdateImageHandler');

var getProfileHandler= require('./services/users/getProfileHandler');
var updateProfileHandler= require('./services/users/updateProfileHandler');
var recentactivityHandler= require('./services/users/recentactivityHandler');

function handleTopicRequest(topic_name, fname) {
  //var topic_name = 'root_topic';
  var consumer = connection.getConsumer(topic_name);
  var producer = connection.getProducer();
  console.log("server is running ");
  consumer.on("message", function (message) {
      console.log("message received for " + topic_name + " ", fname);
      console.log(JSON.stringify(message.value));
      var data = JSON.parse(message.value);

      fname.handle_request(data.data, function (err, res) {
          console.log("after handle" , res);
          var payloads = [
              {
                  topic: data.replyTo,
                  messages: JSON.stringify({
                      correlationId: data.correlationId,
                      data: res,
                  }),
                  partition: 0,
              },
          ];
          producer.send(payloads, function (err, data) {
              console.log(data);
          });
          return;
      });
  });
}

handleTopicRequest(LOGINHANDLER, loginHandler);
handleTopicRequest(SIGNUPHANDLER, signUpHandler);

handleTopicRequest(ADDEXPENSEHANDLER, addExpenseHandler);
handleTopicRequest(ADDCOMMENTHANDLER, addcommenthandler);

handleTopicRequest(PASSPORTHANDLER, passportHandler);

handleTopicRequest(ACCEPTINVITEHANDLER, acceptInviteHandler);
handleTopicRequest(CREATEGROUPHANDLER, createGroupHandler);
handleTopicRequest(GETALLUSERSHANDLER, getAllUsersHandler);
handleTopicRequest(GETGROUPDETAILSHANDLER, getGroupDetailsHandler);
handleTopicRequest(GETGROUPINVITESHANDLER, getGroupInvitesHandler);
handleTopicRequest(GETGROUPMEMBERSHIPSHANDLER, getGroupMembershipsHandler);
handleTopicRequest(REJECTINVITEHANDLER, rejectInviteHandler);
handleTopicRequest(LEAVEGROUPHANDLER, leaveGroupHandler);

handleTopicRequest(USERUPDATEIMAGEHANDLER, userUpdateImageHandler);
handleTopicRequest(GROUPUPDATEIMAGEHANDLER, groupUpdateImageHandler);

handleTopicRequest(GETPROFILEHANDLER, getProfileHandler);
handleTopicRequest(UPDATEPROFILEHANDLER, updateProfileHandler);
handleTopicRequest(RECENTACTIVITYHANDLER, recentactivityHandler);



