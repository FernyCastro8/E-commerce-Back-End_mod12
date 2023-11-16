// Import necessary modules
const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// GET route to retrieve all tags
router.get('/', async (req, res) => {
  try {
    // Find all tags and include associated Product data
    const tags = await Tag.findAll({
      include: [Product]
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to retrieve a single tag by its id
router.get('/:id', async (req, res) => {
  try {
    // Find a single tag by its id and include associated Product data
    const tagData = await Tag.findByPk(req.params.id, {
      include: [Product]
    });

    if (!tagData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new tag
router.post('/', async (req, res) => {
  try {
    // Create a new tag with the provided data
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route to update a tag's name by its id value
router.put('/:id', async (req, res) => {
  try {
    // Update a tag's name with the provided data and id
    const tags = await Tag.update(req.body, {
      where: { id: req.params.id }
    });
    res.status(201).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete a tag by its id value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a tag with the provided id
    const tag = await Tag.destroy({
      where: { id: req.params.id }
    });
    res.status(201).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router for use in other modules
module.exports = router;
