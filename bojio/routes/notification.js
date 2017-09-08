var models  = require('../models');
var router = require('express').Router();
var login = require('connect-ensure-login');

router.get('/get',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Notification.findAll({
      where: {
        timestamp: {
          $lt: new Date()
        },
        subjectUserId: req.user.id
      },
      order: models.sequelize.literal('timestamp DESC')
    })
      .then(function(notifications) {
        res.json({
          status: 'OK',
          notifications: notifications.map(notification => notification.rawValues())
        });
      });
  });

router.post('/:notification_id/read',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Notification.findById(req.params.notification_id)
      .then(function(notification) {
        notification.update({
          read: true
        }).then(() => {
          res.json({
            status: 'OK'
          });
        })
      });
  });

router.post('/all_read',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Notification.findAll({
      where: {
        timestamp: {
          $lt: new Date()
        },
        subjectUserId: req.user.id
      }
    })
      .then(function(notifications) {
        Promise
          .all(notifications.map(notification => {
                return notification.update({
                  read: true
                });
              }))
          .then(() => {
            res.json({
              status: 'OK'
            });
          });
      });
  });

module.exports = router;
