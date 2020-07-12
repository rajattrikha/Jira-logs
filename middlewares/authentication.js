module.exports = (req, res, next) => {
  if (!req.session.oauthAccessTokenSecret) {
    res.redirect('/login');
  } else {
    next();
  }
};
