const sequelize = require("../config/connection.js");
const { Home, Task, Event, Roommate, UOM } = require("../models");

const seed = async () => {
    await sequelize.sync({ force: true });

    const homes = await Home.bulkCreate([
        {
            name: "Metaverse",
            zipcode: "00000",
        },
        {
            name: "Seattle",
            zipcode: "00001",
        },
    ]);

    const tasks = await Task.bulkCreate([
        {
            task: "Wash the trash",
            home_id: 1
        },
        {
            task: "Put away the dog",
            home_id: 1
        },
        {
            task: "Walk the dishes",
            home_id: 1
        },
    ]);

    const events = await Event.bulkCreate([
        {
            what: "Teletubby Concert",
            date: "2023-02-10",
            time: "12:30:00",
            home_id: 1
        },
        {
            what: "Friend Party!",
            date: "2023-02-17",
            time: "16:30:00",
            home_id: 1
        },
        {
            what: "Breakfast Things!",
            date: "2023-02-10",
            time: "08:30:00",
            home_id: 2
        },
    ]);

    const roommates = await Roommate.bulkCreate(
        [
            {
                first_name: "Roomie1",
                last_name: "Test",
                email: "roomie1@roomease.com",
                password: "password1",
                home_id: "1",
            },
            {
                first_name: "Roomie2",
                last_name: "Test",
                email: "roomie2@roomease.com",
                password: "password2",
                home_id: "1",
            },
            {
                first_name: "Roomie3",
                last_name: "Test",
                email: "roomie3@roomease.com",
                password: "password3",
                home_id: "1",
            },
        ],
        {
            individualHooks: true,
        }
    );

    const uoms = await UOM.bulkCreate([
        {
            what: "Pizza debt",
            u: 2,
            me: 1,
            amount: 25,
            home_id: 1
        },
        {
            what: "Coffee",
            u: 1,
            me: 3,
            amount: 5,
            home_id: 1
        },
        {
            what: "Plane Ticket",
            u: 3,
            me: 2,
            amount: 225,
            home_id: 1
        },
    ]);

    await roommates[0].addTask(1);
    await roommates[1].addTask(2);
    await roommates[2].addTask(3);

    await events[0].addRoommate(1);
    await events[1].addRoommate(2);
    await events[2].addRoommate(3);
    
    // await homes[0].addEvent(1);
    // await homes[0].addEvent(2);
    // await homes[0].addEvent(3);

    // await events[0].addHome(1);
    // await events[1].addHome(1);
    // await events[2].addHome(1);

    await roommates[2].addEvent(3);

    process.exit(1);
};

seed();
