const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("studios.hbs", {
    title: "Neelkanth Video Vision : Studios",
    studioActive: "active",
    script: "studioScript.js"
  });
});

router.get("/getStudios", (req, res) => {
  db.collection("studios")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.get("/getStudioById", (req, res) => {
  db.collection("studios").findOne(
    {
      _id: ObjectId(req.query.id)
    },
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

router.post("/addStudio", (req, res) => {
  db.collection("studios").insertOne(req.body, (err, result) => {
    if (err) throw err;
    res.json("Studio Created");
  });
});

router.put("/updateStudio", (req, res) => {
  db.collection("studios").findOneAndUpdate(
    {
      _id: ObjectId(req.query.id)
    },
    {
      $set: req.body
    },
    (err, result) => {
      if (err) throw err;
      res.json("Studio Updated");
    }
  );
});

router.delete("/deleteStudio", (req, res) => {
  db.collection("studios").findOneAndDelete(
    {
      _id: ObjectId(req.query.id)
    },
    (err, result) => {
      if (err) throw err;
      res.json("Studio Deleted");
    }
  );
});

module.exports = router;
