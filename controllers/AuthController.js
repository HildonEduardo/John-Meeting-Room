var mongoose = require("mongoose");
var passport = require("passport");


var RoomDateModel = require('../models/RoomDate')

var userController = {};

var index = require("../routes/index.js")

// Restrict access to root page

userController.home = function(req, res) {
  console.log('HOME ENTROU')

  //debug only
  
  // RoomDateModel.find({}).lean().exec(
  //     function (e, docs) {
  //       console.log({ "roomsDate": docs, user : req.user, onDateChange : index.listener})
  //       res.render('index', { "roomsDate": docs, user : req.user});
  //  });
  
  res.render('index', { user : req.user });
};

// Go to registration page
userController.register = function(req, res) {
  console.log("register")
  res.render('register');
};

// Post registration
userController.doRegister = function(req, res) {
  User.register(new User({ username : req.body.username, name: req.body.name }), req.body.password, function(err, user) {
    if (err) {
      return res.render('register', { user : user });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
};

// Go to login page
userController.login = function(req, res) {
  res.render('login');
};

// Post login
userController.doLogin = function(req, res) {
  passport.authenticate('local')(req, res, function () {
    res.redirect('/');
  });
};

// logout
userController.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

module.exports = userController;
