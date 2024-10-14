const getSignup = function(req, res) {
    res.render("costumer/auth/signup", { pageTitle: "Signup" })
}

const postSignup = function(req, res) {
    const userData = req.body
    const email = userData.email
    const confirmEmail = userData["confirm-email"]
    const password = userData.password
    const fullName = userData.fullname
    const street = userData.street
    const postal = userData.postal
    const city = userData.city
}

const getLogin = function(req, res) {
    res.render("/login")
}

module.exports = {
    getSignup: getSignup,
    getLogin: getLogin
}