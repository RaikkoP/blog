//db connection
const db = require('../utils/db');

//constructor
const User = function(user){
    this.username = user.username;
    this.password = user.password;
}

User.login = (user, result) => {
    let query = `SELECT * FROM users WHERE 
    username = '${user.username}' 
    and password = '${user.password}'`
    db.query(query, (err, res) => {
        console.log(res);
        if (err) {
            console.log("error: " + err);
        } else if (res.length > 0) {
            console.log("Loging in: ",
            {...user});
            result(null, {...user});
        } else {
            
        }
    })
}


module.exports = User;