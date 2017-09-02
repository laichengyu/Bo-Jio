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
      pictureUrl: req.body.pictureUrl
    }).then(function(event) {
      event.setCategory(req.body.category);
      event.setCreator(req.user.id);
      if (req.body.inviteList) {
        event.setParticipants([req.user.id, ...req.body.inviteList]);
      }

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

      Promise
        .all(events.map(event => event.fetch()))
        .then(results => {
          res.json({
            status: 'OK',
            events: results
          });
        });
    });
  });

router.get('/created',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findAll({
      where: {
        CreatorFacebookId: req.user.id
      }
    })
      .then(function(events) {

      Promise
        .all(events.map(event => event.fetch()))
        .then(results => {
          res.json({
            status: 'OK',
            events: results
          });
        });
    });
  });

router.get('/joined',
  login.ensureLoggedIn(),
  function(req, res) {
    models.User.findById(req.user.id)
      .then(function(user) {
        user.getEvents()
          .then(function(events) {
            Promise
              .all(events.map(event => event.fetch()))
              .then(results => {
                res.json({
                  status: 'OK',
                  events: results
                });
              });
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

router.post('/:event_id/join',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          event.addParticipant(req.user.id)
            .then(function() {
              event.fetch()
                .then(event => {
                  res.json({
                    status: 'OK',
                    event: event
                  });
                });
            });
        } else {
          res.json({
            status: 'FAILED'
          });
        }
      });
  });

router.post('/:event_id/leave',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          event.removeParticipant(req.user.id)
            .then(function() {
              event.fetch()
                .then(event => {
                  res.json({
                    status: 'OK',
                    event: event
                  });
                });
            });
        } else {
          res.json({
            status: 'FAILED'
          });
        }
      });
  });

router.post('/:event_id/edit',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          event.update({
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            location: req.body.location,
            pictureUrl: req.body.pictureUrl,
          }).then(function(event) {
            event.setCategory(req.body.category);
            if (req.body.inviteList) {
              event.setParticipants([req.user.id, ...req.body.inviteList]);
            }

            res.json({
              status: 'OK',
              event: event
            });
          });
        } else {
          res.json({
            status: 'FAILED'
          });
        }
      });
  });

router.post('/:event_id/remove',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          models.Event.destroy({
            where: {
              id: req.params.event_id
            }
          }).then(function() {
            res.json({
              status: 'OK',
              event: event
            });
          });
        } else {
          res.json({
            status: 'FAILED'
          });
        }
      });
  });

module.exports = router;
