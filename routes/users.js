var express = require('express');
var router = express.Router();

var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /users

// POST /users
router.post('/', function (req, res, next) {
  // Lisää tämä käyttäjä (Vinkki: create), muista kuitenkin sitä ennen varmistaa, että käyttäjänimi ei ole jo käytössä! (Vinkki: findOne)
  var userToAdd = req.body;
  // Palauta vastauksena lisätty käyttäjä
  res.send(200);
});

// POST /users/authenticate
router.post('/authenticate', function (req, res, next) {
  // Tarkista käyttäjän kirjautuminen tässä. Tee se katsomalla, löytyykö käyttäjää annetulla käyttäjätunnuksella ja salasanalla (Vinkki: findOne ja sopiva where)
  var userToCheck = req.body;
  res.send(200);
});

// GET /users/logged-in
router.get('/logged-in', function (req, res, next) {
  var loggedInId = req.session.userId ? req.session.userId : null;

  if (loggedInId === null) {
    res.json({});
  } else {
    // Hae käyttäjä loggedInId-muuttujan arvon perusteella (Vinkki: findOne)
  }

  res.send(200);
});

// GET /users/logout
router.get('/logout', function (req, res, next) {
  req.session.userId = null;

  res.send(200);
});

module.exports = router;
