var models  = require('../models');
var router = require('express').Router();
var login = require('connect-ensure-login');

router.get('/list',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Category.findAll({
      order: models.sequelize.col('order_')
    })
      .then(function(categories) {
      res.json({
        status: 'OK',
        categories: categories
      });
    });
  });

module.exports = router;
