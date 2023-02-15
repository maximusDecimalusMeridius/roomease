const express = require("express");
const { Roommate, Home } = require("../models");
const router = express.Router();

router.get("/", async (req, res) => {
    if (!req.session.isLoggedIn) {
        return res.redirect("/");
    }
    try {
        const userData = await Roommate.findOne({
            where: {
                id: req.session.userId,
            },
            include: {
                model: Home,
            },
        });
        // const homeName = await Home.findOne({
        //     where: {
        //         id: req.session.homeId,
        //     },
        // });
        console.log(userData);
        console.log("===========================");
        // console.log(homeName);
        const hbsUserData = userData.toJSON();
        // const hbsHomeData = homeName.toJSON();
        // const userHomeData = () => {
        //     return { ...hbsUserData, home: hbsHomeData };
        // };
        // console.log(userHomeData);
        res.render("settings", hbsUserData);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error getting data",
            error: error,
        });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const roommates = await Roommate.findOne({
            where: {
                id: req.params.id,
                home_id: req.session.userId,
            },
        });

        roommates = roommates.map((roommate) => roommate.toJSON());

        const createTask = await Task.update(
            {
                task: req.body.task,
            },
            {
                where: {
                    id: req.params.id,
                },
            }
        );

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

module.exports = router;
