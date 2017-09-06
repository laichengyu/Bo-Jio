var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var path = require('path');

var env       = process.env.NODE_ENV || "development";
var facebookConfig = require(path.join(__dirname, 'config', 'facebook.json'))[env];
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;


// Configure the Facebook strategy for use by Passport.
//
// OAuth 2.0-based strategies require a `verify` function which receives the
// credential (`accessToken`) for accessing the Facebook API on the user's
// behalf, along with the user's profile.  The function must invoke `cb`
// with a user object, which will be set at `req.user` in route handlers after
// authentication.
passport.use(new Strategy({
    clientID: facebookConfig.CLIENT_ID,
    clientSecret: facebookConfig.CLIENT_SECRET,
    callbackURL: '/api/login/return'
  },
  function(accessToken, refreshToken, profile, cb) {
    // In this example, the user's Facebook profile is supplied as the user
    // record.  In a production-quality application, the Facebook profile should
    // be associated with a user record in the application's database, which
    // allows for account linking and authentication with other identity
    // providers.
    return cb(null, {
      id: profile.id,
      displayName: profile.displayName,
      accessToken: accessToken
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  In a
// production-quality application, this would typically be as simple as
// supplying the user ID when serializing, and querying the user record by ID
// from the database when deserializing.  However, due to the fact that this
// example does not have a database, the complete Facebook profile is serialized
// and deserialized.
passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});

var app = express();

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next()
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.disable('view cache');

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

if (env === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, 'client/build')));
}

app.use('/api', require('./routes'));

app.get('/event/:event_id', function(req, res, next) {
  var userAgent = req.headers['user-agent'];
  if (userAgent.startsWith('facebookexternalhit/1.1') ||
     userAgent === 'Facebot') {
    require('./models').Event.findById(req.params.event_id)
      .then(function(event) {
        if (event) {
          res.send(`
<html>
  <head>
    <meta property="fb:app_id" content="${facebookConfig.CLIENT_ID}">
    <meta property="og:url" content="https://bojio.pw/event/${req.params.event_id}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${event.title}">
    <meta property="og:description" content="${event.description}">
    <meta property="og:image" content="${event.pictureUrl}">
  </head>
</html>`);
        } else {
          next();
        }
      });
  } else {
    next();
  }
});

app.use(function(req, res, next) {
  if (env === 'production') {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  } else {
    res.json({ status: "Not Found" });
  }
});

module.exports = app;
