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
  var query = {
    where: { id: req.params.id },
    include: {
      model: Models.Message,
      include: {
        model: Models.User
      }
    }
  };

  Models.Topic.findOne(query).then(function (topic) {
    res.send(topic);
  });
});

// POST /topics
router.post('/', authentication, function (req, res, next) {
  var topic = getTopicModel(req);

  Models.Topic.create(topic).then(function (topic) {
    res.send(topic);
  });
});

// POST /topics/:id/message
router.post('/:id/message', authentication, function (req, res, next) {
  var query = { where: { id: req.params.id } };

  Models.Topic.findOne(query).then(function (topic) {
    var message = getMessageModel(topic, req);

    Models.Message.create(message).then(function (message) {
      res.send(message);
    });
  });
});

function getTopicModel(req) {
  return {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description
  };
}

function getMessageModel(topic, req) {
  return {
    TopicId: topic.id,
    UserId: req.session.userId,
    title: req.body.title,
    content: req.body.content
  };
}

module.exports = router;
