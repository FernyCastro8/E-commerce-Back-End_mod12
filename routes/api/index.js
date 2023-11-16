// Import necessary modules
const router = require('express').Router();
const categoryRoutes = require('./category-routes');
const productRoutes = require('./product-routes');
const tagRoutes = require('./tag-routes');

// Use the defined routes for each resource
router.use('/categories', categoryRoutes); // Use category routes for URLs starting with '/categories'
router.use('/products', productRoutes); // Use product routes for URLs starting with '/products'
router.use('/tags', tagRoutes); // Use tag routes for URLs starting with '/tags'

// Export the router for use in other modules
module.exports = router;
