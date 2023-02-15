//barrel file for models
const Roommate = require("./Roommate");
const UOM = require("./UOM");
const Event = require("./Event");
const Task = require("./Task");
const Home = require("./Home");

//Add table associations
//Roommate - Home assoication

// Roommate.hasOne(Home);
// Home.belongsTo(Roommate);

Home.hasMany(Roommate);
Roommate.belongsTo(Home);

//Task - Home association

// Task.hasOne(Home);
// Home.belongsTo(Task);

Home.hasMany(Task);
Task.belongsTo(Home);

//Event - Home association

// Event.hasOne(Home);
// Home.belongsTo(Event);

Home.hasMany(Event);
Event.belongsTo(Home);

//UOM - Home association
UOM.hasOne(Home);
Home.belongsTo(UOM);

// Home.hasMany(UOM);
// UOM.belongsTo(Home);

// Roommate - Task association
Roommate.hasMany(Task);
Task.belongsTo(Roommate);

UOM.belongsTo(Roommate, {
    onDelete: "CASCADE",
    foreignKey: "me",
    as: "owed_by",
});

UOM.belongsTo(Roommate, {
    onDelete: "CASCADE",
    foreignKey: "u",
    as: "owe",
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
