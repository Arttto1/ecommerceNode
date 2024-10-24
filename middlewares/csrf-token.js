const csrf = require("csrf")

const tokens = new csrf()
const secret = tokens.secretSync()

function addCsrfToken (req, res, next) {
  res.locals.csrfToken = tokens.create(secret)
  next()
}

function validateCsrfToken (req, res, next) {
  const token = req.body._csrf || req.query._csrf || req.headers["x-csrf-token"]

  if (!token || !tokens.verify(secret, token)) {
    return res.status(403).send("CSRF token inválido")
  }

  next()
}

module.exports = {
  addCsrfToken, validateCsrfToken
}