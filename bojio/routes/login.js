var models  = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/',
  passport.authenticate('facebook'));

router.get('/return', 
  passport.authenticate('facebook', { failureRedirect: 'http://localhost:3000/' }),
    function(req, res) {
      models.User.findOrCreate({
        where: {
          facebookId: req.user.id
        }
      }).then(function() {
      res.redirect('http://localhost:3000/');
    });
  });

module.exports = router;
