var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ status: "Success" });
});

router.get('/user',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.json({ user: req.user });
  });

module.exports = router;
