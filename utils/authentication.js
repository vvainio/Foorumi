var authentication = function (req, res, next) {
  if (!req.session.userId) {
    res.sendStatus(403);
  } else {
    next();
  }
};

module.exports = authentication;
