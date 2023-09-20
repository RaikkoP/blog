const User = require("../models/register.model");

const createNewAccount = (req, res) => {
    console.log("New user");

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        cPassword: req.body.cPassword
    })

    User.createNew(newUser, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Error making new account"
            })
        } else {
            console.log(data)
            res.redirect('/')
        }
    })
}

const registerForm = (req, res) => {
    res.render('register')
};

module.exports = {
    createNewAccount,
    registerForm
}