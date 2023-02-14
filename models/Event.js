//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Event extends Model {}

//Initialize the Event model
Event.init(
  {
    what: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
      allowNull: false
    },
    time: {
      type: DataTypes.TIME,
    },
  },
  {
    sequelize,
  }
);

module.exports = Event;
