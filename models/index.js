//barrel file for models
const Roommate = require("./Roommate");
const UOM = require("./UOM");
const Event = require("./Event");
const Task = require("./Task");
const Home = require("./Home");

//Add table associations
UOM.belongsTo(Roommate,{
    onDelete:"CASCADE"
});

Roommate.hasMany(UOM);

//export models
module.exports = {
    Roommate,
    UOM,
    Event,
    Task,
    Home
};