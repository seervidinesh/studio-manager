const express = require("express");
const router = express.Router();

router.put("/uniqueCounter", (req, res) => {
    db.collection("adminConfig").findOneAndUpdate({
            _id: ObjectId("5de160521d81821f91b4e075")
        }, {
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
    db.collection("adminConfig").findOneAndUpdate({
            _id: ObjectId("5de3901f2807ed039c2a0545")
        }, {
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