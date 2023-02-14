//loop in dependencies
const express = require("express");
const { Event, Roommate } = require("../models");
const router = express.Router();
require("dotenv").config();
//nodemailer
const nodemailer = require("nodemailer");
const nmHbs = require("nodemailer-express-handlebars");

//transporter
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        ciphers: "SSLv3",
    },
});

//checks if transporter created is working
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

// Transporting using handlbars
transporter.use(
    "compile",
    nmHbs({
        viewEngine: {
            extname: ".handlebars",
            layoutsDir: "./email/layouts/",
            defaultLayout: "template",
            partialsDir: "./email/layouts/",
        },
        viewPath: "./email/emails/",
        extName: ".handlebars",
    })
);

//GET all records
router.get("/", async (req, res) => {
    if (!req.session.isLoggedIn) {
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
        var mailList = [];
        var roommates = [];
        let createEventObj = {
            what: req.body.what,
            date: req.body.date,
        };
        if (req.body.time.length > 0) {
            createEventObj.time = req.body.time;
        }
        const createEvent = await Event.create(createEventObj);
        let updateAttendees;
        // if there are attendees add them to the database and send out an email letting them know they're attending.
        if (req.body.attendees.length > 0) {
            // adding attending roomates to userEvent
            console.log(req.body.attendees);
            // add roommates to an event if their id was selected.
            updateAttendees = await createEvent.addRoommate(req.body.attendees);

            //send out email based off of selected roommates by getting their emails from Roommates table
            for (var i = 0; i < req.body.attendees.length; i++) {
                const roommate = await Roommate.findByPk(req.body.attendees[i]);
                console.log(roommate.dataValues.email);
                mailList.push(roommate.dataValues.email);
                const name = {
                    first_name: roommate.dataValues.first_name,
                    last_name: roommate.dataValues.last_name,
                };
                roommates.push(name);
            }
            createEventObj.Roommates = roommates;

            let mail = {
                from: process.env.EMAIL_USERNAME,
                to: mailList,
                subject: `Event: ${req.body.what}`,
                template: "attendingEvent",
                context: createEventObj,
            };
            // transporter.sendMail(mail);
        }
        res.json({ status: "success", createEvent, updateAttendees });
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
router.delete("/:id", async (req, res) => {
    try {
        var mailList = [];
        const attendees = await Roommate.findAll({
            attributes: ["email"],
            include: {
                model: Event,
                where: {
                    id: req.params.id,
                },
            },
        });

        const event = await Event.findByPk(req.params.id);

        console.log(attendees);
        if (attendees.length > 0) {
            for (var i = 0; i < attendees.length; i++) {
                console.log(attendees[i].dataValues.email);
                mailList.push(attendees[i].dataValues.email);
            }
            console.log(mailList);
            let mail = {
                from: process.env.EMAIL_USERNAME,
                to: mailList,
                subject: `${event.dataValues.what} Canceled`,
                template: "eventDeleted",
                context: {
                    what: event.dataValues.what,
                },
            };
            transporter.sendMail(mail);
        }
        const deleteEvent = await Event.destroy({ where: { id: req.params.id } });
        return res.json({ status: "success", deleteEvent });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Error deleting record!",
            error: err,
        });
    }
});

module.exports = router;
