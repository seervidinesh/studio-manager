const express = require("express");
const router = express.Router();
var checkToken = require("../../checkToken");
const mongoClient = require("mongodb").mongoClient;
var session = require("express-session");

router.get("/", (req, res) => {
  res.render("drawer.hbs", {
    title: "Neelkanth Video Vision : Drawer",
    drawerActive: "active",
    script: "drawer/drawerScript.js"
  });
});


router.post('/addToDrawer', (req, res) => {
  db.collection("centralDrawer").insertOne({
    addBalance: parseInt(req.body.addBalance),
    receivedRef: req.body.receivedRef,
    balDscription: req.body.balDscription,
    drawerId: req.body.drawerId,
    addedOnDate: req.body.addedOnDate
  }, (err, result) => {
    if (err) throw err;
    res.json(result)
  })
})

router.get("/getDrawerTotal", (req, res) => {
  db.collection("centralDrawer").aggregate({
    $group: {
      _id: '',
      drawerTotal: {
        $sum: '$addBalance'
      }
    }
  }, {
    $project: {
      drawerTotal: '$addBalance'
    }
  }).toArray((err, out) => {
    if (err) throw err;
    res.json(out)
  })
})

module.exports = router;