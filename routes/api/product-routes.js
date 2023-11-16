// Import necessary modules
const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

// The `/api/products` endpoint

// GET route to retrieve all products
router.get('/', async (req, res) => {
  try {
    // Find all products and include associated Category and Tag data
    const productResponse = await Product.findAll();
    if (!productResponse) {
      return res.status(404).json(productResponse);
    }
    res.status(200).json(productResponse);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET route to retrieve a single product by its id
router.get('/:id', async (req, res) => {
  try {
    // Find a single product by its id and include associated Category data
    const productData = await Product.findByPk(req.params.id, {
      include: [Category]
    });

    if (!productData) {
      res.status(404).json({ message: 'No product found with that id!' });
      return;
    }

    res.status(200).json(productData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST route to create a new product
router.post('/', async (req, res) => {
  try {
    // Create a new product with the provided data
    const product = await Product.create(req.body);

    // If there are product tags, create pairings in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      await ProductTag.bulkCreate(productTagIdArr);
    }

    // Respond with the created product
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route to update a product's data and associated tags by its id value
router.put('/:id', async (req, res) => {
  try {
    // Update product data
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    // Find all associated tags from ProductTag
    const productTags = await ProductTag.findAll({ where: { product_id: req.params.id } });

    // Get a list of current tag_ids
    const productTagIds = productTags.map(({ tag_id }) => tag_id);

    // Create a filtered list of new tag_ids
    const newProductTags = req.body.tagIds
      .filter((tag_id) => !productTagIds.includes(tag_id))
      .map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });

    // Figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
      .map(({ id }) => id);

    // Run both actions
    await Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

    // Respond with the updated product tags
    res.status(200).json(productTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete a product by its id value
router.delete('/:id', async (req, res) => {
  try {
    // Delete a product with the provided id
    const product = await Product.destroy({
      where: { id: req.params.id }
    });

    // Respond with the deleted product
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Export the router for use in other modules
module.exports = router;
