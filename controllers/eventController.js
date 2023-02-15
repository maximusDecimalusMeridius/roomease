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
        return res.redirect("/");
    }
    try {
        const eventData = await Event.findAll({
            where: {
                home_id: req.session.homeId,
            },
            include: [
                {
                    model: Roommate,
                },
            ],
        });
        const roommateData = await Roommate.findAll({
            where: {
                home_id: req.session.homeId,
            },
        });

        const hbsEvents = eventData.map((event) => event.toJSON());
        const hbsRoommates = roommateData.map((roommate) => roommate.toJSON());
        const newThings = hbsEvents.map((event) => {
            return { ...event, allRoommates: hbsRoommates };
        });

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
        let mailList = [];
        let roommates = [];
        let createEventObj = {
            what: req.body.what,
            date: req.body.date,
            home_id: req.session.homeId,
        };
        if (req.body.time.length > 0) {
            createEventObj.time = req.body.time;
        }
        const createEvent = await Event.create(createEventObj);
        let updateAttendees;
        // if there are attendees add them to the database and send out an email letting them know they're attending.
        if (req.body.attendees.length > 0) {
            // adding attending roommates to userEvent
            console.log(req.body.attendees);
            // add roommates to an event if their id was selected.
            updateAttendees = await createEvent.addRoommate(req.body.attendees);

            //send out email based off of selected roommates by getting their emails from Roommates table
            for (let i = 0; i < req.body.attendees.length; i++) {
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

            transporter.sendMail(mail);
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

        let oldEvent = await Event.findOne({
            where: {
                id: req.params.id,
            },
            include: {
                model: Roommate,
            },
        });
        oldEvent = oldEvent.toJSON();
        // console.log(oldEvent.Roommates);
        let oldAttendees = oldEvent.Roommates.map((roommate) => roommate.id);
        console.log(oldAttendees);
        let newAttendees = req.body.attendees;
        newAttendees = newAttendees.map((str) => parseInt(str));
        console.log(newAttendees);
        let mailAttendees = oldAttendees.concat(newAttendees);
        console.log(mailAttendees);
        for (let i = 0; i < mailAttendees.length; ++i) {
            for (let j = i + 1; j < mailAttendees.length; ++j) {
                if (mailAttendees[i] === mailAttendees[j]) {
                    mailAttendees.splice(j--, 1);
                }
            }
        }
        console.log(mailAttendees);

        const matching = [];
        // check if there are any matching ids in old and new attendeees selections and push the value to the matching array
        // if (oldAttendees.length > 0 && newAttendees.length > 0) {
        for (let i = 0; i < oldAttendees.length; i++) {
            for (let j = 0; j < newAttendees.length; j++) {
                if (oldAttendees[i] == newAttendees[j]) {
                    matching.push(oldAttendees[i]);
                }
            }
        }
        // }
        console.log(matching);
        // if there are matching values remove them from oldAttendees and remove them from new Attendees.
        if (matching.length > 0) {
            for (let k = 0; k < matching.length; k++) {
                let matchOld = oldAttendees.indexOf(matching[k]);
                console.log("old match index: " + matchOld);
                oldAttendees.splice(matchOld, 1);
                let matchNew = newAttendees.indexOf(matching[k]);
                console.log("new match index: " + matchNew);
                newAttendees.splice(matchNew, 1);
            }
            console.log(oldAttendees);
            console.log(newAttendees);
        }
        //updateEvent.addRoommate() & updateEvent.removeRoommate();
        const updateEvent = await Event.update(updateEventObj, {
            where: {
                id: req.params.id,
            },
        });

        const attending = newAttendees.concat(matching);
        const updatedEvent = await Event.findByPk(req.params.id);
        console.log(updateEvent);
        if (oldAttendees.length > 0 || newAttendees.length == 0) {
            updatedEvent.removeRoommates(oldAttendees);
        }
        if (newAttendees.length > 0 || oldAttendees.length == 0) {
            updatedEvent.addRoommates(newAttendees);
        }

        let mailList = [];
        let roommates = [];
        if (mailAttendees.length > 0) {
            for (let i = 0; i < mailAttendees.length; i++) {
                const roommate = await Roommate.findByPk(mailAttendees[i]);
                console.log(roommate.dataValues.email);
                mailList.push(roommate.dataValues.email);
                if (attending.includes(mailAttendees[i])) {
                    const name = {
                        first_name: roommate.dataValues.first_name,
                        last_name: roommate.dataValues.last_name,
                    };
                    roommates.push(name);
                }
            }
            updateEventObj.Roommates = roommates;

            let mail = {
                from: process.env.EMAIL_USERNAME,
                to: mailList,
                subject: `Event Updated: ${req.body.what}`,
                template: "eventChanged",
                context: updateEventObj,
            };

            transporter.sendMail(mail);
        }

        return res.json({ status: "success", updateEvent });
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
        let mailList = [];
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
            for (let i = 0; i < attendees.length; i++) {
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
