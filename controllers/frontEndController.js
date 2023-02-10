const express = require ("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.render("welcome")
})

router.get("/login", (req, res)=>{
    res.render("login")
})

router.get("/logout", (req, res)=>{
    res.render("logout")
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

//Will add to controllers for each
// router.get("/uoms", (req, res)=>{
//     res.render("uoms")
// })

// router.get("/home", (req, res)=>{
//     res.render("home")
// })