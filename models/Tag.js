// Import necessary parts of the Sequelize library
const { Model, DataTypes, Sequelize } = require('sequelize');

// Import the database connection from config.js
const sequelize = require('../config/connection.js');

// Create a Tag class that extends Sequelize's Model class
class Tag extends Model { }

// Initialize the Tag model with column definitions and other options
Tag.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the 'tag_name' column
    tag_name: {
      type: DataTypes.STRING,
    },
  },
  {
    // Pass the Sequelize instance for this model
    sequelize,
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Use the model name as the table name
    underscored: true, // Use snake_case for column names
    modelName: 'tag', // Set the model name to 'tag'
  }
);

// Export the Tag model for use in other modules
module.exports = Tag;
