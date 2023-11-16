// Import necessary modules
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// GET route to retrieve all categories
router.get('/', async (req, res) => {
  try {
    // Find all categories and include associated Products
    const categories = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to retrieve a single category by its id
router.get('/:id', async (req, res) => {
  try {
    // Find a single category by its id and include associated Products
    const categoryData = await Category.findByPk(req.params.id, {
      include: [Product]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new category
router.post('/', async (req, res) => {
  try {
    // Create a new category with the provided data
    const category = await Category.create(req.body);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route to update a category's data by its id value
router.put('/:id', async (req, res) => {
  try {
    // Update a category's data with the provided data and id
    const category = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete a category by its id value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a category with the provided id
    const category = await Category.destroy({
      where: { id: req.params.id }
    });
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router for use in other modules
module.exports = router;
