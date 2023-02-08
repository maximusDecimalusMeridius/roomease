//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Event extends Model {}

//Initialize the Event model
Event.init({
    //Add fields to model
},{
    sequelize
});

module.exports = Event
