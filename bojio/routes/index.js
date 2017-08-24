var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ status: "Success" });
});

router.get('/login_status',
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

module.exports = router;
