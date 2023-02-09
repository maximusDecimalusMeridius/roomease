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
		assignee: {
			//TODO: still a bit confused on this one as to why it isn't referencing a user_id instead? May need Joe to come back and clarify
			type: DataTypes.STRING,
			allowNull: true,
		},
		home_id: {
			//TODO: note - in the frontend or session will we want to store the home id for an easy way to assign the home id? while it is pointing to a home id to reference where the home is we need to know which home is getting assigned the task
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
