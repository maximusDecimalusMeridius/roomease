const sequelize = require("../config/connection.js");
const { Home, Task, Event, Roommate, UOM } = require("../models");

const seed = async () => {
    await sequelize.sync({force:true});
    
    const homes = await Home.bulkCreate([
        {
            name: "Metaverse",
            zipcode: "00000"
        }
    ])
    
    const tasks = await Task.bulkCreate([
        {
            task: "Wash the trash",
            assignee: "Roommie1",
            home_id: 1
        },
        {
            task: "Put away the dog",
            assignee: "Roommie2",
            home_id: 1
        },
        {
            task: "Walk the dishes",
            assignee: "Roommie3",
            home_id: 1
        }

    ])
    
    const events = await Event.bulkCreate([
        {
            what: "Teletubby Concert",
            date: "2023-02-10",
            time: "12:30:00"
        },
        {
            what: "Friend Party!",
            date: "2023-02-17",
            time: "16:30:00"
        },
        {
            what: "Breakfast Things!",
            date: "2023-02-10",
            time: "08:30:00"
        },
    ])

    const roommates = await Roommate.bulkCreate([
        {
            first_name: "Roomie1",
            last_name: "Test",
            email: "roomie1@roomease.com",
            password: "password1",
            home_id: "1"
        },
        {
            first_name: "Roomie2",
            last_name: "Test",
            email: "roomie2@roomease.com",
            password: "password2",
            home_id: "1"
        },
        {
            first_name: "Roomie3",
            last_name: "Test",
            email: "roomie3@roomease.com",
            password: "password3",
            home_id: "1"
        }
    ],
    {
        individualHooks: true
    }
    )

    const uoms = await UOM.bulkCreate([
        {
            what: "Pizza debt",
            u: 2,
            me: 1,
            amount: 25
        },
        {
            what: "Coffee",
            u: 1,
            me: 3,
            amount: 5
        },
        {
            what: "Plane Ticket",
            u: 3,
            me: 2,
            amount: 225
        },
    ])

    await roommates[0].addTask(1);
    await roommates[1].addTask(2);
    await roommates[2].addTask(3);

    process.exit(1);
}

seed();