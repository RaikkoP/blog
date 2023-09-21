//db connection
const db = require("../utils/db");
const bcrypt = require("bcryptjs");

//constructor
const User = function (user) {
  this.username = user.username;
  this.password = user.password;
};

User.login = (user, result) => {
  if (user.username && user.password) {
    let query = `SELECT * FROM users WHERE 
        username = '${user.username}'`;
    db.query(query, (err, res) => {
        console.log(res);
      if (res.length > 0 && bcrypt.compareSync(user.password, res[0].password)) {
        console.log("Loging in: ", { ...user });
        result(null, { ...user });
      } else {
        result(null, null);
      }
      if (err) {
        console.log("error: " + err);
      }
    });
  } else {
    result(null, null);
  }
};

module.exports = User;
