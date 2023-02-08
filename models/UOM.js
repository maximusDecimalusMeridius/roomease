//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UOM extends Model {}

//Initialize the UOM model
UOM.init({
    //Add fields to model
},{
    sequelize,
    underscored:false
});

module.exports = UOM
