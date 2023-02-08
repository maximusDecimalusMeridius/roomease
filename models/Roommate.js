//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Roommate extends Model {}

//Initialize the ROOMMATE model
Roommate.init({
    //Add fields to model
    firstName: {
        type: DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    }
},{
    sequelize
});

module.exports = Roommate
