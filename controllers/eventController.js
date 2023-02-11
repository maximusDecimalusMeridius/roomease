//loop in dependencies
const express = require("express");
const { Event, Roommate } = require("../models");
const router = express.Router();

//GET all records
router.get("/", async (req, res) => {
    try {
        const eventData = await Event.findAll({
            include: [
                {
                    model: Roommate,
                },
            ],
        });
        const roommateData = await Roommate.findAll();

        const hbsEvents = eventData.map((event) => event.toJSON());
        const hbsRoommates = roommateData.map((roommate) => roommate.toJSON());
        console.log(hbsEvents);
        res.render("events", {
            allEvents: hbsEvents,
            allRoommates: hbsRoommates,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting records!",
            error: error,
        });
    }
});

//GET one record by id
router.get("/:id", (req, res) => {
    Event.findByPk(req.params.id)
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
router.post("/", async (req, res) => {
    try {
        const eventObj = await Event.create({
            what: req.body.what,
            date: req.body.date,
        });
        console.log(req.body.time);
        if (req.body.time.length > 0) {
            eventObj.update({ time: req.body.time });
        }
        if (req.body.attendees.length > 0) {
            await eventObj.addRoommate(req.body.attendees);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error creating record!",
            err: err,
        });
    }
});

//UPDATE a record
router.put("/:id", (req, res) => {
    Event.update(
        {
            what: req.body.what,
            date: req.body.date,
            time: req.body.time,
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
    Event.destroy({
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
