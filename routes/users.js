var express = require('express');
var router = express.Router();

var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /users

// POST /users
router.post('/', function (req, res, next) {
  var queryParams = getUserModel(req);
  var userQuery = { where: { username: queryParams.username } };

  if (!queryParams.username || !queryParams.password) {
    return res.sendStatus(400);
  }

  Models.User.findOne(userQuery).then(function (user) {
    if (!user) {
      Models.User.create(queryParams).then(function (user) {
        req.session.userId = user.id;
        res.send(user);
      });
    } else {
      res.status(400).json({ error: 'Käyttäjätunnus on jo käytössä!' });
    }
  });
});

// POST /users/authenticate
router.post('/authenticate', function (req, res, next) {
  var queryParams = getUserModel(req);

  if (!queryParams.username || !queryParams.password) {
    return res.sendStatus(403);
  }

  Models.User.findOne({ where: queryParams }).then(function (user) {
    if (user) {
      req.session.userId = user.id;
      res.send(user);
    } else {
      res.sendStatus(403);
    }
  });
});

// GET /users/logged-in
router.get('/logged-in', function (req, res, next) {
  var loggedInId = req.session.userId ? req.session.userId : null;

  if (loggedInId === null) {
    res.json({});
  } else {
    var query = { where: { id: loggedInId } };

    Models.User.findOne(query).then(function (user) {
      res.send(user);
    });
  }
});

// GET /users/logout
router.get('/logout', function (req, res, next) {
  req.session.userId = null;

  res.sendStatus(200);
});

function getUserModel(req) {
  return {
    username: req.body.username,
    password: req.body.password
  };
}

module.exports = router;
