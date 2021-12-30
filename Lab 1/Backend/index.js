const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const hashFunction = require("password-hash");
const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "password",
  database: "sp_users",
  multipleStatements: "true",
});
const path = require("path");
const fs = require("fs");
const fileUpload = require("express-fileupload");

app.use(express.static(path.resolve("./public")));
app.use(fileUpload());

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/get", (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const sqlget = "Select * from user_details WHERE email=? AND password=?";
  connection.query(sqlget, [email, password], (err, result) => {
    if (!err) {
        console.log("inside login query");
      if (result.length == 1 && req.body.password === result[0].password) {
        console.log(result);
        userData = {
          id: result[0].id,
          name: result[0].username,
          email: result[0].email,
          currency: "$",
        };
        res.status(200).send(JSON.stringify(userData));
        // res.writeHead(200,{
        //     'Content-Type': 'text/plain'
        // })
        // res.end("Submitted Successfully");
      } else {
        // res.status(500).send('Something broke!')

        res.writeHead(204, {
          "Content-Type": "text/plain",
        });
        res.end("Invalid credentials");
      }
    } else {
        res.status(500).send('Something broke!')
    //   console.log(err);
    //   res.writeHead(204, {
    //     "Content-Type": "text/plain",
    //   });
    //   res.end("Database issues");
    }
  });
});

app.post("/api/insert", (req, res) => {
  console.log("inside signup api" + req.body);
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  var sqlInsert =
    "INSERT INTO user_details (username ,email, password) VALUES (?,?,?)";
  var sqlget2 = "Select * from user_details WHERE email=? AND password=?";
  connection.query(sqlInsert, [username, email, password], (err, result) => {
    console.log("inside sqlinsert" + err);
    if (!err) {
        console.log("no error insert query");
      connection.query(sqlget2, [email, password], (err, result) => {
        if (!err) {
          if (result.length == 1 && req.body.password == result[0].password) {
            userData = {
              id: result[0].id,
              name: result[0].username,
              email: result[0].email,
              currency: "$",
            };
            res.status(200).send(JSON.stringify(userData));
            // res.writeHead(200,{
            //     'Content-Type': 'text/plain'
            // })
            // res.end("Submitted Successfully");
          } else {
            res.writeHead(204, {
              "Content-Type": "text/plain",
            });
            res.end("Invalid credentials");
          }
        } else {
          console.log(err);
          res.writeHead(204, {
            "Content-Type": "text/plain",
          });
          res.status(404);
          res.end("Database issues");
        }
      });
    } else {
        res.status(500).send('Something broke!')
    }
    // res.send("landing page, inserted values in db");
  });
  // console.log(email);
});

//get user about by id
app.get("/users/userbyid/:id", (req, res) => {
  var id = req.params.id;

  var sql = `select * from user_details where id="${id}"`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err.response);
      res.end("Error:", err);
    } else {
      var data = {};
      console.log(results[0]);
      Object.keys(results[0]).forEach((key) => {
        if (key != "password") {
          data[key] = results[0][key];
        }
      });
      console.log(data);
      res.status(200).send(JSON.stringify(data));
    }
  });
});

app.put("/users/edit", (req, res) => {
  var userID = req.body.userID;
  console.log(userID);
  var name = req.body.name;
  var email = req.body.email;
  var defaultcurrency = req.body.defaultcurrency;
  var phoneno = req.body.phoneno;
  var timezone = req.body.timezone;
  var language = req.body.language;
  var sql = `update user_details set username=?,email=?,phonenumber=?,timezone=?,language=?,currency=? where id=${userID}`;
  var values = [name, email, phoneno, timezone, language, defaultcurrency];
  connection.query(sql, values, (err, results) => {
    if (err) {
      if (err.sqlMessage.includes("Duplicate entry")) {
        res.status(400).send("Email already exists");
      }
      console.log(err.response);
      res.status(400).end("Error:", err).sqlMessage;
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.post("/api/insertgroup", (req, res) => {
  console.log("inside api" + req.body);
  const groupid = req.body.groupid;
  const groupname = req.body.groupname;
  const id = req.body.id;
  const username = req.body.username;
  const sqlInsert2 =
    "INSERT INTO group_details (groupid, groupname ,id, username) VALUES (?,?,?,?)";
  connection.query(
    sqlInsert2,
    [groupid, groupname, id, username],
    (err, result) => {
      console.log(err);
      res.send("group page, inserted values in db");
    }
  );
});

app.post("/imageupdate", function (req, res) {
  if (req.files === null) {
    return res.status(400).send("No File Upload");
  }
  const file = req.files.profileImage;
  var userID = req.files.profileImage.name.split(",")[1];
  const fileName = req.files.profileImage.name.split(",")[0];
  console.log(__dirname);
  var pathToImage = path.join(__dirname, "./public");

  const filePathwithoutfileName = pathToImage + "/images/profilepics/" + userID;
  console.log(filePathwithoutfileName);
  const filePath =
    pathToImage + "/images/profilepics/" + userID + "/" + fileName;
  if (!fs.existsSync(filePathwithoutfileName)) {
    fs.mkdirSync(filePathwithoutfileName);
  }
  file.mv(filePath, (err) => {
    if (err) {
      return res.status(500).end(err);
    } else {
      var sql = `update user_details set image='${fileName}' where id=${userID}`;
      connection.query(sql, (err, results) => {
        if (err) {
          console.log(err);
          res.status(400).end("Error:", err);
        }
      });
    }
  });
  res.json({
    fileName: fileName,
    filePath: filePath,
  });
});

app.post("/api/getgroup", (req, res) => {
  console.log(req.body);
  const groupname = req.body.groupname;
  const username = req.body.username;
  const sqlget = "Select * from group_details WHERE groupname=? AND username=?";
  connection.query(sqlget, [groupname, username], (err, result) => {
    if (!err) {
      if (result.length == 1 && req.body.username === result[0].username) {
        console.log(result);
        userData = {
          groupname: result[0].groupname,
          username: result[0].username,
          currency: "$",
        };
        res.status(200).send(JSON.stringify(userData));
      } else {
        res.writeHead(204, {
          "Content-Type": "text/plain",
        });
        res.end("Invalid credentials");
      }
    } else {
      console.log(err);
      res.writeHead(204, {
        "Content-Type": "text/plain",
      });
      res.end("Database issues");
    }
  });
});

app.get("/groups/invitedgroups/:id", (req, res) => {
  var userID = req.params.id;
  var sql = `SELECT g.groupid,g.groupname FROM sp_users.members as m inner join sp_users.group_details as g on m.ref_groupid = g.groupid inner join user_details as u on m.ref_userid = u.id where m.ref_userid = ${userID} and status = 1 and m.ref_userid != invitedby`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(results));
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.get("/groups/acceptedgroups/:id", (req, res) => {
  var userID = req.params.id;
  var sql = `SELECT g.groupid,g.groupname FROM sp_users.members as m inner join sp_users.group_details as g on m.ref_groupid = g.groupid inner join user_details as u on m.ref_userid = u.id where m.ref_userid = ${userID} and status = 2`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(results));
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.put("/groups/invite/", (req, res) => {
  var userID = Number(req.body.userID);
  var groupID = req.body.groupID;
  var type = req.body.type;
  var sql = null;
  if (type == "accept") {
    sql = `update members set status=2 where ref_userid=${userID} and ref_groupid = ${groupID};`;
    sql =
      sql +
      `update group_details set count = count + 1 where groupid = ${groupID};`;
  } else {
    sql = `update members set status=0 where ref_userid=${userID} and ref_groupid = ${groupID}`;
  }
  var values = [userID, groupID];
  console.log(sql);
  connection.query(sql, values, (err, results) => {
    if (err) {
      console.log(err.response);
      res.end("Error:", err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});
app.put("/groups/leave/", (req, res) => {
  var userID = Number(req.body.userID);
  var groupID = req.body.groupID;
  var type = req.body.type;
  var sql = null;
  if (type == "leave") {
    sql = `update members set status=0 where ref_userid=${userID} and ref_groupid = ${groupID};`;
    sql =
      sql +
      `update group_details set count = count - 1 where groupid = ${groupID};`;
  } else {
    sql = `update members set status=2 where ref_userid=${userID} and ref_groupid = ${groupID}`;
  }
  var values = [userID, groupID];
  console.log(sql);
  connection.query(sql, values, (err, results) => {
    if (err) {
      console.log(err.response);
      res.end("Error:", err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.post("/groups/new", (req, res) => {
  console.log(req.body);
  let dateObject = new Date(new Date());
  let date = dateObject.getDate().toString();
  let month = (dateObject.getMonth() + 1).toString();
  let year = dateObject.getFullYear().toString();
  let time =
    dateObject.getHours().toString() +
    "-" +
    dateObject.getMinutes().toString() +
    "-" +
    dateObject.getSeconds().toString();
  let timestamp = year + "-" + month + "-" + date + "-" + time;
  var sql = `insert into group_details(groupname,timestamp) values(?,?);`;
  var values = [req.body.groupName, timestamp];
  connection.query(sql, values, (err, results, fields) => {
    if (err) {
      if (err.sqlMessage.includes("Duplicate entry")) {
        res.status(400).send(" Duplicate Group Name");
      }
      console.log("In this error ");
      console.log(err);
    } else {
      for (var i = 0; i < req.body.selectedUsers.length; i++) {
        var ref_userID = req.body.selectedUsers[i].value;
        var ref_groupID = results.insertId;
        var status = 1;
        var invitedBy = Number(req.body.userID);
        var sql = `insert into members(ref_userID,ref_groupID,status,invitedBy) values(?,?,?,?);`;
        var values = [ref_userID, ref_groupID, status, invitedBy];
        connection.query(sql, values, (err, results, fields) => {
          if (err) {
            console.log(err);
            res.status(400).send("Error");
          }
        });
      }
      var sql = `insert into members(ref_userID,ref_groupID,status,invitedBy) values(?,?,?,?);`;
      console.log(req.body);
      var values = [req.body.userID, results.insertId, 2, req.body.userID];
      connection.query(sql, values, (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error");
        }
      });
      var groupDetails = {
        groupID: results.insertId,
      };
      res.status(200).send(groupDetails);
    }
  });
});
app.post("/groups/expenses", (req, res) => {
  let timestamp = null;
  var totalbalance = null;
  var oldtBalance = 0;
  var ref_expenseid = null;
  console.log(req.body);
  var groupID = req.body.groupID;
  var currency = req.body.currency;
  var ref_paidby = req.body.userID;
  var description = req.body.description;
  var amount = req.body.amount;
  let dateObject = new Date(new Date());
  let date = dateObject.getDate().toString();
  let month = (dateObject.getMonth() + 1).toString();
  let year = dateObject.getFullYear().toString();
  let time =
    dateObject.getHours().toString() +
    "-" +
    dateObject.getMinutes().toString() +
    "-" +
    dateObject.getSeconds().toString();
  timestamp = year + "-" + month + "-" + date + "-" + time;
  //Getting the total group members
  var sql = `SELECT m.ref_userid,invitedby FROM group_details as g inner join members as m on g.groupid = m.ref_groupid where status=2 and ref_groupid = ${groupID}`;
  var group_members = [];
  var group_members2 = [];
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.status(400).end("Error:", err);
    } else {
      for (let i = 0; i < results.length; i++) {
        group_members.push(results[i].ref_userid);
        group_members2.push(results[i].ref_userid);
      }
      var values = [
        groupID,
        ref_paidby,
        amount,
        description,
        req.body.currency,
        timestamp,
      ];
      var sql = `insert into master_expense(ref_groupid,ref_paidby,amount,description,currency,createdat) values(?,?,?,?,?,?);`;
      connection.query(sql, values, (err, results, fields) => {
        if (err) {
          console.log(err);
          res.status(400).send("Error");
        } else {
          var total_Members = group_members2.length;
          dividedAmount = amount / total_groupMembers;
          ref_expenseid = results.insertId;
          for (let i = 0; i < group_members2.length; i++) {
            var sql = `select * from recent_activity where ref_userid = ${group_members2[i]} and ref_groupid = ${groupID} and currency = '${req.body.currency}' order by createdat desc limit 1`;
            connection.query(sql, (err, results, fields) => {
              if (err) {
                console.log(err);
                // res.status(400).send("Error");
              } else {
                var sql = `select totalbalance from recent_activity where ref_userid = ${group_members2[i]}  and currency = '${req.body.currency}' order by createdat desc limit 1`;
                connection.query(sql, (err, results, fields) => {
                  if (err) {
                  } else {
                    if (results.length > 0)
                      oldtBalance = results[0].totalbalance;
                  }
                });
                if (results.length > 0) {
                  if (group_members2[i] == req.body.userID) {
                    groupBalance = dividedAmount * (total_Members - 1);
                    groupBalance = groupBalance.toString();
                    groupBalance = groupBalance.slice(
                      0,
                      groupBalance.indexOf(".") + 3
                    );
                    console.log(groupBalance);
                  } else {
                    groupBalance = -dividedAmount;
                  }
                  var oldgBalance = results[0].groupbalance;
                  var newgBalance = parseFloat(
                    Number(oldgBalance) + Number(groupBalance)
                  );
                  console.log(newgBalance);
                  var newtotalbalance = parseFloat(
                    Number(oldtBalance) + Number(groupBalance)
                  );
                  var recentactivityid = results[0].recentactivityid;
                  var sql = `update recent_activity set groupbalance=${newgBalance},totalbalance=${newtotalbalance} where recentactivityid=${recentactivityid}`;
                  connection.query(sql, (err, results) => {
                    if (err) {
                      console.log(err);
                      //res.status(400).end("Error:", err);
                    } else {
                    }
                  });
                } else {
                  if (group_members2[i] == req.body.userID) {
                    groupBalance = dividedAmount * (total_Members - 1);
                    groupBalance = groupBalance.toString();
                    groupBalance = groupBalance.slice(
                      0,
                      groupBalance.indexOf(".") + 3
                    );
                  } else {
                    groupBalance = -dividedAmount;
                  }
                  var values = [
                    ref_expenseid,
                    group_members2[i],
                    amount,
                    groupID,
                    req.body.currency,
                    groupBalance,
                    groupBalance,
                    timestamp,
                  ];
                  var sql = `insert into recent_activity(ref_expenseid,ref_userid,amount,ref_groupid,currency,groupbalance,totalbalance,createdat) values(?,?,?,?,?,?,?,?);`;
                  connection.query(sql, values, (err, results, fields) => {
                    if (err) {
                      console.log(err);
                      // res.status(400).send("Error");
                    } else {
                    }
                  });
                }
              }
            });
          }
        }
      });
      var total_groupMembers = group_members.length;
      dividedAmount = amount / total_groupMembers;
      const index = group_members.indexOf(Number(ref_paidby));
      if (index > -1) {
        group_members.splice(index, 1);
      }
      for (let i = 0; i < group_members.length; i++) {
        var userid1 = group_members[i];
        var values = null;
        var userid2 = ref_paidby;
        var currency = req.body.currency;
        var ref_groupid = req.body.ref_groupid;
        if (userid1 > userid2) {
          values = [
            userid2,
            userid1,
            currency,
            dividedAmount,
            req.body.groupID,
            timestamp,
          ];
        } else {
          values = [
            userid1,
            userid2,
            currency,
            dividedAmount,
            req.body.groupID,
            timestamp,
          ];
        }
        var sql = null;

        if (userid1 > userid2) {
          sql = `select * from debt where userid1=${userid2} and userid2=${userid1} and currency='${currency}' and ref_groupid= ${groupID}`;
        } else {
          sql = `select * from debt where userid1=${userid1} and userid2=${userid2} and currency='${currency}' and ref_groupid= ${groupID}`;
        }
        connection.query(sql, values, (err, results, fields) => {
          if (err) {
            console.log(err);
          } else {
            var userid1 = group_members[i];
            var userid2 = req.body.userID;
            var sql = null;
            var values = null;
            if (results.length > 0) {
              if (results[0].userid2 == req.body.userID) {
                var sql = `update debt set amount = amount + ${dividedAmount} where debtid = ${results[0].debtid}`;
                connection.query(sql, (err, results, fields) => {
                  if (results.length > 0) {
                  } else {
                    // console.log(results);
                  }
                });
              } else {
                var sql = `update debt set amount = amount - ${dividedAmount} where debtid = ${results[0].debtid}`;
                connection.query(sql, (err, results, fields) => {
                  if (results.length > 0) {
                    // console.log("bvjlhfbhbebfcdjdfbchlebdfleqkf Over here")
                  } else {
                    // console.log(results);
                  }
                });
              }
            } else {
              if (userid1 > userid2) {
                sql = `insert into debt(userid1,userid2,currency,amount,ref_groupid,createdat) values(?,?,?,?,?,?);`;
                values = [
                  userid2,
                  userid1,
                  currency,
                  -dividedAmount,
                  req.body.groupID,
                  timestamp,
                ];
              } else {
                sql = `insert into debt(userid1,userid2,currency,amount,ref_groupid,createdat) values(?,?,?,?,?,?);`;
                values = [
                  userid1,
                  userid2,
                  currency,
                  dividedAmount,
                  req.body.groupID,
                  timestamp,
                ];
              }
              connection.query(sql, values, (err, results, fields) => {
                if (results.length > 0) {
                  console.log("Over here");
                } else {
                  // console.log(results);
                }
              });
            }
            // var sql = `update debt set where groupID=${groupID}`;
          }
        });
      }
    }
  });
});
app.get("/groups/description/:id", (req, res) => {
  var groupID = req.params.id;
  var sql = `select me.description,u.username,me.amount,me.createdat,me.currency,me.settleFlag,u2.username as settlename from master_expense me inner join user_details  u on u.id = me.ref_paidby left join user_details u2 on u2.id = me.settleFlag where ref_groupid = ${groupID} order by createdat desc`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.end("Error:", err);
    } else {
      console.log(results);
      res.status(200).send(JSON.stringify(results));
    }
  });
});
app.post("/groups/edit", (req, res) => {
  console.log(req.body);
  let dateObject = new Date(new Date());
  let date = dateObject.getDate().toString();
  let month = (dateObject.getMonth() + 1).toString();
  let year = dateObject.getFullYear().toString();
  let time =
    dateObject.getHours().toString() +
    "-" +
    dateObject.getMinutes().toString() +
    "-" +
    dateObject.getSeconds().toString();
  let timestamp = year + "-" + month + "-" + date + "-" + time;
  var sql = `UPDATE group_details SET groupname = ${req.body.groupName} WHERE groupid = ${req.body.groupID};`;
  var values = [req.body.groupName];
  connection.query(
    "UPDATE group_details SET groupname = ? WHERE groupid = ?",
    [req.body.groupName, req.body.groupID],
    (err, results, fields) => {
      if (err) {
      } else {
        res.status(200).end();
      }
    }
  );
  // connection.query(sql, values, (err, results, fields) => {
  //     if (err) {
  //         if (err.sqlMessage.includes("Duplicate entry")) {
  //             res.status(400).send(' Duplicate Group Name')
  //         }
  //         console.log("In this error ");
  //         console.log(err);
  //     }
  //     else {
  //         res.status(200).end();
  //     }
  // });
});

app.get("/users/searchbyname", (req, res) => {
  var sql = `select id,username from user_details where username LIKE '${req.query.name_like}%'`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).end(err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.get("/users/searchbyemail", (req, res) => {
  var sql = `select id,email from user_details where email LIKE '${req.query.email_like}%'`;
  connection.query(sql, (err, results) => {
    if (err) {
      res.status(500).end(err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});
app.get("/groups/activities/:id", (req, res) => {
  var userID = req.params.id;
  console.log(userID);
  var sql = `SELECT mu.username as username,mu2.username as settlename,me.amount,me.createdat,me.settleFlag,me.ref_paidby,me.currency,mg.groupname,mg.groupid,mg.count,me.description FROM master_expense as me inner join user_details as mu on mu.id = me.ref_paidby inner join group_details as mg on me.ref_groupid = mg.groupid left join user_details as mu2 on mu2.id = me.settleFlag where ref_groupid IN (select m.ref_groupid from members as m  inner join group_details as me on m.ref_groupid = me.groupid  where status=2 and m.ref_userid = ${userID} ) order by createdat desc;`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      res.send(400).end("Sorry! Nothing to display");
    } else {
      console.log(results);
      res.status(200).send(JSON.stringify(results));
    }
  });
});
app.get("/expense/negtotalbalance/:id", (req, res) => {
  var userID = req.params.id;
  var result = [];
  var sql = `select CONCAT(currency, -1*sum(groupbalance)) as groupBalance from recent_activity where ref_userid = ${userID} and groupbalance < 0 group by currency;`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < results.length; i++) {
        result.push(results[i].groupBalance);
      }
      res.status(200).send(JSON.stringify(result.join(",")));
    }
  });
});

app.get("/expense/postotalbalance/:id", (req, res) => {
  var userID = req.params.id;
  console.log(userID);
  var result = [];
  var sql = `select CONCAT(currency, sum(groupbalance)) as groupBalance from recent_activity where ref_userid = ${userID} and groupbalance > 0 group by currency;`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < results.length; i++) {
        result.push(results[i].groupBalance);
      }
      res.status(200).send(JSON.stringify(result.join(",")));
    }
  });
});

app.get("/expense/totalbalance/:id", (req, res) => {
  var userID = req.params.id;
  console.log(userID);
  var result = [];
  var sql = `select CONCAT(currency, sum(groupbalance)) as groupBalance from recent_activity where ref_userid = ${userID}  group by currency;`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      for (let i = 0; i < results.length; i++) {
        result.push(results[i].groupBalance);
      }
      console.log(result);
      if (result.length == 2 && result[1] == null) {
        res.status(200).send(JSON.stringify(result));
      } else {
        res.status(200).send(JSON.stringify(result.join(",")));
      }
    }
  });
});
app.get("/expense/totalowing/:id", (req, res) => {
  var userID = req.params.id;
  console.log(userID);
  var result = [];
  var sql = `select d.userid1,d.userid2,d.ref_groupid,concat(u.username,"  owes you ") as totalOwe,concat(d.currency,-1*d.amount) as tamount,mg.groupname,d.currency,d.amount from debt as d inner join user_details as u on d.userid2 = u.id inner join group_details as mg on d.ref_groupid=mg.groupid where d.userid1 = ${userID} and amount <0 
        UNION ALL
        select d.userid1,d.userid2,d.ref_groupid,concat(u.username,"  owes you ") as totalOwe, concat(d.currency, d.amount) as tamount,mg.groupname,d.currency,d.amount  from debt as d inner join user_details as u on d.userid1 = u.id inner join group_details as mg on d.ref_groupid = mg.groupid where d.userid2 = ${userID} and amount > 0;`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});

app.get("/expense/totalinternaldebt/:id", (req, res) => {
  var groupID = req.params.id;
  var sql = `select u.name as lendername,u2.name as lendeename,d.amount,d.currency from debt as d inner join user_details as u on d.userid1 = u.userid inner join user_details as u2 on d.userid2 = u2.userid where ref_groupid = ${groupID} and d.amount!=0;`;
  connection.query(sql, (err, results) => {
    if (err) {
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});
app.get("/expense/totalgiving/:id", (req, res) => {
  var userID = req.params.id;
  console.log("HI", userID);
  var result = [];
  var sql = `select d.userid1,d.userid2,d.ref_groupid,concat((" you owe ") ,u.username) as totalOwe,concat(d.currency,d.amount) as tamount,mg.groupname,d.currency,d.currency,d.amount from debt as d inner join user_details as u on d.userid2 = u.id inner join group_details as mg on d.ref_groupid=mg.groupid where d.userid1 = ${userID} and amount > 0 
        UNION ALL
        select d.userid1,d.userid2,d.ref_groupid,concat((" you owe  "),u.username )as totalOwe, concat(d.currency, -1*d.amount) as tamount,mg.groupname,d.currency,d.currency,d.amount  from debt as d inner join user_details as u on d.userid1 = u.id inner join group_details as mg on d.ref_groupid = mg.groupid where d.userid2 = ${userID} and amount < 0;`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(JSON.stringify(results));
    }
  });
});
app.post("/expense/owingsettleup", (req, res) => {
  console.log(req.body);
  let dateObject = new Date(new Date());
  let date = dateObject.getDate().toString();
  let month = (dateObject.getMonth() + 1).toString();
  let year = dateObject.getFullYear().toString();
  let time =
    dateObject.getHours().toString() +
    "-" +
    dateObject.getMinutes().toString() +
    "-" +
    dateObject.getSeconds().toString();
  timestamp = year + "-" + month + "-" + date + "-" + time;
  var userid1 = null;
  var userid2 = null;
  var amountToUpdate = 0;
  if (Number(req.body.amount) > 0) {
    amountToUpdate = req.body.amount;
  } else {
    amountToUpdate = -1 * req.body.amount;
  }
  var sessionID = Number(req.body.sessionID);

  if (Number(req.body.userid1) < req.body.userid2) {
    userid1 = req.body.userid1;
    userid2 = req.body.userid2;
  } else {
    userid1 = req.body.userid2;
    userid2 = req.body.userid1;
  }
  var anotherid = null;
  if (sessionID == userid1) {
    anotherid = userid2;
  } else {
    anotherid = userid1;
  }
  var sql = `update debt set amount=0,currency=null where userid1 = ${userid1} and userid2 = ${userid2} and ref_groupid = ${req.body.ref_groupid} and currency ='${req.body.currency}';`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      var sql = `insert into master_expense(ref_groupid,ref_paidby,settleFlag,currency,createdat) values(?,?,?,?,?);`;
      var values = [
        req.body.ref_groupid,
        userid1,
        userid2,
        req.body.tamount,
        timestamp,
      ];
      connection.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          var sql = `insert into recent_activity(ref_expenseid,ref_userid,ref_groupid,createdat) values(?,?,?,?);`;
          var values = [
            results.insertId,
            sessionID,
            req.body.ref_groupid,
            timestamp,
          ];
          connection.query(sql, values, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              var sql = ` update recent_activity set groupbalance = groupbalance - ${amountToUpdate} where ref_userid = ${sessionID} and currency = '${req.body.currency}' and ref_groupid=${req.body.ref_groupid};update recent_activity set groupbalance = groupbalance + ${amountToUpdate} where ref_userid = ${anotherid} and currency = '${req.body.currency}' and ref_groupid=${req.body.ref_groupid}`;
              connection.query(sql, (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  res.send(200);
                }
              });
            }
          });
        }
      });
    }
  });
});
app.post("/expense/givingsettleup", (req, res) => {
  console.log(req.body);
  let dateObject = new Date(new Date());
  let date = dateObject.getDate().toString();
  let month = (dateObject.getMonth() + 1).toString();
  let year = dateObject.getFullYear().toString();
  let time =
    dateObject.getHours().toString() +
    "-" +
    dateObject.getMinutes().toString() +
    "-" +
    dateObject.getSeconds().toString();
  timestamp = year + "-" + month + "-" + date + "-" + time;
  var userid1 = null;
  var userid2 = null;
  var amountToUpdate = 0;
  if (Number(req.body.amount) > 0) {
    amountToUpdate = req.body.amount;
  } else {
    amountToUpdate = -1 * req.body.amount;
  }
  var sessionID = Number(req.body.sessionID);
  console.log(Number(sessionID));
  console.log(req.body);
  console.log(amountToUpdate);
  if (Number(req.body.userid1) < Number(req.body.userid2)) {
    userid1 = Number(req.body.userid1);
    userid2 = Number(req.body.userid2);
  } else {
    userid1 = Number(req.body.userid2);
    userid2 = Number(req.body.userid1);
  }
  var anotherid = null;
  if (Number(sessionID) == Number(userid1)) {
    anotherid = Number(userid2);
  } else {
    anotherid = Number(userid1);
  }
  console.log(userid1);
  console.log(userid2);
  var sql = `update debt set amount=0,currency=null where userid1 = ${userid1} and userid2 = ${userid2} and ref_groupid = ${req.body.ref_groupid} and currency ='${req.body.currency}';`;
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      var sql = `insert into master_expense(ref_groupid,ref_paidby,settleFlag,currency,createdat) values(?,?,?,?,?);`;
      var values = [
        req.body.ref_groupid,
        userid1,
        userid2,
        req.body.tamount,
        timestamp,
      ];
      connection.query(sql, values, (err, results) => {
        if (err) {
          console.log(err);
        } else {
          var sql = `insert into recent_activity(ref_expenseid,ref_userid,ref_groupid,createdat) values(?,?,?,?);`;
          var values = [
            results.insertId,
            sessionID,
            req.body.ref_groupid,
            timestamp,
          ];
          connection.query(sql, values, (err, results) => {
            if (err) {
              console.log(err);
            } else {
              var sql = `update recent_activity set groupbalance = groupbalance + ${amountToUpdate} where ref_userid = ${sessionID} and currency = '${req.body.currency}' and ref_groupid=${req.body.ref_groupid};update recent_activity set groupbalance = groupbalance - ${amountToUpdate} where ref_userid = ${anotherid} and currency = '${req.body.currency}' and ref_groupid=${req.body.ref_groupid}`;
              connection.query(sql, (err, results) => {
                if (err) {
                  console.log(err);
                } else {
                  console.log("here");
                  res.end();
                }
              });
            }
          });
        }
      });
    }
  });
});
// app.post('/logout', function (req, res) {
//     console.log('POST LOgout!');
//     res.clearCookie('id');
//     // req.session.user = undefined;
//     res.writeHead(200, {
//         'Content-type': 'text/plain'
//     });
//     res.end('Back to login!');

// });
// app.get('/logout', function (req, res) {
//     req.logOut();
//     res.status(200).clearCookie('connect.sid', {
//       path: '/'
//     });
//     req.session.destroy(function (err) {
//       res.redirect('/');
//     });
//   });
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
