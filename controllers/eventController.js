//loop in dependencies
const express = require("express");
const Event = require("../models/Event");
const router = express.Router();

//GET all records
router.get("/", (req, res) => {
    Event.findAll().then(data => {
        res.json(data);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error getting records!",
            error: error
        })
    })
})

//GET one record by id
router.get("/:id", (req, res) => {
    Event.findByPk(req.params.id)
    .then(data => {
        if(data){
           return res.json(data);
        } else {
            res.status(404).json({
                message: "No record exists!"
            })
        }
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error getting data",
            error: error
        })
    })
})

//POST a new record
router.post("/", (req, res) => {
    Event.create({
        //add fields to create here
    }).then(data => {
        res.status(201).json(data);
    }).catch(error => {
        console.log(error);
        res.status(500).json({
            message: "Error creating record!",
            err: error
        })
    })
})

//UPDATE a record
router.put("/:id", (req, res) => {
    Event.update({
        //add fields to update here
    },{
        where: {
            id:req.params.id
        }
    }).then(data => {
        if(data[0]){
            return res.json(data);
        } else {
            return res.status(404).json({message: "Record doesn't exist!"});
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error
        })
    })
})

//DELETE a record
router.delete("/:id", (req, res) => {
    Event.destroy({
        where:{
            id:req.params.id
        }
    }).then(data=>{
        if(data){
            return res.json(data)
        } else {
            return res.status(404).json({message: "Record doesn't exist!"})
        }
    }).catch(error =>{
        console.log(error);
        res.status(500).json({
            message: "Error deleting record!",
            error: error
        })
    })
})

module.exports = router;