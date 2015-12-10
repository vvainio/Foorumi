var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /messages

// GET /messages/:id
router.get('/:id', function (req, res, next) {
  var query = {
    where: { id: req.params.id },
    include: {
      model: Models.Reply,
      include: {
        model: Models.User
      }
    }
  };

  Models.Message.findOne(query).then(function (message) {
    res.send(message);
  });
});

// POST /messages/:id/reply
router.post('/:id/reply', authentication, function (req, res, next) {
  var query = { where: { id: req.params.id } };

  Models.Message.findOne(query).then(function (message) {
    var reply = getReplyModel(message, req);

    Models.Reply.create(reply).then(function (reply) {
      res.send(reply);
    });
  });
});

function getReplyModel(message, req) {
  return {
    MessageId: message.id,
    UserId: req.session.userId,
    content: req.body.content
  };
}

module.exports = router;
