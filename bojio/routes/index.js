var models  = require('../models');
var express = require('express');
var router = express.Router();
var env       = process.env.NODE_ENV || "development";
var facebookConfig = require(require('path').join(__dirname, '..', 'config', 'facebook.json'))[env];
var FB = require('fb');

router.get('/', function(req, res, next) {
  res.json({ status: "Success" });
});

router.get('/status',
  function(req, res) {
    if (req.user) {
      res.json({
        status: 'OK',
        user: req.user,
        appId: facebookConfig.CLIENT_ID
      });
    } else {
      res.json({
        status: 'FAILED'
      });
    }
  });

router.get('/logout',
  function(req, res) {
    req.logout();
    if (env === "production") {
      res.redirect('/');
    } else {
      res.redirect('http://localhost:3000');
    }
  });

router.post('/deauthorize',
  function(req, res) {
    var signedRequest = FB.parseSignedRequest(req.body.signed_request, facebookConfig.CLIENT_SECRET);
    if (signedRequest) {
        var userId = signedRequest.user_id;
        models.User.findById(userId)
          .then(function(user) {
            if (user) {
              user.update({
                active: false
              }).then(() => {
                res.json({
                  status: 'OK'
                });
              });
            } else {
              res.json({
                status: 'FAILED'
              });
            }
          });
    } else {
      res.json({
        status: 'FAILED'
      });
    }
  });

router.use('/login', require('./login'));
router.use('/event', require('./event'));
router.use('/category', require('./category'));

module.exports = router;
