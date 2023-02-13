//loop in dependencies
const express = require("express");
const { Event, Roommate } = require("../models");
const router = express.Router();

//GET all records
router.get("/", async (req, res) => {
    if(!req.session.isLoggedIn){
        return res.render("login");
    }
    
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
        let createEventObj = {
            what: req.body.what,
            date: req.body.date,
        };
        if (req.body.time.length > 0) {
            createEventObj.time = req.body.time;
        }
        const createEvent = await Event.create(createEventObj);
        let updateAttendees;
        if (req.body.attendees.length > 0) {
            updateAttendees = await eventObj.addRoommate(req.body.attendees);
        }
        return res.json({ status: "success", createEvent, updateAttendees });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error creating record!",
            err: err,
        });
    }
});

//UPDATE a record
router.put("/:id", async (req, res) => {
    try {
        let updateEventObj = {
            what: req.body.what,
            date: req.body.date,
        };
        if (req.body.time.length > 0) {
            updateEventObj.time = req.body.time;
        }
        //updateEvent.addRoommate() & updateEvent.removeRoommate();
        const updateEvent = await Event.update(updateEventObj, {
            where: {
                id: req.params.id,
            },
        });
        const eventRoommateUpdate = await Event.findByPk(req.params.id);
        if (req.body.deleteAttendees > 0) {
            eventRoommateUpdate.removeRoommate(req.body.deleteAttendees);
        }
        if (req.body.createAttendees > 0) {
            eventRoommateUpdate.addRoommate(req.body.createAttendees);
        }
        return res.json({ status: "success", updateEvent, eventRoommateUpdate });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error updating record!",
            error: err,
        });
    }
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
