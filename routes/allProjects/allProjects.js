const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("allProjects.hbs", {
    title: "Neelkanth Video Vision : All Projects",
    allProjectActive: "active",
    script: "allProjectScript.js"
  });
});

router.get("/getProjects", (req, res) => {
  db.collection("projects")
    .find({})
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

// mongoDb $loockup method

router.get("/getProjectByLoockup", (req, res) => {
  db.collection("projects")
    .aggregate([{
      $lookup: {
        from: "studios",
        localField: "studioId",
        foreignField: "_id",
        as: "stdData"
      }
    }])
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.get("/getSingleProjectByIdLookup", (req, res) => {
  db.collection("projects")
    .aggregate([{
        $match: {
          _id: ObjectId(req.query.id)
        }
      },
      {
        $lookup: {
          from: "studios",
          localField: "studioId",
          foreignField: "_id",
          as: "stdData"
        }
      }
    ])
    .toArray((err, result) => {
      if (err) throw err;
      res.json(result);
    });
});

router.get("/myAllProjectsWithPagination", (req, res) => {
  var pageNo = parseInt(req.query.pageNo);
  var size = 2;
  var result = {};
  db.collection("projects").countDocuments((err, totalCount) => {
    if (err) throw err;
    return (total = totalCount);
  });
  db.collection("projects")
    .aggregate([{
        $lookup: {
          from: "studios",
          localField: "studioId",
          foreignField: "_id",
          as: "stdData"
        }
      },
      {
        $skip: (pageNo - 1) * size
      },
      {
        $limit: size
      }
    ])
    .toArray((err, data) => {
      if (err) throw err;
      var prevPageN;
      var nextPageN;
      var totalPageN = Math.ceil(total / size);
      if (pageNo === 1 || pageNo < 0) {
        prevPageN === null;
      } else {
        prevPageN = pageNo - 1;
      }
      if (pageNo === totalPageN) {
        nextPageN === null;
      } else {
        nextPageN = pageNo + 1;
      }
      result.paginationInfo = {
        firstPage: 1,
        prevPage: prevPageN,
        currentPage: pageNo,
        nextPage: nextPageN,
        lastPage: totalPageN,
        totalRecord: total,
        recordPerPage: size
      };
      result.result = data;
      res.json(result);
    });
});

module.exports = router;