const express = require("express")

const router  = express.Router()

router.get("/", (req, res) => {
  res.redirect("/products")
})

router.get("/401", (req, res) => {
  res.status(401).render("base/401")
})

router.get("/403", (req, res) => {
  res.status(403).render("base/403")
})

module.exports = router