const express = require ("express");
const { Roommate } = require("../models");
const router = express.Router();
const bcrypt = require("bcrypt");

router.get("/", (req, res)=>{
    res.render("login");
})

router.get("/signup", (req, res) => {
    res.render("signup");
})

router.post("/login", async (req, res)=>{
    console.log(req.body);
    try {
        const roommate = await Roommate.findOne({
            where: {
				email: req.body.email
			}
        });

        const dataMatches = (bcrypt.compareSync(req.body.password, roommate.password));
        
        if(dataMatches){
            req.session.userId = roommate.id;
            req.session.email = roommate.email;
            req.session.firstName = roommate.first_name;
            req.session.isLoggedIn = true;
            console.log(req.session);
            return res.status(200).json(req.session);
        } else {
            return res.status(401).json({msg:"Login not found - Please try again"})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Login not found - Please try again",
            error: error
        });
    }
})

//DELETE route for logout
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out")
})

//show the user their dashboard once they're logged in
router.get("/dashboard/:id", (req, res) => {
    Roommate.findByPk(req.params.id, {
        include:[
            {
                //tasks
            },
            {
                //events
            },
            {
                // UOMs
            },
        ]
    }).then(userData => {
        const hbsUser = userData.toJSON();

        res.render("dashboard", {
            //isloggedin is the same req.session.loggedin
            //ismyprofile -> boolean checking if req.params.id == req.session.userId
        });
    }); 
});

module.exports = router;