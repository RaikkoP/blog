const User = require("../models/login.model");

module.exports = {
  loginUser: async (req, res) => {
    console.log("Logging in");
    console.log(req.sessionID);
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    console.log(user.username);
    console.log(user.password);
  
    User.login(user, (err, data) => {
      console.log(data);
      if (err) {
        res.status(500).send({
          message: err.message || "Couldn't login",
        });
      } else if (data) {
        req.session.authenticated = true;
        username = user.username;
        req.session.user = {
            username
        };
        console.log(data);
        res.redirect('/')
      } else if (!data) {
        req.session.authenticated = false;
        res.render('login', {
            error: "Failed to login"
        })
      }
    });
  },

  loginForm: (req, res) => {
    res.render("login");
  }
};
