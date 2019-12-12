const express = require("express");
const router = express.Router();

router.post("/sentWhatsappMessages", (req, res) => {
  client.messages
    .create({
      //mediaUrl: [req.body.mediaUrl],
      from: `whatsapp:${TwillioNumber}`,
      body: `Hello *${req.body.studioName}* your project of party *${req.body.partyName}* serial number : *${req.body.projectSerialNumber}* is *${req.body.projectStatus}*. \n Regards - *Neelkanth* *Videos*`,
      to: `whatsapp:+91${req.body.phoneNumber}`
    })
    .then(message => {
      res.json(message);
    });
});

router.get("/getWhatsappMsgByStudioId", (req, res) => {
  db.collection("studios")
    .aggregate([
      {
        $match: {
          _id: ObjectId(req.query.id)
        }
      },
      {
        $lookup: {
          from: "whatsapp_messages",
          localField: "_id",
          foreignField: "stdId",
          as: "msgData"
        }
      }
    ])
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.post("/sendCustmizedWpMsg", (req, res) => {
  client.messages
    .create({
      from: `whatsapp:${TwillioNumber}`,
      // mediaUrl: [req.body.mediaUrl],
      body: req.body.custmizedWpMsg,
      to: `whatsapp:+91${req.body.phoneNumber}`
    })
    .then(message => {
      res.json(message);
    });
});

router.post("/saveWhatsappMsgToDb", (req, res) => {
  db.collection("whatsapp_messages").insertOne(
    {
      stdId: ObjectId(req.body.stdId),
      dateCreated: req.body.dateCreated,
      from: req.body.from,
      to: req.body.to,
      direction: req.body.direction,
      accountSid: req.body.accountSid,
      msg: req.body.msg
    },
    (err, result) => {
      if (err) throw err;
      res.json(result);
    }
  );
});

module.exports = router;
