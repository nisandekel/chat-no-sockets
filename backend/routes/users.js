const express = require('express');
const router = express.Router();
const db = require('./../dbService/db');
const fs = require('fs');
const User = require('./../entities/User');
const md5 = require('md5');
const path = require('path');
const dbPath = path.join(__dirname, '../dbService/db.json');
const basicAuth = require('express-basic-auth');


router.post('/registretion', function (req, res, next) {
  const userName = req.body.userName;
  const password = req.body.password;
  const secondPassword = req.body.secondPassword;

  if(userName==="" || password==="" || secondPassword===""){
    res.send({ emptyFieldError: "empty field error" });
    return;
  }

  if(password.length<8) {
    res.send({ passwordError: "password error" });
    return;
  }

  if(password!==secondPassword) {
    res.send({ passwordsMatchingError: "passwords matching error" });
    return;
  }

  const id = Math.random().toString(32).split(".")[1];
  const newUser = new User(id, userName, md5(password));
  req.body.password = "";
  db.users.push(newUser);
  fs.writeFile(dbPath, JSON.stringify(db), function (err) {
    if (err) throw err;
    res.send({ success: "user was uploaded" });
  });

});

router.post('/login', basicAuth({ authorizer }), function (req, res, next) {
  res.send({ autorized: "autorized"});
});

function authorizer(userName, password) {
  return db.users.some(user=>user.userName===userName && user.password===md5(password));
}


module.exports = router;
