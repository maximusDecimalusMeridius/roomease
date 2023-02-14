//loop in dependencies
const express = require("express");
const { Home, Roommate, Event, UOM } = require("../models");
const router = express.Router();

//GET all records
router.get("/", (req, res) => {
	if(!req.session.isLoggedIn){
        return res.render("login");
    }
	
	Roommate.findAll({
        include: [
			"tasks",
			Event, 
			{
				model: UOM,
            	as: "owed_by",
				include: [{model: Roommate, as:"owe"}]
			}]
    }).then(roommateData=>{
        const hbsRoommates = roommateData.map(roommate=>roommate.toJSON())
        res.render("roommates",{
            allRoommates:hbsRoommates
        });
    }).catch((error) => {
		console.log(error);
		res.status(500).json({
			message: "Error getting data",
			error: error,
		});
	});
});

//GET one record by id
router.get("/:id", (req, res) => {
	Roommate.findByPk(req.params.id)
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
router.post("/:type", async (req, res) => {
	try {
		let home_id;

		const makeRoommate = () => {
			Roommate.create({
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				email: req.body.email,
				password: req.body.password,
				home_id: home_id
			})
		}

		if(req.params.type == "join"){
			const someonesHome = await Home.findOne({
				where:{
					name: req.body.home_name,
					zipcode: req.body.zipcode
				}
			})
			
			if(someonesHome){
				home_id = someonesHome.dataValues.id;
				makeRoommate();
				res.status(200).json({
					message: "We did it!"
				});
			} else {
				res.status(404);
			}
		}

		if(req.params.type == "create"){
			await Home.create({
				name: req.body.home_name,
				zipcode: req.body.zipcode
			})
			home_id = await Home.findOne({
				where:{
					name: req.body.home_name
				}
			})
			home_id = home_id.dataValues.id;
			makeRoommate();
			return res.status(200);
		}
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Can't join home - please check name and zipcode",
            error: error
        })
    }    
	
	// Roommate.create({
	// 	first_name: req.body.first_name,
	// 	last_name: req.body.last_name,
	// 	email: req.body.email,
	// 	password: req.body.password,
	// 	home_id: req.body.home_id,
	// })
	// 	.then((data) => {
	// 		res.status(201).json(data);
	// 	})
	// 	.catch((error) => {
	// 		console.log(error);
	// 		res.status(500).json({
	// 			message: "Error creating record!",
	// 			err: error,
	// 		});
	// 	});
});

//UPDATE a record
router.put("/:id", (req, res) => {
	Roommate.update(
		{
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			home_id: req.body.home_id,
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
	Roommate.destroy({
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
