//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Task extends Model {}

//Initialize the Task model
Task.init(
	{
		//Add fields to model
		task: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		home_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "task",
		timestamps: false,
		underscored: true,
	}
);

module.exports = Task;
