//barrel file for models
const Roommate = require("./Roommate");
const UOM = require("./UOM");
const Event = require("./Event");
const Task = require("./Task");
const Home = require("./Home");

//Add table associations
//Roommate - Home assoication
Roommate.hasOne(Home);
Home.belongsTo(Roommate);

//Roommate - Task association
Roommate.hasMany(Task);
Task.belongsTo(Roommate);

//Task - Home association
Task.hasOne(Home);
Home.belongsTo(Task);

UOM.belongsTo(Roommate, {
    onDelete: "CASCADE",
    foreignKey: "me",
});

UOM.belongsTo(Roommate, {
    onDelete: "CASCADE",
    foreignKey: "u",
});

Roommate.hasMany(UOM, {
    as: "owe",
    foreignKey: "u",
});
Roommate.hasMany(UOM, {
    as: "owed_by",
    foreignKey: "me",
});

Roommate.belongsToMany(Event, {
    through: "UserEvents",
    foreignKey: "roommate_id",
});

Event.belongsToMany(Roommate, {
    through: "UserEvents",
    foreignKey: "event_id",
});

//export models
module.exports = {
    Roommate,
    UOM,
    Event,
    Task,
    Home,
};
