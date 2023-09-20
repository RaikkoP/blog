const User = require("../models/login.model");

const loginUser = (req, res) => {
    console.log("Logging in");
 
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })

    console.log(user.username);
    console.log(user.password);

    User.login(user, (err, data) => {
        console.log(data);
        console.log("Cock");
        if (err) {
            res.status(500).send({
                message: err.message || "Couldn't login"
            })
        } else {
            console.log(data);
            res.redirect('/')
        }
    })
}


module.exports = {
    loginUser
}