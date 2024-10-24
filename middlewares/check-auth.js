const db = require("../data/database");

function checkAuthStatus(req, res, next) {
  const uid = req.session.uid;

  if (!uid) {
    return next();
  }

  res.locals.uid = uid;
  res.locals.isAuth = true;
  next();
}

function checkAdminStatus(req, res, next) {
  const isAdmin = req.session.isAdmin;

  if (!isAdmin) {
    return next();
  }

  res.locals.isAdmin = true;
  next()
}

module.exports = { checkAuthStatus, checkAdminStatus };
