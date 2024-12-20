const path = require("path");

const express = require("express");
const expressSession = require("express-session")

const createSessionConfig = require("./config/sessions")

const db = require("./data/database");

const { validateCsrfToken, addCsrfToken} = require("./middlewares/csrf-token")

const notFoundMiddleware = require("./middlewares/not-found")
const errorHandlerMiddleware = require("./middlewares/error-handler")
const protectRoutesMiddleware = require("./middlewares/protect-routes")
const cartMiddleware = require("./middlewares/cart")

const baseRoutes = require("./routes/base-routes")
const productsRoutes = require("./routes/products-routes")
const authRoutes = require("./routes/auth-routes");
const adminRoutes = require("./routes/admin-routes")
const cartRoutes = require("./routes/cart-routes")
const ordersRoutes = require("./routes/orders-routes")

const checkUser = require("./middlewares/check-auth");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use("/products/assets", express.static("product-data"));
app.use(express.urlencoded({extended: false}))
app.use(express.json())

const sessionConfig = createSessionConfig()
app.use(expressSession(sessionConfig))

app.use((req, res, next) => {
  if (['POST'].includes(req.method)) {
    validateCsrfToken(req, res, next)
  } else {
    next()
  }
})
app.use(addCsrfToken)

app.use(cartMiddleware)

app.use(checkUser.checkAuthStatus)
app.use(checkUser.checkAdminStatus)

app.use(baseRoutes)
app.use(authRoutes);
app.use(productsRoutes)
app.use("/cart", cartRoutes)
app.use("/orders", protectRoutesMiddleware, ordersRoutes)
app.use("/admin", protectRoutesMiddleware, adminRoutes)

app.use(notFoundMiddleware)

app.use(errorHandlerMiddleware)

db.connectToDatabase()
  .then(function() {
    app.listen(3000)
  })
  .catch(function (error) {
    console.log("failed to connect to the database");
    console.log(error);
  });
