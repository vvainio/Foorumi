var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
router.get('/', function (req, res, next) {
  Models.Topic.findAll().then(function (topics) {
    res.send(topics);
  });
});

// GET /topics/:id
router.get('/:id', function (req, res, next) {
  var query = { where: { id: req.params.id } };

  Models.Topic.findOne(query).then(function (topic) {
    res.send(topic);
  });
});

// POST /topics
router.post('/', function (req, res, next) {
  var topic = getTopicModel(req);

  Models.Topic.create(topic).then(function (topic) {
    res.send(topic);
  });
});

// POST /topics/:id/message
router.post('/:id/message', function (req, res, next) {
  // Lisää tällä id:llä varustettuun aihealueeseen...
  var topicId = req.params.id;
  // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
  var messageToAdd = req.body;
  // Palauta vastauksena lisätty viesti
  res.send(200);
});

function getTopicModel(req) {
  return {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description
  };
}

module.exports = router;
