module.exports = (req, res, next) => {
  if (!req.session.oauthAccessTokenSecret) {
    if (process.env.NODE_ENV === 'development') {
      next();
    } else {
      res.redirect('/login');
    }
  } else {
    next();
  }
};
