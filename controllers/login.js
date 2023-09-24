const User = require("../models/login.model");

module.exports = {
  loginUser: async (req, res) => {
    if(!req.session.authenticated) {
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
        res.redirect('/')
      }); 
    } else {
        res.redirect('/')
    }  
  },

  loginForm: (req, res) => {
    if(!req.session.authenticated) {
      res.render("login", {
        error: req.session.error,
        layout: "loginPage"
      });
    } else {
      res.redirect('/')
    }
  },

  registerForm: (req, res) => {
    if(!req.session.authenticated) {
      res.render("register", {
        error: req.session.error,
        layout: "loginPage"
      });
    } else {
      res.redirect('/')
    }
  },

  createNewAccount: async (req, res) => {
    if(!req.session.authenticated){
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
        res.redirect('/')
        delete req.session.error;
    })
  } else {
    res.redirect('/')
  }
    }
};
