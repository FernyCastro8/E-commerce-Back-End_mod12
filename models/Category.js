// Import necessary modules from Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the Sequelize instance from the connection module
const sequelize = require('../config/connection.js');

// Create a Category class that extends Sequelize's Model class
class Category extends Model { }

// Initialize the Category model with column definitions and other options
Category.init(
  {
    // Define the 'id' column
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    // Define the 'category_name' column
    category_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    // Pass the Sequelize instance for this model
    sequelize,
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Use the model name as the table name
    underscored: true, // Use snake_case for column names
    modelName: 'category', // Set the model name to 'category'
  }
);

// Export the Category model for use in other modules
module.exports = Category;
