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
			type: DataTypes.INTEGER,
			allowNull: false,
			validate,
		},
	},
	{
		sequelize,
		modelName: "home",
		timestamps: false,
	}
);

module.exports = Home;
