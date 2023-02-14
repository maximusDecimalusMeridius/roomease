//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Home extends Model {}

//Initialize the Home model
Home.init(
	{
		//Add fields to model
		name: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isAlphanumeric: true,
			},
		},
		zipcode: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "home",
		timestamps: false,
		underscored: true,
	}
);

module.exports = Home;
