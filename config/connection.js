// Import the dotenv library to load environment variables from a .env file
require('dotenv').config();

// Import the Sequelize library
const Sequelize = require('sequelize');

// Create a Sequelize instance with database connection details
const sequelize = process.env.JAWSDB_URL
  ? new Sequelize(process.env.JAWSDB_URL)  // If JAWSDB_URL environment variable is present, use it for connection
  // If JAWSDB_URL is not present, use local database connection details
  : new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: '127.0.0.1', // Database host (localhost in this case)
    dialect: 'mysql', // Database dialect (MySQL in this case)
    dialectOptions: {
      decimalNumbers: true,
    },
  });

// Export the configured Sequelize instance for use in other modules
module.exports = sequelize;
