// Import the express library and create a router
const router = require('express').Router();

// Import the API routes from the 'api' module
const apiRoutes = require('./api');

// Use the API routes under the '/api' endpoint
router.use('/api', apiRoutes);

// If the route doesn't match any defined routes, send a "Wrong Route!" message
router.use((req, res) => {
  res.send("<h1>Wrong Route!</h1>");
});

// Export the router for use in other modules
module.exports = router;
