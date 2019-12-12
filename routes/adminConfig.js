const express = require("express");
const router = express.Router();

router.put("/uniqueCounter", (req, res) => {
  db.collection("adminConfig").findOneAndUpdate(
    {
      _id: ObjectId("5df21a891c9d440000ea11b5")
    },
    {
      $inc: {
        COUNT: 1
      }
    },
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

router.put("/centralDrawerId", (req, res) => {
  db.collection("adminConfig").findOneAndUpdate(
    {
      _id: ObjectId("5df22beb1c9d440000daf622")
    },
    {
      $inc: {
        centralDrawerId: 1
      }
    },
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

module.exports = router;
