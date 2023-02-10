//loop in dependencies
const express = require("express");
const { Task } = require("../models");
const router = express.Router();

//GET all records
router.get("/", (req, res) => {
    Task.findAll({
            //Include Roommate
    }).then(taskData=>{
        const hbsTasks = taskData.map(task=>task.toJSON())
        console.log(hbsTasks);
        res.render("tasks",{
            allTasks: hbsTasks
        });
    }); 
});

//GET one record by id
router.get("/:id", (req, res) => {
    Task.findByPk(req.params.id)
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
    Task.create({
        task: req.body.task,
        assignee: req.body.assignee,
        home_id: req.body.home_id,
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
    Task.update(
        {
            task: req.body.task,
            assignee: req.body.assignee,
            home_id: req.body.home_id,
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
    Task.destroy({
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
