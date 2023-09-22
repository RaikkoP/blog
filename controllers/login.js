const User = require("../models/login.model");

module.exports = {
  loginUser: async (req, res) => {
    const user = new User({
      username: req.body.username,
      password: req.body.password,
    });
    User.login(user, (err, data) => {
      console.log(data);
      if (err) {
        req.session.authenticated = false;
        req.session.error = err;
        res.redirect('/login')
        return;
      }
      req.session.authenticated = true;
      username = user.username;
      req.session.user = {
          username
      };
      delete req.session.error;
      res.redirect('/dashboard')
    });
  },

  loginForm: (req, res) => {
    res.render("login", {
      error: req.session.error
    });
  },

  registerForm: (req, res) => {
    res.render("register", {
      error: req.session.error
    });
  },

  createNewAccount: async (req, res) => {
    console.log("New user");

    const newUser = new User({
        username: req.body.username,
        password: req.body.password,
        cPassword: req.body.cPassword
    })

    User.createNew(newUser, (err, data) => {
        if (err) {
            req.session.authenticated = false;
            req.session.error = err;
            res.redirect('/register')
            return;
        }
        console.log(req.session.authenticated);
        req.session.authenticated = true;
        username = newUser.username;
        req.session.user = {
          username
        };
        console.log(data)
        res.redirect('/dashboard')
        delete req.session.error;
    })
  }
};
