const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  db.collection("users").findOne(
    {
      username: req.body.username
    },
    (err, user) => {
      if (err) {
        throw err;
      } else if (user == null) {
        res.json("User Not Found");
      } else if (user) {
            const JWTToken = jwt.sign(
              {
                username: user.username,
                _id: user._id
              },
              sessionSecrate,
              {
                expiresIn: "2h"
              }
            );
            req.session.token = JWTToken;
            return res.status(200).json({
              token: JWTToken,
              redirect: "/home",
              success: "Login Success"
            });
          }
          return res.status(401).json({
            failed: "Incorrect Password"
          });
    }
  );
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/login");
});

module.exports = router;
