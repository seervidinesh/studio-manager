const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("dashboard.hbs", {
    title: "Neelkanth Video Vision : Dashboard",
    dashboardActive: "active",
    script: "dashboardScript.js",
    style: "chat.css"
  });
});


module.exports = router;
