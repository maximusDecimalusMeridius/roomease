//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Task extends Model {}

//Initialize the Task model
Task.init({
    //Add fields to model
},{
    sequelize
});

module.exports = Task
