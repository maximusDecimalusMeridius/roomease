//loop in dependencies
const express = require("express");
const { Task, Roommate } = require("../models");
const router = express.Router();

//GET all records
router.get("/", async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.redirect("/");
    }

    try{
        let hbsTasks = await Task.findAll({ include: [Roommate] })
        let hbsRoommates = await Roommate.findAll({
            where: {
                home_id: req.session.userId
            }
        });

        hbsTasks = hbsTasks.map(task=>task.toJSON());
        hbsRoommates = hbsRoommates.map(roommate => roommate.toJSON());

        // console.log(hbsRoommates);
        
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
router.post("/", async (req, res) => {
    try {
        const roommateId = req.body.roommate_id;

        await Task.create({
            task: req.body.task,
            home_id: 1
        });

        const newTask = await Task.findOne({
            where: {
                task: req.body.task
            }
        })

        const roommate = await Roommate.findOne({
            where: {
                id: roommateId
            }
        })

        await roommate.addTask(newTask.dataValues.id);
        return res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Error creating record!",
            err: error,
        });
    }
});

//UPDATE a record
router.put("/:id", async (req, res) => {

    try {
        const roommates = await Roommate.findAll({
            where: {
                home_id: req.session.userId
            }
        });

        roommates = roommates.map(roommate => roommate.toJSON());

        const createTask = await Task.update(
            {
                task: req.body.task
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        )

        console.log(roommates);

        if (createTask[0]) {
            return res.json(createTask);
        } else {
            return res.status(404).json({ message: "Record doesn't exist!" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error updating record!",
            error: error,
        });
    }
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
