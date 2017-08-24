var models  = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/',
  function(req, res, next) {
    if (req.user) {
      models.User.findOrCreate({
        where: {
          facebookId: req.user.id
        }
      });
      res.redirect('http://localhost:3000');
    } else {
      next();
    }
  },
  passport.authenticate('facebook'));

router.get('/return',
  passport.authenticate('facebook', { successReturnToOrRedirect: '/login', failureRedirect: '/login' }));

module.exports = router;
