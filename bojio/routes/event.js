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
      res.json({
        status: 'OK',
        event: event
      });
    });
  });

router.get('/list',
  login.ensureLoggedIn(),
  function(req, res) {
    var events;
    var displayMode = req.query.display || 'upcoming';

    if (displayMode === 'upcoming') {
      events = models.Event.findAll({
        where: {
          date: {
            $gt: new Date()
          }
        },
        order: models.sequelize.literal('date ASC')
      });
    } else if (displayMode === 'recent') {
      events = models.Event.findAll({
        order: models.sequelize.literal('createdAt DESC')
      });
    } else if (displayMode === 'past') {
      events = models.Event.findAll({
        where: {
          date: {
            $lt: new Date()
          }
        },
        order: models.sequelize.literal('date DESC')
      });
    } else {
      res.json({
        status: 'FAILED'
      });
    }
    events
      .then(function(events) {

      Promise
        .all(events.map(event => event.fetch()))
        .then(results => {
          res.json({
            status: 'OK',
            events: results.filter(event => event.creator !== null)
          });
        });
    });
  });

router.get('/created',
  login.ensureLoggedIn(),
  function(req, res) {
    var events;
    var displayMode = req.query.display || 'upcoming';

    if (displayMode === 'upcoming') {
      events = models.Event.findAll({
        where: {
          CreatorFacebookId: req.user.id,
          date: {
            $gt: new Date()
          }
        },
        order: models.sequelize.literal('date ASC')
      });
    } else if (displayMode === 'recent') {
      events = models.Event.findAll({
        where: {
          CreatorFacebookId: req.user.id
        },
        order: models.sequelize.literal('createdAt DESC')
      });
    } else if (displayMode === 'past') {
      events = models.Event.findAll({
        where: {
          CreatorFacebookId: req.user.id,
          date: {
            $lt: new Date()
          }
        },
        order: models.sequelize.literal('date DESC')
      });
    } else {
      res.json({
        status: 'FAILED'
      });
    }
    events
      .then(function(events) {

      Promise
        .all(events.map(event => event.fetch()))
        .then(results => {
          res.json({
            status: 'OK',
            events: results.filter(event => event.creator !== null)
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
          .then(function(e) {
            var events;
            var displayMode = req.query.display || 'upcoming';

            if (displayMode === 'upcoming') {
              events = e.filter(event => (
                event.date >= new Date()))
                .sort((a, b) => {
                  return a.date - b.date;
                });
            } else if (displayMode === 'recent') {
              events = e.sort((a, b) => {
                  return b.createdAt - a.createdAt;
              });
            } else if (displayMode === 'past') {
              events = e.filter(event => (
                event.date < new Date()))
                .sort((a, b) => {
                  return b.date - a.date;
                });
            } else {
              res.json({
                status: 'FAILED'
              });
            }

            Promise
              .all(events.map(event => event.fetch()))
              .then(results => {
                res.json({
                  status: 'OK',
                  events: results.filter(event => event.creator !== null)
                });
              });
          });
      });
  });

router.get('/:event_id/info',
  login.ensureLoggedIn(),
  function(req, res, next) {
    models.Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          event.fetch()
            .then(event => {
              if (event.creator) {
                res.json({
                  status: 'OK',
                  event: event
                });
              } else {
                next();
              }
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
                  models.Notification.create({
                    subjectUserId: event.creator.facebookId,
                    objectUserId: req.user.id,
                    timestamp: new Date(),
                    eventId: event.id,
                    type: 'JOIN'
                  });
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

router.post('/:event_id/set_participants',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          event.setParticipants([...req.body.inviteList])
            .then(function() {
              event.fetch()
                .then(event => {
                  event.participants.forEach(participant => {
                    models.Notification.create({
                      subjectUserId: participant.facebookId,
                      objectUserId: req.user.id,
                      timestamp: new Date((new Date(event.date)).getTime() - 60000 * 30),
                      eventId: event.id,
                      type: 'REMINDER'
                    });
                  });
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

router.post('/:event_id/add_participants',
  login.ensureLoggedIn(),
  function(req, res) {
    models.Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          event.fetch()
            .then(function(eventData) {
              const existingIds = eventData.participants.map(p => p.facebookId);
              req.body.inviteList
                .filter(invite => (existingIds.indexOf(invite) === -1))
                .map(
                  invite => {
                    models.Notification.create({
                      subjectUserId: invite,
                      objectUserId: req.user.id,
                      timestamp: new Date(),
                      eventId: eventData.id,
                      type: 'TAG'
                    });
                    models.Notification.create({
                      subjectUserId: invite,
                      objectUserId: req.user.id,
                      timestamp: new Date((new Date(event.date)).getTime() - 60000 * 30),
                      eventId: event.id,
                      type: 'REMINDER'
                    });
                  });
              event.setParticipants([...existingIds, ...req.body.inviteList])
                .then(() => {
                  event.fetch()
                    .then(event => {
                      res.json({
                        status: 'OK',
                        event: event
                      });
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
            event.setCategory(req.body.category)
              .then(function() {
                event.fetch()
                  .then(event => {
                    event.participants.forEach(participant => {
                      if (participant.facebookId === req.user.id) return;
                      models.Notification.create({
                        subjectUserId: participant.facebookId,
                        objectUserId: req.user.id,
                        timestamp: new Date(),
                        eventId: event.id,
                        type: 'EDIT'
                      });
                    });
                    res.json({
                      status: 'OK',
                      event: event
                    });
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
