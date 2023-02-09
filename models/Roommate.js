//bring in Model and Datatypes from sequelize, define our connection
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt");

class Roommate extends Model {}

//Initialize the ROOMMATE model
Roommate.init(
  {
    //Add fields to model
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlphanumeric:true,
      },
    },
    last_name: {
      type: DataTypes.STRING,
      validate: {
        isAlphanumeric:true,
      },
    },
    email: {
      type: DataTypes.STRING(50),
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    home_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    underscored: true,
    hooks:{
        beforeCreate:userObj=>{
            userObj.password = bcrypt.hashSync(userObj.password,4);
            return userObj;
        }
    }
  }
);

module.exports = Roommate;

