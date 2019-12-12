const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("order.hbs", {
        title: "Neelkanth Video Vision : Users",
        orderActive: "active"
    });
});

module.exports = router;