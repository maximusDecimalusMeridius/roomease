const express = require ("express");
const router = express.Router();
const {Event,Home,Roommate,Task,UOM} = require("../models")

router.get("/roommates", (req, res)=>{
    Roommate.findAll().then(roommateData=>{
    const hbsRoommates = roommateData.map(roommate=>roommate.toJSON())
    res.render("roommates",{
        allRoommates:hbsRoommates
    })
    })
})

router.get("/events", (req, res)=>{
    res.render("events")
})

router.get("/tasks", (req, res)=>{
    res.render("tasks")
})

router.get("/uoms", (req, res)=>{
    res.render("uoms")
})

router.get("/home", (req, res)=>{
    res.render("home")
})








module.exports = router;