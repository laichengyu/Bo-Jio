var models  = require('../models');
var express = require('express');
var router = express.Router();
var passport = require('passport');
var login = require('connect-ensure-login');

router.post('/create',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.create({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      location: req.body.location,
      thumbnail: req.body.thumbnail
    }).then(function(event) {
      event.setCreator(req.user.id);
      event.addParticipant(req.user.id);

      res.json({
        status: 'OK',
        event: event
      });
    });
  });

router.get('/list',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findAll({})
      .then(function(events) {
      res.json({
        status: 'OK',
        events: events
      });
    });
  });

router.get('/:event_id/info',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          res.json({
            status: 'OK',
            event: event
          });
        } else {
          res.json({
            status: 'FAILED'
          });
        }
      });
  });

module.exports = router;
