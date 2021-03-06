var models  = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var env       = process.env.NODE_ENV || "development";

router.get('/',
  function(req, res, next) {
    if (req.user) {
      models.User.findOrCreate({
        where: {
          facebookId: req.user.id
        }
      }).then(user => {
        user[0].update({
          active: true
        }).then(() => {
          if (env === "production") {
            res.redirect('/');
          } else {
            res.redirect('http://localhost:3000');
          }
        });
      });
    } else {
      next();
    }
  },
  passport.authenticate('facebook', {
    scope: ['public_profile', 'user_friends']
  }));

router.get('/return',
  passport.authenticate('facebook', { successReturnToOrRedirect: '/api/login', failureRedirect: '/api/login' }));

module.exports = router;
