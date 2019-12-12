const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("projects.hbs", {
    title: "Neelkanth Video Vision : Projects",
    projectActive: "active",
    script: "projectScript.js"
  });
});
router.post("/addProject", (req, res) => {
  db.collection("projects").insertOne(
    {
      studioId: ObjectId(req.body.studioId),
      partyName: req.body.partyName,
      jobType: req.body.jobType,
      projectStatus: req.body.projectStatus,
      totalDvD: req.body.totalDvD,
      serialNumber: req.body.serialNumber,
      projectReceivedOn: req.body.projectReceivedOn,
      projectComplitedOn: req.body.projectComplitedOn,
      projectDelivredOn: req.body.projectDelivredOn,
      totalPayment: req.body.totalPayment,
      paymentReceived: req.body.paymentReceived,
      editorsPayment: req.body.editorsPayment,
      remark: req.body.remark
    },
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

router.get("/getProjectByStudioId", (req, res) => {
  db.collection("projects")
    .find({
      studioId: req.query.id
    })
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});
router.delete("/deleteProjects", (req, res) => {
  db.collection("projects").findOneAndDelete(
    { _id: ObjectId(req.query.id) },
    (err, result) => {
      if (err) throw err;
      res.json("Project Deleted");
    }
  );
});

router.get("/getprojectById", (req, res) => {
  db.collection("projects").findOne(
    {
      _id: ObjectId(req.query.id)
    },
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

router.put("/updateProject", (req, res) => {
  db.collection("projects").findOneAndUpdate(
    {
      _id: ObjectId(req.query.id)
    },
    {
      $set: {
        studioId: ObjectId(req.body.studioId),
        partyName: req.body.partyName,
        jobType: req.body.jobType,
        projectStatus: req.body.projectStatus,
        totalDvD: req.body.totalDvD,
        projectComplitedOn: req.body.projectComplitedOn,
        projectDelivredOn: req.body.projectDelivredOn,
        totalPayment: req.body.totalPayment,
        paymentReceived: req.body.paymentReceived,
        editorsPayment: req.body.editorsPayment,
        remark: req.body.remark
      }
    },
    (err, result) => {
      if (err) throw err;
      res.json("Project Updated");
      client.messages
          .create({
              //mediaUrl: [req.body.mediaUrl],
              from: `whatsapp:${TwillioNumber}`,
              body: "Project Updated",
              to: `whatsapp:+91${req.body.phoneNumber}`
          })
          .then(message => {
              console.log(message.sid);
              res.json(message);
          });
    }
  );
});

module.exports = router;
