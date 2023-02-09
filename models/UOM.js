//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class UOM extends Model {}

//Initialize the UOM model
UOM.init({
    what: {
        type: DataTypes.STRING,
        allowNull: false
    },
    me: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    u: {
        type: DataTypes.INTEGER,
        allowNull: false 
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
},{
    sequelize,
    underscored:false
});

module.exports = UOM
