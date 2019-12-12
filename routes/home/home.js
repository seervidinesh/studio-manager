const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home.hbs", {
    title: "Neelkanth Video Vision",
    script: "homeScript.js"
  });
});

module.exports = router;
