//loop in dependencies
const express = require("express");
const { Task, Roommate } = require("../models");
const router = express.Router();

//GET all records
router.get("/", async (req, res) => {
    console.log(req.session);
    if(!req.session.isLoggedIn){
        return res.render("login");
    }

    try{
        let hbsTasks = await Task.findAll({ include: [Roommate] })
        let hbsRoommates = await Roommate.findAll();

        hbsTasks = hbsTasks.map(task=>task.toJSON());
        hbsRoommates = hbsRoommates.map(roommate => roommate.toJSON());

        console.log(hbsTasks);
        console.log(hbsRoommates);
        
        res.render("tasks",{
            allTasks: hbsTasks,
            allRoommates: hbsRoommates
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting records!",
            error: error
        });
    }
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
//update to async/awaits with try/catch
//create task object in table, after which try assigning the task
router.post("/", (req, res) => {
    Task.create({
        task: req.body.task,
        assignee: req.body.assignee,
        home_id: 1,
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
