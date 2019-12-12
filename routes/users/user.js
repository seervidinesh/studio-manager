const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("users.hbs", {
    title: "Neelkanth Video Vision : Users",
    usersActive: "active"
  });
});

module.exports = router;
