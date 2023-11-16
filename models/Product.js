// Import important parts of the Sequelize library
const { Model, DataTypes } = require('sequelize');

// Import the database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model { }

// Set up fields and rules for the Product model
Product.init(
  {
    // Define columns
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category', // Reference the 'category' model
        key: 'id' // Reference the 'id' column in the 'category' model
      }
    },
  },
  {
    // Pass the Sequelize instance for this model
    sequelize,
    timestamps: false, // Disable timestamps for this model
    freezeTableName: true, // Use the model name as the table name
    underscored: true, // Use snake_case for column names
    modelName: 'product', // Set the model name to 'product'
  }
);

// Export the Product model for use in other modules
module.exports = Product;
