//db connection
const db = require('../utils/db');
const bcrypt = require('bcryptjs');

//constructor
const User = function(user){
    this.username = user.username;
    this.password = user.password;
    this.cPassword = user.cPassword;
}

User.createNew = (newUser, result) => {
    let query = `INSERT INTO users SET
    username = "${newUser.username}",
    password = "${bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(10))}"`
    if(newUser.password == newUser.cPassword) {
        db.query(query, (err, res) => {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            console.log("Account created: ",
            {id: res.insertId, ...newUser});
            result(null, { id: res.insertId, ...newUser})
        })
    }
}

module.exports = User;