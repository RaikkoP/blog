//db connection
const db = require("../utils/db");
const bcrypt = require("bcryptjs");
const regex = require("../utils/regex");
//constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
  this.cPassword = user.cPassword;
};

User.login = (user, result) => {
  if (
    regex.userRegEx.test(user.username) &&
    regex.passwordRegEx.test(user.password)
  ) {
    if (user.username && user.password) {
      let query = `SELECT * FROM users WHERE 
          username = '${user.username}'`;
      db.query(query, (err, res) => {
        console.log(res);
        if (
          res.length > 0 &&
          bcrypt.compareSync(user.password, res[0].password)
        ) {
          console.log("Loging in: ", { ...user });
          result(null, { ...user });
        } else {
          result("Account does not exist", null);
        }
        if (err) {
          console.log("error: " + err);
        }
      });
    } else {
      result("Values can't be empty", null);
    }
  } else {
    result("Information incorrect", null);
  }
};

User.createNew = (newUser, result) => {
  if (
    regex.userRegEx.test(newUser.username) &&
    regex.passwordRegEx.test(newUser.password) &&
    regex.passwordRegEx.test(newUser.cPassword)
  ) {
    let queryCheckUsername = `SELECT * FROM users WHERE username = '${newUser.username}'`;
    let queryAddUser = `INSERT INTO users SET
      username = "${newUser.username}",
      password = "${bcrypt.hashSync(
        newUser.password,
        bcrypt.genSaltSync(10)
      )}"`;
    if (newUser.password == newUser.cPassword) {
      db.query(queryCheckUsername, (err, res) => {
        if (err) {
          console.log("error: " + err);
          result(err, null);
          return;
        } else if (res.length > 0) {
          result("Username taken", null);
        } else {
          db.query(queryAddUser, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            }
            console.log("Account created: ", { id: res.insertId, ...newUser });
            result(null, { id: res.insertId, ...newUser });
          });
        }
      });
    }
  } else {
    result("Please make sure your password and username match the requierments", null);
  }
};

module.exports = User;
