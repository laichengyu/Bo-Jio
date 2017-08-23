var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/',
  passport.authenticate('facebook'));

router.get('/return', 
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
