const express = require('express');
const router = express.Router();
const User = require('./../entities/User');
const md5 = require('md5');
const Database = require('./../dbService2/Database');
const basicAuth = require('express-basic-auth');

let users = null;
let db = new Database();
db.initDB();

router.post('/registretion', async function (req, res, next) {
  const userName = req.body.userName;
  const password = req.body.password;
  const secondPassword = req.body.secondPassword;
  const avatar = req.body.avatar;

  if (userName === "" || password === "" || secondPassword === "") {
    res.send({ emptyFieldError: "empty field error" });
    return;
  }

  if (password.length < 8) {
    res.send({ passwordError: "password error" });
    return;
  }

  if (password !== secondPassword) {
    res.send({ passwordsMatchingError: "passwords matching error" });
    return;
  }

  const id = Math.random().toString(32).split(".")[1];
  const newUser = new User(id, userName, md5(password), avatar);
  req.body.password = "";
  const result = await db.insertOne(newUser, "users");
  if (result.affectedRows === 1) {
    res.send({ usrUploded: "usrUploded" })
  }
  else if (result.duplicateUniqeField) {
    res.send({ duplicateUniqeField: result.duplicateUniqeField });
  }
});

router.use('/login', async (req, res, next) => {
  users = await db.getAll("users");
  next();
})

router.post('/login', basicAuth({ authorizer }), async function (req, res, next) {
  const userName = req.auth.user;
  const result = await db.getColumnValue("avatar", "users", { userName });
  const userAvatar = result.pop().avatar;
  res.send({ autorized: "autorized", userName, userAvatar });
});

function authorizer(userName, password) {
  return users.some(user => user.userName === userName && user.password === md5(password));
}

module.exports = router;
