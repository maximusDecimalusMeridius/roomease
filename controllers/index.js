//loop in express dependency
const express = require("express");
const router = express.Router();

//define routers
const frontEndRoutes = require("./frontEndController");
router.use(frontEndRoutes);

const roommateRoutes = require("./roommateController");
router.use("/roommates", roommateRoutes);

const UOMroutes = require("./UOMController");
router.use("/uoms", UOMroutes);

const eventRoutes = require("./eventController");
router.use("/events", eventRoutes);

const taskRoutes = require("./taskController");
router.use("/tasks", taskRoutes);

const homeRoutes = require("./homeController");
router.use("/homes", homeRoutes);

const mailAPI = require("./mailController");
router.use("/api/mail", mailAPI);

module.exports = router;
