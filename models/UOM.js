//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class UOM extends Model {}

//Initialize the UOM model
UOM.init(
    {
        what: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        home_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        underscored: true,
    }
);

module.exports = UOM;
