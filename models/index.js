// Import necessary models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Define associations between models

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id', // Define the foreign key for the association
  onDelete: 'CASCADE' // Set the onDelete option to 'CASCADE' for automatic deletion of associated products
});

// Categories have many Products
Category.hasMany(Product, {
  foreignKey: 'category_id' // Define the foreign key for the association
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag, // Specify the intermediary model for the association
  foreignKey: 'product_id' // Define the foreign key for the association
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag, // Specify the intermediary model for the association
  foreignKey: 'tag_id' // Define the foreign key for the association
});

// Export all models for use in other modules
module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
