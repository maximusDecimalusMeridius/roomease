//barrel file for models
const Roommate = require("./Roommate");
const UOM = require("./UOM");
const Event = require("./Event");
const Task = require("./Task");
const Home = require("./Home");

//Add table associations

//export models
module.exports = {
    Roommate,
    UOM,
    Event,
    Task,
    Home
};