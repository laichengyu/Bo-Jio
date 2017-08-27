var express = require('express');
var router = express.Router();
var env       = process.env.NODE_ENV || "development";

router.get('/', function(req, res, next) {
  res.json({ status: "Success" });
});

router.get('/status',
  function(req, res) {
    if (req.user) {
      res.json({
        status: 'OK',
        user: req.user
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

router.use('/login', require('./login'));
router.use('/event', require('./event'));
router.use('/category', require('./category'));

module.exports = router;
