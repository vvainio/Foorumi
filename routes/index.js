var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  // Tämä renderöi etusivun
  res.render('index');
});

module.exports = router;
