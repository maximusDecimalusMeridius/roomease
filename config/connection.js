//require sequelize to establish the MySQL connection; dotenv to hide sensitive data
const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;

//if deployed to Heroku with JawsDB, use that URL, otherwise use what is specified in the .env file
if(process.env.JAWSDB_URL){
    sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PW,
        {
            host: "localhost",
            dialect: "mysql",
            port: 3306
        }
    )
}

module.exports = sequelize;