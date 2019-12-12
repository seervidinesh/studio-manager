const jwt = require("jsonwebtoken");
var session = require("express-session");

module.exports = (req, res, next) => {
  try {
    const token = req.session.token;
    const decode = jwt.verify(token, sessionSecrate);
    req.userData = decode;
    next();
  } catch (err) {
    res.redirect("/");
  }
};
