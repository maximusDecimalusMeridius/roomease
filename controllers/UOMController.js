//loop in dependencies
const express = require("express");
const { Roommate } = require("../models");
const UOM = require("../models/UOM");
const router = express.Router();

//GET all records
router.get("/", (req, res) => {
    if(!req.session.isLoggedIn){
        return res.redirect("/");
    }
    
  UOM.findAll({
    include: [
        {model: Roommate,  as:"owed_by"},
        {model: Roommate,  as:"owe"}
    ],
  })
    .then((data) => {
        const hbsUOM = data.map(uom=>uom.toJSON())
        Roommate.findAll().then((roommateData)=>{
          const roommateDataa = roommateData.map(uom=>uom.toJSON())
          res.render("uom", {
            allUOM: hbsUOM,
            allroomies:roommateDataa
        })
      });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error getting records!",
        error: error,
      });
    });
});

//GET one record by id
router.get("/:id", (req, res) => {
  UOM.findByPk(req.params.id)
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        res.status(404).json({
          message: "No record exists!",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error getting data",
        error: error,
      });
    });
});

//POST a new record
router.post("/", (req, res) => {
  console.log(req.body)
  UOM.create({
    what: req.body.what,
    me: req.body.me,
    u: req.body.u,
    amount: req.body.amount,
  })
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error creating record!",
        err: error,
      });
    });
});

//UPDATE a record
router.put("/:id", (req, res) => {
  UOM.update(
    {
      what: req.body.what,
      me: req.body.me,
      u: req.body.u,
      amount: req.body.amount,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((data) => {
      if (data[0]) {
        return res.json(data);
      } else {
        return res.status(404).json({ message: "Record doesn't exist!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error updating record!",
        error: error,
      });
    });
});

//DELETE a record
router.delete("/:id", (req, res) => {
  UOM.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data) {
        return res.json(data);
      } else {
        return res.status(404).json({ message: "Record doesn't exist!" });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error deleting record!",
        error: error,
      });
    });
});

module.exports = router;
